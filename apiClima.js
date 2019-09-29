let api = "http://api.openweathermap.org/data/2.5/weather?q=";
let apiKey = "&APPID=068e433d997abd16266f20079d3504ed";
let units = "&units=metric";
let language = "&lang=es";

let txtCity = document.getElementById("city");
const boton = document.getElementById("show");
const modal = document.getElementById("modalWindow");
const btnCloseModal = document.getElementById("btnCloseModal");
const modalMessage = document.getElementById("modalMessage");
const spinner = document.getElementById("spinner");

/******************************************************************* /FUNCTIONS/ **********************************************************/
let teclaEnter = e => {
  if (e.keyCode === 13) {
    clima();
    //txtCity.value = "";
    spinner.classList.remove("spinner");
  }
};

async function clima() {
  if (document.getElementById("cardBody").className.match(/(?:^|\s)fadeIn animated(?!\S)/)) {
    document.getElementById("cardBody").className = document.getElementById("cardBody").className.replace(/(?:^|\s)fadeIn animated(?!\S)/g, "");
  }

  let city = txtCity.value;
  let url = api + city + apiKey + units;
  let res = await fetch(url);

  if (!res.ok === false) {
    let data = await res.json();
    console.log(data)
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
    txtCity.value = "";
    spinner.classList.remove("spinner");
  } else {
    mostrarModal()
    console.log("ciudad no esta listada");
  }
}

function mostrarModal() {

  const trigger = boton.getAttribute("data-modal-trigger");
  const modal = document.querySelector(`[data-modal=${trigger}]`);
  const contentWrapper = modal.querySelector(".content-wrapper");
  const close = modal.querySelector(".close");

  if (txtCity.value == 0) {
    modalMessage.innerHTML = "Empty text field";
  }
  else {
    modalMessage.innerText = 'Sorry, this city is not listed in this API';
  }
  modal.classList.toggle("open");

  close.addEventListener("click", () => modal.classList.remove("open"));
  // modal.addEventListener("click", () => modal.classList.remove("open"));
  contentWrapper.addEventListener("click", e => e.stopPropagation());
}

function closeModal() {
  modal.classList.remove("open");
  txtCity.value = "";
}

/******************************************************************* /Event Listeners/ **********************************************************/
boton.addEventListener("click", clima);
txtCity.addEventListener("keyup", teclaEnter);
btnCloseModal.addEventListener("click", closeModal);

