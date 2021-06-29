const hourTimer = document.querySelector("#hour")
const minuteTimer = document.querySelector("#minute")
const secondTimer = document.querySelector("#second")
var toggleMode = true

function timeUpdate24(){
    let timing = new Date()

    //Simple 24-hour formatting for the clock timing
    secondTimer.innerHTML = (timing.getSeconds()<10) ? "0" + timing.getSeconds() : timing.getSeconds()
    minuteTimer.innerHTML = (timing.getMinutes()<10) ? "0" + timing.getMinutes() : timing.getMinutes()
    hourTimer.innerHTML = (timing.getHours()<10) ? "0" + timing.getHours() : timing.getHours()
}

function timeUpdate12(){
    let timing = new Date()
    var hours = timing.getHours()
    if(hours === 0)hours = 12
    else if(hours > 12) hours -= 12

    hourTimer.innerHTML = (hours<10) ? "0" + hours : hours
    secondTimer.innerHTML = (timing.getSeconds()<10) ? "0" + timing.getSeconds() : timing.getSeconds()
    minuteTimer.innerHTML = (timing.getMinutes()<10) ? "0" + timing.getMinutes() : timing.getMinutes()

    if(timing.getHours()>11) secondTimer.innerHTML += 'pm'
    else secondTimer.innerHTML += 'am'
}

timeUpdate24()
var updating = setInterval(timeUpdate24, 1000)

function switchTimes(){
    clearInterval(updating)
    toggleMode = !toggleMode

    if(toggleMode){
        timeUpdate24()
        console.log('Mode: 24-hour')
    }
    else {
        timeUpdate12()
        console.log('Mode: 24-hour')
    }

    updating = toggleMode ? setInterval(timeUpdate24, 1000) : setInterval(timeUpdate12, 1000)    
}