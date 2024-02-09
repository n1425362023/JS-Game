import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'
import {GroundEnemy,FlyingEnemy,SpiderEnemy} from './enemy.js'
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
            this.groundMargin=110;                //方便设置角色在屏幕的位置
            this.player = new Player(this);
            this.input=new InputHandler(this);
            this.player.currentState = this.player.states[0]
            this.player.currentState.enter();
            this.background = new Background(this)
            this.enemies=[];
            this.enemyTimer=0;
            this.enemyInterval=8000;



        }
        update(deltaTime){
            this.background.update(this.input.keys);
            this.player.update(this.input.keys,deltaTime);    
            if (this.enemyTimer<this.enemyInterval){
                this.enemyTimer+=deltaTime;
                
            }else{
                this.addEnemy();
                this.enemyTimer=0;
            }
            this.enemies.forEach(enemy=>{
                enemy.update(deltaTime);
            })
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy=>{
                enemy.draw(context);
            })
        }
        addEnemy(){
            this.enemies.push(new GroundEnemy(this));
            console.log(game.enemies);
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
        console.log(game.enemyTimer);
        requestAnimationFrame(animate);
    }
    animate();
});