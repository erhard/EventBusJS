/** So what does a eventbus do and how it does work ?
 * 
 *   registering the function in an array is done by $on
 *   This function is called by the $emit by itrating throu the array
 *   searching the what and executing the function with a payload
 *   
 *   This eventbus replace the old Eventbus which was integrated in VUE2
 *   for my purposes ....
 * 
 *    The old code was simply 
 *    import Vue from "vue";
 *    const EventBus = new Vue();
 *    export default EventBus;
 */


class eventBus {

  constructor(){
    if(eventBus.instance == null){
      console.log("Instantiating Register");
      this.register = []
      eventBus.instance = true
    }
    return eventBus.instance
  }


  $on(what, callback, receiver = "default") {
  this.register.push({what: what,callback: callback, receiver: receiver})  
  return true
}

$delRegister(){
   //At first delete all
    let l = this.register.length 
    while (l>0){
      //Do it in a loop because later on the receiver can be consitioned
       this.register.splice(0,1)
     l=l-1
   }  
  }


$emit(target, payload){
  const index = getIndexOfObjectInArray(this.register,"what",target)
  if(index > -1){
  const callback = this.register[index].callback
  const retval = callback(payload)
  } else
  {
    console.log("envent " + target + " not found");
  }
}

$getRegister(){
  return this.register
}
}


const EventBus = new eventBus()
Object.freeze(EventBus)

export default EventBus



//Some Helper functions

export const getIndexOfObjectInArray=(arr,field,value) => {
    const index = arr.findIndex(element => {
       return element[field]==value;
    })
    return(index);
  }
