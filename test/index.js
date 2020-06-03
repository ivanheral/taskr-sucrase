const join = require("path").join;
const Taskr = require("taskr");
const test = require("tape");

const dir = join(__dirname, 'fixtures');
const tmp = join(__dirname, 'tmp');

test('taskr-sucrase', (t) => {
  t.plan(3);

  const taskr = new Taskr({
    plugins: [
      require('../'),
      require('@taskr/clear')
    ],
    tasks: {
      * foo(f) {
        t.ok('sucrase' in taskr.plugins, 'attach the `sucrase()` plugin to taskr');
        yield f.source(`${dir}/foo.ts`).sucrase().target(tmp);
        const sent = yield f.$.read(`${tmp}/foo.ts`, 'utf8');
        t.ok(sent, 'creates a `.js` file');
        t.equal(sent, '"use strict";function greeter(person) {\r\n  return "Hello, " + person;\r\n}\r\n\r\nlet user = "Jane User";\r\n\r\ndocument.body.textContent = greeter(user);', 'compile the `.js` contents correctly');
        yield f.clear(tmp);
      }
    }
  });

  taskr.serial(['foo']);
});