// Утилиты для работы с DOM
const toggleClass = (element, className) => {
    element.classList.toggle(className);
};

const removeClass = (element, className) => {
    element.classList.remove(className);
};

const addClass = (element, className) => {
    element.classList.add(className);
};

// Обработчики событий
const handleButtonClick = (button, caret, list) => {
    toggleClass(button, "dropdown__button--clicked");
    toggleClass(caret, "dropdown__caret--rotate");
    toggleClass(list, "dropdown__list--open");
};

const handleOptionClick = (option, selected, dropdown, dropdowns, title, button, caret, list, options) => {
    selected.innerText = option.innerText;
    removeClass(button, "dropdown__button--clicked");
    removeClass(caret, "dropdown__caret--rotate");
    removeClass(list, "dropdown__list--open");
    options.forEach(o => removeClass(o, "dropdown__item--active"));
    addClass(option, "dropdown__item--active");
    if (dropdown === dropdowns[0]) {
        title.innerText = option.getAttribute("data-value");
    } else {
        console.log(option.innerText);
        alert(option.innerText.trim());
    }
};

const handleDocumentClick = (dropdown, event, list, caret) => {
    if (!dropdown.contains(event.target)) {
        removeClass(list, "dropdown__list--open");
        removeClass(caret, "dropdown__caret--rotate");
    }
};

const handleDocumentKeyDown = (event, list, caret) => {
    if (event.key === "Tab" || event.key === "Escape") {
        removeClass(list, "dropdown__list--open");
        removeClass(caret, "dropdown__caret--rotate");
    }
};

const handleTabKey = (button, event) => {
    if (event.key === "Tab") {
        addClass(button, "tab");
    }
};

const handleMouseDown = (button) => {
    removeClass(button, "tab");
};

const handleButtonFocus = (button, event) => {
    if (button.classList.contains("tab")) {
        addClass(event.target, "dropdown__button--focus");
    }
};

const handleButtonFocusOut = (button, event) => {
    removeClass(event.target, "dropdown__button--focus");
    removeClass(button, "tab"); 
};

// Инициализация dropdown
const initDropdown = (dropdown, dropdowns, title) => {
    const button = dropdown.querySelector(".dropdown__button");
    const caret = dropdown.querySelector(".dropdown__caret");
    const list = dropdown.querySelector(".dropdown__list");
    const options = dropdown.querySelectorAll(".dropdown__item");
    const selected = dropdown.querySelector(".dropdown__selected");

    button.addEventListener("click", () => handleButtonClick(button, caret, list));
    options.forEach(option => {
        option.addEventListener("click", () => handleOptionClick(option, selected, dropdown, dropdowns, title, button, caret, list, options));
    });
    document.addEventListener("click", event => handleDocumentClick(dropdown, event, list, caret));
    document.addEventListener("keydown", event => handleDocumentKeyDown(event, list, caret));
    document.addEventListener("keydown", event => handleTabKey(button, event));
    document.addEventListener("mousedown", () => handleMouseDown(button));
    button.addEventListener("focus", event => handleButtonFocus(button, event));
    button.addEventListener("focusout", event => handleButtonFocusOut(button, event));
};

// Получаем элементы и инициализируем каждый dropdown
const dropdowns = document.querySelectorAll(".dropdown");
const title = document.querySelector(".content__title");
dropdowns.forEach(dropdown => initDropdown(dropdown, dropdowns, title));
