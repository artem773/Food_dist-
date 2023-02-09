
function timer(id, deadLine){
    
    ///////////
    /* TIMER */
    ///////////

    // const deadLine = '2023-12-28'; //нужно что би дата била позже фактіческой (как в реальном дедлайне)

    function getTimeRemainig(endtime){

        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); //разніца между дедлайном і текущей датой (в міллісекундах)

        if(t <= 0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }else{
            days = Math.floor(t / (1000 * 60 * 60 * 24)),  //дні в міллісек
              hours = Math.floor((t / (1000 * 60 * 60) % 24)), //часи в міллісек....
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        }
              
        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); //обновляет таймер каждую секунду

        updateClock();

        function updateClock(){
            const t = getTimeRemainig(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }   
    } 

    setClock(id, deadLine);
}

export default timer;