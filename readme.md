# Coherent

Read and write any config file format. Does for config files what [consolidate](https://github.com/tj/consolidate.js) does for templating languages.

[![NPM](https://nodei.co/npm/coherent.png)](https://nodei.co/npm/coherent/)

### Usage

```javascript
var coherent = require('coherent');

// Extension can be left out or included, it will search for a
// supported file and a matching installed parser/stringifier
var cfile = coherent(__dirname+'/local-config');

var config = cfile.read();

config.runCount = config.runCount || 0;
config.runCount++;

cfile.save(config);
```


### Supported Formats

Read from formats provided by [parse-formats](https://github.com/DSKrepps/parse-formats) and write to formats provided by [stringify-formats](https://github.com/DSKrepps/stringify-formats). Feel free to suggest another format to support by opening an issue or pull request in those repositories.

**You must install the module you are using to parse or stringify the format within your own project.** This is so that coherent does not install and compile every one of them when it's installed. See the links above for lists of those modules, or check the error message coherent throws if the neccesary module is missing.

Your mileage may vary as each format and/or its parser/stringifier may lack full features.


### Documentation

##### cfile = coherent(filePath[, opts])
Returns an object with `.read` and `.write` methods. Determines the extension by searching for accessible files. The opts object will extend the following defaults:

    {
        readFormats: require('parse-formats),
        writeFormats: require('stringify-formats'),
        ext: '', // Specify if you want
        encoding: 'utf8', // Passed to fs functions,
        parserOpts: undefined, // Additional options object to pass to the parser/stringifier
    }

##### cfile.read([opts])
Synchronously reads the file and attempts to parse it. `opts` will extend but not modify the opts passed to the `coherent()`.

##### cfile.write(data, [opts])
Synchronously attempt to stringify `data` and write the result to the file, overriding the old file. `opts` will extend but not modify the opts passed to `coherent()`.

##### coherent.read(path, [opts]) and coherent.write(path, data, [opts])
Shorter version equivalent to `coherent(path).read/.write` but will search for the file each time.


### License

MIT