## Simple sequence

Repo with a few simple functions to help manage asynchronous flow.

##### eachSeries
  This function runs a function(s), and checks the return value to determine if the next should be run.
  It's useful when building a sequence, but you need to stop execution once you return something falsey.
```javascript
	var fns = {
		step1a: function step1a(){
			console.log('step1a: ');
			return true;
		},
		step1b: function step1b(){
			console.log('step1b: ');
			return true;
		}
	}

	var out = seq.eachSeries([
		function step1(){
			return seq.eachSeries([  // This is an embedded list of functions 
				fns.step1a,            // for better orginization of subroutines
				fns.step1b
			])
		},
		function step2(){
			console.log('step2: ');
			return false;  // Execution would stop here and not go to step3
		},
		function step3(){
			console.log('step3: ');
			return true;
		}
	]);
	
	console.log('out: ', out);
	// The variable out collects the return values from each of the 
	// functions run to be used later if desired.
```

##### seriesAsync
  This function runs a function(s) sequentially, but only calls the next one in the list when the done() method is called.
  
```javascript
		seq.seriesAsync([
			function seriesFn1(){
				var self = this;
				setTimeout(function(){
					console.log('seriesFn1: '  );
					self.done();  //  After two seconds, the done method is called, advancing to seriesFn2()
				}, 2000);
			},
			function seriesFn2(){
				var self = this;
				setTimeout(function(){
					console.log('seriesFn2: ');
					self.done();  //  After two seconds, the done method is called, advancing to seriesFn3()
				}, 2000)
			},
			function seriesFn3(){
				console.log('seriesFn3: ');
			}	
		]);

```
