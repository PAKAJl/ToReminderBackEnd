import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.routes.js';
//import { errorHandler } from './middleware/errorHandler.js';

// Загружаем переменные окружения из .env (URL базы данных, порт и т.д.)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware (Промежуточное ПО) ---

app.use(express.json());

import cors from 'cors';
app.use(cors());

// --- Routes (Маршруты) ---

// Базовый маршрут для проверки работоспособности
app.get('/', (req, res) => {
  res.json({ message: 'Task Tracker API is running' });
});

// Подключаем маршруты для задач
// Теперь все пути в taskRoutes будут начинаться с /api/tasks
app.use('/api/tasks', taskRoutes);

// --- Error Handling (Обработка ошибок) ---

// Важно подключать после всех маршрутов
//app.use(errorHandler);

// --- Server Start (Запуск) ---

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

export default app;