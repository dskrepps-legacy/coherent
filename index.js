
var readFormats = require('parse-formats');
var writeFormats = require('stringify-formats');

var path = require('path');

var initialOpts = {
	readFormats: readFormats,
	writeFormats: writeFormats,
	ext: '',
	encoding: 'utf8',
}


module.exports = coherent;


function coherent(filename, opts) {
	
	// Make sure we're constructing a new object
	if( Object.keys(this).length > 0 ) {
		return new coherent(filename, opts);
	}
	
	this._opts = Object.assign({}, initialOpts, opts);
	
	this._path = findPathWithExt(filename+this._opts.ext, this._opts);
	this._opts.ext = path.extname(this._path);
	
	return this;
}

coherent.prototype.read = require('./read.js');
coherent.prototype.write = require('./write.js');


module.exports.read = function(path, opts) {
	return coherent(path).read(opts);
}

module.exports.write = function(path, data, opts) {
	return coherent(path).write(data, opts);
}


function findPathWithExt(file, opts) {
	
	var exists = require('fs').accessSync; // Throws on failure
	
	// Check if a supported ext is already present
	var presentExt = path.extname(file);
	if( opts.readFormats[presentExt] ) {
		return file;
	}
	
	// Try each ext until we find a file
	var readExts = Object.keys(opts.readFormats);
	for (var ext of readExts) {
		
		try {
			exists(file+ext);
		} catch(e) { continue; }
		return file+ext;
	}
	
	// If none found just assume we're creating a .json file
	return file+'.json';
}
