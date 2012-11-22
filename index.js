/*
var mocco = require('mocco');
var User = require('./models/User');

  beforeEach(function(){
    mocco.restore();
    var mock = mocco.mock(User);
  })

  it('should do something', function(){
    mock.hijack(function findOne(){
      return 42;
    });
  })

*/


function Mocco(obj){
  this.obj = obj;
  this.methods = {};
}

Mocco.prototype.hijack = function(a, b){
  var name, replacement;  
    
  if (typeof a === 'string' && typeof b === 'function'){
    name = a;
    replacement = b;
    
  } else if (typeof a === 'function' && typeof b === 'undefined'){
    
    if (a.name === '') {
      throw new Error('Anonymous function as hijacked method isnt allowed.');  
    }
    
    name = a.name;
    replacement = a;
    
  } else {
    throw new Error('Wrong count of params. Must be 1 (named function) or 2 (name and function).');      
  }
  
  
  if (typeof this.obj[name] !== 'function') {
    throw new Error('Method: ' + name + ' does not exist.');    
  }
  
  this.methods[name] = this.obj[name];
  this.obj[name] = replacement;
  
  return this;
};

Mocco.prototype.isHijacked = function(methodName){
  return !!this.methods[methodName];      
};

Mocco.prototype.restore = function(methodName){
  if (typeof methodName !== 'undefined'){
    if (this.isHijacked(methodName)){
      this.obj[methodName] = this.methods[methodName];
      delete this.methods[methodName];
    } else {
      throw new Error('Method ' + methodName + ' is not hijacked to restore.');
    }    
 
  } else {
    for (var method in this.methods){
      this.obj[method] = this.methods[method];      
    }
  }
  
  return this;
};






var moccos = [];
//create new
exports.mock = function(obj){
  var mocco = new Mocco(obj);
  moccos.push(mocco);
  return mocco;
};

//restore all
exports.restore = function(){
  for (var i = 0; i < moccos.length; ++i) {
    moccos[i].restore();
  }    
  moccos = [];
};


