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
          ValidaSiHayElementosIguales(i,j);
        }
      }
      // Se realiza el efecto y desaparecen los elementos
      // EfectoDulce();
      // Se llama nuevamente al metodo recursivamente porque se han eliminado elementos, debe volver a hacerse la validación
      // CargarTableroYDesaparecerElementos()
  }
}

function ValidaSiHayElementosIguales(i,j){
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

function TieneMasDe2ElementosIgualesArriba(colu,fil){
  if(fil>=2){
    var padre=$('.col-'+(colu+1));
    var numImg=$(padre.children()[fil]).attr('src').substr(6,1);
    var numRepeticiones=1;
    for(var i=1;i<3;i++){
      var numImgHermano=$(padre.children()[fil-i]).attr('src').substr(6,1);
      if (numImg==numImgHermano){
          numRepeticiones+=1;
      }
      else{break;}
    }
    if(numRepeticiones==3){
      console.log('Arr='+colu,fil)
      return true;
    }
    else{return false;}
  }
  else{return false;}
}
function TieneMasDe2ElementosIgualesAbajo(colu,fil){
  if(fil<=4){
    var padre=$('.col-'+(colu+1));
    var numImg=$(padre.children()[fil]).attr('src').substr(6,1);
    var numRepeticiones=1;
    for(var i=1;i<3;i++){
      var numImgHermano=$(padre.children()[fil+i]).attr('src').substr(6,1);
      if (numImg==numImgHermano){
          numRepeticiones+=1;
      }
      else{break;}
    }
    if(numRepeticiones==3){
      console.log('Aba='+colu,fil)
      return true;
    }
    else{return false;}
  }
  else{return false;}
}
function TieneMasDe2ElementosIgualesDerecha(colu,fil){
  if(colu<=4){
    var padre=$('.col-'+(colu+1));
    var numImg=$(padre.children()[fil]).attr('src').substr(6,1);
    var numRepeticiones=1;
    for(var i=1;i<3;i++){
      var sgtePadre=$('.col-'+(colu+1+i))
      var numImgHermano=$(sgtePadre.children()[fil]).attr('src').substr(6,1);
      if (numImg==numImgHermano){
          numRepeticiones+=1;
      }
      else{break;}
    }
    if(numRepeticiones==3){
      console.log('Der='+colu,fil)
      return true;
    }
    else{return false;}
  }
  else{return false;}
}
function TieneMasDe2ElementosIgualesIzquierda(colu,fil){
  if(colu>=2){
    var padre=$('.col-'+(colu+1));
    var numImg=$(padre.children()[fil]).attr('src').substr(6,1);
    var numRepeticiones=1;
    for(var i=1;i<3;i++){
      var sgtePadre=$('.col-'+(colu+1-i))
      var numImgHermano=$(sgtePadre.children()[fil]).attr('src').substr(6,1);
      if (numImg==numImgHermano){
          numRepeticiones+=1;
      }
      else{break;}
    }
    if(numRepeticiones==3){
      console.log('Izq='+colu,fil)
      return true;
    }
    else{return false;}
  }
  else{return false;}
}
function EfectoDulce(){
  $('.elimina').fadeToggle('fast',function(){
    EfectoDulce();
  });
}

$(function(){
  // Alternar el color en el titulo
  ColorBlancoTitulo($('.main-titulo'),1500);
  CargarTableroYDesaparecerElementos();

  var imgArrastrada,filArrastrada,colArrastrada;
  var imgContenedor,filContenedor,colContenedor;

  $('.elemento').on('mousedown',function(){
    imgArrastrada=$(this).attr('src');
    filArrastrada=$(this).index();
    colArrastrada=parseInt($(this).parent().attr('class').substr(4,1));
  })

  $('.elemento')
    .droppable({
      drop: function(event,ui){
        imgContenedor=$(this).attr('src');
        filContenedor=$(this).index();
        colContenedor=parseInt($(this).parent().attr('class').substr(4,1));
        // Se hace la verificacion para que el elemento pueda ser movido o vuelva a su posicion
        if(((TieneMasDe2ElementosIgualesArriba(colArrastrada-1,filArrastrada-1)) ||
              (TieneMasDe2ElementosIgualesAbajo(colArrastrada-1,filArrastrada+1)) ||
                (TieneMasDe2ElementosIgualesIzquierda(colArrastrada-2,filArrastrada)) ||
                    (TieneMasDe2ElementosIgualesDerecha(colArrastrada,filArrastrada)))
            ||
            ((TieneMasDe2ElementosIgualesArriba(colContenedor-1,filContenedor-1)) ||
                  (TieneMasDe2ElementosIgualesAbajo(colContenedor-1,filContenedor+1)) ||
                    (TieneMasDe2ElementosIgualesIzquierda(colContenedor-2,filContenedor)) ||
                        (TieneMasDe2ElementosIgualesDerecha(colContenedor,filContenedor)))){
          ui.draggable.position({of: $(this),my: 'left top',at: 'left top'});
          ui.draggable.draggable('option', 'revert', "invalid");
        }
        else{
          ui.draggable.draggable('option', 'revert', "valid");
        }
      }
    })
})
// puedes modificarlos cambiando el atributo src de ambos
// al hacer click obtener la img del item que se va a arrastrar
