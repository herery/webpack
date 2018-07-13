// module.exports = {
//     list: './src/pages/list/main.js',
//     detail: './src/pages/detail/main.js'
// };


const fs = require('fs');
const path = require('path');


let cateDir = path.resolve(__dirname, 'src/pages');
let entryConfig = {};
fs.readdirSync(cateDir)
.filter(e => fs.statSync(path.resolve(cateDir, e)).isDirectory())
.map(cate => entryConfig[cate] = path.join(cateDir, cate, 'main.js'));


module.exports = entryConfig
