import test from "ava";
import { Command } from "../src/command.mjs";
import { ConfirmCommand } from "../src/confirm-command.mjs";

globalThis.confirm = async function (message) {
  return message.match(/ok/) ? true : false;
};

test("ConfirmCommand", async t => {
  const command = new ConfirmCommand(
    new Action(() => Promise.resolve(77), {
      timeout: 1000,
      title: "hello",
      description: "Say hello",
      shortcuts: "Command+A"
    })
  );

  t.is(command.timeout, 30000);
  t.is(command.title, "hello");
  t.is(command.description, "Say hello");
  t.is(command.shortcuts, "Command+A");
  t.false(command.active);
  t.false(command.failed);
  t.false(command.canceled);
  t.false(command.completed);
  t.false(command.disabled);

  const p = command.start();

  t.true(command.active);

  await p;

  // t.is(command.command.promise,7);
});
