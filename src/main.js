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
            this.groundMargin=-4;
            this.player = new Player(this);
            this.input=new InputHandler(this);
            this.player.currentState = this.player.states[0]
            this.player.currentState.enter();
            
            



        }
        update(deltaTime){
            this.player.update(this.input.keys,deltaTime);     
        }
        draw(context){
            this.player.draw(context);
        }
    }
    const game=new Game(canvas.width,canvas.height);
    let lastTime=0;
    function animate(tinestamp){
        const deltaTime=tinestamp-lastTime;
        lastTime=tinestamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
       
    }
    animate();
});