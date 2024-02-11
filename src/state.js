import {Hit} from './hit.js';
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
    SCROLLINGLEFT:      10,
    SCROLLINGRIGHT:     11
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

   
    enter(game){
        game.groundMargin=110;
        this.player.frameX=0;
        this.player.MaxFrameX=6;
        this.player.frameY=0;
    }
    handleInput(input,game){
        if(input.includes('j')){
            this.player.game.attack.push(new Hit(this.player,this.player.x,this.player.y));
        }
        if((input.includes('d'))&&input.indexOf('d')>input.indexOf('a')&&input.indexOf('s')<input.indexOf('d')){
            this.player.setState(state.RUNNINGLEFT);
        }else if((input.includes('a'))&&input.indexOf('a')>input.indexOf('d')&&input.indexOf('s')<input.indexOf('a')){
            this.player.setState(state.RUNNINGRIGHT);
        }else if (input.includes('w')){
            this.player.setState(state.JUMPINGLEFT);
        }else if(input.includes('s') && this.player.onGround()){
            this.player.setState(state.SITTINGLEFT);
        }else if (input.includes('k')){
            this.player.setState(state.SCROLLINGLEFT);
        }
    }
}
export class StandingRight extends State {RIGHT
    constructor(player){
        super('STANDINGRIGHT');
        this.player = player;
    }

   
    enter(game){
        game.groundMargin=110;
        this.player.frameX=0;
        this.player.MaxFrameX=6;
        this.player.frameY=1;
    }
    handleInput(input,game){
        if(input.includes('j')){
            game.attack.push(new Hit(game.player,game.player.x,game.player.y));
        }
        if((input.includes('d'))&&input.indexOf('d')>input.indexOf('a')&&input.indexOf('s')<input.indexOf('d')){
            this.player.setState(state.RUNNINGLEFT);
        }else if((input.includes('a'))&&input.indexOf('a')>input.indexOf('d')&&input.indexOf('s')<input.indexOf('a')){
            this.player.setState(state.RUNNINGRIGHT);
        }else if (input.includes('w')){
            this.player.setState(state.JUMPINGRIGHT);
        }else if(input.includes('s') && this.player.onGround()){
            this.player.setState(state.SITTINGRIGHT);
        }else if (input.includes('k')){
            this.player.setState(state.SCROLLINGRIGHT);
        }
    }
}
export class SittingLeft extends State {
    constructor(player){
        super('SITTINGLEFT');
        this.player = player;
    }

   
    enter(game){
        game.groundMargin=110;
        this.player.frameX=0;
        this.player.MaxFrameX=4
        this.player.frameY=8;
    }
    handleInput(input,game){
        if(input.includes('j')){
            this.player.game.attack.push(new Hit(this.player,this.player.x,this.player.y));
        }
        if(input.includes('d')&&(input.indexOf('s')<input.indexOf('d'))){
            this.player.setState(state.RUNNINGLEFT);
        }else if((input.includes('a')&&(input.indexOf('s')<input.indexOf('a')))){
            this.player.setState(state.RUNNINGRIGHT);
        }else if (input.includes('w')){
            this.player.setState(state.JUMPINGLEFT);
        }else if (input.includes('k')){
            this.player.setState(state.SCROLLINGLEFT);
        }
    }
}
export class SittingRight extends State {
    constructor(player){
        super('SITTINGRIGHT');
        this.player = player;
    }

   
    enter(game){
        game.groundMargin=110;
        this.player.frameX=0;
        this.player.MaxFrameX=4
        this.player.frameY=9;
    }
    handleInput(input,game){
        if(input.includes('j')){
            this.player.game.attack.push(new Hit(this.player,this.player.x,this.player.y));
        }
        if(input.includes('a')&&(input.indexOf('s')<input.indexOf('a'))){
            this.player.setState(state.RUNNINGRIGHT);
        }else if(input.includes('d')&&(input.indexOf('s')<input.indexOf('d'))){
            this.player.setState(state.RUNNINGLEFT);
        }else if (input.includes('w')){
            this.player.setState(state.JUMPINGRIGHT);
        }else if (input.includes('k')){
            this.player.setState(state.SCROLLINGRIGHT);
        }
    }
}
export class RunningLeft extends State {
    constructor(player){
        super('RUNNINGLEFT');
        this.player = player;
    }

   
    enter(game){
        game.groundMargin=110;
        this.player.frameX=0;
        this.player.MaxFrameX=8;
        this.player.frameY=6;
        
    }
    handleInput(input,game){
        if(input.includes('j')){
            this.player.game.attack.push(new Hit(this.player,this.player.x,this.player.y));
        }
        if (input.includes('w')){
            this.player.setState(state.JUMPINGLEFT);
        }else if(input.includes('s') && this.player.onGround()&&(input.indexOf('s')>input.indexOf('d'))){
            this.player.setState(state.SITTINGLEFT); 
        }else if (input.includes('a')&&input.indexOf('a')>input.indexOf('d')&&input.indexOf('a')>input.indexOf('s')){
            this.player.setState(state.RUNNINGRIGHT);
        }else if (!input.includes('a')&&!input.includes('d')&&!input.includes('w')){
            this.player.setState(state.STANDINGLEFT); 
        }else if (input.includes('k')){
            this.player.setState(state.SCROLLINGLEFT);
        }
    }
            
}
export class RunningRight extends State {
    constructor(player){
        super('RUNNINGRIGHT');
        this.player = player;
    }

   
    enter(game){
        game.groundMargin=110;
        this.player.frameX=0;
        this.player.MaxFrameX=8;
        this.player.frameY=7;
        
    }
    handleInput(input,game){
        if(input.includes('j')){
            this.player.game.attack.push(new Hit(this.player,this.player.x,this.player.y));
        }
        if (input.includes('w')){
            this.player.setState(state.JUMPINGRIGHT);
        }else if(input.includes('s') && this.player.onGround()&&(input.indexOf('s')>input.indexOf('a')||(input.indexOf('s')>input.indexOf('d')))){
            this.player.setState(state.SITTINGRIGHT); 
        }else if (input.includes('d')&&input.indexOf('d')>input.indexOf('a')){
            this.player.setState(state.RUNNINGLEFT);
        }else if (!input.includes('a')&&!input.includes('d')&&!input.includes('w')){
            this.player.setState(state.STANDINGRIGHT); 
        }else if (input.includes('k')){
            this.player.setState(state.SCROLLINGRIGHT);
        }
    }
            
}
export class JumpingLeft extends State {
    constructor(player){
        super('JUMPINGLEFT');
        this.player = player;
    }

   
    enter(game){
        game.groundMargin=110;
        //if(this.player.onGround()) this.player.speedY-=20;
        //this.player.y += this.player.speedY;    // 错误代码：在一次跳跃函数只运行一次
        this.player.frameX=0;
        this.player.MaxFrameX=6;
        this.player.frameY=2;
    }
    handleInput(input,game){
        if(input.includes('j')){
            this.player.game.attack.push(new Hit(this.player,this.player.x,this.player.y));
        }
        if (this.player.speedY > this.player.gravity){
            this.player.setState(state.FALLINGLEFT);
        }else if (input.includes('a')&&input.indexOf('a')>input.indexOf('d')&&!this.player.onGround()){
            this.player.setState(state.FALLINGRIGHT);
        }else if (input.includes('k')){
            this.player.setState(state.SCROLLINGLEFT);
        }
    }
}
export class JumpingRight extends State {
    constructor(player){
        super('JUMPINGRIGHT');
        this.player = player;
    }

   
    enter(game){
        game.groundMargin=110;
        //if(this.player.onGround()) this.player.speedY-=20;
        //this.player.y += this.player.speedY;    // 错误代码：在一次跳跃函数只运行一次
        this.player.frameX=0;
        this.player.MaxFrameX=6;
        this.player.frameY=3;
    }
    handleInput(input,game){
        if(input.includes('j')){
            this.player.game.attack.push(new Hit(this.player,this.player.x,this.player.y));
        }
        if (this.player.speedY > this.player.gravity){
            this.player.setState(state.FALLINGRIGHT);
        }else if (input.includes('d')&&input.indexOf('d')>input.indexOf('a')&&!this.player.onGround()){
            this.player.setState(state.FALLINGLEFT);
        }else if (input.includes('k')){
            this.player.setState(state.SCROLLINGRIGHT);
        }
    }
}
export class FallingLeft extends State {
    constructor(player){
        super('FALLINGLEFT');
        this.player = player;
    }
   
