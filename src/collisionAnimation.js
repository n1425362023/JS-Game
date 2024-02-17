export class  CollisionAnimation{
    constructor(game, x, y) {
        this.game=game;
        this.x=x;
        this.y=y;
        this.width=200;
        this.height=179;
        this.zoom=Math.random()*0.8;
        this.image=document.getElementById('enemydeath')
        this.frameX=0;
        this.MaxFrameX=4;
        this.fps=15;
        this.frameInterval=1000/this.fps;
        this.frameTimer = 0;
        this.sound=new Audio();
        this.sound.src="../material/explore.wav";
        this.collisionDeletion=false;
    }
    
    draw(context){
        context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,this.x,this.y,this.width*this.zoom,this.height*this.zoom)
    }
    update(deltaTime){
        this.sound.play();
        if (this.frameTimer < this.frameInterval) {       
            this.frameTimer+=deltaTime;
        }else{ 
            if (this.frameX < this.MaxFrameX) this.frameX++;
            else this.collisionDeletion=true;
            this.frameTimer = 0;  
        }
    }
}