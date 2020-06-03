'use strict';
var NAME = "sucrase";

var t = require("sucrase");
function setError(ctx, msg) {
	const error = msg
		.replace(ctx.root, "")
		.replace(": ", ": \n\n  ")
		.replace(" while parsing", "\n\nwhile parsing")
		.concat("\n");

	ctx.emit("plugin_error", {
		plugin: NAME,
		error
	});

	return new Buffer(
		`console.error('${NAME}: Bundle error! Check CLI output.');`
	);
}

module.exports = function (task) {
  task.plugin('sucrase', { every:false }, function* (files, opts) {
	opts = opts == null || {transforms: ["typescript", "imports"]};
 
    for (const file of files) {
			try {
			
				var out = t.transform(file.data.toString(), opts);
				file.data = new Buffer(out.code);
			} catch (err) {
				file.data = setError(task, err.message);
			}
		}
		this._.files = files;
  });
}
