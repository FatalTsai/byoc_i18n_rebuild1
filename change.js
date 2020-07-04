const cUs = require('English_28US29.xml');

console.log(cUS);


for f in *.xml; do
    mv -- "$f" "$(basename -- "$f" .xml).json"
done