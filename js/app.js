var temporizador= new Timer();

function ColorBlancoTitulo(elemento, tiempo) {
  $(elemento).animate({
    color: '#fff'
  }, tiempo, 'linear', function () {
    ColorOriginalTitulo(elemento, tiempo);
  })
}
function ColorOriginalTitulo(elemento, tiempo) {
  $(elemento).animate({
    color: '#DCFF0E'
  }, tiempo, 'linear', function () {
    ColorBlancoTitulo(elemento, tiempo);
  })
}
function CargarTablero() {
  // Se carga el tablero con los elementos faltantes en cada columna
  for (var columna = 1; columna <= 7; columna++) {
    // Se obtiene la cantidad de elementos que faltan en la columna
    var cantElementosCol = $('.col-' + columna).children().length;
    var cantElemPorAgregarCol = 7 - cantElementosCol

    if (cantElemPorAgregarCol > 0) {
      for (var fila = 1; fila <= cantElemPorAgregarCol; fila++) {
        var numImg = Math.floor((Math.random() * 4) + 1);
        $('.col-' + columna).prepend('<img src="image/' + numImg + '.png" class="elemento ui-draggable ui-draggable-handle ui-droppable" />');
        // Se le asigna la propiedad draggable para que pueda ser movido
        CargaDragAndDrop() /* LA LLAMO AQUI DESPUES DE AGREGAR EL BOTON */
      }
    }
  }
  // Se setea la clase 'elimina' a los elementos que serán eliminados
  RecorreTableroParaVerificacionYEliminacion();
  // Se realiza el efecto y desaparecen los elementos
  var eliminoElementos = $('.elimina').length;
  if (eliminoElementos > 0) {//Se econtraron elementos para eliminar
    EfectoDulce();
  }
}
function RecorreTableroParaVerificacionYEliminacion() {
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 7; j++) {
      ValidaSiHayElementosIguales(i, j);
    }
  }
}
function EfectoDulce() {
  $('.elimina').effect("pulsate", { times: 4 }, 1500);
  $('.elimina').animate({
    opacity: '0'
  }, {
    complete: function () {
      var eliminoElementos = $('.elimina').length;
      $('.elimina').remove()
      // Se llama nuevamente al metodo recursivamente si se han eliminado elementos, debe volver a hacerse la validación
      if (eliminoElementos > 0) {//Se econtraron elementos para eliminar
        Puntuacion(eliminoElementos);
        CargarTablero();
      }
    }
  })
}
function Puntuacion(eliminoElementos){
  var puntaje = Number($('#score-text').text());
  puntaje+=parseInt(eliminoElementos)*10;
	$('#score-text').text(puntaje);
}
function ValidaSiHayElementosIguales(i, j) {
  var padre = $('.col-' + (i + 1));
  var numImg = $(padre.children()[j]).attr('src').substr(6, 1);
  if (TieneMasDe2ElementosIgualesArriba(padre, numImg, i, j, 'arr')) {
    // Cambia la clase y el de arriba ya no recorre las otras posiciones
    $($('.col-' + (i + 1)).children()[j]).addClass('elimina');
    $($('.col-' + (i + 1)).children()[j - 1]).addClass('elimina');
  }
  else if (TieneMasDe2ElementosIgualesAbajo(padre, numImg, i, j, 'aba')) {
    // Cambia la clase y el de abajo ya no recorre las otras posiciones
    $($('.col-' + (i + 1)).children()[j]).addClass('elimina');
    $($('.col-' + (i + 1)).children()[j + 1]).addClass('elimina');
  }
  else if (TieneMasDe2ElementosIgualesDerecha(padre, numImg, i, j, 'der')) {
    // Cambia la clase y el de la derecha ya no recorre las otras posiciones
    $($('.col-' + (i + 1)).children()[j]).addClass('elimina');
    $($('.col-' + (i + 2)).children()[j]).addClass('elimina');
  }
  else if (TieneMasDe2ElementosIgualesIzquierda(padre, numImg, i, j, 'izq')) {
    // Cambia la clase y el de la izquierda ya no recorre las otras posiciones
    $($('.col-' + (i + 1)).children()[j]).addClass('elimina');
    $($('.col-' + (i)).children()[j]).addClass('elimina');
  }
}

