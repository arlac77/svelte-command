<script>
  import {
    CommandButton,
    Command,
    FetchCommand,
    ConfirmCommand
  } from "../../../src/index.svelte";

  const fetchCommand = new FetchCommand(
    "http://slowwly.robertomurray.co.uk/delay/3000/url/https://api.github.com",
    {},
    {
      title: "Fetch Data",
      shortcuts: "alt+F",
      responseHandler: async response => {}
    }
  );

  const fetchCommandTimeout = new FetchCommand(
    "http://slowwly.robertomurray.co.uk/delay/3000/url/https://api.github.com",
    {},
    {
      title: "Fetch Data Timeout",
      shortcuts: "command+T",
      timeout: 1000
    }
  );

  const command2 = new Command(
    () => new Promise(resolve => setTimeout(resolve, 5000)),
    {
      title: "Sometimes Disabled",
      shortcuts: "command+D"
    }
  );

  let commandExecuted = 0;

  const command = new Command(() => {
    command2.disabled = !command2.disabled;
    commandExecuted += 1;
    return new Promise(resolve => setTimeout(resolve, 5000));
  });

  const failingCommand = new Command(
    () =>
      new Promise((resolve, reject) => setTimeout(() => reject("failed"), 5000))
  );
</script>

<div class="center">
  <CommandButton {command}>Long Running Command</CommandButton>
  <CommandButton command={fetchCommand} />
  <CommandButton command={fetchCommandTimeout} />
  <CommandButton command={command2} />
  <CommandButton command={new ConfirmCommand(command2)} />
  <CommandButton command={failingCommand}>Failing Command</CommandButton>
</div>

<div id="commandExecuted">{commandExecuted}</div>
