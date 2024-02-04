import {Sitting, RUNNING,JUMPING} from './state.js';
export class Player{
    constructor(game){
        this.game=game;
        this.width=100;
        this.height=91.3;
        this.x=0;
        this.y=this.game.height-this.height;
        this.image=document.getElementById('player');
        this.frameX=0;
        this.frameY=0;
        this.MaxframeX=7;
        this.speed=0;
        this.maxSpeed=5;
        this.speedY=5;
        this.gravity=0.5;
        this.states = [new Sitting(this),new RUNNING(this),new JUMPING(this)];
        this.currentState=this.states[0];
    }
    update(input){
        this.currentState.handleInput(input);
        //键盘输入控制角色
        if (input.includes('d')&&input.indexOf('d')>input.indexOf('a')) this.x+=this.maxSpeed;
        else if (input.includes('a')&&input.indexOf('a')>input.indexOf('d')) this.x-=this.maxSpeed;
        else this.speed = 0;
        //检测角色是否到达画布边界
        if (this.x<0) this.x=0;
        else if (this.x>this.game.width-this.width) this.x=this.game.width-this.width;    
        if (this.y<0) this.y=0;
        else if (this.y>this.game.height-this.height) this.y=this.game.height-this.height;
        
        if(input.includes('w')&&input.indexOf('w')>input.indexOf('s')&&this.onGround()) this.speedY-=20;
        this.y += this.speedY;
        if (!this.onGround()) this.speedY +=this.gravity;
        else this.speedY=0;
        }
    draw(context){
         
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
    }   
  
    onGround(){
        return this.y>=this.game.height-this.height;
    }
    setState(state){
        this.currentState=this.states[state];
        this.currentState.enter();
    }
}