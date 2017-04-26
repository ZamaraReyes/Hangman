$(document).ready(function(){
    var imagenes = ["img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png"];
    var palabras = ["brujula","coordenadas","constelacion","nebulosa","telescopio","astronomo", "asteroide"];
    var numeroAleatorio = Math.floor(Math.random()*palabras.length);
    var palabraAleatoria = palabras[numeroAleatorio];

    var frases = ["Sirve para orientarte", "Determina la posición de un astro", "Agrupación que da forma a una figura", "Gas que emite color y forma", "Sirve para observar lo que está muy lejano", "Profesional que observa los astros", "Cuerpo rocoso, más pequeño que un planeta"];
    var pista = frases[numeroAleatorio];
    var completado = true;
    var finJuego = false;
    var tiempo = null;
    
    var letrasPalabras = "";
    letrasPalabras = palabraAleatoria.split("");
    
    $(".cerrar").click(function(){
        $("#usuario").append("<p>Jugador: <span>Anónimo</span></p>");
        $(".ventana").css("display", "none");
    });
    
    $("#entrar").click(function(){
        var nombre = $("#nombre").val();
        $("#usuario").append("<p>Jugador: <span>"+nombre+"</span></p>");
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
                $(".boton").prop("disabled", true);
                $(".boton").addClass("desactivado");
                clearTimeout(tiempo);
            } else if (segundos == 0){
                minutos --;
                segundos += 60;   
            }  
            segundos --;
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

    $("#pista").append("<span>Pista: </span>"+pista);
    
    var abecedario = "abcdefghijklmnopqrstuvwxyz";
    abecedario.split("");
    var letras = abecedario.toUpperCase();
    
    var contador = 0;
    var vidas = 6;
    var ganadas = 0;
    var perdidas = 0;
    
    $("#palabrita").append(guiones.join(" "));
    
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
            ganadas++;
            finJuego = true;
            $("#ganar").html(ganadas);
        } else if (respuesta != palabraAleatoria) {
            alert("¡Qué va! ¡Esa palabra no es! ¡Sigue intentándolo!");
            vidas--;
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
            } else if (completado == true) {
                $("#pista").html("¡Felicidades! <span>¡Has ganado!</span>");
                ganadas++;
                $(".boton").prop("disabled", true);
                $("#ganar").html(ganadas);
            }

        }
        
    };

});