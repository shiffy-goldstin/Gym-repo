# Base image olarak Node.js 18 alpine kullanılıyor
FROM node:18-alpine

# Yazar bilgisi
LABEL authors="Mehmet Furkan Kaya <furkan.36kaya@gmail.com>"

# Çalışma dizinini ayarlama
WORKDIR /frontend

# package.json ve package-lock.yaml dosyalarını kopyalama
COPY package.json pnpm-lock.yaml ./

# Bağımlılıkları yükleme
RUN npm install -g pnpm@9.12.3 && pnpm install --frozen-lockfile
# Uygulamanın geri kalan dosyalarını kopyalama
COPY . .

# Uygulamayı çalıştırma
CMD ["pnpm", "run", "dev"]