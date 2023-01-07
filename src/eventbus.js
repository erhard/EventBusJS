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
      this.register = []
      eventBus.instance = true
    }
    return eventBus.instance
  }


  $on(what, callback, topic = "__default") {

  //Check first wether eventname with topic exists
  const resultArray = this.register.filter(element => {
    return element["what"]==what && element["topic"]==topic;
  }) 
  let id = ""
  if (resultArray.length==0){
     id = this.__uuid()
     this.register.push({what: what,callback: callback, topic: topic, id: id})  
  }
  return id 
}

$find(name,topic="__default"){
  const result=this.register.filter(element=>{
    return element["topic"]==topic && element["what"]==name
  })
  return result[0].id || "" 
}

$emit2Id(id, payload){
  const resultArray = this.register.filter(element => {
    return element["id"]==id;
 }) 
 if(resultArray.length==1){
  const callback = resultArray[0].callback
  const retval = callback(payload) 
}
 else{
  console.log("Error id not found")
 }
}


$deleteTopic(topic){
  this.register=this.register.filter(element=>{
    return element["topic"]!=topic
  })
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


$emit(target, payload,namespace=null){
  let indexArray = getIndicesOfObjectInArray(this.register,"what",target)
  if(namespace){
    indexArray=getIndicesOfObjectInArray(indexArray,"topic",namespace)
  }
  //Callback can be asyn therefore a for loop
  for (let i=0; i<indexArray.length; i++){
    const callback = indexArray[i].callback
    const retval = callback(payload)
  }

}

$getRegister(){
  return this.register
}

//only if uuid is a method of a class it is mockable
__uuid(){
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  const uuid = s.join("");
  return uuid;
}

}

//Some Helper functions
//Do not export this function to keep in local env !

export const getIndicesOfObjectInArray = (arr,field,value) => {
       const resultArray = arr.filter(element => {
       return element[field]==value;
    })
    return(resultArray);
  }



  const EventBus = new eventBus()
  //Object.freeze(EventBus)
  
  export default EventBus
  
