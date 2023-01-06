let modal = document.querySelector('.modal')
let weatherContainer = document.querySelector(".weather-container")

function showPosition(position) {
    let lat = position.coords.latitude 
    let lon = position.coords.longitude 
    let apiKey = '00fa0f9e0d1da4a50d8227de70d25795'
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  
    fetch(endpoint)
    .then((response) => {
  
        return response.json()
    })
    .then((data) => {

        let temperature = data.main.temp-273.15
        let feelsLike = data.main.feels_like-273.15
        let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
        let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString()
        let otherDetails = document.querySelector('.other-details')

        otherDetails.style.display = 'inline-block'

        let location = document.querySelector('.location')
        let weather = document.querySelector('.weather-description')
        let weatherImgContainer = document.querySelector('.weather-img')
        let temContainer = document.querySelector('.temperature')
        let feelsLikeContainer = document.querySelector('.feels-like')
        let humidityContainer = document.querySelector('.humidity')
        let sunriseContainer = document.querySelector('.sunrise')
        let sunsetContainer = document.querySelector('.sunset')
    
        location.innerHTML = `<strong>${data.name.toUpperCase()}</strong>`
        weather.textContent = `${data.weather[0].description.toUpperCase()}`
        weatherImgContainer.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        temContainer.innerHTML = `${temperature.toFixed(2)}<sup>o</sup>C`
        feelsLikeContainer.innerHTML = `${feelsLike.toFixed(2)}<sup>o</sup>C`
        humidityContainer.innerHTML = `${data.main.humidity}%`
        sunriseContainer.textContent = sunrise
        sunsetContainer.textContent = sunset

        console.log(data);
      
    })
}

document.querySelector(".ok").addEventListener('click', (event) => {

    modal.style.display = "none"
    weatherContainer.style.display = "inline-block"
    if (navigator.geolocation){

        navigator.geolocation.watchPosition(
        // Success function
        showPosition, 
        // Error function
        null, 
        // Options
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    
    
    }else{ 
        alert("Geolocation is not supported by this browser.")
    }

})








