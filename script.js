//entré a https://home.openweathermap.org/api_keys
//presioné donde dice: api keys y la copié y pegué en la variable api_key.
//busqué en https://openweathermap.org/forecast5#name5 Built-in API request by city name:

let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = 'a3c2813697e072e245f7dde6b6054918'
let difKelvin = 273.15;

let ciudad = 'Londres'

// Traducciones en la parte superior del archivo o módulo
const traduccionesClima = {
  "clear sky": "cielo despejado",
  "few clouds": "pocas nubes",
  "scattered clouds": "nubes dispersas",
  "broken clouds": "nubes rotas",
  "shower rain": "chubascos",
  "rain": "lluvia",
  "thunderstorm": "tormenta eléctrica",
  "snow": "nieve",
  "mist": "niebla"
};

// Tu función que muestra los datos del clima
function mostrarDatosClima(data) {
  const descripcion = data.weather[0].description;
  const descripcionTraducida = traduccionesClima[descripcion] || descripcion;
  
  console.log("Descripción del clima:", descripcionTraducida);

  // Aquí seguirías mostrando otros datos: temperatura, humedad, etc.
}


document.getElementById('botonBusqueda').addEventListener('click', ()=>{
    const ciudad = document.getElementById('ciudadEntrada').value
    if(ciudad) {
        fetchDatosClima(ciudad)
    }
})

function fetchDatosClima(ciudad){
fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`) //'?q' = query(solicitud), '$appid' y '?q' son las propiedades y 'ciudad' y 'api_key' son los valores
    .then(data => data.json())
    .then(data => mostrarDatosClima(data))
}



function mostrarDatosClima(data){
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML = ''


    const ciudadNombre = data.name;
    const paisNombre = data.sys.country;
    const temperatura = data.main.temp;
    const sensTermica = data.main.feels_like;
    const humedad = data.main.humidity;
    const descripcion = data.weather[0].description;
    const descripcionTraducida = traduccionesClima[descripcion] || descripcion;
    const icono = data.weather[0].icon;

    console.log("Descripción del clima:", descripcionTraducida);


    const ciudadTituto = document.createElement('h2');
    ciudadTituto.textContent = `${ciudadNombre}, ${paisNombre}`;

    const temperaturaInfo = document.createElement('p');
    temperaturaInfo.textContent = `Temperatura: ${Math.floor(temperatura - difKelvin)}°C`;

    const SensacionTermica = document.createElement('p');
    SensacionTermica.textContent = `Sensación Térmica: ${Math.floor(sensTermica - difKelvin)}°C`;

    const HumedadInfo = document.createElement('p');
    HumedadInfo.textContent = `Humedad: ${humedad}%`;

    const iconoInfo = document.createElement('img');
    iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`

    const descripcionInfo = document.createElement('p');
    descripcionInfo.textContent = `La descripción meteorológica es: ${descripcionTraducida}`;


    divDatosClima.appendChild(ciudadTituto)
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(SensacionTermica)
    divDatosClima.appendChild(HumedadInfo)
    divDatosClima.appendChild(descripcionInfo)
    divDatosClima.appendChild(iconoInfo)
    

}


