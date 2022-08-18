import { Selector } from "testcafe";

const base = "http://localhost:4173/examples/svelte-command/";

fixture`command`.page`${base}`;

test("command", async t => {
  const s = Selector("button").withText("Long Running Command");

  await t.click(s);
  await t.expect(Selector("#commandExecuted").innerText).eql("1");

  await t.takeScreenshot({
    path: "command_long_running.png"
  });
});

test("failing command", async t => {
  const s = Selector("button").withText("Failing Command");

  await t.click(s);
  await t.takeScreenshot({
    path: "command_failing.png"
  });
});
