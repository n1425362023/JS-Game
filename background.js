class Backer {
    constructor(game,width,height,backgroundspeed,image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.image = image;
        this.x = 0;
        this.y = 0;
        this.backgroundspeed = backgroundspeed;
    }
    update(input){
        if (this.x < -this.width)  this.x = 0;
        if (input.includes('d')&&input.indexOf('d')>input.indexOf('a')&&this.game.score<30) this.x-=this.game.player.maxSpeed*this.backgroundspeed;
        /*else if (input.includes('a')&&input.indexOf('a')>input.indexOf('d')) this.x+=this.game.player.maxSpeed*this.backgroundspeed;
        此代码注释原因是当游戏刚开始，角色向左移动时，背景向右移动，造成白幕
        所以注释掉,背景只能当角色向右移动时移动，若你有解决办法可自行优化*/ 
    }
    draw(context){
        context.drawImage(this.image,this.x,this.y,this.width,this.height);
        context.drawImage(this.image,this.x+this.width,this.y,this.width,this.height);
    }
}
export class Background{
    constructor(game){
        this.game = game;
        this.width=1667*1.5;
        this.height=500*1.5;
        this.image1 = document.getElementById('background1');
        this.image2 = document.getElementById('background2');
        this.image3 = document.getElementById('background3');
        this.image4 = document.getElementById('background4');
        this.image5 = document.getElementById('background5');
        this.BackerArry1=new Backer(this.game,this.width,this.height,2.3,this.image1);
        this.BackerArry2=new Backer(this.game,this.width,this.height,2.2,this.image2);
        this.BackerArry3=new Backer(this.game,this.width,this.height,2.2,this.image3);
        this.BackerArry4=new Backer(this.game,this.width,this.height,2,this.image4);
        this.BackerArry5=new Backer(this.game,this.width,this.height,2,this.image5);
        this.BackerArry=[this.BackerArry1,this.BackerArry2,this.BackerArry3,this.BackerArry4,this.BackerArry5];
    }
    update(input){
        this.BackerArry.forEach(Backer=>{
            Backer.update(input);
        });
    }
    draw(context){
        this.BackerArry.forEach(Backer=>{
            Backer.draw(context);
        });
    }
}
    