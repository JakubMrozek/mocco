var mocco = require('../');

/**
 * Test classes.
 */

var Person = function(){}
Person.prototype.age = function(){
  return 42;    
}
Person.prototype.name = function(){
  return 'James Bond';    
}
Person.carName = function(){
  return 'Aston Martin';    
}

var Dog = function(){}
Dog.prototype.speak = function(){
  return 'haf';    
}


/**
 * Tests.
 */

describe('mocco', function() {
    
  it('should hijack() one method of object with two params', function(){
    var person = new Person();
    var mock = mocco.mock(person);  
    
    mock.hijack('age', function(){
      return 22;    
    });
    
    person.age().should.eql(22);
    mock.restore();
    person.age().should.eql(42);
    
  });
  
  
  it('should hijack() one method of class with two params', function(){
    var person = new Person();
    var mock = mocco.mock(Person);  
    
    mock.hijack('carName', function(){
      return 'Porsche';    
    });
    
    Person.carName().should.eql('Porsche');
    mock.restore();
    Person.carName().should.eql('Aston Martin');
  });
  
  
  it('should hijack() one method of object with one param (fc)', function(){
    var person = new Person();
    var mock = mocco.mock(person); 
    
    mock.hijack(function age(){
      return 22;    
    });
    
    person.age().should.eql(22);
    mock.restore();
    person.age().should.eql(42);
    
  });  
  
  
  it('should throw exception if hijack() has wrong params', function(){
    var person = new Person();
    var mock = mocco.mock(person); 
    
    var err = null;
    try {
      mock.hijack(1, 2);
      
    } catch(e) {
      err = e;
    } finally {
      err.should.be.instanceof(Error);    
    }

  });
  
  
  it('should throw exception if hijack() has one anonymous function', function(){
    var person = new Person();
    var mock = mocco.mock(person);  
    
    var err = null;
    try {
      mocco.hijack(function(){
        return 22;    
      });
      
    } catch(e) {
      err = e;
    } finally {
      err.should.be.instanceof(Error);    
    }
    
  });    
  
  
  it ('should throw exception if hijacked method doesnt exist in original object', function(){
    var person = new Person();
    var mock = mocco.mock(person);  
    
    var err = null;
    try {
      mocco.hijack(function abc(){
        return 22;    
      });
      
    } catch(e) {
      err = e;
    } finally {
      err.should.be.instanceof(Error);    
    }
    
  });
  
  it ('should throw exception if method hasnt been hijacted.', function(){
    var person = new Person();
    var mock = mocco.mock(person);  
    
    var err = null;
    try {
      mock.restore('abc');
      
    } catch(e) {
      err = e;
    } finally {
      err.should.be.instanceof(Error);    
    }
    
  });
  
  
  it ('should restore only one method', function(){
    var person = new Person();
    var mock = mocco.mock(person); 
    
    mock.hijack('age', function(){
      return 25;    
    });
    
    mock.hijack('name', function(){
      return 'Jakub Mrozek';    
    });
      
    person.age().should.eql(25);
    person.name().should.eql('Jakub Mrozek');
    mock.restore('age');    
    
    person.age().should.eql(42);
    person.name().should.eql('Jakub Mrozek');
    mock.restore('name'); 
    
    person.name().should.eql('James Bond');
      
  });
  
  
  it ('should restore all methods of object', function(){
    var person = new Person();
    var mock = mocco.mock(person); 
    
    mock.hijack('age', function(){
      return 22;    
    });
      
    mock.hijack('name', function(){
      return 'Jakub Mrozek';    
    });
      
    person.age().should.eql(22);
    person.name().should.eql('Jakub Mrozek');
    mock.restore();    
    person.age().should.eql(42);
    person.name().should.eql('James Bond');
      
  });  
  

  it ('should restore all objects', function(){
    var person = new Person();
    var mock = mocco.mock(person); 
    
    var dog = new Dog();
    var dogMock = mocco.mock(dog); 
    
    mock.hijack('age', function(){
      return 22;    
    });
      
    mock.hijack('name', function(){
      return 'Jakub Mrozek';    
    });     
    
    dogMock.hijack('speak', function(){
      return 'mnaaau';    
    });
      
    person.age().should.eql(22);
    person.name().should.eql('Jakub Mrozek');      
    dog.speak().should.eql('mnaaau');  
    mocco.restore();
    
    person.age().should.eql(42);
    person.name().should.eql('James Bond');      
    dog.speak().should.eql('haf');  
      
  });
  
}); 