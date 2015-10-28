zen-coding
========================

同emmet的Syntax大部分功能，具体参考[Syntax](http://docs.emmet.io/cheat-sheet/)。

功能包括：`Child:>` & `Multiplication:*` & `Custom attributes` & `Sibling:+` & `Grouping:()` & `Implicit tag names:div` & `ID and CLASS attributes`

## Installation

Either through forking or by using [npm](https://www.npmjs.com) (the recommended way):

```{bash}
npm install zen-coding
```
And zen-coding will be installed in to your node-project.

## examples

```{js}
// ...
var zenCoding = require('zen-coding');

zenCoding('div#page>header.hd+(section.sc>div.main-wrap)+footer.ft');
zenCoding('div#page>header.hd+(section.sc>div.main-wrap>span*3)+footer.ft>div.a');
zenCoding('div#page>header.hd+(section.sc>span)*3+footer.ft');
```

## Browser usage

    <script type='text/javascript' src='zen-coding.min.js'></script>
    <script>
      zen = require("zen-coding");
      console.log( zen("div>a") );
    </script>

## Documentation

- 接收字符串参数，返回html结构
- 支持层级/重复/括号，支持id/class/attribute

## License

MIT
