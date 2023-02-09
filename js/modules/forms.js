function forms(){
    ////////////
    /* Forms */
    ///////////

    //что б бекенд работал нужно чістіть кеш после каждоо ізмененія в коде CMD + SHIFT + R

    const forms = document.querySelectorAll('form');

    const message = {
        loading: './img/form/spinner.svg',
        succes: 'Спасибо! Скоро ми с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    //отправка на сервер json формата с помощью метода fetch

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

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
            }).finnaly(() => {
                form.reset();
            });
        });
    }

    // функція что создает новое окно что сигналізірует о том что данние отправлени на сервер
    function showThanksModal(message){
        const prevModalDialg = document.querySelector('.modal__dialog');

        prevModalDialg.classList.add('hide');
        openModal(); // откривает модальное окно когда функція визивается 

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
            closeModal();
        }, 4000);
    }
}

module.exports = forms;