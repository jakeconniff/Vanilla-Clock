//global script constants
const bodyStyle = document.querySelector("body").style
const buttonStyle = document.querySelector("button").style
const hourTimer = document.querySelector("#hour")
const minuteTimer = document.querySelector("#minute")
const secondTimer = document.querySelector("#second")
const hours = 1000 * 3600

//global script variables
var noonToday
var midnightToday
var sunriseTime
var sunsetTime
var toggleMode = true

//setting all the clock timings for the current day
function dayReset(){
    //day/night times reset
    let noon = new Date()
    noon.setHours(12,0,0,0)
    noonToday = noon.getTime()

    let midnight = new Date()
    midnight.setHours(24,0,0,0)
    midnightToday = midnight.getTime()

    //sun times reset
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            const lat = position.coords.latitude
            const long = position.coords.longitude
            
            const key = '244c80ce16b21783f5b9730bd651493f'
            const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&cnt=10&appid=${key}`
    
            fetch(apiUrl).then(response=>{
                response.json().then(data=>{
                    sunriseTime = data.sys.sunrise
                    sunsetTime = data.sys.sunset
                })
            })
        }, console.log)
    }
}

//24-hour clock timing
function timeUpdate24(){
    let timing = new Date()
    if(timing === midnightToday)dayReset()
    let currentTime = timing.getTime()
    backgroundSet(currentTime)

    //Simple 24-hour formatting for the clock timing
    secondTimer.innerHTML = (timing.getSeconds()<10) ? "0" + timing.getSeconds() : timing.getSeconds()
    minuteTimer.innerHTML = (timing.getMinutes()<10) ? "0" + timing.getMinutes() : timing.getMinutes()
    hourTimer.innerHTML = (timing.getHours()<10) ? "0" + timing.getHours() : timing.getHours()
}

//12-hour clock timing
function timeUpdate12(){
    let timing = new Date()
    if(timing === midnightToday)dayReset()
    let currentTime = timing.getTime()
    backgroundSet(currentTime)
    
    var hours = timing.getHours()
    if(hours === 0)hours = 12
    else if(hours > 12) hours -= 12

    hourTimer.innerHTML = (hours<10) ? "0" + hours : hours
    secondTimer.innerHTML = (timing.getSeconds()<10) ? "0" + timing.getSeconds() : timing.getSeconds()
    minuteTimer.innerHTML = (timing.getMinutes()<10) ? "0" + timing.getMinutes() : timing.getMinutes()

    if(timing.getHours()>11) secondTimer.innerHTML += 'pm'
    else secondTimer.innerHTML += 'am'
}

//determining clock background color
function backgroundSet(currentTime){
    //sunset colors
    if(currentTime > noonToday) {
        if(currentTime >= sunsetTime){
            let timeDiff = (currentTime - sunsetTime)/hours
            if(timeDiff >2){
                bodyStyle.background = "purple"
                buttonStyle.background = "purple"
            }
            else if(timeDiff > 1){
                bodyStyle.background = "red"
                buttonStyle.background = "red"
            }
            else{
                bodyStyle.background = "orange"
                buttonStyle.background = "orange"
            }
        }
        else{
            let timeDiff = (sunsetTime - currentTime)/hours
            if(timeDiff <= 1 || timeDiff == 0){
                bodyStyle.background = "yellow"
                buttonStyle.background = "yellow"
            }
        }
    }
    //sunrise colors
    else {
        if(currentTime <= sunriseTime){
            let timeDiff = (sunriseTime - currentTime)/hours
            if(timeDiff <= 2){
                bodyStyle.background = "red"
                buttonStyle.background = "red"
            }
            if(timeDiff <= 1){
                bodyStyle.background = "orange"
                buttonStyle.background = "orange"
            }
        }
        else{
            let timeDiff = (currentTime - sunriseTime)/hours
            if(timeDiff > 1){
                bodyStyle.background = "rgb(0, 109, 128)"
                buttonStyle.background = "rgb(0, 109, 128)"
            }
        }
    }
}

//toggle between clocks (24 and 12)
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

//dayReset()
// bodyStyle.background = "purple"
timeUpdate24()
var updating = setInterval(timeUpdate24, 1000)