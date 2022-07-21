window.addEventListener("load", () => {
  var lon;
  var lat;

  var apiKey = "30b10e22b839e9b3ea31070db4685ebe";

  var temperaturaValore = document.getElementById("temperatura-valore");

  var posizione = document.getElementById("posizione");
  var iconeAnimate = document.getElementById("icone-animate");

  var vento = document.getElementById("vento");
  var umidità = document.getElementById("umidità");
  var percepita = document.getElementById("percepita");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;
      //ubicación actual
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=it&units=metric&appid=${apiKey}`;

      //ubicación por ciudad
      //  const url = `https://api.openweathermap.org/data/2.5/weather?q=Verona&lang=it&units=metric&appid=${apiKey}`

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          let temp = Math.round(data.main.temp);

          temperaturaValore.textContent = `${temp}°c`;

          posizione.textContent = data.name;

          vento.textContent = `${data.wind.speed} km/h`;

          umidità.textContent = `${data.main.humidity}%`;

          var feel = Math.round(data.main.feels_like);
          percepita.textContent = `${feel}°c`;

          //per icone statiche
          //     icon = data.weather[0].icon
          //   const urlIcon = `http://openweathermap.org/img/wn/${icon}.png`
          //   icon.src = urlIcon
          //   console.log(data.weather[0].icon)

          //per icone dinamiche
          switch (data.weather[0].main) {
            case "Thunderstorm":
              iconeAnimate.src = "animated/thunder.svg";

              break;
            case "Drizzle":
              iconeAnimate.src = "animated/rainy-2.svg";

              break;
            case "Rain":
              iconeAnimate.src = "animated/rainy-7.svg";

              break;
            case "Snow":
              iconeAnimate.src = "animated/snowy-6.svg";

              break;
            case "Clear":
              iconeAnimate.src = "animated/day.svg";

              break;
            case "Atmosphere":
              iconeAnimate.src = "animated/weather.svg";

              break;
            case "Clouds":
              iconeAnimate.src = "animated/cloudy-day-1.svg";

              break;
            default:
              iconeAnimate.src = "animated/cloudy-day-1.svg";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
});
