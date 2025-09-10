# Spektr Shop — стартовый магазин (Next.js + Prisma + Postgres)

Это минимальный каркас магазина под ваше ТЗ: SEO, карточки товаров, склад, счёт, интеграции с YooKassa и Яндекс.Доставкой (заглушки), тикеты поддержки.

## 0) Что понадобится новичку
- Node.js 20 LTS: https://nodejs.org/
- Git (по желанию) и Docker Desktop (для базы) https://www.docker.com/
- Любой редактор кода (VS Code)

## 1) Старт
```bash
# 1. Распакуйте архив и зайдите в папку
cd spektr-shop

# 2. Создайте .env
cp .env.example .env

# 3. Поднимите базу
docker compose up -d

# 4. Установите зависимости
npm ci

# 5. Сгенерируйте Prisma клиент и миграции
npm run prisma:generate
npm run prisma:migrate

# 6. Заполните базу демо-данными
npm run seed

# 7. Запуск
npm run dev
```

Откройте http://localhost:3000 — увидите главную и каталог.

### Запуск в Codex
В среде Codex база Postgres доступна сразу.

```bash
cp .env.example .env
npm ci
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

## 2) Что уже есть
- **Каталог и карточка товара** (`/katalog`, `/katalog/[slug]`)
- **Модели БД**: категории, товары, заказы
- **SEO**: `sitemap.ts`, `robots.ts`, Product JSON‑LD
- **Счёт (PDF)**: `/api/invoice`
- **YooKassa**: `/api/payments/yookassa/create` (инициация), `/api/payments/yookassa/webhook` (вебхук)
- **Яндекс.Доставка**: `/api/delivery/calc` (заглушка для тарифа) — замените на реальный вызов API
- **Склад синхронизация**: `/api/stock/update` (защита по `x-api-key`)

### Админ: категории
- Страница: `/admin/categories`
- Создание — кнопка «Добавить категорию», заполните название и slug
- Редактирование — «Редактировать» напротив категории
- Удаление — «Удалить» с подтверждением

## 3) Как подключить прод‑сервисы
### YooKassa
- В кабинете получите `shop_id` и `secret_key`, пропишите в `.env`:
```
YK_SHOP_ID=...
YK_SECRET_KEY=...
```
- На стороне YooKassa укажите вебхук: `https://ВАШ_ДОМЕН/api/payments/yookassa/webhook`

### Яндекс.Доставка
- Получите `Bearer` токен и идентификаторы, пропишите в `.env`:
```
YANDEX_DELIVERY_TOKEN=...
YANDEX_DELIVERY_SHOP_ID=...
YA_WAREHOUSE_ID=...
```
- Реализуйте реальный расчёт в `app/api/delivery/calc/route.ts` (пример структуры уже есть).

### Склад
- Для импорта остатков шлите POST на `/api/stock/update` с заголовком `x-api-key: STOCK_SYNC_KEY` и телом:
```json
{ "rows": [ { "sku": "HAWK-1520", "warehouse": "KZN", "qty": 12 } ] }
```

## 4) Развёртывание на сервере (коротко)
- На VDS установите Node 20, Docker, Nginx (реверс‑прокси).
- Поднимите Postgres через `docker compose up -d`.
- Пропишите переменные окружения `.env`.
- `npm ci && npm run build && npm run start` за Nginx.

## 5) Дальшие шаги (по приоритету)
1. Чекаут: корзина, оформление, резервация, YooKassa редирект → вебхук → статус заказа.
2. Яндекс.Доставка: реальный `deliveryOptions`/`createOrder`, статусы и трекинг.
3. Админка: товары/категории, заказы (статусы, экспорт), склад (движения), тикеты ТП.
4. SEO: OG‑картинки, фасетные фильтры (белый список), страницы «в наличии в городе».
5. Импорт CSV/Excel (товары, остатки), экспорт заказов.
6. Email/SMS уведомления.

## Важно
- Этот каркас сделан под новичка: команды сверху — копируйте по порядку.
- Всё безопасное — по умолчанию выключено (оплаты/доставка — заглушки). Включайте по мере готовности.
