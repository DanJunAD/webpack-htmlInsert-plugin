# install

```
npm install --save webpack-htmlinsert-plugin
```

# usage

in webpack.config.js

```
const htmlInsert = require('webpack-htmlinsert-plugin');
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
