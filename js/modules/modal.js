function modal(){
    ///////////
    /* Modal */
    ///////////

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; //убірает прокрутку когда окно открито
        clearInterval(modalTimerId);
    }
    
    modalTrigger.forEach(btn=>{
        btn.addEventListener('click', ()=>{
             openModal();
        });
    });
    

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //добавляет прокрутку когда окно закрито
    }

    

    modal.addEventListener('click', (e)=>{
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    
    const modalTimerId = setTimeout(openModal, 50000); //откривает модальное окно чз 5 сек после того как юзер зашел на сайт 

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){ //окно будет появляться не доходя до последнего пікселя монітора(-1);
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;