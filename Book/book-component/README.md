# 3D Book Scroll Animation Component

Полностью готовый компонент для интеграции в ваш проект.

## 📁 Структура файлов

```
book-component/
├── book-3d.html      # HTML структура компонента
├── book-3d.css       # Стили и анимации
├── book-3d.js        # Логика прокрутки
└── README.md         # Этот файл
```

## 🚀 Как добавить в ваш проект

### Вариант 1: Копировать файлы
1. Скопируйте папку `book-component` в ваш проект
2. В главный HTML файл добавьте:
```html
<link rel="stylesheet" href="book-component/book-3d.css">
```

3. В конец `<body>` добавьте:
```html
<!-- Ваше содержимое ДО компонента -->

<!-- Компонент 3D книги -->
<section class="book-scroll-track theme-light" id="book-section">
    <div class="sticky-viewport">
        <div class="writing-table"><div class="spotlight"></div></div>
        
        <div class="dust-container">
            <div class="dust dust-1"></div>
            <div class="dust dust-2"></div>
            <div class="dust dust-3"></div>
        </div>

        <div class="scene-3d">
            <div class="ancient-book">
                <div class="book-cover left-back-cover" style="background-image: url('...')"></div>
                <div class="book-cover right-back-cover"></div>
                
                <!-- Остальные элементы из book-3d.html -->
            </div>
        </div>
    </div>
</section>

<script src="book-component/book-3d.js"></script>
```

### Вариант 2: Использовать как отдельный модуль
```javascript
// В вашем главном JavaScript файле
import './book-component/book-3d.js';
```

## ⚙️ Настройки

### Изменение логотипа
В `book-3d.html` найдите:
```html
<div class="book-cover left-back-cover" style="background-image: url('...')"></div>
```

Замените SVG на ваш логотип:
- URL изображения: `url('/path/to/logo.png')`
- Встроенный SVG: `url('data:image/svg+xml;utf8,...')`

### Изменение текста
Отредактируйте текст в `.static-page` секциях:
```html
<div class="ink-content">
    <span class="drop-cap">I</span>
    <h2>Ваш заголовок</h2>
    <p>Ваш текст</p>
</div>
```

### Цветовые схемы
- Светлая тема: `theme-light` ✓
- Тёмная тема: `theme-dark`

Измените в `<section>`:
```html
<section class="book-scroll-track theme-dark" id="book-section">
```

## 📱 Отзывчивость

Компонент полностью адаптивен и работает на:
- 📺 Desktop (1024px+)
- 📱 Tablet (600px - 1024px)
- 📱 Mobile (<600px)

## 🎨 Кастомизация стилей

Все основные цвета и размеры находятся в `book-3d.css`:

```css
/* Цвет фона обложки */
background: linear-gradient(135deg, #4a2810 0%, #2a1508 50%, #1a0a03 100%);

/* Цвет границы */
border: 5px solid #c59b27;

/* Размер книги */
max-width: 960px;
aspect-ratio: 960/620;
```

## 🎬 Анимация прокрутки

Анимация управляется CSS переменной `--scroll-progress`:
- `0` - книга закрыта
- `0.5` - книга полностью открыта
- `1` - завершена анимация

Измените скорость в `.ancient-book`:
```css
transform: rotateX(calc(25deg - (var(--scroll-progress) * 20deg)))
```

## 📋 Требования

- Современный браузер с поддержкой:
  - CSS 3D Transforms
  - CSS Custom Properties
  - ES6 JavaScript

## 🔧 Поддержка

Если возникли проблемы:
1. Убедитесь, что CSS загружается корректно
2. Проверьте консоль браузера на ошибки
3. Используйте инструменты разработчика для отладки

## 📝 Лицензия

Свободно используйте в своих проектах!
