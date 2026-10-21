package com.furkankaya.service;

import com.furkankaya.config.PasswordEncoderConfig;
import com.furkankaya.dto.*;
import com.furkankaya.dto.converter.*;
import com.furkankaya.model.Measurement;
import com.furkankaya.model.Price;
import com.furkankaya.model.Role;
import com.furkankaya.model.User;
import com.furkankaya.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final MeasurementRepository measurementRepository;
    private final UserConverter userConverter;
    private final PriceConverter priceConverter;
    private final MeasurementConveter measurementConveter;
    private final PriceRepository priceRepository;
    private final PasswordEncoderConfig passwordEncoderConfig;
    private final MailService mailService;

    @Lazy
    private final JwtService jwtService;

    public UserDetailsServiceImpl(UserRepository userRepository, MeasurementRepository measurementRepository, UserConverter userConverter, PriceConverter priceConverter, MeasurementConveter measurementConveter, PriceRepository priceRepository, PasswordEncoderConfig passwordEncoderConfig, MailService mailService, @Lazy JwtService jwtService) {
        this.userRepository = userRepository;
        this.measurementRepository = measurementRepository;
        this.userConverter = userConverter;
        this.priceConverter = priceConverter;
        this.measurementConveter = measurementConveter;
        this.priceRepository = priceRepository;
        this.passwordEncoderConfig = passwordEncoderConfig;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public UserResponse createUser(CreateUserRequest request) {
        User user = userConverter.toUser(request);
        userRepository.save(user);
        return userConverter.toUserResponse(user);
    }

    @Transactional
    public void register(RegisterRequest request) {
        String email = request.email() == null ? "" : request.email().trim().toLowerCase();
        String firstName = request.firstName() == null ? "" : request.firstName().trim();
        String lastName = request.lastName() == null ? "" : request.lastName().trim();
        String password = request.password() == null ? "" : request.password();

        if (firstName.isBlank() || lastName.isBlank() || !email.contains("@") || password.length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Enter a valid name, email, and password of at least 8 characters.");
        }
        if (userRepository.findByEmail(email) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account with this email already exists.");
        }

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(passwordEncoderConfig.passwordEncoder().encode(password));
        user.setAuthorities(Collections.singleton(Role.ROLE_USER));
        user.setUuid(UUID.randomUUID().toString());
        user.setInside(false);
        userRepository.save(user);
    }

    @Transactional
    public UserResponse changePassword(HttpServletRequest httpServletRequest,
                                       ChangePasswordRequest request) {
        String email = jwtService.resolveRequest(httpServletRequest);
        User user = userRepository.findByEmail(email);

        if (user.getUsername().equals(email) &&
                passwordEncoderConfig.passwordEncoder().matches(request.oldPassword(), user.getPassword())) {

            user.setPassword(passwordEncoderConfig.passwordEncoder().encode(request.newPassword()));
            userRepository.save(user);

            mailService.sendMail(user.getEmail(), "Your password has been changed.💪");

            return userConverter.toUserResponse(user);
        } else {
            throw new RuntimeException("Old password is incorrect.");
        }
    }

    @Transactional
    public Boolean isAllowedToPass(String uuid) {
        User user = getUserByUUID(uuid);
        User newUser = inside(user);
        userRepository.save(newUser);
        LocalDate endDate = user.getEndDate();
        LocalDate now = LocalDate.now();
        if (endDate != null && endDate.isBefore(now)) {
            throw new RuntimeException("User's access has expired.");
        }
        return true;
    }

    public User getUserByUUID(String uuid) {
        User user = userRepository.findByUuid(uuid);
        if (user == null) {
            throw new UsernameNotFoundException(uuid);
        }
        return user;
    }

    public User inside(User user) {
        boolean response = user.isInside();
        if (response) {
            user.setInside(false);
        } else {
            user.setInside(true);
        }
        return user;
    }

    public void priceUpdate(PriceRequestResponse priceRequest) {
        Price price = priceRepository.findById(100L).orElse(null);
        if (price != null) {
            price.setOneMonths(priceRequest.oneMonths());
            price.setThreeMonths(priceRequest.threeMonths());
            price.setSixMonths(priceRequest.sixMonths());
            price.setTwelveMonths(priceRequest.twelveMonths());
            priceRepository.save(price);
        } else {
            throw new RuntimeException("Price not found.");
        }
    }

    public PriceRequestResponse getPrices() {
        Price price = priceRepository.findById(100L).orElse(null);
        if (price != null) {
            return priceConverter.toPriceRequestResponse(price);
        } else {
            throw new RuntimeException("Price not found.");
        }
    }

    public void measurementCreate(MeasurementRequestResponse measurementRequestResponse) {
        Measurement measurement = measurementConveter.toMeasurement(measurementRequestResponse);
        measurementRepository.save(measurement);
    }

    public List<MeasurementResponse> getMeasurements(HttpServletRequest httpServletRequest) {
        String email = jwtService.resolveRequest(httpServletRequest);
        return measurementConveter.toListMeasurementResponse(email);
    }

    public Long getInside() {
        return userRepository.countByInside(true);
    }

    public Long getUserDays(HttpServletRequest httpServletRequest) {
        String email = jwtService.resolveRequest(httpServletRequest);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found.");
        }
        LocalDate endDate = user.getEndDate();
        LocalDate now = LocalDate.now();
        if (endDate == null) {
            return 0L;
        }
        if (endDate.isBefore(now)) {
            System.out.println("User's access has expired.");
            return 0L;
        }
        Long daysLeft = ChronoUnit.DAYS.between(now, endDate);
        if (daysLeft < 0) {
            return 0L;
        }
        if (daysLeft == 10) {
            mailService.sendMail(email, "You have 10 days left.");
        }
        return daysLeft;
    }

    @Transactional
    public LocalDate subscribeToPlan(HttpServletRequest httpServletRequest, Integer months) {
        if (months == null || (months != 1 && months != 3 && months != 6 && months != 12)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choose a valid plan duration.");
        }

        String email = jwtService.resolveRequest(httpServletRequest);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authenticated user not found.");
        }

        LocalDate today = LocalDate.now();
        LocalDate currentEndDate = user.getEndDate();
        LocalDate newEndDate = currentEndDate == null || currentEndDate.isBefore(today)
                ? today.plusMonths(months)
                : currentEndDate.plusMonths(months);

        user.setEndDate(newEndDate);
        userRepository.save(user);
        return newEndDate;
    }

    public void updateDate(String email, int month) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found.");
        }

        LocalDate currentDate = LocalDate.now();
        LocalDate newEndDate;

        LocalDate userEndDate = user.getEndDate();

        if (userEndDate == null || userEndDate.isBefore(currentDate)) {
            newEndDate = currentDate.plusMonths(month);
        } else {
            newEndDate = userEndDate.plusMonths(month);
        }

        user.setEndDate(newEndDate);
        userRepository.save(user);
    }

    public void sendEmail(EmailRequest email) {
        mailService.sendMail("gym.app36@gmail.com",
                email.message() + "\n" +
                        email.firstName() + " " + email.lastName() + "\n" +
                        email.email());
    }


}