    enter(game){
        game.groundMargin=110;
        this.player.frameX=0;
        this.player.MaxFrameX=6;
        this.player.frameY=4;
    }
    handleInput(input,game){
        if(input.includes('j')){
            this.player.game.attack.push(new Hit(this.player,this.player.x,this.player.y));
        }
        if (this.player.onGround()){
            this.player.setState(state.RUNNINGLEFT);
        }else if (input.includes('k')){
            this.player.setState(state.SCROLLINGLEFT);
        }
    }
}
export class FallingRight extends State {
    constructor(player){
        super('FALLINGRIGHT');
        this.player = player;
    }
   
    enter(game){
        game.groundMargin=110;
        this.player.frameX=0;
        this.player.MaxFrameX=6;
        this.player.frameY=5;
    }
    handleInput(input,game){
        if(input.includes('j')){
            this.player.game.attack.push(new Hit(this.player,this.player.x,this.player.y));
        }
        if (this.player.onGround()){
            this.player.setState(state.RUNNINGRIGHT);
        }else if (input.includes('k')){
            this.player.setState(state.SCROLLINGRIGHT);
        }
    }
}
export class ScrollingLeft extends State {
    constructor(player){
        super('SCROLLINGLEFT');
        this.player = player;
    }
   
    enter(game){
        game.groundMargin=70;
        this.player.frameX=0;
        this.player.MaxFrameX=6;
        this.player.frameY=10;
    }
    handleInput(input){
        if(!input.includes('k')&&this.player.onGround()){
            this.player.setState(state.STANDINGLEFT);
        }else if(!input.includes('k')&&!this.player.onGround()){
            this.player.setState(state.FALLINGLEFT);
        }
    }
}
export class ScrollingRight extends State {
    constructor(player){
        super('SCROLLINGRIGHT');
        this.player = player;
    }
   
    enter(game){
        game.groundMargin=70;
        this.player.frameX=0;
        this.player.MaxFrameX=6;
        this.player.frameY=11;
    }
    handleInput(input){
        if(!input.includes('k')&&this.player.onGround()){    
            this.player.setState(state.STANDINGRIGHT);
        }else if(!input.includes('k')&&!this.player.onGround()){
            this.player.setState(state.FALLINGRIGHT);
        }
    }
}

