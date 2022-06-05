let store = {
    city: 'Minsk',
    humidity: 0,
    pressure: 0,
    temperature: 0,
    visibility: 0,
    weather_descriptions: '',
}

const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${store.city}&appid=c56a5d8b64c3562162d45f98a120efa8`
const timeLink = 'http://worldtimeapi.org/api/timezone/Europe/'
const root = document.querySelector('.app')

const fetchData = async () => {
    const weatherResult = await fetch(weatherLink)
    const timeResult = await fetch(`${timeLink}` + `${store.city}`)

    const weatherData = await weatherResult.json()
    const timeData = await timeResult.json()
    
    console.log(weatherData);

    const{
        visibility,
        main: {
            humidity,
            pressure,
            temp,
        }
    } = weatherData

    const{
        datetime: dateTime
    } = timeData

    store = {
        ...store,
        humidity,
        pressure,
        temp,
        visibility,
        dateTime    
    }

    render()
}


const markup = () => {
    const {
        city, 
        humidity,
        dateTime,
        pressure,
        temp,
        visibility,
    } = store

    return `
            <div class="top ${getBg(cutTime(dateTime))}">
                <div class="left">
                    <div class="city-title">${city}</div>
                    <div class="descriptions">
                        <img class="icon" src="rain.jpg" alt="icon">
                        
                    </div>
                    <div class="temprature">${translateTemp(temp)}°C</div>
                </div>
                <div class="right">
                    <div class="time">${cutTime(dateTime)}</div>
                </div>
            </div>

            <div class="bottom">
                <div class="humidity section-block">
                    <img class="humidity-icon" src="rain.jpg" alt="icon">
                    humidity
                    ${humidity}
                </div>
                <div class="pressure section-block">
                    <img class="pressure-icon" src="rain.jpg" alt="icon">
                    pressure
                    ${pressure}
                </div>
                <div class="visibility section-block">
                    <img class="visibility-icon" src="rain.jpg" alt="icon">
                    visibility
                    ${visibility}
                </div>
            </div>`
}

const render = () => {
    root.innerHTML = markup()
}
const cutTime = time => {
    time = time.slice(11, 16)
    return time
}
const translateTemp = (temp) => {
    temp = Math.round(temp - 273.15)
    return temp
}
const getBg = (time) => {
    let hour = time.slice(0, 2)
    let num = Number(hour)
    if(num >= 6 && num <= 9){
        return 'morning'
    }else if(num >= 10 && num <= 16){
        return 'day'
    }else if(num >= 17 && num <= 22){
        return 'evening'
    }else{
        return 'night'
    }
}

fetchData()