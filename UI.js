export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'cursive';
        this.image=document.getElementById('life');
        this.offsetY=Math.random()*0.01+0.1;
        this.turn=0;
        this.offset=0;
    }
    draw(context) {
        this.turn+=this.offsetY;
        this.offset=Math.sin(this.turn);
        context.save();
        context.shadowColor ="white";
        context.shadowOffsetX = 4;
        context.shadowOffsetY = 4;
        context.shadowBlur = 0;
        context.font="bold 30px cursive";
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //context.font = "50px serif";
        context.fillText("score: "+this.game.score, 10, 30);
        for (let i =0;i < this.game.life; i++){
            context.drawImage(this.image,30*i*1.1+10,45+this.offset, 30, 30+this.offset);
        }
        
        if(this.game.gameOver){
            context.font="bold 90px cursive";
            context.textAlign = 'center';
            context.fillStyle = this.game.fontColor;
            context.fillText("GameOver ", this.game.width*0.5, this.game.height*0.5);
        }
        context.restore();
    }
}