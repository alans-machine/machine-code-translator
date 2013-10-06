var fs = require('fs');
var parser = require('machine-code');
var EnhancedParseError = require('./lib/parse-error');
var ArgumentMissingError = require('./lib/argument-error');

var Translator = module.exports = function Translator(transformer) {
    if (!transformer) {
	throw new ArgumentMissingError('transformer');
    }
    this.transformer = transformer;
}
Translator.prototype.translate = function(file){
    if (!file){
	throw new ArgumentMissingError('file');
    }

    var translator = this;
    fs.readFile(file, function(error, data){
	if (error) {
	    throw error;
	}

	try {
	    var ast = parser.parse(data.toString());
	} catch(parseError) {
	    throw new EnhancedParseError(parseError);
	}

	translator.transformer.transform(ast);
    });
}
