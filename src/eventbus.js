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
      globalThis.EventBus_register = []
      globalThis.EventBus_data = {}
      globalThis.EventBus_data["versionNumer"]=9
      eventBus.instance = true
    }
    return eventBus.instance
  }

  $version(){
    return globalThis.EventBus_data["versionNumber"]
  }
  $on(what, callback, topic = "__default") {

  //Check first wether eventname with topic exists
  const resultArray = globalThis.EventBus_register.filter(element => {
    return element["what"]==what && element["topic"]==topic;
  }) 
  let id = ""
  if (resultArray.length==0){
     id = this.__uuid()
     globalThis.EventBus_register.push({what: what,callback: callback, topic: topic, id: id})  
  }
  return id 
}

$find(name,topic="__default"){
  const result=globalThis.EventBus_register.filter(element=>{
    return element["topic"]==topic && element["what"]==name
  })
  return result[0].id || "" 
}

$emit2Id(id, payload){
  const resultArray = globalThis.EventBus_register.filter(element => {
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
    globalThis.EventBus_register=globalThis.EventBus_register.filter(element=>{
    return element["topic"]!=topic
  })
}


$delRegister(){
   //At first delete all
    let l = globalThis.EventBus_register.length 
    while (l>0){
      //Do it in a loop because later on the receiver can be consitioned
      globalThis.EventBus_register.splice(0,1)
     l=l-1
   }  
  }


$emit(target, payload,namespace=null){
  let indexArray = getIndicesOfObjectInArray(globalThis.EventBus_register,"what",target)
  if(namespace){
    indexArray=getIndicesOfObjectInArray(indexArray,"topic",namespace)
  }
  //Callback can be asyn therefore a for loop
  for (let i=0; i<indexArray.length; i++){
    const callback = indexArray[i].callback
    const retval = callback(payload)
  }

}

$emit2Topic(topic,payload){
  let topicArray = getIndicesOfObjectInArray(globalThis.EventBus_register,"topic",topic)
  for (let i=0; i<topicArray.length; i++){
    const callback = topicArray[i].callback
    const retval = callback(payload)
  }
}




$getRegister(){
  return globalThis.EventBus_register 
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
  console.log ("Enventbus installed globally !") 

  //Object.freeze(EventBus)
  
  export default EventBus
  
