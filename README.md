# install

```
npm install --save webpack-htmlInsert-plugin
```

# usage

in webpack.config.js

```
const htmlInsert = require('webpack-htmlInsert-plugin');
 ...
plugins: [
 ...
    new wsp({
        content: '<script>aaaa</script>',
        fileList: ['public/index.html']
    })
 ...
]
```
