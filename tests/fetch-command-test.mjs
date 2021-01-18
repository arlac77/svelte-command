import test from "ava";
import { FetchCommand } from "../src/fetch-command.mjs";

globalThis.AbortController = class AbortController {};
globalThis.fetch = async function (url, options) {
  return {
    url,
    get statusText() {
      return url.indexOf("ok") >= 0 ? "ok" : "error";
    },
    get ok() {
      return url.indexOf("ok") >= 0;
    }
  };
};

test("FetchCommand", async t => {
  const action = new FetchCommand(
    "https://github.com/",
    {},
    { disabled: true, title: "hallo" }
  );

  t.is(command.title, "hallo");
  t.false(command.active);
  t.false(command.failed);
  t.false(command.canceled);
  t.false(command.completed);
  t.true(command.disabled);
});

test("FetchCommand exec ok", async t => {
  const command = new FetchCommand("https://mydomain.com/ok", {}, {});

  const p = command.start();

  t.true(command.active);

  await p;

  t.false(command.active);
  t.false(command.failed);
  t.falsy(command.error);
});

test("FetchCommand exec failed", async t => {
  const command = new FetchCommand("https://mydomain.com/bad", {}, {});

  const p = command.start();

  t.true(command.active);

  await p;

  t.false(command.active);
  t.true(command.failed);
  t.truthy(command.error);
});
