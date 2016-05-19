var test = require('tape');
var coherent = require('../../index.js');
var fs = require('fs');

test('read json', function (t) {
	var dataStr = fs.readFileSync(__dirname+'/json.json', 'utf8');
	
    var data = JSON.parse(require('strip-json-comments')(dataStr));
    
    t.deepEqual(data, coherent(__dirname+'/json').read());
    
    t.end();
});