import  EventBus from "../src/eventbus.js"
import {getIndicesOfObjectInArray, __uuid} from "../src/eventbus.js"



describe("eventbus",()=>{
  test("exist",()=>{
     //EventBus.$emit("test", console.log("Yeah"))
     expect(EventBus.$on("test", (data)=>{})).toBeTruthy()
  })
  test("callback should be called",()=>{
    const callback = jest.fn();
    EventBus.$on("testName", callback)
    const payload="someText"
    EventBus.$emit("testName", payload)
     expect(callback).toHaveBeenCalledWith(payload)
  })

  test("get register", ()=> {
    const callback = jest.fn()
    EventBus.$on("testiiiiName", callback)
    const register = EventBus.$getRegister();
    expect(typeof register).toBe("object")
  })

  test("should delete register" , () => {
    const callback = jest.fn()
    EventBus.$on("blubber", callback, "a")
    EventBus.$on("blubber2", callback, "b")
    EventBus.$delRegister()
    const register = EventBus.$getRegister();
    expect(register.length).toBe(0);
  })
})

describe("helperFunctions", () => {
  it("should return an array", () => {
    const arr = [
      { atr: 1, name: "a" },
      { atr: 2, name: "b" },
      { atr: 3, name: "c" },
      { atr: 4, name: "d" },
      { atr: 5, name: "e" },
      { atr: 6, name: "f" },
      { atr: 7, name: "g" }
    ];
    const retWert = getIndicesOfObjectInArray(arr, "name", "d");
    expect(retWert.length).toEqual(1);
  });

  

describe("sending to topics", () => {
  test("send to a specific topic" , () => { 
    //EventBus is a Sinleton so clean the register explicit
    EventBus.$delRegister()
    const callback = jest.fn()
    EventBus.$on("blubber", callback, "a")
    EventBus.$on("blubber", callback, "b")
    EventBus.$emit("blubber", "payload", "a")
    expect(callback.mock.calls).toHaveLength(1); 
  });


  test("send to all topics" , () => { 
    //EventBus is a Sinleton so clean the register explicit
    EventBus.$delRegister()
    const callback = jest.fn()
    EventBus.$on("blubber", callback,"topic-a")
    EventBus.$on("blubber", callback, "topic-b")
    EventBus.$emit("blubber", "payload")
    expect(callback.mock.calls).toHaveLength(2); 
  });

  test("send to an event by id" , () => { 
    //EventBus is a Sinleton so clean the register explicit
    EventBus.$delRegister()
    const callback = jest.fn()
    const id = EventBus.$on("blubber", callback,"topic-a")
    EventBus.$emit2Id(id, "payload")
    expect(callback).toHaveBeenCalledWith("payload"); 
  });
  
  
  test("delete a topic" , () => { 
    //EventBus is a Sinleton so clean the register explicit
    EventBus.$delRegister()
    const callback = jest.fn()
    EventBus.$on("blubber", callback,"topic-a")
    EventBus.$on("blubber", callback, "topic-b")
    EventBus.$deleteTopic("topic-a")
    expect(EventBus.$getRegister()).toHaveLength(1); 
  });

  test("uniquify eventBusItem per topic" , () => { 
    //EventBus is a Sinleton so clean the register explicit
    EventBus.$delRegister()
    const callback = jest.fn()
    EventBus.$on("blubber", callback,"topic-a")
    EventBus.$on("blubber", callback, "topic-a")
    EventBus.$on("blubber", callback, "topic-a")
    expect(EventBus.$getRegister()).toHaveLength(1); 
  });

  test("$on should return a uuid" , () => { 
    //EventBus is a Sinleton so clean the register explicit
    EventBus.$delRegister()
    const callback = jest.fn()
    const someUUID="abc_some_uuid"
    EventBus.__uuid = jest.fn().mockReturnValue(someUUID)
    const rr = EventBus.__uuid()
    const retwert = EventBus.$on("blubber", callback,"topic-a")
    expect(retwert).toBe(someUUID); 
  });



  test("$on should return an empty string, when item exists in a topic" , () => { 
    //EventBus is a Sinleton so clean the register explicit
    EventBus.$delRegister()
    const callback = jest.fn()
    const someUUID="abc_some_uuid"
    EventBus.__uuid = jest.fn().mockReturnValue(someUUID)
    const rr = EventBus.__uuid()
    EventBus.$on("blubber", callback,"topic-a")
    const retwert = EventBus.$on("blubber", callback,"topic-a")
    expect(retwert).toBe(''); 
  });

  test("$on should find eventItem in topic" , () => { 
    //EventBus is a Sinleton so clean the register explicit
    EventBus.$delRegister()
    const callback = jest.fn()
    const rr = EventBus.__uuid()
    const id = EventBus.$on("blubber", callback,"topic-a")
    const finding = EventBus.$find("blubber", "topic-a")
    expect(finding).toBe(id); 
  });

  

});
});
