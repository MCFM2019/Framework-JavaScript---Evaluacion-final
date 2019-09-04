function ColorBlancoTitulo(elemento,tiempo){
  $(elemento).animate({
    color:'#fff'
  },tiempo,'linear',function (){
    ColorOriginalTitulo(elemento,tiempo);
  })
}
function ColorOriginalTitulo(elemento,tiempo){
  $(elemento).animate({
    color: '#DCFF0E'
  },tiempo,'linear',function(){
    ColorBlancoTitulo(elemento,tiempo);
  })
}
function CargarTableroYDesaparecerElementos(){
  var tableroCompleto=true;
  // Se carga el tablero con los elementos faltantes en cada columna
  for (var columna=1;columna<=7;columna++){
    // Se obtiene la cantidad de elementos que faltan en la columna
    var cantElementosCol=$('.col-'+columna).children().length;
    var cantElemPorAgregarCol=7-cantElementosCol
    if (cantElemPorAgregarCol>0){
      tableroCompleto=false;
      for (var fila=1;fila<=cantElemPorAgregarCol;fila++){
        var numImg=Math.floor((Math.random()*4)+1);
        $('.col-'+columna).prepend('<img src="image/'+numImg+'.png" class="elemento" />');
        // Se le asigna la propiedad draggable para que pueda ser movido
        $('.col-'+columna+' .elemento').draggable();
      }
    }
  }

  // Si el tablero estuvo incompleto, es decir, se agregó al menos un elemento, se hará el metodo para desaparecer elementos y se llamará nuevamente al metodo de cargar
  if (!tableroCompleto){
      // Si hay 3 o mas elementos, se hace el efecto y se desaparecen
      for (var i=0;i<7;i++){
        for (var j=0;j<7;j++){
          if (TieneMasDe2ElementosIgualesArriba(i,j)){
            // Cambia la clase y el de arriba ya no recorre las otras posiciones
            $($('.col-'+(i+1)).children()[j]).addClass('elimina');
            $($('.col-'+(i+1)).children()[j-1]).addClass('elimina');
          }
          else if(TieneMasDe2ElementosIgualesAbajo(i,j)){
            // Cambia la clase y el de abajo ya no recorre las otras posiciones
            $($('.col-'+(i+1)).children()[j]).addClass('elimina');
            $($('.col-'+(i+1)).children()[j+1]).addClass('elimina');
          }
          else if(TieneMasDe2ElementosIgualesDerecha(i,j)){
            // Cambia la clase y el de la derecha ya no recorre las otras posiciones
            $($('.col-'+(i+1)).children()[j]).addClass('elimina');
            $($('.col-'+(i+2)).children()[j]).addClass('elimina');
          }
          else if(TieneMasDe2ElementosIgualesIzquierda(i,j)){
            // Cambia la clase y el de la izquierda ya no recorre las otras posiciones
            $($('.col-'+(i+1)).children()[j]).addClass('elimina');
            $($('.col-'+(i)).children()[j]).addClass('elimina');
          }
        }
      }
      // Se realiza el efecto y desaparecen los elementos
      EfectoDulce();
      // Se llama nuevamente al metodo recursivamente porque se han eliminado elementos, debe volver a hacerse la validación
      CargarTableroYDesaparecerElementos()
  }
}
function TieneMasDe2ElementosIgualesArriba(colu,fil){
  var padre=$('.col-'+(colu+1));
  var numImg=$(padre.children()[fil]).attr('src').substr(6,1);
  var numRepeticiones=1;
  if(fil>=2){
    for(var i=1;i<3;i++){
      var numImgHermano=$(padre.children()[fil-i]).attr('src').substr(6,1);
      if (numImg==numImgHermano){
          numRepeticiones+=1;
      }
      else{break;}
    }
    if(numRepeticiones==3){
      return true;
    }
    else{return false;}
  }
  else{return false;}
}
function TieneMasDe2ElementosIgualesAbajo(colu,fil){
  var padre=$('.col-'+(colu+1));
  var numImg=$(padre.children()[fil]).attr('src').substr(6,1);
  var numRepeticiones=1;
  if(fil<=4){
    for(var i=1;i<3;i++){
      var numImgHermano=$(padre.children()[fil+i]).attr('src').substr(6,1);
      if (numImg==numImgHermano){
          numRepeticiones+=1;
      }
      else{break;}
    }
    if(numRepeticiones==3){
      return true;
    }
    else{return false;}
  }
  else{return false;}
}
function TieneMasDe2ElementosIgualesDerecha(colu,fil){
  var padre=$('.col-'+(colu+1));
  var numImg=$(padre.children()[fil]).attr('src').substr(6,1);
  var numRepeticiones=1;
  if(colu<=4){
    for(var i=1;i<3;i++){
      var sgtePadre=$('.col-'+(colu+1+i))
      var numImgHermano=$(sgtePadre.children()[fil]).attr('src').substr(6,1);
      if (numImg==numImgHermano){
          numRepeticiones+=1;
      }
      else{break;}
    }
    if(numRepeticiones==3){
      return true;
    }
    else{return false;}
  }
  else{return false;}
}
function TieneMasDe2ElementosIgualesIzquierda(colu,fil){
  var padre=$('.col-'+(colu+1));
  var numImg=$(padre.children()[fil]).attr('src').substr(6,1);
  var numRepeticiones=1;
  if(colu>=2){
    for(var i=1;i<3;i++){
      var sgtePadre=$('.col-'+(colu+1-i))
      var numImgHermano=$(sgtePadre.children()[fil]).attr('src').substr(6,1);
      if (numImg==numImgHermano){
          numRepeticiones+=1;
      }
      else{break;}
    }
    if(numRepeticiones==3){
      return true;
    }
    else{return false;}
  }
  else{return false;}
}
function EfectoDulce(fn){
  $('.elimina').fadeToggle('slow',function(){
    $('.elimina').remove();
  });
}

$(function(){
  // Alternar el color en el titulo
  ColorBlancoTitulo($('.main-titulo'),1500);
  CargarTableroYDesaparecerElementos();
})
