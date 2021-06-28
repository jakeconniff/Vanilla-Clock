const hourTimer = document.querySelector("#hour")
const minuteTimer = document.querySelector("#minute")
const secondTimer = document.querySelector("#second")

function timeUpdate(){
    const timing = new Date()
    hourTimer.innerHTML = timing.getHours()
    minuteTimer.innerHTML = timing.getMinutes()
    secondTimer.innerHTML = timing.getSeconds()
}

const updating = setInterval(timeUpdate, 1000)

