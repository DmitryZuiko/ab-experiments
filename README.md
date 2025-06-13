# AB Experiments API

Простой REST API для проведения A/B‑экспериментов.  
Реализовано на NestJS, TypeScript и PostgreSQL с использованием TypeORM.

## 🚀 Функциональность

- **Авторизация (JWT)**
  - Регистрация пользователей
  - Логин и выдача JWT
- **Эксперименты**
  - Создание эксперимента с вариантами и распределением (защищённый маршрут)
  - Завершение эксперимента (switch to `finished`, защищённый маршрут)
  - Получение списка активных экспериментов для устройства (`deviceId`)
    - На первом запросе возвращает _все_ активные эксперименты
    - На последующие — только те, что запущены после первого запроса
  - Назначение вариантов устройствам с сохранением в базу (консистентность)
- **Статистика**
  - Общее число участников по каждому эксперименту
  - Распределение устройств по вариантам (кол-во + %) (защищённый маршрут)

## 🧰 Технологии

- [NestJS](https://nestjs.com/) (Node.js фреймворк)
- TypeScript
- [TypeORM](https://typeorm.io/)
- PostgreSQL
- JWT + Passport
- `pnpm` для управления пакетами

## 📦 Установка

1. Клонировать репозиторий:
   ```bash
   git clone <repo_url>
   cd ab-experiments
   ```

2. Установить зависимости:
   ```bash
   pnpm install
   ```

3. Создать файл .env в корне проекта со следующими переменными:
   ```bash
   PORT=<port>
   DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<db_name>
   JWT_SECRET=your_jwt_secret
   ```

4. Поднять PostgreSQL в Docker (если нужно):
   ```bash
   docker run --name <your-container-name> \
   -e POSTGRES_USER=<db_user> \
   -e POSTGRES_PASSWORD=<db_password> \
   -e POSTGRES_DB=<db_name> \
   -p <your-local-port>:5432 \
   -d postgres
   ```

## 🚀 Запуск
   
   ```bash
   pnpm run start
   ```

## 📊 Swagger-документация

После запуска проекта Swagger доступен по адресу:

   ```bash
   http://<your-domain-or-ip>/api/docs
   ```
Документация включает описание всех эндпоинтов, DTO, авторизации и моделей.