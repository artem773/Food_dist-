
import tabs from './modules/tabs';
import modal from './modules/modal';
import calculator from './modules/calculator';
import cards from './modules/cards';
import timer from './modules/timer';
import slider from './modules/slider';
import forms from './modules/forms';
import { openModal } from './modules/modal';


window.addEventListener('DOMContentLoaded', ()=>{

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000); //откривает модальное окно чз 5 сек после того как юзер зашел на сайт 

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    calculator();
    cards();
    timer('.timer', '2023-12-28');
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        previousArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'

    });

}); 