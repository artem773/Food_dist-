
import { openModal } from "./modal";
import { closeModal } from "./modal";
import { postData } from "../services/services";


function forms(formSelector, modalTimerId){

    ////////////
    /* Forms */
    ///////////

    //что б бекенд работал нужно чістіть кеш после каждоо ізмененія в коде CMD + SHIFT + R

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: './img/form/spinner.svg',
        succes: 'Спасибо! Скоро ми c вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    //отправка на сервер json формата с помощью метода fetch


    function bindPostData(form){

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // убіраем стандартное поведеніе браузера (что би он не перезагружался)

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText =`
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterbegin', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            //отправка на сервер json формата с помощью метода fetch

            postData('http://localhost:3000/requests', json)

            .then(data => {
                console.log(data);
                showThanksModal(message.succes);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    // функція что создает новое окно что сигналізірует о том что данние отправлени на сервер
    function showThanksModal(message){
        const prevModalDialg = document.querySelector('.modal__dialog');

        prevModalDialg.classList.add('hide');
        openModal('.modal', modalTimerId); // откривает модальное окно когда функція визивается 

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `

            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialg.classList.add('show');
            prevModalDialg.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;