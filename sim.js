var stringSimilarity = require('string-similarity');
 
var similarity = stringSimilarity.compareTwoStrings('esaled', 'sealed'); 
 
var matches = stringSimilarity.findBestMatch('healed', ['edward', 'sealed', 'theatre']);

console.log(similarity)