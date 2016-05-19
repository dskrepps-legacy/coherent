var coherent = require('../..');
var test = require('tape');


test('throws ENOENT when attempting to read a non-existing file', function(t) {
	t.plan(2);
	
	try {
		coherent(__dirname+'/file-not-here.json').read();
	} catch (error) {
		t.equal(error.code, 'ENOENT', 'with extension');
	}
	
	try {
		coherent(__dirname+'/file-not-here').read();
	} catch (error) {
		t.equal(error.code, 'ENOENT', 'without extension');
	}
});