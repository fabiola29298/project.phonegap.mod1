var app = {
    inicio: function (){
        this.iniciaBotones();

        this.iniciaHammer();
    },
    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },
    iniciaBotones: function(){
        //almacenamos en una variable la referencia de la que queremos poner el elemento
        var botonClaro = document.querySelector('#claro');
        var botonOscuro = document.querySelector('#oscuro');
        //EventListener = escucha los eventos
        botonClaro.addEventListener('click',this.ponloClaro,false);
        botonOscuro.addEventListener('click',this.ponloOscuro,false);
    },
   iniciaHammer: function(){
        var zona = document.getElementById('zona-gestos');
        var hammertime = new Hammer(zona);
        hammertime.get('pinch').set({enable:true});
        hammertime.get('rotate').set({enable:true});

        zona.addEventListener('webkitAnimationEnd',function(e){
            zona.className='';
        });

        hammertime.on('tap doubletap swipe press rotate', function(ev){
            document.querySelector('#info').innerHTML=ev.type+'!';
        });
        hammertime.on('tap',function(ev){
            zona.className='tap';
        });
        hammertime.on('doubletap',function(ev){
            zona.className='doubletap';
        });
        hammertime.on('press',function(ev){
            zona.className='press';
        });
        hammertime.on('swipe',function(ev){
            var clase=undefined;
            direccion=ev.direction;

            if(direccion==4) clase='swipe-derecha';
            if(direccion==2) clase='swipe-izquierda';

            zona.className=clase;
        });
        hammertime.on('rotate',function(ev){
            var umbral=25;
            if(ev.distance > umbral) zona.className='rotate';
        }); 
    },
    ponloClaro: function(){
        document.body.className='claro';
    },
    ponloOscuro: function(){
        document.body.className='oscuro';
    },
};
if ('addEventListener' in document){
    document.addEventListener('DOMContentLoaded',function(){
        FastClick.attach(document.body);
        app.inicio();
    },false);
}