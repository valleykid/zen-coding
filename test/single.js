var zenCoding = require('../index');

console.log(zenCoding('a'));
console.log(zenCoding('a.test'));
console.log(zenCoding('a.test.vk'));
console.log(zenCoding('a#x#y.test'));
console.log(zenCoding('a#m.n*3'));
console.log(zenCoding('a>img'));