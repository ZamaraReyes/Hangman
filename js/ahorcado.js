var imagenes = ["img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png"];
var palabras = ["brujula","coordenadas","constelacion","nebulosa","telescopio","astronomo"];
var numeroAleatorio = Math.floor(Math.random()*palabras.length);
var palabraAleatoria = palabras[numeroAleatorio];

var frases = ["Sirve para orientarte", "Determina la posición de un astro", "Agrupación que da forma a una figura", "Gas que emite color y forma", "Sirve para observar lo que está muy lejano", "Profesional que observa los astros"];
var pista = frases[numeroAleatorio];

var pistita = document.getElementById("pista");
pistita.innerHTML = "<span>Pista: </span>"+pista;

var letrasPalabras = "";
letrasPalabras = palabraAleatoria.split("");
/*alert(letrasPalabras);

/*Creamos un array para almacenar los guiones según la cantidad de letras de la palabraAleatoria*/
var guiones = [];

for (var i = 0; i < palabraAleatoria.length; i++) {
    guiones.push("_");
}


var palabrita = document.getElementById("palabrita");
var letritas = document.getElementById("letritas");

var abecedario = "abcdefghijklmnopqrstuvwxyz";
abecedario.split("");
var letras = abecedario.toUpperCase();

var contador = 0;
var vidas = 6;
var ganadas = 0;
var perdidas = 0;

var informacion = document.getElementById("vidas");
var ahorcado = document.getElementById("imagen");

palabrita.innerHTML = guiones.join(" ");


var ganar = document.getElementById("ganadas");


var segundos = 0;
var minutos = 1;
var tiempo;
var ceromin = "";
var ceroseg = "";
   
function cuentaAtras(){
    devolvercero(minutos, segundos);
    segundos = segundos % 60;
    document.getElementById("reloj").innerHTML = ceromin + minutos + ":" + ceroseg + segundos;
    if (minutos == 0 && segundos == 0){
        alert ("Se agotó su tiempo");
        clearTimeOut(tiempo);
    }
    if (segundos == 0){
        minutos --;
        segundos+=60;   
    }   
    segundos --;
    var tiempo = setTimeout(cuentaAtras,1000);
}
   
function devolvercero(minutos,segundos){
    if (minutos < 10){
        ceromin = "0";       
    } if (segundos < 10){
        ceroseg = "0";       
    } else {
        ceroseg = "";
    }
    return ceroseg;
    return ceromin;
}


for (var i = 0; i < abecedario.length; i++) {
    var botonLetras = document.createElement("ul");
    var lista = document.createElement("li");
    lista.innerHTML = abecedario[i];
    botonLetras.className = "boton";
    letritas.appendChild(botonLetras);
    botonLetras.appendChild(lista);
    botonLetras.id = abecedario[i];
    botonLetras.addEventListener("click", function(){
        var letra = this.id;
        var completado;
        for (var i = 0; i < palabraAleatoria.length; i++) {
            if (palabraAleatoria[i] == letra) {
                guiones[i] = letra;
                completado = true;
                document.getElementById(letra).setAttribute("disabled", false);
                document.getElementById(letra).className = "correcto";
            } else {
                completado = false;
                document.getElementById(letra).disabled = true;
                document.getElementById(letra).className = "incorrecto";
            }
            palabrita.innerHTML = guiones.join(" ");            
        }
        
        
        if (palabraAleatoria.indexOf(letra) == -1) {
            vidas--;
            document.getElementById("vida").innerHTML = "<span>"+vidas+" vidas</span>";
            
            contador++;
            ahorcado.src = imagenes[contador];
            
            if (vidas == 0) {
                pistita.innerHTML = "Lo siento <span>¡has perdido!</span> La palabra secreta era <span>"+palabraAleatoria+"</span>";
                /*clearTimeOut(tiempo);*/
                perdidas++;
                /*localStorage.setItem("perdidas", perdidas);
                perder.innerHTML = localStorage.getItem("perdidas");
                var per = localStorage.getItem("perdidas");
                alert(per);*/
                botonLetras.disabled = true;
                document.getElementById("perder").innerHTML = perdidas;
            } else if (completado == true) {
                pistita.innerHTML = "¡Felicidades! <span>¡Has ganado!</span>";
                /*clearTimeOut(tiempo);*/
                ganadas++;
                /*localStorage.setItem("ganadas", ganadas);
                document.getElementById("ganadas").innerHTML = localStorage.getItem("ganadas");*/
                botonLetras.disabled = true;
                document.getElementById("ganar").innerHTML = ganadas;
            }
            
        }
        
    });
}


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


    var partidas=getCookie("perdidas");
    if (perdidas != "") {
        /*alert("Welcome again " + perdidas);*/
    } else {
       if (perdidas != "" && perdidas != null) {
           setCookie("perdidas", perdidas, 30);
       }
    }
/*alert(perdidas);

/*function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.className === "mystyle") {
        x.className = "mystyle2";
    } else {
        x.className = "mystyle";
    }
}*/


var modal = document.getElementsByClassName("ventana");
var span = document.getElementsByClassName("close")[0];

function cerrar() {
    modal.style.display = "none";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}