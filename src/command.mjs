
/**
 * 
 */
export class BasicCommand {

  subscriptions = new Set();
  
  constructor(start, properties, options = {}) {
    if (options.timeout !== undefined) {
      properties.timeout = { value: options.timeout };
    }

    Object.defineProperties(this, {
      _start: { value: start },
      _cancel: { value: options.cancel || (() => {}) },
      ...properties
    });

    this.reset();
  }

  reset() {}

  async start() {
    if (this.active || this.disabled) {
      return;
    }
    this.reset();

    try {
      await this._start();
      this.completed = true;
    } catch (e) {
      this.error = e;
      // this.failed = true;
    }
  }

  /**
   * @param {Function} subscription
   */
  subscribe(subscription) {
    subscription(this);
    this.subscriptions.add(subscription);
    return () => this.subscriptions.delete(subscription);
  }

  emit() {
    this.subscriptions.forEach(subscription => subscription(this));
  }

  get timeout() {
    return 30 * 1000;
  }

  /*
  get active() { return false; }
  get disabled() { return false; }
  get failed() { return false; }
  get completed() { return false; }
  */
}

/**
 * @property {string} title
 * @property {string} description
 * @property {string} shortcuts
 * @property {boolean} disabled
 * @property {boolean} active
 * @property {boolean} failed
 * @property {boolean} completed
 */
export class Command extends BasicCommand {
  constructor(_start, options = {}) {
    let disabled = options.disabled || false;
    let title = options.title;
    let description = options.description;
    let shortcuts = options.shortcuts;

    super(
      _start,
      {
        disabled: {
          get: () => disabled,
          set: value => {
            if (disabled !== value) {
              disabled = value;
              this.emit();
            }
          }
        },
        title: {
          get: () => title,
          set: value => {
            if (title !== value) {
              title = value;
              this.emit();
            }
          }
        },
        description: {
          get: () => description,
          set: value => {
            if (description !== value) {
              description = value;
              this.emit();
            }
          }
        },
        shortcuts: {
          get: () => shortcuts,
          set: value => {
            if (shortcuts !== value) {
              shortcuts = value;
              this.emit();
            }
          }
        }
      },
      options
    );
  }

  reset() {
    super.reset();
    this.failed = false;
    this.completed = false;
    this.canceled = false;
  }

  async start() {
    if (this.active || this.disabled) {
      return;
    }
    this.reset();

    this.timer = setTimeout(() => this.cancel(), this.timeout);
    this.promise = this._start();

    this.disabled = true;

    try {
      await this.promise;
      this.completed = true;
    } catch (e) {
      this.error = e;
      this.failed = true;
    } finally {
      delete this.promise;
      this.disabled = false;
    }
  }

  async cancel() {
    this.canceled = true;

    if (this.timer) {
      clearTimeout(this.timer);
      delete this.timer;
    }

    await this._cancel();
    delete this.promise;
    this.emit();
  }

  get active() {
    return this.promise ? true : false;
  }

  get shortcutDefinition() {
    const s = this.shortcuts;

    if (s) {
      let m = s.match(/(command|ctrl|meta|alt|shift)\+([a-zA-Z0-9])/i);
      if (m) {
        const c = modifier2char[m[1]];
        if (c) {
          return c + m[2];
        }
      }
    }

    return "";
  }

  matchesKeydown(event) {
    if (event.metaKey && event.composed) {
      const s = this.shortcuts;

      if (s) {
        let m = s.match(/(command|ctrl|meta|alt|shift)\+([a-zA-Z0-9])/i);
        if (m) {
          if (event.key == m[2]) {
            return true;
          }
        }
      }
      console.log(event);
    }
    return false;
  }
}

const modifier2char = {
  shift: "⇧",
  meta: "⌘",
  command: "⌘",
  alt: "⌥",
  ctrl: "^"
};
