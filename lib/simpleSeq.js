var seq = (function(){

  function seriesAsync(fnList ){

    function eachSeries(fnList ){
      this.fnList = fnList;
      this.callFn();
    }
    eachSeries.prototype.callFn = eachSeries.prototype.done = function(){
      var fn = this.fnList[0];
      this.fnList.shift();
      if( fn ) fn.call(this);
    }
    return new eachSeries(fnList);
  }

  function mapVar(fn ){
    return function(fnList ){
      return fnList.map(function(item){
        return fn.call(this, item );
      })
    }
  }

  var eachSeries = function(){
    return mapVar(function(fn ){
      var fnCallerName = arguments[0].name;

      if (!fnCallerName) {
        throw new Error('One of your functions don\'t have names: '); 
      }

      var returned = fn.call(this );
      if (returned ) {
        return { fnCallerName: fnCallerName, returnVal: returned  };
      }  else { throw new Error('There was an error with fn: '+ fnCallerName );  }
    });
  }

  return {
    seriesAsync: seriesAsync,
    eachSeries: eachSeries.call(this)
    
  }

}());