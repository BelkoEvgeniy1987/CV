/* ----Создаем "стрелки" для переключения предыдущее/следующее фото---- */

let photos = document.querySelector('#photos');

let prev = document.createElement("a");
prev.classList.add('prev');
prev.innerHTML = "&#10094";
photos.appendChild(prev);

let next = document.createElement("a");
next.classList.add('next');
next.innerHTML = "&#10095";
photos.appendChild(next);


prev.addEventListener("click", minusSlide);
next.addEventListener("click", plusSlide);


/*----------------------------------------------------Навигация по слайдеру--------------------------------------------------------------*/

/* Создаем элементы навигации слайдера ( количество кружочков = количеству фото)*/

let sliderDots = document.querySelector('.slider-dots');
let dotsAmount = photos.querySelectorAll('div').length;

for (let i = 1; i <= dotsAmount; i++) {
    let dot = document.createElement("span");
    dot.classList.add('slider-dots_item');
    sliderDots.appendChild(dot);
}

/* -----------Выбираем фотографию по клику по панели навигации под ней (по клику на кружочек)----------- */

let dot = document.querySelectorAll('.slider-dots_item');
let dotsArray = Array.from(dot);
let galleryItems = document.querySelectorAll('.item');
let photoArray = Array.from(galleryItems);

let myIndex = (event) => {
    let result = dotsArray.indexOf(event.target); //получаем индекс кликнутого элемента (кружочек)

    if (result >= 0) {
        showSlide(slideIndex = result)
    }
}
sliderDots.addEventListener("click", myIndex);

/*---------- Индекс слайда по умолчанию -------------*/

let slideIndex = 0;
showSlide(slideIndex);


/* ------------------------------------Переключение между слайдами с помощью стрелок--------------------- */
function plusSlide() {
    showSlide(slideIndex++);
}

function minusSlide() {
    showSlide(slideIndex++);
}

function showSlide(n) {
    slideIndex > (photoArray.length - 1) ? slideIndex = 0 : 1; // переключение с последнего фотографии на первую (при нажатии стрелок)
    slideIndex < 0 ? slideIndex = (photoArray.length - 1) : 1; // переключение с первой фотографии на последнюю (при нажатии стрелок)

    photoArray.forEach(item => item.style.display = "none"); //делаем фотографии не видимыми
    photoArray[slideIndex].style.display = "block"; //делаем фотографию по индексу выбранного кружочка видимымой

    dotsArray.forEach(item => item.classList.remove('active')); //удаляем все классы
    dotsArray[slideIndex].className += " active"; //добавляем класс 'active' нажатому кружочку
}


/* -----------------------------------------Плавная прокрутка --------------------------------------*/

let navLinks = document.querySelectorAll('a.nav-link');

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


/* ------------------------------------------------------------------------------------------------- */

