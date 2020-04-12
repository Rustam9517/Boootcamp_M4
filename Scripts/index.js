import '../scss/style.scss'

const currenciesValuesFirst = document.querySelectorAll('.first-list > input');
const currenciesValuesSecond = document.querySelectorAll('.second-list > input');
let selectBlockFirst = document.querySelector('.first-values');
let selectBlockSecond = document.querySelector('.second-values');
const selectValuesFirst = document.querySelectorAll('.first-values > option');
const selectValuesSecond = document.querySelectorAll('.second-values > option');
const firstCurrency = document.querySelector('.val-input-first');
const secondCurrency = document.querySelector('.val-input-second');
const loading = document.querySelector('.loading');
const firstSpan = document.querySelector('.first-val');
const secondSpan = document.querySelector('.second-val');
const changeButton = document.querySelector('.arrows');
let isPending = true;
let first;
let second;
let rate;
let current;
let currentSecond;
//Функция берет значения левой выбранной валюты и считает его правое поле ввода
function inputOnclick(e){
    e.preventDefault();
    currenciesValuesFirst.forEach(el =>{
        el.classList.remove('active');
    });
    if(!e.target.classList.contains('active')) {
        e.target.classList.add('active');
        selectBlockFirst.classList.remove('active');
    }
    else e.target.classList.remove('active');
    checkValue();
    countFirst();
}

//Функция берет значение правой выбранной валюты и меняет его относительно левого поля
function inputOnclickSecond (e){
    e.preventDefault();
    currenciesValuesSecond.forEach(el =>{
        el.classList.remove('active');
    });
    if(!e.target.classList.contains('active')) {
        e.target.classList.add('active');
        selectBlockSecond.classList.remove('active');
    }
    else e.target.classList.remove('active');
    checkValue();
    countFirst();
}

//Выбор дополнительных валют из списка и пересчет в правое поле ввода
const selectOnChange = ()=> {
    selectBlockFirst.classList.add('active');
    selectValuesFirst.forEach(el => {
        el.style.backgroundColor = 'white';
    });
    currenciesValuesFirst.forEach(el =>{
        el.classList.remove('active');
    });
    checkValue();
    countFirst();
};

//Выбор дополнительных валют из списка и пересчет в левое поле ввода относительно левого поля
const selectOnChangeSecond = ()=> {
    selectBlockSecond.classList.add('active');
    selectValuesSecond.forEach(el => {
        el.style.backgroundColor = 'white';
    });
    currenciesValuesSecond.forEach(el =>{
        el.classList.remove('active');
    });
    checkValue();
    countFirst();
};

// Проверяет выбранные валюты и берет их значение
function checkValue() {
    currenciesValuesFirst.forEach(el =>{
        if(selectBlockFirst.classList.contains('active'))first = selectBlockFirst.value;
        else if(el.classList.contains('active')){
            first = el.value;

        }
    });
    currenciesValuesSecond.forEach(el =>{
        if(selectBlockSecond.classList.contains('active'))second = selectBlockSecond.value;
        else if(el.classList.contains('active')){
            second = el.value;
        }
    });
}

// На основе функции checkValue() поставляет правильные валюты в запрос на сервер считает его и возвращает ответ в нужное поле
function fetchInfo (input) {
    let current = fetch(`https://api.ratesapi.io/api/latest?base=${first}&symbols=${second}`);
    if(isPending===true) loading.style.display='flex';
    else loading.style.display='none';
    current
        .then(result=> {
            isPending=false;
            if (result.status===200) return result.json();
        })
        .then(result =>  {
            rate = result.rates[Object.keys(result.rates)[0]];
            if(input.classList.contains('val-input-second')) input.value = (firstCurrency.value*rate).toFixed(4);
            if(input.classList.contains('val-input-first')) input.value = (firstCurrency.value/rate).toFixed(4);
            firstSpan.innerHTML = `1 ${first} = ${rate.toFixed(4)} ${second}`;
            let currentForSecond = fetch(`https://api.ratesapi.io/api/latest?base=${second}&symbols=${first}`);
            currentForSecond.then(result=> result.json())
                .then(
                    result =>{
                        rate = result.rates[Object.keys(result.rates)[0]];
                        secondSpan.innerHTML = `1 ${second} = ${rate.toFixed(4)} ${first}`;
                    }
                );
        });
}

