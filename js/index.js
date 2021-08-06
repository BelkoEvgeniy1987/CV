

/* ----------------------Создаем слайдер-----------------*/


// Создаем панель навигации и вставляем под фотографиями

// создаем контейнер для элементов навигации */
let divForDots = document.createElement("div");

//вставляем контейнер после фото*/
let sliderDots = document.querySelector('#main__inner');
sliderDots.appendChild(divForDots);

//добавляем ему класс 
divForDots.classList.add('dots__container');


// количество элементов навигации равно количеству фото
// создаем элементы навигации и вставляем в контейнер
let dotsAmount = sliderDots.querySelectorAll('img').length;

for (let i = 1; i <= dotsAmount; i++) {
    let dot = document.createElement("span");
    dot.classList.add('dots');
    divForDots.appendChild(dot);
}
/*-----------------------------------------------------*/

let dot = document.querySelectorAll('.dots');
let dotsArray = Array.from(dot);

let photo = document.querySelectorAll('.main__inner img');
let photoArray = Array.from(photo);


//отслеживаем клик по элементам навигации
//при клике на элемент - отображаем фото с соответствующим индексом
let myIndex = (event) => {
    let result = dotsArray.indexOf(event.target);

    if (result >= 0) {
        showSlide(slideIndex = result)
    }
}
sliderDots.addEventListener("click", myIndex);


//отслеживаем клик по фото
//при клике на фото - отображаем следующее фото
let nextPhoto = (event) => {
    if ((event.target).className === "main__inner-item") {
        plusSlide()
    }
}
sliderDots.addEventListener("click", nextPhoto);



// индекс фото по умолчанию
let slideIndex = 0;

//показать фото
showSlide(slideIndex);

//показать следующее фото
function plusSlide() {
    showSlide(slideIndex++);
}



function showSlide(n) {
    // переключение с последней фотографии на первую 
    slideIndex > (photoArray.length - 1) ? slideIndex = 0 : 1;

    //делаем фотографии не видимыми
    photoArray.forEach(item => item.style.display = "none");

    //показываем фото по кликнутому элементу навигации
    photoArray[slideIndex].style.display = "block";

    //удаляем все классы
    dotsArray.forEach(item => item.classList.remove('dots__active'));

    //добавляем класс 'active' нажатому кружочку
    dotsArray[slideIndex].className += " dots__active";
}


/* -----------------Плавная прокрутка----------------- */

let navLinks = document.querySelectorAll('.nav-link');

for (let item of navLinks) {
    item.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = item.getAttribute('href')

        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

