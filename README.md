# @taskr/sucrase [![npm](https://img.shields.io/npm/v/taskr-sucrase.svg)](https://npmjs.org/package/taskr-sucrase)

> [Sucrase](https://github.com/alangpierce/sucrase/) plugin for [Taskr](https://github.com/lukeed/taskr).


## Install

```
$ npm install --save-dev taskr-sucrase
```

## Usage

Check out the [documentation](https://github.com/alangpierce/sucrase) to see the available options.

```js
exports.sucrase = function * (task) {
  yield task.source('src/**/*.js').sucrase().target('dist/js')
}
```

## Support

Any issues or questions can be sent to the [Taskr monorepo](https://github.com/lukeed/taskr/issues/new).

Please be sure to specify that you are using `taskr-sucrase`.
