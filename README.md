# ToReminder Backend

Бэкенд-часть приложения для управления задачами (Kanban-style), построенная на Node.js и Express. Для работы с данными используется Drizzle ORM в связке с базой данных Turso (SQLite).

## 🚀 Стек технологий

* **Runtime:** Node.js (ES Modules)
* **Framework:** Express.js
* **Database:** Turso (LibSQL)
* **ORM:** Drizzle ORM
* **Environment:** Dotenv
* **Development:** Nodemon

---

## 🛠 Установка и запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/PAKAJl/ToReminderBackEnd.git
cd toreminderback
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка окружения
Создайте файл `.env` в корневой директории и добавьте в него следующие переменные:
```env
PORT=3000
TURSO_CONNECTION_URL=your_turso_db_url
TURSO_AUTH_TOKEN=your_turso_auth_token
```

### 4. Синхронизация базы данных
Для создания таблиц в Turso выполните команду:
```bash
npx drizzle-kit push
```

### 5. Запуск сервера
* **Режим разработки:** `npm run dev`
* **Продакшн режим:** `npm start`

---

## 📑 API Документация

Все запросы должны содержать заголовок `Content-Type: application/json`. Для большинства операций требуется заголовок `Authorization: Bearer <ваш_токен_проекта>`.

### 📂 Проекты (Projects)

#### 1. Создание проекта
Создает новый проект и генерирует уникальный 32-байтный токен доступа.
* **URL:** `/api/projects`
* **Метод:** `POST`
* **Тело запроса:** `{"name": "Project Name"}`
* **Ответ (201):** Массив с созданным объектом проекта.

#### 2. Получение данных проекта
Возвращает название проекта, привязанного к токену.
* **URL:** `/api/projects`
* **Метод:** `GET`
* **Headers:** `Authorization: Bearer <token>`

#### 3. Обновление названия
* **URL:** `/api/projects/name`
* **Метод:** `POST`
* **Тело запроса:** `{"name": "New Name"}`

---

### ✅ Задачи (Tasks)

#### 1. Получение задач
Если токен не указан, возвращаются все задачи (режим отладки). Если токен указан — только задачи этого проекта.
* **URL:** `/api/tasks`
* **Метод:** `GET`
* **Headers:** `Authorization: Bearer <token>` (опционально)

#### 2. Создание задачи
* **URL:** `/api/tasks`
* **Метод:** `POST`
* **Headers:** `Authorization: Bearer <token>`
* **Тело запроса:**
```json
{
  "title": "Task Title",
  "description": "Task details",
  "status": "todo",
  "priority": "low",
  "date": "2026-05-10"
}
```

#### 3. Удаление задачи
Удаляет задачу только при совпадении ID и токена владельца.
* **URL:** `/api/tasks/delete?id=<task_id>`
* **Метод:** `GET`
* **Headers:** `Authorization: Bearer <token>`

---

## 🏗 Структура базы данных

Проект использует две основные таблицы со связью **Cascade**:

1. **`projects`**: Хранит имя и уникальный `token` проекта.
2. **`tasks`**: Содержит задачи, привязанные к токену проекта. Включает поля `title`, `description`, `status`, `priority` и `date`.

Для оптимизации выборок по проектам в таблице задач настроен индекс `tokenIdx`.