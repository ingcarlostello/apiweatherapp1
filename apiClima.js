let api = "http://api.openweathermap.org/data/2.5/weather?q=";
let apiKey = "&APPID=068e433d997abd16266f20079d3504ed";
let units = "&units=metric";
let language = "&lang=es";

let enter = document.getElementById("city");
const boton = document.getElementById("enviar");

const modal = document.getElementById("myModal");
const buttonModal = document.getElementById("botonModal");

/******************************************************************* /FUNCTIONS/ **********************************************************/
let teclaEnter = e => {
  if (e.keyCode === 13) {
    clima();
    enter.value = "";
  }
};

async function clima() {
  try {
    if (
      document
        .getElementById("cardBody")
        .className.match(/(?:^|\s)fadeIn animated(?!\S)/)
    ) {
      document.getElementById("cardBody").className = document
        .getElementById("cardBody")
        .className.replace(/(?:^|\s)fadeIn animated(?!\S)/g, "");
    }

    let city = enter.value;
    let url = api + city + apiKey + units;
    let res = await fetch(url);

    let data = await res.json();
    //console.log(data);
    if (data.cod == 404) {
      //boton.setAttribute("data-toggle", "modal");
      boton.dataset.target = "#myModal";
    } else {
      let country = await data.sys.country;
      let description = await data.weather[0].description;
      let icono = await data.weather[0].icon;
      let imagen = `http://openweathermap.org/img/wn/${icono}@2x.png`;
      let flag = await data.sys.country.toLowerCase();
      let outPut = `http://openweathermap.org/images/flags/${flag}.png`;
      let cel = Math.round(data.main.temp); // toFixed(1) es usado para mostrar solo 1 decimal

      document.getElementById("cardBody").classList.add("fadeIn", "animated");
      document.getElementById("title").innerHTML = data.name;
      document.getElementById("country").innerHTML = country;
      document.getElementById("flag").src = outPut;
      document.getElementById("foto").src = imagen;
      document.getElementById("description").innerHTML = description;
      document.getElementById("cel").innerHTML = cel + "°C";
      enter.value = "";
    }
  } catch (e) {
    //console.log("error no carga la ciudad; " + e.message);
    //boton.setAttribute("data-target", "#myModal");
    //console.log( e.name );
    //console.log( e.message );
    //console.log(e.stack);
  }
}

/******************************************************************* /Event Listeners/ **********************************************************/
boton.addEventListener("click", clima);
enter.addEventListener("keyup", teclaEnter);
buttonModal.addEventListener("click", removeAttribute);
