#  EventBusJS
EventBus for Javascript. mainly used in my new VUE3 projects

It replaces the code from VUE2 :

import Vue from "vue";
const EventBus = new Vue();
export default EventBus;

But in VUE3 there is not that possibility anymore

This eventbus is pure there are no other lib during runtime.
So You can use it framework independent.
This means You can use it for communication between threejs and VUE beacuse its independand.



## . Installation
npm install eventbusjs

## . Usage 
import EventBus from 'vjseventbus';


For testing very helpful :

https://how-to.dev/how-to-set-up-jest-for-es-module

##  changelog

0.0.3  eventbus can now emit to multiple listeners