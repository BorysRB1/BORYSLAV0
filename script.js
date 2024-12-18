const slidesData = [
    [
        { img: "golovna/img/kg.jpg", text: "1 kg потужності - 76₴" },
        { img: "golovna/img/baykal.jpg", text: "Байкал - 40₴" },
        { img: "golovna/img/kvas_yarylo.jpg", text: "Квас Ярило - 35₴" }
    ],
    [
        { img: "golovna/img/Медальйони з свинини.jpg", text: "Медальйони з свинини - 245₴" },
        { img: "golovna/img/Салат з філе лосося та манго.jpg", text: "Салат з філе лосося та манго - 330₴" },
        { img: "golovna/img/Хвости королівських креветок у сухарях.jpg", text: "Хвости королівських креветок у сухарях - 320₴" }
    ],
    [
        { img: "golovna/img/Бургер з картоплею.jpg", text: "Бургер з картоплею - 240₴" },
        { img: "golovna/img/Картопля Фрі.jpg", text: "Картопля Фрі - 95₴" },
        { img: "golovna/img/Піца “4 сири”.jpg", text: "Піца “4 сири” - 330₴" }
    ]
];

let slideIndex = 0;

// Функція для визначення кількості видимих слайдів
function getVisibleSlides() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
}

// Функція для відображення слайдів
function showSlides() {
    const slider = document.getElementById('slider');
    slider.innerHTML = ''; // Очистка попередніх слайдів

    const visibleSlides = getVisibleSlides(); // Кількість видимих слайдів
    const currentSlides = slidesData[slideIndex].slice(0, visibleSlides);

    currentSlides.forEach(slide => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('slide');
        slideElement.innerHTML = `<img src="${slide.img}" alt="Dish"><p>${slide.text}</p>`;
        slider.appendChild(slideElement);
    });
}

// Оновлення слайдів при зміні розміру вікна
window.addEventListener('resize', showSlides);

// Переміщення по слайдах
document.querySelector('.left-arrow').addEventListener('click', () => {
    slideIndex = (slideIndex > 0) ? slideIndex - 1 : slidesData.length - 1;
    showSlides();
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    slideIndex = (slideIndex < slidesData.length - 1) ? slideIndex + 1 : 0;
    showSlides();
});

// Початкове відображення слайдів
showSlides();


// Функція відкриття модального вікна
function openModal() {
    const modal = document.getElementById('order-modal');
    const overlay = document.getElementById('modal-overlay');
    modal.classList.add('visible');
    overlay.classList.add('visible');
}

// Функція закриття модального вікна
function closeModal() {
    const modal = document.getElementById('order-modal');
    const overlay = document.getElementById('modal-overlay');
    modal.classList.remove('visible');
    overlay.classList.remove('visible');
}

// Дані для кожної категорії
const menuData = {
    water: [
        { name: "Мінеральна вода", price: 20 },
        { name: "Газована вода", price: 15 },
        { name: "Лимонна вода", price: 25 },
        { name: "Апельсинова вода", price: 30 },
        { name: "М'ятна вода", price: 35 },
        { name: "Лід з водою", price: 10 },
        { name: "Кокосова вода", price: 50 },
        { name: "Солодка вода", price: 40 },
        { name: "Тонік", price: 45 },
    ],
    restaurant: [
        { name: "Салат Цезар", price: 120 },
        { name: "Бургер", price: 150 },
        { name: "Суп", price: 90 },
        { name: "Стейк", price: 250 },
        { name: "Піца", price: 200 },
        { name: "Паста", price: 180 },
        { name: "Суші", price: 220 },
        { name: "Тартар", price: 300 },
        { name: "Десерт", price: 100 },
    ],
    snack: [
        { name: "Чіпси", price: 30 },
        { name: "Сухарики", price: 25 },
        { name: "Горішки", price: 40 },
        { name: "Кукурудза", price: 35 },
        { name: "Печиво", price: 50 },
        { name: "Шоколад", price: 70 },
        { name: "Круасан", price: 80 },
        { name: "Булочка", price: 60 },
        { name: "Фрукти", price: 100 },
    ]
};


