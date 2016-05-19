module.exports = function read(opts) {
	
	opts = Object.assign({}, this._opts, opts);
	
	var dataStr = require('fs').readFileSync(this._path, opts.encoding);
	
	// Figure out which parser we can use
	var parsers = opts.readFormats[opts.ext];
	var parserName, parser, data, parserErr;
	for(parserName in parsers) {
		
		// Attempt to require the parser
		try {
			parser = require(parserName);
		} catch (err) { continue; }
		
		// Attempt to parse the data string
		try {
			data = parsers[parserName](parser, dataStr, opts.parserOpts);
		} catch (err) { parserErr = err; continue; }
		
		return data;
	}
	
	if (!parser) {
		throw new Error('Parser for filetype '+opts.ext+' not installed. '
			+ 'You can "npm install --save" one of the following: '
			+ Object.keys(parsers).join(' '));
	} else {
		throw parserErr;
	}
	
};