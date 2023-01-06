#  EventBusJS
EventBus for Javascript. mainly used in my new VUE3 projects
This Eventbus is used to communicate for example between threeJS and VUE or Quasar extensions to the parent extension. In some cases it replaces a store because you can save variables at one place not necesserely in VUE itself. So it is more ore less a bridge between different Frameworks.



It replaces the code from VUE2 :

import Vue from "vue";
const EventBus = new Vue();
export default EventBus;

But in VUE3 there is not that possibility anymore

This eventbus is pure there are no other lib during runtime.
So You can use it framework independent.




## . Installation
npm install eventbusjs

## . Main Usage 
import EventBus from 'vjseventbus';

EventBus.$on("blah", payload=>{console.log("payload"),<topic>})
EventBus.$emit("blah", payload, <topic>)



See file eventbus.spec.js for explicit usage


For testing very helpful :

https://how-to.dev/how-to-set-up-jest-for-es-module

##  changelog

0.0.4  added namespaceing via topics (little bit like kafka)
0.0.3  eventbus can now emit to multiple listeners