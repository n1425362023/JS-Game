import {Player} from './player.js'
import {InputHandler} from './input.js'
window.addEventListener('load',function(){
    const loading=document.getElementById('loading');
    loading.style.display='none';
    const canvas=document.getElementById('canvas1');
    const ctx=canvas.getContext('2d');
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    class Game{
        constructor(width,height){
            this.width=width;
            this.height=height;
            this.player = new Player(this);

            this.input=new InputHandler(this);


        }
        update(){
            this.player.update(this.input.keys);     
        }
        draw(context){
            this.player.draw(context);
        }
    }
    const game=new Game(canvas.width,canvas.height);
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
       
    }
    animate();
    console.log(game.input.keys);
});