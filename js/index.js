
/*---------------------- погода -------------------------*/

let weatherWrapper = document.querySelector(".kharkiv-weather");

// создаем DIV для названия города
let city = document.createElement('div');
city.classList.add('city');
weatherWrapper.appendChild(city);

// создаем DIV для температуры воздуха
let temperature = document.createElement('div');
temperature.classList.add('temperature');
weatherWrapper.appendChild(temperature);

// создаем DIV для погодных условий
let weather = document.createElement('div');
weather.classList.add('weather');
weatherWrapper.appendChild(weather);

// создаем DIV для картинки, соответствующей погоде
let weatherImg = document.createElement('div');
weatherImg.classList.add('weatherImg');
weatherWrapper.appendChild(weatherImg);


fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kharkiv&appid=16270f06eb77a549e4824d01f4278238`)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)

        //город
        document.querySelector('.city').textContent = data.name;

        //температура (округляем в большую сторону), переводим из градусов Келвина в градусы Цельсия
        let temp = Math.ceil((data.main.temp) - 273);
        document.querySelector('.temperature').innerHTML = temp + '&deg';
        //в конце - добавляем символ "градус"

        //состояние погоды
        let weather = data.weather[0]['description'];
        document.querySelector('.weather').textContent = weather;

        //вызываем функцию для определения соответсвующей img
        imgForWeather(temp)
    })



//функция присваивания соответсвующей погоды img  
function imgForWeather(temp) {
    let img;

    if ((weather.textContent === "drizzle") || (weather.textContent.includes("rain")) || (weather.textContent === "thunderstorm")) {
        img = '<img src="img/Дождь.png" alt="дождь">';
    } else if (weather.textContent === "snow") {
        img = '<img src="img/Снег.png" alt="снег">';
    } else if ((weather.textContent === `clear sky`) && (temp >= "30")) {
        img = '<img src="img/Жара.png" alt="жара">';
    } else if ((weather.textContent === "clear sky") && (temp <= "0")) {
        img = '<img src="img/Минус.png" alt="мороз">';
    } else if (weather.textContent === `clear sky`) {
        img = '<img src="img/Солнечно.png" alt="солнечно">';
    } else if (weather.textContent.includes('clouds')) {
        img = '<img src="img/Облачно.png" alt="облачно">';
    }
    //соответствующая погоде img
    document.querySelector('.weatherImg').innerHTML = img;
}


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