// Оновлення підсумку замовлення
function updateOrder() {
    const selectedItems = document.querySelectorAll("#menu-list input:checked");
    const orderSummary = document.getElementById("selected-items");
    const totalPriceElement = document.getElementById("total-price");

    orderSummary.innerHTML = ""; // Очистити попередній підсумок
    let totalPrice = 0;

    selectedItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerText = `${item.dataset.name} - ${item.dataset.price} грн`;
        orderSummary.appendChild(listItem);

        totalPrice += parseFloat(item.dataset.price);
    });

    totalPriceElement.innerText = `Загальна вартість: ${totalPrice} грн`;
}

// Оновлення меню страв
function updateMenu(selectElement) {
    const category = selectElement.value; // Отримати вибрану категорію
    const menuList = document.getElementById("menu-list"); // Отримати контейнер меню
    menuList.innerHTML = ""; // Очистити попереднє меню

    if (category && menuData[category]) {
        const items = menuData[category]; // Отримати дані для обраної категорії
        items.forEach((item, index) => {
            // Створення контейнера для страви
            const itemDiv = document.createElement("div");
            itemDiv.className = "menu-item";

            // Створення чекбоксу
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `item-${index}`;
            checkbox.dataset.name = item.name;
            checkbox.dataset.price = item.price;
            checkbox.onchange = updateOrder;

            // Створення мітки для чекбоксу
            const label = document.createElement("label");
            label.htmlFor = `item-${index}`;
            label.innerText = `${item.name} - ${item.price} грн`;

            // Додавання елементів до контейнера
            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);

            // Додавання страви до списку
            menuList.appendChild(itemDiv);
        });
    } else {
        // Якщо категорія не вибрана або немає даних
        console.log(`Категорія ${category} не знайдена`);
        menuList.innerHTML = "<p>Немає доступних страв у цій категорії.</p>";
    }
}

// Масив для збереження вибраних страв
let selectedItems = [];

// Універсальна функція для оновлення меню
function updateMenu(selectElement) {
    const category = selectElement.value; // Отримуємо вибрану категорію
    const menuList = document.getElementById("menu-list");
    menuList.innerHTML = ""; // Очистка попереднього вмісту

    if (menuData[category]) {
        menuData[category].forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "menu-item";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `item-${index}`;
            checkbox.dataset.name = item.name;
            checkbox.dataset.price = item.price;
            checkbox.checked = selectedItems.some(i => i.name === item.name); // Встановлюємо галочку, якщо страва вже вибрана
            checkbox.onchange = () => toggleItemSelection(item);

            const label = document.createElement("label");
            label.htmlFor = `item-${index}`;
            label.innerText = `${item.name} - ${item.price} грн`;

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            menuList.appendChild(itemDiv);
        });
    } else {
        console.log(`Категорія ${category} не знайдена`);
    }
}

// Функція для додавання/видалення страви з вибору
function toggleItemSelection(item) {
    const index = selectedItems.findIndex(i => i.name === item.name);
    if (index === -1) {
        selectedItems.push(item); // Додаємо страву в вибір
    } else {
        selectedItems.splice(index, 1); // Видаляємо страву з вибору
    }

    updateOrder(); // Оновлюємо підсумок замовлення
}

// Оновлення замовлення
function updateOrder() {
    const orderSummary = document.getElementById("selected-items");
    const totalPriceElement = document.getElementById("total-price");

    orderSummary.innerHTML = ""; // Очистка списку замовлення
    let totalPrice = 0;

    selectedItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerText = `${item.name} - ${item.price} грн`;
        orderSummary.appendChild(listItem);

        totalPrice += parseFloat(item.price);
    });

    totalPriceElement.innerText = `Загальна вартість: ${totalPrice} грн`;
}

function submitOrder(event) {
    event.preventDefault(); // Запобігає перезавантаженню сторінки
    alert("Успішно замовлено"); // Виводить повідомлення
    closeModal(); // Закриває модальне вікно (опціонально)
}

