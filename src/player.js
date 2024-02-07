import {Sitting, Running,Jumping,Falling } from './state.js';
export class Player{
    constructor(game){
        this.game=game;
        this.width=100;
        this.height=91.3;
        this.x=0;
        this.y=this.game.height-this.height-this.game.groundMargin;
        this.speedY=5;
        this.gravity=0.5;
        this.image=document.getElementById('player');
        this.frameX=0;
        this.frameY=0;
        this.MaxFrameX=5;
        this.speed=0;
        this.maxSpeed=5;
        this.frameTimer=0;
        this.fps=15;
        this.frameInterval=1000/this.fps;
        this.frameTimer = 0;
        //状态添加
        this.states = [new Sitting(this),new Running(this),new Jumping(this),new Falling(this)];
        this.currentState=null;
    }
    update(input,deltaTime){
        //默认角色初始状态
        this.currentState.handleInput(input);
        //键盘输入控制角色
        if (input.includes('d')&&input.indexOf('d')>input.indexOf('a')) this.x+=this.maxSpeed;
        else if (input.includes('a')&&input.indexOf('a')>input.indexOf('d')) this.x-=this.maxSpeed;
        else this.speed = 0;
        //检测角色是否到达画布边界
        if (this.x<0) this.x=0;
        else if (this.x>this.game.width-this.width) this.x=this.game.width-this.width;    
        if (this.y<0) this.y=0;
        else if (this.y>this.game.height-this.height-this.game.groundMargin) this.y=this.game.height-this.height-this.game.groundMargin;
        
        /*if(input.includes('w')&&input.indexOf('w')>input.indexOf('s')&&this.onGround()) this.speedY-=20;*/
        this.y += this.speedY;
        
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
        console.log(this.frameTimer);
        console.log(this.frameX);
        运行这个conso.log(frameTimer)显示NaN(非数字的值)，原因没找到*/
        
        }
    draw(context){
         
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
    }   
  
    onGround(){
        return this.y>=this.game.height-this.height-this.game.groundMargin;
    }
    setState(state){
        //通过第23行代码被'.state.js'的handleInput执行
        this.currentState=this.states[state];
        this.currentState.enter();
    }
}