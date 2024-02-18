/*
定义Enemy父类，代表怪物的共同属性
子类继承父类，并实现类的多态
*/
class Enemy{
    constructor(){
        this.frameX=0;
        this.frameY=0;
        this.fps=20;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        this.EnemyDeletion=false;
        this.MaxFrameX=0;
        this.transparent=1;
    }
    update(deltaTime){
        this.x-=this.speedX;
        this.y+=this.speedY;
        if (this.frameTimer < this.frameInterval) {       
            this.frameTimer+=deltaTime;
        }else{ 
            if (this.frameX <this.MaxFrameX) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;  
        }
        if (this.x < -this.width) this.EnemyDeletion=true;
        if (this.y < -this.height) this.EnemyDeletion=true;
    }
    draw(context){
        //context.strokeRect(this.x,this.y,this.width*this.zoom,this.height*this.zoom);
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width*this.zoom,this.height*this.zoom);
        
    }
}


export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.groundMargin=45;
        this.zoom = 0.6;
        this.frameX=0;
        this.frameY=0;
        this.width=229;
        this.height=171;
        this.x=this.game.width;
        this.y=this.game.height-this.height-this.groundMargin;
        this.speedX=4;
        this.speedY=0;
        this.MaxFrameX=5;
        this.image=document.getElementById('GroundEnemy');
    }
    update(deltaTime){
        super.update(deltaTime);
    }
    
}
export class FlyingEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.zoom = 1.5;
        this.frameX=0;
        this.frameY=0;
        this.width=60;
        this.height=44;
        this.x=this.game.width;
        this.y=Math.random()*this.game.height*0.5;
        this.speedX=3;
        this.speedY=0;
        this.MaxFrameX=5;
        this.turn=Math.random()*0.2-0.1;
        this.angle=0;
        this.image=document.getElementById('FlyingEnemy');

       
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle+=this.turn;
        this.y+=Math.sin(this.angle);
    }
    
}
export class ZombieEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.groundMargin=110;
        this.zoom = 1;
        this.frameX=0;
        this.frameY=0;
        this.width=120.125;
        this.height=90;
        this.x=this.game.width;
        this.y=this.game.height-this.height-this.groundMargin;
        this.speedX=0;
        this.speedY=0;
        this.MaxFrameX=7;
        this.image=document.getElementById('ZombieEnemy');
    }
    update(deltaTime){
        super.update(deltaTime);
        if(this.game.input.keys.includes('d'))  this.speedX=this.game.player.maxSpeed;
        else this.speedX=0
    }
    
}  
export class GhostEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.zoom = 0.6;
        this.frameX=0;
        this.frameY=0;
        this.width=261;
        this.height=209;
        this.x=this.game.width;
        this.y=Math.random()*this.game.height*0.5;
        this.speedX=3;
        this.speedY=0;
        this.MaxFrameX=5;
        this.turn=Math.random()*0.2-0.1;
        this.angle=0;
        this.image=document.getElementById('GhostEnemy');
        
        
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle+=this.turn;
        this.y+=Math.sin(this.angle);
        this.transparent=Math.sin(this.angle)*0.5+0.95;
    }
    draw(context){
        context.save();  
        context.globalAlpha=this.transparent;
        super.draw(context);
        context.restore();  
    }
}
