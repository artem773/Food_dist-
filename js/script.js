window.addEventListener('DOMContentLoaded', ()=>{

    const tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          calculator = require('./modules/calculator'),
          classes = require('./modules/classes'),
          timer = require('./modules/timer'),
          slider = require('./modules/slider'),
          forms = require('./modules/forms');


    tabs();
    modal();
    calculator();
    classes();
    timer();
    slider();
    forms();

}); 