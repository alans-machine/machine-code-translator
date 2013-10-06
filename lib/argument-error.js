module.exports = function ArgumentMissingError(argument){
    this.name = 'ArgumentMissingError';
    this.argument = argument;
    this.message = 'Argument "' + argument + '" is missing';
}
