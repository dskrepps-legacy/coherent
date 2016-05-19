var test = require('tape');
var coherent = require('../../index.js');
var jsYaml = require('js-yaml');
var fs = require('fs');

test('read yaml', function (t) {
	var dataStr = fs.readFileSync(__dirname+'/yaml.yaml', 'utf8');
	
    var data = jsYaml.load(dataStr);
	
	t.deepEqual(data, coherent(__dirname+'/yaml').read());
	
	t.end();
});