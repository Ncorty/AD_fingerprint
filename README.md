# AD_fingerprint
## Описание всех необходимых зависимостей для запуска без docker:
- node.js
- npm
- PosgreSQL
- nginx

### Backend NestJS
- typeorm
- pg
- swagger(swagger-UI)
- .env(см. .env.example)

### Frontend Vite + React
- vite
- tailwind
- shacdn/ui
- tanstack Router
- tanstack Query


## Описание запуска приложения
#### При наличии docker
- в корне проекта написать ``` docker-compose up --build ```
#### При отсутсвии docker
- Проверить что все зависимости есть
- Создать .env(см. .env.example) в папках /backend и /frontend/front
- Перейти в папку /backend и ввести в терминал ``` npm run start ```
- Перейти в папку /frontend/front и ввести в терминал ``` npm run ```

## Описание endpoint
Данной описание предоставлено с помощью API документации Swagger, оно доступно по адресу при запущенном backend [http://localhost:3000/api](http://localhost:3000/api)
