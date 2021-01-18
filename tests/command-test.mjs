import test from "ava";
import { Command } from "../src/command.mjs";

test("Command resolve", async t => {
  const command = new Command(() => Promise.resolve(), {
    timeout: 1000,
    title: "hello",
    description: "Say hello",
    shortcuts: "Command+A"
  });

  t.is(command.title, "hello");
  t.is(command.description, "Say hello");
  t.is(command.shortcuts, "Command+A");
  t.is(command.timeout, 1000);
  t.false(command.active);
  t.false(command.failed);
  t.false(command.canceled);
  t.false(command.completed);
  t.false(command.disabled);

  const p = command.start();
  t.true(command.active);
  t.false.command.failed);
  t.false(command.canceled);
  t.false(command.completed);

  await p;

  t.false(command.active);
  t.false(command.failed);
  t.false(command.canceled);
  t.true(command.completed);
});

test("Command timeout", async t => {
  const command = new Command(
    () => new Promise((resolve, reject) => setTimeout(resolve, 5000)),
    { timeout: 1000 }
  );

  t.is(command.timeout, 1000);

  const p = command.start();
  t.true(command.active);
  t.false(command.failed);
  t.false(command.canceled);
  t.false(command.completed);

  await p;

  t.false(command.active);
  t.false(command.failed);
  t.true(command.canceled);
  t.true(command.completed);
});

test("Command disabled", async t => {
  const command = new Command(() => Promise.resolve());

  t.is(command.title, undefined);
  t.is(command.shortcuts, undefined);
  t.is(command.timeout, 30000);

  let sDisabled = 77;

  const endSubscription = command.subscribe(a => {
    sDisabled = a.disabled;
  });

  command.disabled = true;

  t.is(sDisabled, true);

  t.false(command.active);
  t.false(command.failed);
  t.false(command.canceled);
  t.false(command.completed);
  t.true(command.disabled);

  command.start();

  t.false(command.active);
  t.false(command.failed);
  t.false(command.canceled);
  t.false(command.completed);

  endSubscription();
});

test("Command reject", async t => {
  const command = new Command(() => Promise.reject(0));

  t.false(command.active);
  t.false(command.failed);
  t.false(command.canceled);
  t.false(command.completed);
  t.false(command.disabled);

  const p = command.start();

  t.true(command.active);
  t.false(command.failed);
  t.false(command.canceled);
  t.false(command.completed);

  await p;

  t.false(command.active);
  t.true(command.failed);
  t.false(command.canceled);
  t.false(command.completed);
});
