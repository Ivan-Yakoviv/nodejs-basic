import express from 'express';
import PinoHttp from 'pino-http';

const app = express();

const PORT = 4000;

// Middleware для логування часу запиту
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
// наприклад, у запитах POST або PATCH
app.use(express.json());

// Маршрут для обробки GET-запитів на '/'
app.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
  });
});

// Middleware для обробких помилок (приймає 4 аргументи)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(
  PinoHttp({
    transport: {
      target: 'pino-pretty',
    },
  }),
);
