$(document).ready(function(){
    var imagenes = ["img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png"];
    var palabras = ["brujula","coordenadas","constelacion","nebulosa","telescopio","astronomo", "asteroide"];
    var numeroAleatorio = Math.floor(Math.random()*palabras.length);
    var palabraAleatoria = palabras[numeroAleatorio];

    var frases = ["Sirve para orientarte", "Determina la posición de un astro", "Agrupación que da forma a una figura", "Gas que emite color y forma", "Sirve para observar lo que está muy lejano", "Profesional que observa los astros", "Cuerpo rocoso, más pequeño que un planeta"];
    var pista = frases[numeroAleatorio];

    var finJuego = false;
    var tiempo = null;    
    var letrasPalabras = "";
    var peliculaAleatoria = "";

    $(".cerrar").click(function(){
        $(".ventana").css("display", "none");
    });
    
    
    $("#reiniciar").click(function(){
        localStorage.clear();
    });
    
    
    $("#entrar").click(function(){
        var nombre = $("#nombre1").val();

        /* set: recoge el valor */
        var obtenerNombre = localStorage.getItem("nombre1");
        localStorage.setItem("nombre1", nombre);
        
        if (nombre == "") {
            /* get: devuelve el valor */
            localStorage.setItem("nombre1", obtenerNombre);
            $("#usuario").html(obtenerNombre);
        } else {
            $("#usuario").html(nombre);
        }

        if (pelicula != "") {
            pelicula = palabraAleatoria;
        }
        
        
        $.getJSON("https://omdbapi.com?s="+palabraAleatoria+"&type=movie").then(function(response){
            var numerito = Math.floor((Math.random() * response.Search.length) + 0);
            $pelicula = response.Search[numerito];
            peliculaAleatoria = $pelicula.Title;
            peliculaAleatoria = peliculaAleatoria.toLowerCase();
            peliculaAleatoria = peliculaAleatoria.replace(/\s/g,"");
            peliculaAleatoria = peliculaAleatoria.replace(/á/,"a");
            peliculaAleatoria = peliculaAleatoria.replace(/é/,"e");
            peliculaAleatoria = peliculaAleatoria.replace(/í/,"i");
            peliculaAleatoria = peliculaAleatoria.replace(/ó/,"o");
            palabraAleatoria = peliculaAleatoria.replace(/ú/,"u");
            guines(palabraAleatoria);
        });
        
        $("#dos").click(function(){
            var pelicula = $("#pelicula").val();
            palabraAleatoria.length = "";
            $("#palabrita").empty();
            $.getJSON("https://omdbapi.com?s="+pelicula+"&type=movie").then(function(response){
                var numerito = Math.floor((Math.random() * response.Search.length) + 0);
                $pelicula = response.Search[numerito];
                pelicula = $pelicula.Title;
                pelicula = pelicula.toLowerCase();
                pelicula = pelicula.replace(/\s/g,"");
                palabraAleatoria = pelicula;
                alert(palabraAleatoria);
                guines(palabraAleatoria);
            });
        });
        /*} else if ($("#dosJugadores").prop( "checked", true )) {*/
        /*} else if ($("#formulario input[name='dosJugadores']:radio").is(':checked')) {
            alert("s");
            $("#unJugador").prop( "checked", true );
            $.getJSON("https://omdbapi.com?s="+pelicula+"&type=movie").then(function(response){
                pelicula = palabraAleatoria;
                var numerito = Math.floor((Math.random() * response.Search.length) + 0);
                $pelicula = response.Search[numerito];
                peliculaAleatoria = $pelicula.Title;
                palabraAleatoria = peliculaAleatoria.toLowerCase();
                guines(palabraAleatoria);
                console.log($pelicula.Title);
                $("#nombre2").prop("disabled", true);
                $("#retar").prop("disabled", true);
                $("#nombre2").css("opacity", "1");
                $("#retar").css("opacity", "1");
            });
        }
        });*/
        
        
        
        $(".ventana").css("display", "none");
        
        
        var segundos = 0;
        var minutos = 1;
        var tiempo;
        var ceromin = "";
        var ceroseg = "";
    
        
        if ($(".ventana").css("display", "none")){
             tiempo = setInterval(cuentaAtras,1000);
        }
        
        
        function cuentaAtras(){
            devolvercero(minutos, segundos);
            segundos = segundos % 60;
            $("#reloj").html(ceromin + minutos + ":" + ceroseg + segundos);
            
            
            if (finJuego) {
                clearTimeout(tiempo);
            } else if (vida == 0) {
                clearTimeout(tiempo);
            } else if (minutos == 0 && segundos == 0){
                alert("Se agotó su tiempo");
                perdidas++;
                $(".boton").prop("disabled", true);
                $(".boton").addClass("desactivado");
                clearTimeout(tiempo);
            } else if (segundos == 0){
                minutos--;
                segundos += 60;   
            }  
            segundos--;
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
    });
    
    
    /*if (localStorage.palabraAleatoria == undefined) {
        localStorage.palabraAleatoria = palabraAleatoria;
    } 
    alert(localStorage.palabraAleatoria);
    
    
    if (localStorage.guiones == undefined) {
        localStorage.guiones = guiones;
    } 
    alert(localStorage.guiones);*/


    $("#pista").append("<span>Pista: </span>"+pista);

    
    var abecedario = "abcdefghijklmnopqrstuvwxyz";
    abecedario.split("");
    var letras = abecedario.toUpperCase();
    
    var contador = 0;
    var vidas = 6;
    var ganadas = 0;
    var perdidas = 0;
    var totales = 0;
   
    
    for (var i = 0; i < abecedario.length; i++) {
        var botonLetras = $("<button>");
        $(botonLetras).text(abecedario[i]);
        $(botonLetras).attr("id", abecedario[i]);
        $(botonLetras).addClass("boton");
        $("#letritas").append(botonLetras);
        botonLetras.click(clickButton);
    }
    
    
    function limpiar(peliculaAleatoria) {
        peliculaAleatoria = peliculaAleatoria.replace(/\s/g,"");
        peliculaAleatoria = peliculaAleatoria.replace(/á/,"a");
        peliculaAleatoria = peliculaAleatoria.replace(/é/,"e");
        peliculaAleatoria = peliculaAleatoria.replace(/í/,"i");
        peliculaAleatoria = peliculaAleatoria.replace(/ó/,"o");
        peliculaAleatoria = peliculaAleatoria.replace(/ú/,"u");
    }
    
    
    var guiones = [];
    
    function guines(palabraAleatoria) {
        
        /*palabraAleatoria = peliculaAleatoria.replace(/\s/g,"");
        palabraAleatoria = peliculaAleatoria.replace(/á/,"a");
        palabraAleatoria = peliculaAleatoria.replace(/é/,"e");
        palabraAleatoria = peliculaAleatoria.replace(/í/,"i");
        palabraAleatoria = peliculaAleatoria.replace(/ó/,"o");
        palabraAleatoria = peliculaAleatoria.replace(/ú/,"u");*/
        
        for (var i = 0; i < palabraAleatoria.length; i++) {
            if (palabraAleatoria[i] == "á") {
                palabraAleatoria[i].replace(/á/,"a");
            } if (palabraAleatoria[i] == "é") {
                palabraAleatoria[i].replace(/é/,"e");
            } if (palabraAleatoria[i] == "í") {
                palabraAleatoria[i].replace(/í/,"i");
            } if (palabraAleatoria[i] == "ó") {
                palabraAleatoria[i].replace(/ó/,"o");
            } if (palabraAleatoria[i] == "ú") {
                palabraAleatoria[i].replace(/ú/,"u");
            }
            guiones.push("_");
        }
        alert(palabraAleatoria);

        var palabraSeparada = guiones.join(" ");

        $("#palabrita").append(palabraSeparada);
        
    }
    
    
    $("#enviar").click(function(){
        var respuesta = $("#palabra").val();
        if (respuesta == palabraAleatoria) {
            $("#palabrita").html(palabraAleatoria);
            $("#palabrita").css("letter-spacing", "8px");
            alert("¡Enhorabuena! ¡Has acertado!");
            ganadas++;
            $(".boton").addClass("desactivado");
            $(".boton").prop("disabled", true);
            finJuego = true;
            
            if (localStorage.ganadas == undefined) {
                localStorage.ganadas = 0;
            } else {
                localStorage.ganadas = parseInt(localStorage.ganadas)+1;
            }
            $("#ganar").html(localStorage.ganadas);
            
        } else if (respuesta != palabraAleatoria) {
            alert("¡Qué va! ¡Esa palabra no es! ¡Sigue intentándolo!");
            vidas = vidas-2;
            $("#vida").html("<span>"+vidas+" vidas</span>");
        }
    });
       

    function clickButton(event){
        var letra = this.id;
        
        
        if(palabraAleatoria.indexOf(letra) != -1) {
            $("#"+letra).addClass("correcto"); 
        } else {
            $("#"+letra).addClass("incorrecto");        
        }
        $("#"+letra).addClass("desactivado");
        $("#"+letra).prop("disabled", true);

        
        for (var i = 0; i < palabraAleatoria.length; i++) {
            if (palabraAleatoria[i] == letra) {
                guiones[i] = letra;
                letrasPalabras += guiones[i];
            }
            $("#palabrita").html(guiones.join(" "));       
        }


        if (palabraAleatoria.indexOf(letra) == -1) {
            vidas--;
            $("#vida").html("<span>"+vidas+" vidas</span>");

            contador++;
            $("#imagen").attr("src", imagenes[contador]);

            
            if (vidas == 0) {
                alert("Lo siento, ¡has perdido! La palabra secreta era "+palabraAleatoria);
                perdidas++;
                $(".boton").addClass("desactivado");
                $(".boton").prop("disabled", true);
                finJuego = true;
                
                if (localStorage.perdidas == undefined) {
                    localStorage.perdidas = 0;
                } else {
                    localStorage.perdidas = parseInt(localStorage.perdidas)+1;
                }
                    $("#perder").html(localStorage.perdidas);
                }

            } else if (letrasPalabras.length == guiones.length) {
                alert("¡Felicidades! ¡Has ganado!");
                ganadas++;
                $(".boton").addClass("desactivado");
                $(".boton").prop("disabled", true);
                finJuego = true;
                
                if (localStorage.ganadas == undefined) {
                    localStorage.ganadas = 0;
                } else {
                    localStorage.ganadas = parseInt(localStorage.ganadas)+1;
                }
                    $("#ganar").html(localStorage.ganadas);
                }
            
        };
    
    $("#perder").html(localStorage.perdidas);
    $("#ganar").html(localStorage.ganadas);
    $("#total").html(parseInt(localStorage.perdidas)+parseInt(localStorage.ganadas));
    
});