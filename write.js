module.exports = function write(data, opts) {
	
	opts = Object.assign({}, this._opts, opts);
	
	// Figure out which stringifier we can use
	var strfiers = opts.writeFormats[opts.ext];
	var strfierName, strfier, dataStr, strfierErr;
	for(strfierName in strfiers) {
		
		// Attempt to require the stringifier
		try {
			strfier = require(strfierName);
		} catch (err) { continue; }
		
		//Attempt to stringify the data
		try {
			dataStr = strfiers[strfierName](strfier, data, opts.parserOpts);
		} catch (err) { strfierErr = err; continue; }
		
		require('fs').writeFileSync(this._path, dataStr, opts.encoding);
		
		return;
	}
	
	if (!strfier) {
		throw new Error('Stringifier for filetype '+opts.ext+' not installed. '
			+ 'You can "npm install --save" one of the following: '
			+ Object.keys(strfiers).join(' '));
	} else {
		throw strfierErr;
	}
	
};
