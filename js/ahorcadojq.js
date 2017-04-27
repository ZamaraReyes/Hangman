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
    letrasPalabras = palabraAleatoria.split("");
    
    

    $(".cerrar").click(function(){
        $(".ventana").css("display", "none");
    });
    
    
    $("#reiniciar").click(function(){
        localStorage.clear();
    });
    
    
    $("#entrar").click(function(){
        var nombre = $("#nombre1").val();
        var pelicula = $("#pelicula").val();
        
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

        
        /*if ($("#unJugador").prop( "checked", true )) {
            $.getJSON("https://omdbapi.com?s="+palabraAleatoria+"&type=movie").then(function(response){
                var numerito = Math.floor((Math.random() * response.Search.length) + 0);
                $pelicula = response.Search[numerito];
                palabraAleatoria = $pelicula.Title;
                console.log($pelicula.Title);
            });
        } else if ($("#dosJugadores").prop( "checked", true )) {
            $.getJSON("https://omdbapi.com?s="+pelicula+"&type=movie").then(function(response){
                var numerito = Math.floor((Math.random() * response.Search.length) + 0);
                $pelicula = response.Search[numerito];
                palabraAleatoria = $pelicula.Title;
                console.log($pelicula.Title);
                $("#nombre2").attr("opacity", "1");
                $("#retar").attr("opacity", "1");
            });
        }*/
        
        
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
            var hora = ceromin + minutos + ":" + ceroseg + segundos;
            $("#reloj").html(hora);
            
            /*localStorage.setItem("segundos", segundos);
            var obtenerSegundos = localStorage.getItem("segundos");
            
            localStorage.setItem("minutos", minutos);
            var obtenerMinutos = localStorage.getItem("minutos");
            
            var horita = ceromin + obtenerMinutos + ":" + ceroseg + obtenerSegundos;

            
            if ($("#reloj").text(hora)) {
                localStorage.setItem("reloj", horita);
                $("#reloj").html(horita);
            } else {
                $("#reloj").html(hora);
            }*/
            
            
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
    



    var guiones = [];

    for (var i = 0; i < palabraAleatoria.length; i++) {
        guiones.push("_");
    }

    var palabraSeparada = guiones.join(" ");

    $("#palabrita").append(palabraSeparada);
        
    /*var obtenerPalabra = localStorage.getItem("palabraSeparada");
    localStorage.setItem("palabraSeparada", palabraSeparada);
        
    if ($("#palabrita") == "") {
        alert("d");
        localStorage.setItem("palabraSeparada", palabraSeparada);
        $("#palabrita").html(obtenerPalabra);
    } else {
        alert("b");
        $("#palabrita").html(palabraSeparada);
    }*/


    $("#pista").append("<span>Pista: </span>"+pista);
    
    /*localStorage.setItem("pista", pista);
    var obtenerPista = localStorage.getItem("pista");*/
    
    var abecedario = "abcdefghijklmnopqrstuvwxyz";
    abecedario.split("");
    var letras = abecedario.toUpperCase();
    
    var contador = 0;
    var vidas = 6;
    var ganadas = 0;
    var perdidas = 0;
   
    
    /*localStorage.setItem("palabraSeparada", palabraSeparada);
    var obtenerLetras = localStorage.getItem("palabraSeparada");
    $("#palabrita").html(obtenerLetras);*/
    
    for (var i = 0; i < abecedario.length; i++) {
        var botonLetras = $("<button>");
        $(botonLetras).text(abecedario[i]);
        $(botonLetras).attr("id", abecedario[i]);
        $(botonLetras).addClass("boton");
        $("#letritas").append(botonLetras);
        botonLetras.click(clickButton);
    }
    
    
    $("#enviar").click(function(){
        var respuesta = $("#palabra").val();
        if (respuesta == palabraAleatoria) {
            $("#palabrita").html(palabraAleatoria);
            $(".boton").prop("disabled", true);
            alert("¡Enhorabuena! ¡Has acertado!");
            finJuego = true;
        } else if (respuesta != palabraAleatoria) {
            alert("¡Qué va! ¡Esa palabra no es! ¡Sigue intentándolo!");
            vidas = vidas-2;
            $("#vida").html("<span>"+vidas+" vidas</span>");
        }
    });
       

    function clickButton(event){
        var letra = this.id;
        var completado;

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
                completado = true;
            } else {
                completado = false;
            }
            $("#palabrita").html(guiones.join(" "));       
        }

        if (palabraAleatoria.indexOf(letra) == -1) {
            vidas--;
            $("#vida").html("<span>"+vidas+" vidas</span>");

            contador++;
            $("#imagen").attr("src", imagenes[contador]);

            
            if (vidas == 0) {
                $("#pista").html("Lo siento <span>¡has perdido!</span> La palabra secreta era <span>"+palabraAleatoria+"</span>");
                perdidas++;
                $(".boton").prop("disabled", true);
                $("#perder").html(perdidas);
                
                /*var obtenerPerdidas = localStorage.getItem("perdidas");
                localStorage.setItem("perdidas", perdidas);

                if (perdidas == 0) {
                    localStorage.setItem("perdidas", perdidas);
                    $("#perder").html(obtenerPerdidas);
                } else {
                    $("#perder").html(perdidas);
                }*/
                
            }

        } else if (completado == true) {
                $("#pista").html("¡Felicidades! <span>¡Has ganado!</span>");
                ganadas++;
                $(".boton").prop("disabled", true);
                
                /*localStorage.setItem("ganadas", ganadas);
                var obtenerGanadas = localStorage.getItem("ganadas");*/
                $("#ganar").html(ganadas);
        }
        
        
        $("#cargar").click(function(){
            /*Obtener datos almacenados*/
            var obtenerVidas = localStorage.getItem("vida");
            localStorage.setItem("vida", vidas);

            if (vidas == 6) {
                localStorage.setItem("vida", obtenerVidas);
                $("#vida").html("<span>"+obtenerVidas+" vidas</span>");
            } else {
                $("#vida").html("<span>"+vidas+" vidas</span>");
            }

        }); 
        
    };

});