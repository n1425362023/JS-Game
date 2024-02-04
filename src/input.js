export class InputHandler{
    constructor(){
        this.keys = [];
        
        window.addEventListener('keydown', (e)=>{
            if((e.key === 'w'|| 
            e.key === 'a'|| 
            e.key === 's'|| 
            e.key === 'd'||
            e.key === 'j'||
            e.key === 'p')&&
            this.keys.indexOf(e.key) === -1
            ){
                this.keys.push(e.key);
                console.log(e.keys);
            }
        });
        window.addEventListener('keyup', (e)=>{
            if(e.key === 'w'|| 
            e.key === 'a'|| 
            e.key === 's'|| 
            e.key === 'd'||
            e.key === 'j'||
            e.key === 'p'){
                this.keys.splice(this.keys.indexOf(e.key), 1);
                console.log(e.keys);
            }
        });
    }
} 