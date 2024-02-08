const state = {
    STANDINGLEFT:       0,
    STANDINGRIGHT:      1,
    SITTINGLEFT:        2,
    SITTINGRIGHT:       3,
    RUNNINGLEFT:        4,
    RUNNINGRIGHT:       5,
    JUMPINGLEFT:        6,
    JUMPINGRIGHT:       7,
    FALLINGLEFT:        8,
    FALLINGRIGHT:       9,
    SCROLLING:          10
}
class State {
    constructor(state){
        this.state = state;
        
    }

}
export class StandingLeft extends State {
    constructor(player){
        super('STANDINGLEFT');
        this.player = player;
    }

   
    enter(){
        this.player.MaxFrameX=6;
        this.player.frameY=0;
    }
    handleInput(input){
        if((input.includes('d'))&&input.indexOf('d')>input.indexOf('a')&&input.indexOf('s')<input.indexOf('d')){
            this.player.setState(state.RUNNINGLEFT);
        }else if((input.includes('a'))&&input.indexOf('a')>input.indexOf('d')&&input.indexOf('s')<input.indexOf('a')){
            this.player.setState(state.RUNNINGRIGHT);
        }else if (input.includes('w')){
            this.player.setState(state.JUMPINGLEFT);
        }else if(input.includes('s') && this.player.onGround()){
            this.player.setState(state.SITTINGLEFT);
        }else if (input.includes('s') && !this.player.onGround()){
            this.player.setState(state.FALLING);
        }
    }
}
export class StandingRight extends State {
    constructor(player){
        super('STANDINGLEFT');
        this.player = player;
    }

   
    enter(){
        this.player.MaxFrameX=6;
        this.player.frameY=1;
    }
    handleInput(input){
        if((input.includes('d'))&&input.indexOf('d')>input.indexOf('a')&&input.indexOf('s')<input.indexOf('d')){
            this.player.setState(state.RUNNINGLEFT);
        }else if((input.includes('a'))&&input.indexOf('a')>input.indexOf('d')&&input.indexOf('s')<input.indexOf('a')){
            this.player.setState(state.RUNNINGRIGHT);
        }else if (input.includes('w')){
            this.player.setState(state.JUMPINGRIGHT);
        }else if(input.includes('s') && this.player.onGround()){
            this.player.setState(state.SITTINGRIGHT);
        }else if (input.includes('s') && !this.player.onGround()){
            this.player.setState(state.FALLING);
        }
    }
}
export class SittingLeft extends State {
    constructor(player){
        super('SITTINGLEFT');
        this.player = player;
    }

   
    enter(){
        this.player.MaxFrameX=4
        this.player.frameY=8;
    }
    handleInput(input){
        if(input.includes('d')&&(input.indexOf('s')<input.indexOf('d'))){
            this.player.setState(state.RUNNINGLEFT);
        }else if((input.includes('a')&&(input.indexOf('s')<input.indexOf('a')))){
            this.player.setState(state.RUNNINGRIGHT);
        }else if (input.includes('w')){
            this.player.setState(state.JUMPINGLEFT);
        }
    }
}
export class SittingRight extends State {
    constructor(player){
        super('SITTINGRIGHT');
        this.player = player;
    }

   
    enter(){
        this.player.MaxFrameX=4
        this.player.frameY=9;
    }
    handleInput(input){
        if(input.includes('a')&&(input.indexOf('s')<input.indexOf('a'))){
            this.player.setState(state.RUNNINGRIGHT);
        }else if(input.includes('d')&&(input.indexOf('s')<input.indexOf('d'))){
            this.player.setState(state.RUNNINGLEFT);
        }else if (input.includes('w')){
            this.player.setState(state.JUMPINGRIGHT);
        }
    }
}
export class RunningLeft extends State {
    constructor(player){
        super('RUNNINGLEFT');
        this.player = player;
    }

   
    enter(){
        this.player.MaxFrameX=8;
        this.player.frameY=6;
        
    }
    handleInput(input){
        if (input.includes('w')){
            this.player.setState(state.JUMPINGLEFT);
        }else if(input.includes('s') && this.player.onGround()&&(input.indexOf('s')>input.indexOf('d')||(input.indexOf('s')>input.indexOf('d')))){
            this.player.setState(state.SITTINGLEFT); 
        }else if (input.includes('a')&&input.indexOf('a')>input.indexOf('d')){
            this.player.setState(state.RUNNINGRIGHT);
        }else if (!input.includes('a')&&!input.includes('d')&&!input.includes('w')){
            this.player.setState(state.STANDINGLEFT); 
        }
    }
            
}
export class RunningRight extends State {
    constructor(player){
        super('RUNNINGRIGHT');
        this.player = player;
    }

   
    enter(){
        this.player.MaxFrameX=8;
        this.player.frameY=7;
        
    }
    handleInput(input){
        if (input.includes('w')){
            this.player.setState(state.JUMPINGRIGHT);
        }else if(input.includes('s') && this.player.onGround()&&(input.indexOf('s')>input.indexOf('a')||(input.indexOf('s')>input.indexOf('d')))){
            this.player.setState(state.SITTINGRIGHT); 
        }else if (input.includes('d')&&input.indexOf('d')>input.indexOf('a')){
            this.player.setState(state.RUNNINGLEFT);
        }else if (!input.includes('a')&&!input.includes('d')&&!input.includes('w')){
            this.player.setState(state.STANDINGRIGHT); 
        }
    }
            
}
export class JumpingLeft extends State {
    constructor(player){
        super('JUMPINGLEFT');
        this.player = player;
    }

   
    enter(){
        
        if(this.player.onGround()) this.player.speedY-=20;
        //this.player.y += this.player.speedY;    // 错误代码：在一次跳跃函数只运行一次
        this.player.MaxFrameX=6;
        this.player.frameY=2;
    }
    handleInput(input){
        if (this.player.speedY > this.player.gravity){
            this.player.setState(state.FALLINGLEFT);
        }else if (input.includes('a')&&input.indexOf('a')>input.indexOf('d')&&!this.player.onGround()){
            this.player.setState(state.FALLINGRIGHT);
        }
    }
}
export class JumpingRight extends State {
    constructor(player){
        super('JUMPINGRIGHT');
        this.player = player;
    }

   
    enter(){
        
        if(this.player.onGround()) this.player.speedY-=20;
        //this.player.y += this.player.speedY;    // 错误代码：在一次跳跃函数只运行一次
        this.player.MaxFrameX=6;
        this.player.frameY=3;
    }
    handleInput(input){
        if (this.player.speedY > this.player.gravity){
            this.player.setState(state.FALLINGRIGHT);
        }else if (input.includes('d')&&input.indexOf('d')>input.indexOf('a')&&!this.player.onGround()){
            this.player.setState(state.FALLINGLEFT);
        }
    }
}
export class FallingLeft extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    }
   
    enter(){
        this.player.MaxFrameX=6;
        this.player.frameY=4;
    }
    handleInput(input){
        if (this.player.onGround()){
            this.player.setState(state.RUNNINGLEFT);
        }
    }
}
export class FallingRight extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    }
   
    enter(){
        this.player.MaxFrameX=6;
        this.player.frameY=5;
    }
    handleInput(input){
        if (this.player.onGround()){
            this.player.setState(state.RUNNINGRIGHT);
        }
    }
}