// Функция для обработки ввода берет введеное значение и пересчитывает его правильно
function countFirstCurrency(e){
    checkValue();
    secondCurrency.value=e.target.value;
    countFirst();
}

// Функция для обработки ввода берет введеное значение и пересчитывает его правильно
function countSecondCurrency(e){
    checkValue();
    firstCurrency.value=e.target.value;
    countSecond();
}

//Функция пересчитывающая валюту по клику на меню валют правого блока
function countFirst(){
    checkValue();
    if(first===second){
        secondCurrency.value =firstCurrency.value;
        firstSpan.innerHTML = `1 ${first} = 1 ${second}`;
        secondSpan.innerHTML = `1 ${second} = 1 ${first}`
    }
    else {
        if(firstCurrency.value==='' || second==undefined)checkValue();
        else{
            fetchInfo(secondCurrency);
        }
    }
}

//Функция пересчитывающая валюту по клику на меню валют левого блока
function countSecond(){
    checkValue();
    if(first===second){
        firstCurrency.value=secondCurrency.value ;
        firstSpan.innerHTML = `1 ${first} = 1 ${second}`;
        secondSpan.innerHTML = `1 ${second} = 1 ${first}`
    }
    else {
        if(firstCurrency.value==='' || second==undefined)checkValue();
        else{
            console.log('hi');
            fetchInfo(firstCurrency);
        }
    }
}

//Функция меняющая местами значение валют и пересчитывающая его
function changePlace (e){
    e.preventDefault();
    if(selectBlockFirst.classList.contains('active') && selectBlockSecond.classList.contains('active')){
        let temp;
        temp = selectBlockSecond.value;
        selectBlockSecond.value = selectBlockFirst.value;
        selectBlockFirst.value = temp;
    }
    else {
        currenciesValuesFirst.forEach((el) =>{
            if(el.classList.contains('active')){
                current=el.value;
            }
            if(selectBlockFirst.classList.contains('active')){
                current = '';
            }
        });
        currenciesValuesSecond.forEach(second =>{
            if(second.classList.contains('active')){
                currentSecond= second.value;
            }
            if(selectBlockSecond.classList.contains('active')){
                currentSecond = '';
            }
        });
        currenciesValuesFirst.forEach(el=>{
            el.classList.remove('active');
            if(selectBlockSecond.classList.contains('active') && currentSecond === ''){
                selectBlockFirst.value = selectBlockSecond.value;
                selectBlockFirst.classList.add('active');
                selectBlockSecond.classList.remove('active');
                selectValuesFirst.forEach(el => {
                    el.style.backgroundColor = 'white';
                });
            }
            if(el.value===currentSecond){
                el.classList.add('active');
            }
        });
        currenciesValuesSecond.forEach(el=>{
            el.classList.remove('active');
            if(selectBlockFirst.classList.contains('active') && current === ''){
                selectBlockSecond.value = selectBlockFirst.value;
                selectBlockSecond.classList.add('active');
                selectBlockFirst.classList.remove('active');
                selectValuesSecond.forEach(el => {
                    el.style.backgroundColor = 'white';
                });
            }
            if(el.value===current){
                el.classList.add('active');
            }

        });
    }

    checkValue();
    countFirst();
}



changeButton.addEventListener('click',changePlace);
currenciesValuesFirst.forEach( el => {el.addEventListener('click',inputOnclick);});
currenciesValuesSecond.forEach( el => {el.addEventListener('click',inputOnclickSecond);});
selectBlockFirst.addEventListener('change',selectOnChange);
selectBlockSecond.addEventListener('change',selectOnChangeSecond);
firstCurrency.addEventListener('input',countFirstCurrency);
secondCurrency.addEventListener('input',countSecondCurrency);
