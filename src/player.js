import {CollisionAnimation} from './collisionAnimation.js'
import {Message} from './message.js'
import {
    StandingLeft,
    StandingRight,
    SittingLeft,
    SittingRight,
    RunningLeft,
    RunningRight,
    JumpingLeft,
    JumpingRight,
    FallingLeft,
    FallingRight,
    ScrollingLeft,
    ScrollingRight 
} from './state.js';
export class Player{
    constructor(game){
        this.game=game;
        this.width=200;
        this.height=182;
        this.x=0;
        this.y=this.game.height-this.height-this.game.groundMargin;
        this.speedY=5;
        this.gravity=0.5;
        this.image=document.getElementById('player');
        this.frameX=0;
        this.frameY=0;
        this.MaxFrameX=5;
        this.direction=1;
        this.maxSpeed=5;
        this.frameTimer=0;
        this.fps=15;
        this.frameInterval=1000/this.fps;
        this.frameTimer = 0;
        //状态添加
        this.states = [
            new StandingLeft(this),
            new StandingRight(this),
            new SittingLeft(this),
            new SittingRight(this),
            new RunningLeft(this),
            new RunningRight(this),
            new JumpingLeft(this),
            new JumpingRight(this),
            new FallingLeft(this),
            new FallingRight(this),
            new ScrollingLeft(this),
            new ScrollingRight(this)
        ]
        this.currentState=null;
    }
    update(input,deltaTime){
        this.checkcollision();
        //默认角色初始状态
        this.currentState.handleInput(input,this.game);
        //键盘输入控制角色
        if (input.includes('d')&&input.indexOf('d')>input.indexOf('a')){
            this.x+=this.maxSpeed;
            this.direction=1;
        }  else if (input.includes('a')&&input.indexOf('a')>input.indexOf('d')){
            this.x-=this.maxSpeed*1.5;
            this.direction=-1.5;
        } 
       
        if(input.includes('w')&&input.indexOf('w')>input.indexOf('s')&&this.onGround()) this.speedY-=20;
        this.y += this.speedY;
        //检测角色是否到达画布边界
        
        
        if(this.game.score<50){
            if (this.x<0) this.x=0;
            else if (this.x>this.game.width*3/5) this.x=this.game.width*3/5;    
            if (this.y<0) this.y=0;
            else if (this.y>this.game.height-this.height-this.game.groundMargin) this.y=this.game.height-this.height-this.game.groundMargin;
        }else if(this.game.score>=50){
            if (this.x<0) this.x=0;
            else if (this.x>this.game.width-this.width) this.x=this.game.width-this.width;    
            if (this.y<0) this.y=0;
            else if (this.y>this.game.height-this.height-this.game.groundMargin) this.y=this.game.height-this.height-this.game.groundMargin;
        }
        
        
        
        if (!this.onGround()) this.speedY +=this.gravity;
        else this.speedY=0;
        if (this.frameTimer < this.frameInterval) {       
            this.frameTimer+=deltaTime;
        }else{ 
            if (this.frameX < this.MaxFrameX) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;  
            
        }
        /*if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.MaxFrameX) this.frameX++;
            else this.frameX = 0;
            
        }else{ 
            this.frameTimer+=deltaTime;
            
            
        }
        console.log(deltaTime);
        console.log(this.frameTimer)
        console.log(this.frameX);
        运行这个conso.log(frameTimer)显示NaN(非数字的值)，原因没找到*/
        }
    draw(context){
        //context.strokeRect(this.x,this.y,this.width,this.height);
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
    }   
  
    onGround(){
        return this.y>=this.game.height-this.height-this.game.groundMargin;
    }
    setState(state){
        //通过第55行代码被'.state.js'的handleInput执行
        this.currentState=this.states[state];
        this.currentState.enter(this.game);
    }
    checkcollision(){
        this.game.enemies.forEach(enemy=>{
            const dx=(enemy.x+enemy.width*enemy.zoom/2-20)-(this.x+this.width/2)
            const dy=(enemy.y+enemy.height*enemy.zoom/2)-(this.y+this.height/2+20)
            const distance=Math.sqrt(dx*dx+dy*dy)
            if(
                distance<enemy.width/3+this.width/3&&
                enemy.transparent>0.9
                ){
                enemy.EnemyDeletion=true;
                this.game.collision.push(new CollisionAnimation(this.game,enemy.x,enemy.y));
                if(this.currentState===this.states[10]||this.currentState===this.states[11]){
                    this.game.score++;
                    this.game.message.push(new Message("+1",enemy.x,enemy.y));
                }else{
                    this.game.life --;
                    if(this.game.life<=0) this.game.gameOver=true;
                }
            }
            this.game.attack.forEach(attack=>{

                if(attack.x<enemy.x+enemy.width&&
                    attack.x+attack.width*attack.zoom>enemy.x&&
                    attack.y<enemy.y+enemy.height&&
                    attack.y+attack.height*attack.zoom>enemy.y&&
                    enemy.transparent>0.9
                ){
                    enemy.EnemyDeletion=true;
                    attack.HitDeletion=true;
                    this.game.collision.push(new CollisionAnimation(this.game,enemy.x,enemy.y));
                    this.game.score++;
                    this.game.message.push(new Message("+1",enemy.x,enemy.y));
                }
            })
        })
    }
}