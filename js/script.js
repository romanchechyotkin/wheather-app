const link = 'http://api.weatherstack.com/current?access_key=f53b140b537e9b3b86281e9afb393703'
const root = document.querySelector('.app')

let store = {
    city: 'Minsk',
    humidity: 0,
    observation_time: "00:00 AM",
    pressure: 0,
    temperature: 0,
    visibility: 0,
    weather_descriptions: '',
}

const fetchData = async () => {
    const result = await fetch(`${link}&query=${store.city}`)
    const data = await result.json()
    
    console.log(data);

    const{
        current: {
            humidity,
            observation_time: observationTime,
            pressure,
            temperature,
            visibility,
            weather_descriptions: weatherDescriptions,
        }
    } = data

    store = {
        ...store,
        humidity,
        observationTime,
        pressure,
        temperature,
        visibility,
        weatherDescriptions
    }

    render()
}


const markup = () => {
    const {
        city, 
        humidity,
        observationTime,
        pressure,
        temperature,
        visibility,
        weatherDescriptions,
    } = store

    return `
            <div class="top morning">
                <div class="left">
                    <div class="city-title">${city}</div>
                    <div class="descriptions">
                        <img class="icon" src="rain.jpg" alt="icon">
                        ${weatherDescriptions}
                    </div>
                    <div class="temprature">${temperature}°C</div>
                </div>
                <div class="right">
                    <div class="time">${observationTime}</div>
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

fetchData()