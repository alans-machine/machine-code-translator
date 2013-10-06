var assert = require('assert');
var Translator = require('../index');
var ArgumentMissingError = require('../lib/argument-error');

describe('Translator', function(){
    var transformer

    beforeEach(function(){
	transformer = new DoNothingTransformer();
    });

    it('should exist', function(){
	assert(Translator);
    });

    it('should throw \'ArgumentMissingError\' on undefined transformer', function(){
	assert.throws(function(){ new Translator(); }, ArgumentMissingError);
    });

    it('should throw \'ArgumentMissingError\' on undefined file', function(){
	assert.throws(function(){
	    var translator = new Translator(transformer);

	    translator.translate();
	}, ArgumentMissingError);
    });

    it('should transform abstract syntax tree', function(done){
	var translator = new Translator(new HasBeenCalledDetector(done));

	translator.translate('spec/successor.code');
    });
});

function DoNothingTransformer(){
}
DoNothingTransformer.prototype.tranform = function(){
    /* do nothing */
}

function HasBeenCalledDetector(done){
    this.done = done;
}
HasBeenCalledDetector.prototype.transform = function(){
    this.done();
}
