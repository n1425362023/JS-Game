import {SpiderAttack} from "./hit.js";
class Boss{
    constructor(){
        this.zoom=1;
        this.frameX=0;
        this.frameY=0;
        this.fps=20;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        this.EnemyDeletion=false;
        this.MaxFrameX=0;
        this.attack=[];
        this.hp=1000;
        this.Cooldown=0;
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
        if (this.x < -this.width*this.zoom) this.EnemyDeletion=true;
        if (this.y < -this.height*this.zoom-1) this.EnemyDeletion=true;
    }
    draw(context){
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width*this.zoom,this.height*this.zoom);
        
    }
}
export class SpiderEnemy extends Boss{
    constructor(game){
        super();
        this.game=game;
        this.zoom = 1.5;
        this.frameX=0;
        this.frameY=0;
        this.width=310;
        this.height=175;
        this.x=this.game.width*0.3;
        this.y=-this.height;
        this.speedX=0;
        this.speedY=Math.random()<0.5?-1:1;
        this.MaxFrameX=5;
        this.turn=Math.random()*0.2-0.1;
        this.angle=0;
        
        this.image=document.getElementById('SpiderEnemy');
        
        
    }
    update(deltaTime){
        super.update(deltaTime);
        if(this.y>this.game.height-this.height*this.zoom-this.game.groundMargin*1.3 || this.y<-this.height*this.zoom){
            this.speedY*=-1;
        }
        this.hit(deltaTime);
       
    }
    draw(context){
        super.draw(context)
        context.save()  
        context.beginPath();
        context.moveTo(this.x+this.width*this.zoom/2,0);
        context.lineTo(this.x+this.width*this.zoom/2,this.y+10);
        context.stroke();
        context.restore()  
        this.attack.forEach(attack=>{
            attack.draw(context);
        })
        this.HP(context);
    }
    HP(context){
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(300,0,this.hp,30);
    }
    hit(deltaTime){
        if(this.Cooldown<3){
            this.Cooldown+=deltaTime*0.001;
        }else{
            
            if(this.attack.length<3){
                for(let i=0;i<3;i++){
                    this.attack.push(new SpiderAttack(this));
                }
            }
            this.Cooldown=0;
        }
        this.attack.forEach(attack=>{
            attack.update();
            if (attack.HitDeletion) this.attack.splice(this.attack.indexOf(attack),1);
        })
    }
    checkcollision(){
        this.attack.forEach(attack=> {
    
            if (attack.x < this.game.player.x + this.game.player.width &&
                attack.x + attack.width * attack.zoom > this.game.player.x &&
                attack.y < this.game.player.y + this.game.player.height &&
                attack.y + attack.height * attack.zoom > this.game.player.y
            ){
                attack.HitDeletion = true;
                this.game.life--;
                if (this.game.life <= 0) {
                    this.game.gameOver = true;
                }
            }
        })    


    }
}
