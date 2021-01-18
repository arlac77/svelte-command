import { Selector } from "testcafe";

const base = "http://localhost:5000";

fixture`command`.page`${base}/index.html`;

test("command", async t => {
  const s = Selector("button").withText("Long Running Command");

  await t.click(s);
  await t.expect(Selector("#commandExecuted").innerText).eql("1");
  //await t.click(s);
  //await t.expect(Selector("#actionExecuted").innerText).eql("1");

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
