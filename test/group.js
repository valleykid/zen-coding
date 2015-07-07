var zenCoding = require('../index');

console.log(zenCoding('div#page>header.hd+(section.sc>div.main-wrap)+footer.ft'));
console.log(zenCoding('div#page>header.hd+(section.sc>div.main-wrap>span*3)+footer.ft>div.a'));
console.log(zenCoding('div#page>header.hd+(section.sc>span)*3+footer.ft'));