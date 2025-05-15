const apikey = "78969c8adcd1110ce195d39facf4121c"; 

function getweather() {
  const city = document.getElementById("cityinput").value;
  if (!city) return alert("Please enter a city name");
  fetchweatherdata(city);
}

function fetchweatherdata(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayforecast(data))
    .catch(() => alert("Could not fetch data. Please check the city name or try again some other time."));
}

function getlocationweather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
      fetch(url)
        .then(res => res.json())
        .then(data => displayforecast(data));
    }, () => {
      alert("Unable to retrieve your location.");
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function displayforecast(data) {
  const forecastEl = document.getElementById("forecast");
  forecastEl.innerHTML = `<h2>Weather in ${data.city.name}</h2>`;
  for (let i = 0; i < 5; i++) {
    const info = data.list[i * 8]; 
    const date = new Date(info.dt_txt).toDateString();
    const description = info.weather[0].description;
    const temp = info.main.temp;
    const icon = info.weather[0].icon;
    forecastEl.innerHTML += `
      <div class="weather-box">
        <h3>${date}</h3>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
        <p>${description}</p>
        <p>Temp: ${temp}°C</p>
      </div>
    `;
  }
}