function TieneMasDe2ElementosIgualesArriba(padre, numImg, colu, fil, posicion) {
  if (posicion != 'aba') {
    if (fil >= 2) {
      var numRepeticiones = 1;
      for (var i = 1; i < 3; i++) {
        var numImgHermano = $(padre.children()[fil - i]).attr('src').substr(6, 1);
        if (numImg == numImgHermano) {
          numRepeticiones += 1;
        }
        else { break; }
      }
      if (numRepeticiones == 3) {
        return true;
      }
      else { return false; }
    }
    else { return false; }
  }
}
function TieneMasDe2ElementosIgualesAbajo(padre, numImg, colu, fil, posicion) {
  if (posicion != 'arr') {
    if (fil <= 4) {
      var numRepeticiones = 1;
      for (var i = 1; i < 3; i++) {
        var numImgHermano = $(padre.children()[fil + i]).attr('src').substr(6, 1);
        if (numImg == numImgHermano) {
          numRepeticiones += 1;
        }
        else { break; }
      }
      if (numRepeticiones == 3) {
        return true;
      }
      else { return false; }
    }
    else { return false; }
  }
}
function TieneMasDe2ElementosIgualesDerecha(padre, numImg, colu, fil, posicion) {
  if (posicion != 'izq') {
    if (colu <= 4) {
      var numRepeticiones = 1;
      for (var i = 1; i < 3; i++) {
        var sgtePadre = $('.col-' + (colu + 1 + i));
        var numImgHermano = $(sgtePadre.children()[fil]).attr('src').substr(6, 1);
        if (numImg == numImgHermano) {
          numRepeticiones += 1;
        }
        else { break; }
      }
      if (numRepeticiones == 3) {
        return true;
      }
      else { return false; }
    }
    else { return false; }
  }
}
function TieneMasDe2ElementosIgualesIzquierda(padre, numImg, colu, fil, posicion) {
  if (posicion != 'der') {
    if (colu >= 2) {
      var numRepeticiones = 1;
      for (var i = 1; i < 3; i++) {
        var sgtePadre = $('.col-' + (colu + 1 - i));
        var numImgHermano = $(sgtePadre.children()[fil]).attr('src').substr(6, 1);
        if (numImg == numImgHermano) {
          numRepeticiones += 1;
        }
        else { break; }
      }
      if (numRepeticiones == 3) {
        return true;
      }
      else { return false; }
    }
    else { return false; }
  }
}
function EsElementoCentral(padre, numImg, colu, fil, posicion) {
  // Si tiene al menos un elemento arriba y abajo o a la derecha e izquierda, es un elemento central
  if (posicion == 'der' || posicion == 'izq') {//Solo evalua arriba y abajo
    if (fil >= 1 && fil <= 5) {
      var numImgArr = $(padre.children()[fil - 1]).attr('src').substr(6, 1);
      var numImgAba = $(padre.children()[fil + 1]).attr('src').substr(6, 1);
      if (numImg == numImgArr && numImg == numImgAba) {
        return true;
      }
      else { return false; }
    }
    else { return false; }
  }
  else {//Solo evalua derecha o izquierda
    if (colu >= 1 && colu <= 5) {
      var sgtePadre = $('.col-' + (colu + 1));
      var antPadre = $('.col-' + (colu - 1));
      var numImgDer = $(sgtePadre.children()[fil]).attr('src').substr(6, 1);
      var numImgIzq = $(antPadre.children()[fil]).attr('src').substr(6, 1);
      if (numImg == numImgDer && numImg == numImgIzq) {
        return true;
      }
      else { return false; }
    }
    else { return false; }
  }
}
function MoverElemento(filArrastrada, colArrastrada, imgArrastrada, filContenedor, colContenedor, imgContenedor) {
  // Se valida que el elemento pueda ser movido
  var nuevaPosArrastra, nuevaPosContenedor;
  var mover = false;

  if (colArrastrada != colContenedor) {//Se mueve a la derecha o izquierda
    if (colArrastrada < colContenedor) {//Arrastra a la derecha
      nuevaPosArrastra = 'der';
      nuevaPosContenedor = 'izq';
    }
    else {//Arrastra a la izquierda
      nuevaPosArrastra = 'izq';
      nuevaPosContenedor = 'der';
    }
  }
  else {//Se mueve arriba o abajo
    if (filArrastrada < filContenedor) {//Arrastra abajo
      nuevaPosArrastra = 'aba';
      nuevaPosContenedor = 'arr';
    }
    else {//Arrastra arriba
      nuevaPosArrastra = 'arr';
      nuevaPosContenedor = 'aba';
    }
  }

  var padreArr = $('.col-' + (colContenedor + 1));
  var numImgArr = imgArrastrada.substr(6, 1);
  var padreCont = $('.col-' + (colArrastrada + 1));
  var numImgCont = imgContenedor.substr(6, 1);

  if ((TieneMasDe2ElementosIgualesArriba(padreArr, numImgArr, colContenedor, filContenedor, nuevaPosArrastra) ||
    TieneMasDe2ElementosIgualesAbajo(padreArr, numImgArr, colContenedor, filContenedor, nuevaPosArrastra) ||
    TieneMasDe2ElementosIgualesIzquierda(padreArr, numImgArr, colContenedor, filContenedor, nuevaPosArrastra) ||
    TieneMasDe2ElementosIgualesDerecha(padreArr, numImgArr, colContenedor, filContenedor, nuevaPosArrastra) ||
    EsElementoCentral(padreArr, numImgArr, colContenedor, filContenedor, nuevaPosArrastra))
    ||
    (TieneMasDe2ElementosIgualesArriba(padreCont, numImgCont, colArrastrada, filArrastrada, nuevaPosContenedor) ||
      TieneMasDe2ElementosIgualesAbajo(padreCont, numImgCont, colArrastrada, filArrastrada, nuevaPosContenedor) ||
      TieneMasDe2ElementosIgualesIzquierda(padreCont, numImgCont, colArrastrada, filArrastrada, nuevaPosContenedor) ||
      TieneMasDe2ElementosIgualesDerecha(padreCont, numImgCont, colArrastrada, filArrastrada, nuevaPosContenedor) ||
      EsElementoCentral(padreCont, numImgCont, colArrastrada, filArrastrada, nuevaPosContenedor))) {
    mover = true;
  }

  return mover;
}
/* ESTA ES LA NUEVA FUNCION */
function CargaDragAndDrop() {

  var imgArrastrada, filArrastrada, colArrastrada;
  var imgContenedor, filContenedor, colContenedor;

  $('.elemento').on('mousedown', function () {
    imgArrastrada = $(this).attr('src');
    filArrastrada = $(this).index();
    colArrastrada = parseInt($(this).parent().attr('class').substr(4, 1));
  })

  $('.elemento').draggable({
    containment: '.panel-tablero',
    droppable: '.elemento',
    revert: true
  })

  $('.elemento')
    .droppable({
      drop: function (event, ui) {
        imgContenedor = $(this).attr('src');
        filContenedor = $(this).index();
        colContenedor = parseInt($(this).parent().attr('class').substr(4, 1));
        // Se hace la verificacion para que el elemento pueda ser movido o vuelva a su posicion
        if ((Math.abs(filArrastrada - filContenedor) <= 1) && (Math.abs(colArrastrada - colContenedor) <= 1) &&
          (imgArrastrada != imgContenedor) && ((filArrastrada == filContenedor) || (colArrastrada == colContenedor))) {
          if (MoverElemento(filArrastrada, colArrastrada - 1, imgArrastrada, filContenedor, colContenedor - 1, imgContenedor)) {
            ui.draggable.draggable('option', 'revert', "invalid");
            // Se modifican los atributos src de los elementos movidos en el DOM
            $($('.col-' + colContenedor).children()[filContenedor]).attr('src', imgArrastrada);
            $($('.col-' + colArrastrada).children()[filArrastrada]).replaceWith('<img src="' + imgContenedor + '" class="elemento" />');
            Movimientos();
            CargarTablero();
          }
          else {
            ui.draggable.draggable('option', 'revert', "valid");
          }
        }
        else {
          ui.draggable.draggable('option', 'revert', "valid");
        }
      }
    })
}
function Movimientos(){
  var movim = Number($('#movimientos-text').text());
  movim+=1;
	$('#movimientos-text').text(movim);
}
function CambiaAspectoJuegoTerminado(){
  $('.panel-tablero').hide('fast');
  $('.panel-score').prepend('<h3>Juego terminado</h3>');
  $('h3').addClass('titulo-over');
  $('.panel-score').animate({width:'100%'});
  $('.time').hide('fast');
}
function ModificarReloj(temporizador){
  temporizador.every(1000,function(){
    var tiempo=$('#timer').text();
    var minutos=parseInt(tiempo.substr(0,2));
    var segundos=parseInt(tiempo.substr(3,2));

    if(segundos==0 && minutos==0){
      temporizador.stop();
      CambiaAspectoJuegoTerminado();
    }
    else{
      if(segundos==0){
        minutos-=1;
        segundos=59;
      }
      else{segundos-=1;}

      var minsStr,segsStr
      minsStr='0'+minutos;
      if(segundos.toString().length==1){
        segsStr='0'+segundos;
      }
      else{segsStr=segundos;}

      var reloj=minsStr+':'+segsStr;
      $('#timer').text(reloj);
    }
  })
}
$(function () {
  // Alternar el color en el titulo
  ColorBlancoTitulo($('.main-titulo'), 1500);
  ModificarReloj(temporizador);
  $('.btn-reinicio').on('click',function(){
    var nomBoton=$(this).text();
    if(nomBoton=='Iniciar'){
        $(this).text('Reiniciar');
    }
    else{
      temporizador.reset();
      $('.panel-tablero').show('fast')
      $('.titulo-over').remove();
      $('.panel-score').animate({width:'25%'})
      $('.time').show('fast');

      $('#score-text').text('0');
      $('#movimientos-text').text('0');
      $('#timer').text('02:00');
      for(var i=0;i<7;i++){
        for(var j=0;j<7;j++){
          $('.elemento').addClass('elimina');
        }
      }
      $('.elimina').remove();
    }
    temporizador.start();
    CargarTablero();
    CargaDragAndDrop();/* AQUI SE LLAMA LA FUNCION EN REEMPLAZO DE LAS LINEAS DE CODIGO */
  })
})
