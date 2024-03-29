export class InputHandler{
    constructor(){
        this.keys = [];
        
        window.addEventListener('keydown', (e)=>{
            if((e.key === 'w'|| 
            e.key === 'a'|| 
            e.key === 's'|| 
            e.key === 'd'||
            e.key === 'j'||
            e.key === 'k'||
            e.key === 'p')&&
            this.keys.indexOf(e.key) === -1
            ){
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', (e)=>{
            if(e.key === 'w'|| 
            e.key === 'a'|| 
            e.key === 's'|| 
            e.key === 'd'||
            e.key === 'j'||
            e.key === 'k'||
            e.key === 'p'){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
} 