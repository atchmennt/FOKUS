const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque ');
const botonDescansoLargo = document.querySelector('.app__card-button--largo');
const titulo = document.querySelector('.app__title'); // Reemplaza '.app__title' por el selector correcto
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
// VARIABLES IMAGENES:
const imagenBanner = document.querySelector('.app__image')
//SONIDOS
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const sonidoPausar = new Audio('./sonidos/pause.mp3');
const sonidoPlay = new Audio('./sonidos/play.wav');
const sonidoCero = new Audio('./sonidos/beep.mp3');

const botonIniciarPausar = document.querySelector ('#start-pause');
const textoIniciarPausar = document.querySelector ('#start-pause');

const imagenIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const tiempoEnPantalla = document.querySelector('#timer')

let tiempoTranscurridoEnSegundos = 1500 /*es igual a 25 min*/ 
let idIntervalo = null

musica.loop = true
inputEnfoqueMusica.addEventListener('click', ()=> {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})
/*addEventListener es paraen JavaScript es como un vigilante que espera a que suceda algo en un elemento.*/
botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300 /*5 min*/ 
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
    /*JavaScript es como un pequeño mago que cambia las propiedades de un elemento HTML.*/ 
} )

botonEnfoque.addEventListener('click',() =>{
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

botonDescansoLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900 /*15 min*/ 
    cambiarContexto('descanso-largo')
    botonDescansoLargo.classList.add('active')
})



function cambiarContexto(contexto){
    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    imagenBanner.setAttribute('src', `./imagenes/${contexto}.png` )
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            
            break;
        case "descanso-corto" :
            titulo.innerHTML = `¿Qué tal tomar un respiro? 
               <strong class="app__title-strong"> ¡Haz una pausa corta!.</strong>`
            break;

        case "descanso-largo" :
            titulo.innerHTML = `Hora de volver a la superficie
               <strong class="app__title-strong"> Haz una pausa larga.</strong>`
        break;
        default:
            break;
    }





}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0){
        sonidoCero.play()
        reiniciar()
        
        return;
    }
    
    
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
}

botonIniciarPausar.addEventListener('click' , iniciarPausar)


function iniciarPausar (){
    sonidoPlay.play()
    if(idIntervalo){
        reiniciar()
        return
    }
    textoIniciarPausar.textContent = "Pausar"
    idIntervalo = setInterval(cuentaRegresiva, 1000)
    imagenIniciarPausar.setAttribute('src', `/imagenes/pause.png`);

}

function reiniciar (){
    imagenIniciarPausar.setAttribute('src', `/imagenes/play_arow.png`)
    textoIniciarPausar.textContent = "Comenzar"
    sonidoPausar.play()
    clearInterval(idIntervalo)
    idIntervalo = null
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-CL', {minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()