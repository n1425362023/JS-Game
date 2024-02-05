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
        this.player.frameY=5;
    }
    handleInput(input){
        if(input.includes('a') || input.includes('d')){
            this.player.setState(state.RUNNING);
        }else if (input.includes('w')){
            this.player.setState(state.JUMPING);
        }else if (input.includes('s') && !this.player.onGround()){
            this.player.setState(state.FALLING);
        }
    }
}
export class Running extends State {
    constructor(player){
        super('RUNNING');
        this.player = player;
    }

   
    enter(){
        this.player.frameY=3;
    }
    handleInput(input){
        if (input.includes('w')){
            this.player.setState(state.JUMPING);
        }else if (input.includes('s') && !this.player.onGround()){
            this.player.setState(state.FALLING);
        }else if(input.includes('s') && this.player.onGround()){
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
        if(!this.player.onGround()) this.player.speedY-=20;
        this.player.frameY=1;
    }
    handleInput(input){
        if (this.player.onGround()){
            this.player.setState(state.FALLING);
        }
    }
}
export class Falling extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    }

   
    enter(){
        this.player.frameY=2;
    }
    handleInput(input){
        if (this.player.onGround()){
            this.player.setState(state.RUNNING);
        }
    }
}

