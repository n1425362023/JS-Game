import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'
import {GroundEnemy,FlyingEnemy,ZombieEnemy} from './enemy.js'
import {UI} from './UI.js'
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
            this.enemyInterval=1000;
            this.score=0;
            this.UI=new UI(this);
            this.fontColor='black';


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
                if (enemy.EnemyDeletion) this.enemies.splice(this.enemies.indexOf(enemy),1);
                
            })
        }
        draw(context){
            
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy=>{
                enemy.draw(context);
            })
            this.UI.draw(context);
            console.log(this.UI);
            
        }
        addEnemy(){
            if(Math.random()<0.2?1:0)this.enemies.push(new GroundEnemy(this));
            else if(Math.random()<0.2?1:0) this.enemies.push(new ZombieEnemy(this));
            if(Math.random()<0.5)this.enemies.push(new FlyingEnemy(this));
            //console.log(game.enemies);
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