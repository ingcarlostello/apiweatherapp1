let api = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&APPID=068e433d997abd16266f20079d3504ed';
let units = '&units=metric';
let language = "&lang=es";
let enter = document.getElementById("city");
const boton = document.getElementById("enviar");





/******************************************************************* /FUNCTIONS/ **********************************************************/
let  teclaEnter = e => {
    if (e.keyCode === 13){
       clima();
       enter.value = "";
    }
}






    //clima()    



async function clima(){
    let city = enter.value;
    let res = await fetch(api + city + apiKey + units);
    let data = await res.json();
    //let img = await res.blob();

    console.log(data)
    let icono = data.weather[0].icon;
    let imagen = `http://openweathermap.org/img/wn/${icono}@2x.png`;
    console.log(icono)
    console.log(data.main.temp.toFixed(1)); // toFixed(1) es usado para mostrar solo 1 decimal
    document.getElementById('foto').src = imagen


    
    //console.log(data.weather[0].description);



    }


/******************************************************************* /Event Listeners/ **********************************************************/
boton.addEventListener('click', clima)
enter.addEventListener('keyup', teclaEnter)






