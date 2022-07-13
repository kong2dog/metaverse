
export default class Store {
  constructor() {
      this.state = {
          scale: 1,
          gameStarted: false,
          updatedAt: Date.now(),
          _pressed: {},
          _triggered: {},
          localPlayer: null,
          remotePlayers: [],
          disabled : false,
          LEFT: 65, //A
          UP: 87, //W
          RIGHT: 68, //D
          DOWN: 83, //S
          JUMP: 32, //Spacebar
          FIRE: 1, //Leftclick
          RESPAWN: 66, //B
          RELOAD: 82, //R
          CHAT: 17,//Strg
          STATS: 73, //I 
      };
      this.prefix = 'meta:';
      this.loaded = false;
  }

  load() {
      this.restore();
      this.loaded = true;
  }

  persist() {
      // if (this.loaded === false) return;
      // const { prefix } = this;
      // const allKeys = [];
      // Object.keys(this.state).forEach(key => {
      //     const unitValue = JSON.stringify(this.state[key]);
      //     const unitKey = prefix + key;
      //     allKeys.push(unitKey);
      //     // localStorage.setItem(unitKey, unitValue);
      // });
      // localStorage.setItem(`${prefix}store:allKeys`, JSON.stringify(allKeys));
  }

  restore() {
      const { prefix } = this;
      // const allKeys = JSON.parse(localStorage.getItem(`${prefix}store:allKeys`) || '[]');
      // allKeys.forEach(key => {
      //     const value = localStorage.getItem(key);
      //     if (value != null && key.indexOf(prefix) === 0) {
      //         const unitKey = key.replace(prefix, '');
      //         const unitValue = JSON.parse(value);
      //         this.state[unitKey] = unitValue;
      //     }
      // });
  }

  isDown(keyCode) {

    const bool = false; 
    if(this.state.disabled){
      //Only check for closing chat
      if(keyCode == this.state.CHAT && this.state._pressed[keyCode]){
        //Reload only needs to be trigger once
        if(this.state._triggered[this.state.CHAT] != true) bool = true;
        else bool = false;

        this.state._triggered[this.state.CHAT] = true;  
        
        return bool;
      }
      return false;
    }
    if(keyCode == this.state.JUMP && this.state._pressed[keyCode]){
        //Jump only needs to be trigger once
        if(this.state._triggered[this.state.JUMP] != true) bool = true;
        else bool = false;

        this.state._triggered[this.state.JUMP] = true; 
        
        return bool;
    }
    else if(keyCode == this.state.RELOAD && this.state._pressed[keyCode]){
        //Reload only needs to be trigger once
        if(this.state._triggered[this.state.RELOAD] != true) bool = true;
        else bool = false;

        this.state._triggered[this.state.RELOAD] = true;
        
        return bool;
    }
    else if(keyCode == this.state.CHAT && this.state._pressed[keyCode]){
        //Reload only needs to be trigger once
        if(this.state._triggered[this.state.CHAT] != true) bool = true;
        else bool = false;

        this.state._triggered[this.state.CHAT] = true;  
        
        return bool;
    }
    else if(keyCode == this.state.STATS && this.state._pressed[keyCode]){
            //Reload only needs to be trigger once
            if(this.state._triggered[this.state.STATS] != true) bool = true;
            else bool = false;

            this.state._triggered[this.state.STATS] = true;  
            
            return bool;
    }else{
      return this.state._pressed[keyCode];
    }     
  }

  onKeyDown(event) {
    this.state._pressed[event.keyCode] = true;
  }

  onKeyup(event) {
    delete this.state._triggered[event.keyCode];
    delete this.state._pressed[event.keyCode];
  }

  multipleCamControllsPressed() {
    let counter;
    if(this.state._pressed[this.LEFT]) counter++;
    if(this.state._pressed[this.RIGHT]) counter++; 
    if(this.state._pressed[this.UP]) counter++; 
    if(this.state._pressed[this.DOWN]) counter++;

    return counter > 1;
  }

  getState(key) {
      return this.state[key];
  }

  setState(key, state) {
      this.state[key] = state;
  }
}
