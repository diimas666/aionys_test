1) git clone https://github.com/diimas666/aionys_test.git
2) npm install
3) npm start
4)Выбрать способ запуска:
  w → Запуск в браузере (Web)
  i → Запуск на iOS (через симулятор)
  a → Запуск на Android (через эмулятор)
Для работы на Android/iOS нужен установленный Expo Go.
5)В проекте есть два вида тестов:
  1) Unit-тесты (Jest) 
    npm test
  2) End-to-End тест (Cypress)
Запуск:
Открыть два терминала.
1)В первом запустить фронтенд в web-режиме:npm run web
Сервер фронтенда должен работать на http://localhost:8081
2)Во втором терминале запустить Cypress:npm run cypress
В открывшемся окне выбрать:
E2E Testing
Chrome (или другой браузер)
Файл теста: notes.cy.js

!Запустить тест и дождаться завершения.!
Технологии:
Frontend: React Native Web, Redux Toolkit, i18n, Expo, MongoDb Atlas

Тесты: Jest, Cypress


| Метод  | Маршрут      | Описание               |
| ------ | ------------ | ---------------------- |
| GET    | `/notes`     | Получить все заметки   |
| GET    | `/notes/:id` | Получить заметку по ID |
| POST   | `/notes`     | Создать новую заметку  |
| PUT    | `/notes/:id` | Обновить заметку       |
| DELETE | `/notes/:id` | Удалить заметку        |
