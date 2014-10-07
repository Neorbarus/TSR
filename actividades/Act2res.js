var ev = require('events');
var emitter = new ev.EventEmitter;
var e1 = "uno";
var e2 = "dos";
var e3 = "tres";

// Constructor for class Listener.
function Listener(n1,n2, n3) {
  this.num1 = 0;
  this.name1 = n1;
  this.intervalo1 = 3000;
  this.num2 = 0;
  this.name2 = n2;
  this.intervalo2 = 2000;
  this.num3 = 0;
  this.name3 = n3;
  this.intervalo3 = 10000;
}

Listener.prototype.event1 = function() {
  this.num1++;
  console.log("["+this.intervalo1+"] Listener activo");
}

Listener.prototype.event2 = function() {
  this.num2++;
  if(this.num2 > this.num1) {
    console.log("["+this.intervalo2+"] Evento dos");
  }
  else {
    console.log("["+this.intervalo2+"] Tengo más eventos de tipo uno");
  }
}

Listener.prototype.event3 = function(a) {
  this.num3++;
  console.log("["+this.intervalo3+"] Evento tres");
  this.intervalo2 = this.intervalo2 * 2;
  if(this.intervalo2 > 9000) {
    this.intervalo2 = 9000;
  }
  clearInterval(a);
  interval2 = setInterval(function() {
    emitter.emit(e2);
  }, lis.intervalo2);
}

// Creamos el Listener con los 3 eventos
var lis = new Listener(e1,e2,e3);

// Listener is registered on the event emitter.
emitter.on(e1, function() {lis.event1()});
emitter.on(e2, function() {lis.event2()});
emitter.on(e3, function(x) {lis.event3(x)});

setInterval(function() {
  emitter.emit(e1);
}, lis.intervalo1);

var interval2 = setInterval(function() {
  emitter.emit(e2);
}, lis.intervalo2);

setInterval(function() {
  emitter.emit(e3, interval2);
}, lis.intervalo3);