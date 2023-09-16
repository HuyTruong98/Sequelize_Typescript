# Sử dụng một hình ảnh Node.js chứa TypeScript để biên dịch mã nguồn
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

# Cài đặt các phụ thuộc và biên dịch mã TypeScript
RUN yarn install
COPY . .
RUN yarn build

# Sử dụng một hình ảnh Node.js rỗng để chạy ứng dụng
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
COPY --from=builder /usr/src/app/dist ./dist

# Cài đặt các phụ thuộc cần thiết cho production
RUN yarn install --production

# Khai báo cổng ứng dụng
EXPOSE 8080

# Khai báo lệnh chạy ứng dụng khi container được khởi chạy
CMD ["node", "dist/index.js"]
