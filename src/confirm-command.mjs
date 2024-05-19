import { BasicCommand } from "./command.mjs";

/**
 * Ask for confirmation before execution a given Command.
 */
export class ConfirmCommand extends BasicCommand {
  constructor(command) {
    super(
      () =>
        new Promise((resolve, reject) => {
          if (confirm(`Really ${command.title}?`)) {
            resolve();
            command.start();
          } else {
            reject();
          }
        }),
      {
        command: { value: command }
      }
    );
  }

  subscribe(subscription) {
    return this.command.subscribe(subscription);
  }

  get disabled() {
    return this.command.disabled;
  }

  get shortcuts() {
    return this.command.shortcuts;
  }

  get title() {
    return this.command.title;
  }

  get description() {
    return this.command.description;
  }

  get active() {
    return this.command.active;
  }

  get failed() {
    return this.command.failed;
  }

  get canceled() {
    return this.command.canceled;
  }

  get completed() {
    return this.command.completed;
  }
}
