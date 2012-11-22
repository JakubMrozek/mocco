[![Build Status](https://travis-ci.org/JakubMrozek/mocco.png)](https://travis-ci.org/JakubMrozek/mocco)

# Mocco

Mocco is simple mock library. It is very useful for mocking Node.js modules.

## Installation

    $ npm install mocco

## Example

```javascript
var mocco = require('mocco');

//example class
function Person(){}
Person.prototype.age = function(){
  return 42;
};
var person = new Person();
person.age(); //returns 42

//create Mocco class
var mock = mocco.mock(person);

//we need a special implementation of age() for tests:
mock.hijack(function age(){
  return 22;
});

//or we can do it with name and function
mock.hijack('age', function(){
  return 22;
});

//and call it
person.age(); //new returns 22, not 42

//after tests we restore our method to the original implementation
mock.restore('age');

//or we can restore all methods of Person object
mock.restore();

//or we can restore all methods of all objects
mocco.restore();

```

## License 

MIT 