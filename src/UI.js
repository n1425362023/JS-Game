//用来对游戏界面美化
export class UI {
    constructor(game) {
        this.game = game;
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
        context.shadowOffsetX = 3;
        context.shadowOffsetY = 3;
        context.shadowBlur = 0;
        context.font="bold 30px cursive";
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
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
        if(this.game.win){
            context.font="bold 90px cursive";
            context.textAlign = 'center';
            context.fillStyle = this.game.fontColor;
            context.fillText("WIN ", this.game.width*0.5, this.game.height*0.5);
        }
        context.restore();
    }
}