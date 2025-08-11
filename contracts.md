# Komfort.City - API Contracts и Интеграция

## Обзор системы

### Архитектура:
- **Frontend**: React сайт для клиентов 
- **Admin Panel**: React админ-панель для управления контентом
- **Backend**: FastAPI с MongoDB для данных
- **Database**: MongoDB коллекции для контента

## API Endpoints

### 1. Контент-менеджмент

#### Основная информация сайта
```
GET /api/site-info
POST /api/site-info
PUT /api/site-info
```

#### Услуги
```
GET /api/services
POST /api/services  
PUT /api/services/{id}
DELETE /api/services/{id}
```

#### Сектора
```
GET /api/sectors
POST /api/sectors
PUT /api/sectors/{id} 
DELETE /api/sectors/{id}
```

#### Преимущества
```
GET /api/advantages
POST /api/advantages
PUT /api/advantages/{id}
DELETE /api/advantages/{id}
```

#### Решения
```
GET /api/solutions
POST /api/solutions
PUT /api/solutions/{id}
DELETE /api/solutions/{id}
```

#### Проекты
```
GET /api/projects
POST /api/projects
PUT /api/projects/{id}
DELETE /api/projects/{id}
```

#### FAQ
```
GET /api/faq
POST /api/faq
PUT /api/faq/{id}
DELETE /api/faq/{id}
```

### 2. Переводы (мультиязычность)
```
GET /api/translations/{lang}    # lang: ua, ru, en
PUT /api/translations/{lang}
```

### 3. Медиа файлы
```
POST /api/upload/image         # Загрузка изображений
GET /api/media/{filename}      # Получение файлов
DELETE /api/media/{filename}   # Удаление файлов
```

### 4. Формы и заявки
```
POST /api/contact-form         # Отправка формы
GET /api/leads                 # Все заявки (админка)
GET /api/leads/{id}            # Конкретная заявка
PUT /api/leads/{id}/status     # Изменение статуса
```

### 5. Админ аутентификация
```
POST /api/admin/login          # Вход в админку
POST /api/admin/logout         # Выход
GET /api/admin/me             # Проверка текущего пользователя
```

## Модели данных

### SiteInfo
```json
{
  "id": "string",
  "company_name": "string",
  "phone": "string", 
  "email": "string",
  "address": "string",
  "working_hours": "string",
  "emergency_phone": "string"
}
```

### Service
```json
{
  "id": "string",
  "title": {"ua": "string", "ru": "string", "en": "string"},
  "description": {"ua": "string", "ru": "string", "en": "string"},
  "icon": "string",
  "order": "number",
  "active": "boolean"
}
```

### Sector
```json
{
  "id": "string", 
  "name": {"ua": "string", "ru": "string", "en": "string"},
  "description": {"ua": "string", "ru": "string", "en": "string"},
  "image": "string",
  "stats": "string",
  "order": "number",
  "active": "boolean"
}
```

### Advantage
```json
{
  "id": "string",
  "title": {"ua": "string", "ru": "string", "en": "string"},
  "description": {"ua": "string", "ru": "string", "en": "string"}, 
  "icon": "string",
  "order": "number",
  "active": "boolean"
}
```

### Solution
```json
{
  "id": "string",
  "title": {"ua": "string", "ru": "string", "en": "string"},
  "description": {"ua": "string", "ru": "string", "en": "string"},
  "power_range": "string",
  "brands": "string",
  "timeline": "string", 
  "budget_range": "string",
  "icon": "string",
  "popular": "boolean",
  "order": "number",
  "active": "boolean"
}
```

### Project
```json
{
  "id": "string",
  "title": {"ua": "string", "ru": "string", "en": "string"},
  "sector": "string",
  "power": "string",
  "savings": "string",
  "duration": "string", 
  "fuel_type": "string",
  "image": "string",
  "description": {"ua": "string", "ru": "string", "en": "string"},
  "featured": "boolean",
  "order": "number",
  "active": "boolean"
}
```

### FAQ
```json
{
  "id": "string",
  "question": {"ua": "string", "ru": "string", "en": "string"},
  "answer": {"ua": "string", "ru": "string", "en": "string"},
  "order": "number",
  "active": "boolean"
}
```

### Lead (заявка)
```json
{
  "id": "string",
  "object_type": "string",
  "area": "number",
  "current_fuel": "string", 
  "needs": ["string"],
  "timeline": "string",
  "name": "string",
  "phone": "string",
  "email": "string", 
  "message": "string",
  "status": "new|in_progress|completed|rejected",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## Миграция от Mock данных

### Текущее состояние:
- Данные в `/frontend/src/mock.js`
- Статический контент

### После миграции:
- Данные в MongoDB
- API для получения/изменения
- Админ-панель для управления

### Изменения в Frontend:
1. Заменить импорты из `mock.js` на API вызовы
2. Добавить loading states
3. Добавить error handling
4. Добавить React Query для кеширования

### Изменения в компонентах:
```javascript
// Было:
import { mockData } from '../mock';
const services = mockData.translations[lang].services.items;

// Станет:
const { data: services, loading } = useQuery('/api/services');
const { t } = useTranslation(); // react-i18next
```

## Админ-панель разделы

### 1. Дашборд
- Статистика заявок
- Последние активности
- Быстрые действия

### 2. Контент
- Основная информация
- Услуги
- Сектора  
- Преимущества
- Решения
- Проекты
- FAQ

### 3. Заявки (CRM)
- Список всех заявок
- Детали заявки
- Изменение статуса
- Экспорт в Excel

### 4. Медиа
- Загрузка изображений 
- Библиотека файлов
- Оптимизация изображений

### 5. Переводы
- Управление UA/RU/EN переводами
- Массовое редактирование

### 6. Настройки
- Контактная информация
- Email настройки
- Общие параметры

## Безопасность

### Аутентификация:
- JWT токены
- Сессии админа
- Защищенные роуты

### Валидация:
- Pydantic модели в FastAPI
- Форм валидация в React
- Санитизация данных

### Файлы:
- Ограничения по размеру/типу
- Защищенная папка uploads
- Проверка на вирусы

## Деплой инструкции

### 1. База данных:
```bash
# Создать коллекции в MongoDB
# Загрузить начальные данные из mock.js
```

### 2. Backend:
```bash
# Установить зависимости
pip install -r requirements.txt

# Запустить сервер
uvicorn server:app --host 0.0.0.0 --port 8001
```

### 3. Frontend:
```bash
# Установить зависимости  
yarn install

# Собрать для продакшена
yarn build
```

### 4. Admin Panel:
```bash
# Отдельная сборка админки
cd admin && yarn build
```

## Окружения

### Разработка:
- Frontend: http://localhost:3000
- Admin: http://localhost:3001  
- Backend: http://localhost:8001

### Продакшен:
- Frontend: https://komfort.city
- Admin: https://admin.komfort.city
- Backend: https://api.komfort.city