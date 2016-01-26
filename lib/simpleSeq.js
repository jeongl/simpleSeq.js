var seq = (function(){

	function series(fnList ){

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

	var parallel = function(){
		return mapVar(function(fn ){
			var fnCallerName = arguments[0].name;

			if (!fnCallerName) {
				throw new Error('One of your functions don\'t have names: ');	
			}

			var returned = fn.call(this );
			if (returned ) {
				return { fnCallerName: fnCallerName, returnVal: returned  };
			}  else { throw new Error('There was an error with fn: '+ fnCallerName );	 }
		});
	}

	return {
		series: series,
		parallel: parallel.call(this)
		
	}

}());


// Examples

// seq.series([
// 	function seriesFn1(){
// 		var self = this;
// 		setTimeout(function(){
// 			console.log('seriesFn1: '  );
// 			self.done();
// 		}, 2000);
// 	},
// 	function seriesFn2(){
// 		var self = this;
// 		setTimeout(function(){
// 			console.log('seriesFn2: ');
// 			self.done();
// 		}, 2000)
// 	},
// 	function seriesFn3(){
// 		console.log('seriesFn3: ');
// 	}	
// ]);


// var fns = {
// 	step1a: function step1a(){
// 		console.log('step1a: ');
// 		return true;
// 	},
// 	step1b: function step1b(){
// 		console.log('step1b: ');
// 		return true;
// 	}
// }

// var out = seq.parallel([
// 	function step1(){
// 		return seq.parallel([ 
// 			fns.step1a,
// 			fns.step1b
// 		])
// 	},
// 	function step2(){
// 		console.log('step2: ');
// 		return true;
// 	},
// 	function step3(){
// 		console.log('step3: ');
// 		return true;
// 	}
// ]);

// console.log('out: ', out );





