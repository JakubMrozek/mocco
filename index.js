
/**
 * Mock class with original methods.
 * 
 * obj is class or object.
 * 
 * @param {Mixed} obj
 */
function Mocco(obj){
  this.obj = obj;
  this.methods = {};
}

/**
 * Hijack one method.
 * 
 * There are two possible options how to hijack method:
 * 
 * a) with two params (method name and mock function):
 * 
 *   var person = new Person();
 *   mock = mocco.mock(person);
 *   mock.hijack('age', fucntion(){
 *     return 22;
 *   });
 *   person.age(); //returns 22
 * 
 * b) with named function:
 * 
 *   var person = new Person();
 *   mock = mocco.mock(person);
 *   mock.hijack(function age(){
 *     return 22;
 *   });
 *   person.age(); //returns 22
 * 
 * 
 * @param {String} a
 * @param {Function} b
 * @return {Mocco}
 */ 

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
  
  //method doesnt exist in object
  if (typeof this.obj[name] !== 'function') {
    throw new Error('Method: ' + name + ' does not exist.');    
  }
  
  this.methods[name] = this.obj[name];
  this.obj[name] = replacement;
  
  return this;
};

/**
 * Is method hijacked?
 * 
 * @param {String} methodName
 * @return {Boolean}
 */
Mocco.prototype.isHijacked = function(methodName){
  return !!this.methods[methodName];      
};


/**
 * Restore one or all methods.
 * 
 * @param {String} methodName
 * @return {Mocco}
 */
Mocco.prototype.restore = function(methodName){
  
  //restore only one specific method
  if (typeof methodName !== 'undefined'){
    if (this.isHijacked(methodName)){
      this.obj[methodName] = this.methods[methodName];
      delete this.methods[methodName];
    } else {
      throw new Error('Method ' + methodName + ' is not hijacked to restore.');
    }    
 
  //restore all methods
  } else {
    for (var method in this.methods){
      this.obj[method] = this.methods[method];      
    }
  }
  
  return this;
};

/**
 * Array with all mock objects/classes/modules.
 */

var moccos = [];

/**
 * Creates new Mock object from object or class.
 * 
 * @param {Object} obj
 */

exports.mock = function mock(obj){
  var mocco = new Mocco(obj);
  moccos.push(mocco);
  return mocco;
};

/**
 * Restrore all objects.
 */

exports.restore = function restore(){
  for (var i = 0; i < moccos.length; ++i) {
    moccos[i].restore();
  }    
  moccos = [];
};


