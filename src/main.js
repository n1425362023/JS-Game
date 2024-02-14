import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'
import {GroundEnemy,FlyingEnemy,ZombieEnemy,GhostEnemy} from './enemy.js'
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
            this.life =4;
            this.gameOver=false;
            this.width=width;
            this.height=height;
            this.groundMargin=110;                //方便设置角色在屏幕的位置
            this.enemies=[];
            this.enemyTimer=0;
            this.enemyInterval=1000;
            this.score=0;
            this.attack=[];
            this.collision=[];
            this.message=[];
            this.player = new Player(this);
            this.input=new InputHandler(this);
            this.player.currentState = this.player.states[1];
            this.player.currentState.enter(this);
            this.background = new Background(this)
            this.UI=new UI(this);
            this.fontColor='black';
            this.sound=new Audio;
            this.sound.src='../material/music.mp3';

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
            this.attack.forEach(attack=>{
                attack.update();
                if (attack.HitDeletion) this.attack.splice(this.attack.indexOf(attack),1);
            })
            this.collision.forEach(collision=>{
                collision.update(deltaTime);
                if (collision.collisionDeletion) this.collision.splice(this.collision.indexOf(collision),1);
            })
            this.message.forEach(message=>{
                message.update();
                if(message.messageDeletion) this.message.splice(this.message.indexOf(message),1);
            })
        }
        draw(context){
            
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy=>{
                enemy.draw(context);
            })
            this.attack.forEach(attack=>{
                attack.draw(context);
            })
            this.collision.forEach(collision=>{
                collision.draw(context);
            })
            this.message.forEach(message=>{
                message.draw(context);
            })
            this.UI.draw(context);
            
        }
        //敌人生成
        addEnemy(){
            if(Math.random()<0.2)this.enemies.push(new GroundEnemy(this));
            else if(Math.random()<0.1&&this.score<30) this.enemies.push(new ZombieEnemy(this));
            if(Math.random()<0.8)this.enemies.push(new FlyingEnemy(this));
            if(Math.random()<0.5)this.enemies.push(new GhostEnemy(this));
            //console.log(game.enemies);
        }
    }


    const game=new Game(canvas.width,canvas.height);
    let lastTime=0;
    function animate(timestamp){
        
        const deltaTime=timestamp-lastTime;
        lastTime=timestamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver){
            requestAnimationFrame(animate);
            game.sound.play();
        }else{
            game.sound.pause();
        }
    }
    animate(0);
});