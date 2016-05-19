var test = require('tape');
var coherent = require('../../index.js');
var fs = require('fs');

test('write json and detect given extension', function (t) {
	
	var dataStr = fs.readFileSync(__dirname+'/json.json', 'utf8');
    var data = JSON.parse(dataStr);
	
	var cfile = coherent(__dirname+'/tmp.json');
	
	cfile.write(data);
	
	t.equal(
		dataStr,
		fs.readFileSync(__dirname+'/tmp.json', 'utf8')
	);
	
	fs.unlinkSync(__dirname+'/tmp.json');
	
	t.end();
});