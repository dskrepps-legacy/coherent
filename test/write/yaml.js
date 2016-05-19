var test = require('tape');
var coherent = require('../../index.js');
var jsYaml = require('js-yaml');
var fs = require('fs');

test('write yaml', function (t) {
	
	var dataStr = fs.readFileSync(__dirname+'/yaml.yaml', 'utf8');
    var data = jsYaml.load(dataStr);
	
	coherent(__dirname+'/tmp.yaml').write(data);
		
	t.equal(
		dataStr,
		fs.readFileSync(__dirname+'/tmp.yaml', 'utf8')
	);
	
	fs.unlinkSync(__dirname+'/tmp.yaml');
	
	t.end();
});