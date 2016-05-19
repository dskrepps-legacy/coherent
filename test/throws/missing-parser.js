var coherent = require('../..');
var test = require('tape');


test('throws error when parser missing', function(t) {
	
	// Override readFormats with something that can't be require'd
	var opts = {
		readFormats: {
			'.json': {'this-module-doesnt-exist-34890': function(){}}
		}
	};
	
	var shouldThrow = function(){
		coherent(__dirname+'/json.json', opts).read();	
	};
	
	t.throws(shouldThrow, /Parser for filetype.*34890/, 'should throw parser missing');
	
	t.end();
});