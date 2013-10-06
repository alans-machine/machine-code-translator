var doT = require('dot');

var template = doT.template('Expected {{= it.expected }} but found {{= it.found }} on line {{= it.line }} column {{= it.column }}');

function EnhancedParseError(parseError){
    for (key in parseError) {
	this[key] = parseError[key];
    }
    this.message = template(this);
}

module.exports = EnhancedParseError;
