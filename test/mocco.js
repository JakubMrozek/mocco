var mocco = require('../');

var TestCls = function(){}

TestCls.prototype.getSth = function(){
  return 42;    
}

TestCls.prototype.getStr = function(){
  return 'haha';    
}

var TestCls2 = function(){}

TestCls2.prototype.getSth = function(){
  return 42;    
}


describe('mocco', function() {
  it('should hijack() one method of class with two params', function() {
    var testCls = new TestCls();
    var mockCls = mocco.mock(testCls);  
    
    mockCls.hijack('getSth', function(){
      return 22;    
    });
    
    testCls.getSth().should.eql(22);
    mockCls.restore();
    testCls.getSth().should.eql(42);
    
  });
  
  it('should hijack() one method of class with one param (fc)', function() {
    var testCls = new TestCls();
    var mockCls = mocco.mock(testCls);  
    
    mockCls.hijack(function getSth(){
      return 22;    
    });
    
    testCls.getSth().should.eql(22);
    mockCls.restore();
    testCls.getSth().should.eql(42);
    
  });  
  
  it('should throw exception if hijack() has wrong params', function(){
    var testCls = new TestCls();
    var mockCls = mocco.mock(testCls);  
    
    var err = null;
    try {
      mockCls.hijack(1, 2);
      
    } catch(e) {
      err = e;
    } finally {
      err.should.be.instanceof(Error);    
    }

  });
  
  it('should throw exception if hijack() has one anonymous function', function(){
    var testCls = new TestCls();
    var mockCls = mocco.mock(testCls);  
    
    var err = null;
    try {
      mockCls.hijack(function(){
        return 22;    
      });
      
    } catch(e) {
      err = e;
    } finally {
      err.should.be.instanceof(Error);    
    }
    
  });  
  
  it ('should throw exception if hijacked method doesnt exist in original object', function(){
    
    var testCls = new TestCls();
    var mockCls = mocco.mock(testCls);  
    
    var err = null;
    try {
      mockCls.hijack(function abc(){
        return 22;    
      });
      
    } catch(e) {
      err = e;
    } finally {
      err.should.be.instanceof(Error);    
    }
    
  });
  
  it ('should throw exception if method hasnt been hijacted.', function(){
    
    var testCls = new TestCls();
    var mockCls = mocco.mock(testCls);  
    
    var err = null;
    try {
      mockCls.restore('abc');
      
    } catch(e) {
      err = e;
    } finally {
      err.should.be.instanceof(Error);    
    }
    
  });
  
  it ('should restore only one method', function(){
    var testCls = new TestCls();
    var mockCls = mocco.mock(testCls); 
    
    mockCls.hijack('getSth', function(){
      return 22;    
    });
      
    mockCls.hijack('getStr', function(){
      return 'uff';    
    });
      
    testCls.getSth().should.eql(22);
    testCls.getStr().should.eql('uff');
    mockCls.restore('getSth');    
    testCls.getSth().should.eql(42);
    testCls.getStr().should.eql('uff');
    mockCls.restore('getStr'); 
    testCls.getStr().should.eql('haha');
      
  });
  
  it ('should restore all methods of object', function(){
      
    var testCls = new TestCls();
    var mockCls = mocco.mock(testCls); 
    
    mockCls.hijack('getSth', function(){
      return 22;    
    });
      
    mockCls.hijack('getStr', function(){
      return 'uff';    
    });
      
    testCls.getSth().should.eql(22);
    testCls.getStr().should.eql('uff');
    mockCls.restore();    
    testCls.getSth().should.eql(42);
    testCls.getStr().should.eql('haha');
      
  });
  
  it ('should restore all objects', function(){
      
    var testCls = new TestCls();
    var mockCls = mocco.mock(testCls); 
    var testCls2 = new TestCls2();
    var mockCls2 = mocco.mock(testCls2); 
    
    mockCls.hijack('getSth', function(){
      return 22;    
    });
      
    mockCls.hijack('getStr', function(){
      return 'uff';    
    });     
    
    mockCls2.hijack('getSth', function(){
      return 21;    
    });
      
    testCls.getSth().should.eql(22);
    testCls.getStr().should.eql('uff');      
    testCls2.getSth().should.eql(21);  
    mocco.restore();
    
    testCls.getSth().should.eql(42);
    testCls.getStr().should.eql('haha');      
    testCls2.getSth().should.eql(42);  
      
  });
  
  
}); 