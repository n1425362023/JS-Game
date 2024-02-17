export class Message{
    constructor(information,x,y){
        this.information=information;
        this.x=x;
        this.y=y;
        this.offsetX=5;
        this.offsetY=5;
        this.messageDeletion=false;
        this.messageTimer=0;
    }
    update(){
        this.x-=(this.offsetX-this.x)*0.001;
        this.y+=(this.offsetY-this.y)*0.001;
        if(this.messageTimer<100){
            this.messageTimer++;
        }else{
            this.messageDeletion=true;
        }
    }
    draw(context){
        context.font="25px Arial";
        context.fillStyle="white";
        context.fillText(this.information,this.x,this.y);
        context.strokeStyle="black";
        context.strokeText(this.information,this.x-2,this.y-2);
    }
}
