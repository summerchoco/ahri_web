FROM node:18-alpine AS build

WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 앱 빌드
COPY . .
RUN npm run build


# ----------- 실제 운영 컨테이너 -------------
FROM node:18-alpine AS production

WORKDIR /app

# serve 설치
RUN npm install -g serve

# 빌드된 정적 파일 복사
COPY --from=build /app/build ./build

# 3000 포트 노출
EXPOSE 3000

# 정적 파일 서빙
CMD ["serve", "-s", "build", "-l", "3000"]
