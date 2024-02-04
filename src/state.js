const state = {
    SITTING:   0,
    RUNNING:   1,
    JUMPING:   2,
    FALLING:   3,
    SCROLLING: 4
}
class State {
    constructor(state){
        this.state = state;
        
    }

}
export class Sitting extends State {
    constructor(player){
        super('SITTING');
        this.player = player;
    }

   
    enter(){
        this.plsyer.frameY=3;
    }
    handleInput(input){
        if(input.includes('a') || input.includes('d')){
            this.player.setState(state.RUNNING);
        }
    }
}
export class Running extends State {
    constructor(player){
        super('RUNNING');
        this.player = player;
    }

   
    enter(){
        this.plsyer.frameY=5;
    }
    handleInput(input){
        if(input.includes('s') ){
            this.player.setState(state.SITTING);
        }
    }
}
export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player = player;
    }

   
    enter(){
        if(!this.plsyer.onGround()) this.player.speedY-=20;
        this.plsyer.frameY=1;  
    }
    handleInput(input){
        if(input.includes('s') ){
            this.player.setState(state.SITTING);
        }
    }
}

