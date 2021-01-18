<script>
  export let command;
</script>

<button
  disabled={$command.disabled}
  aria-keyshortcuts={$command.shortcuts}
  class:active={$command.active}
  class:failed={$command.failed}
  on:click|preventDefault={() => command.start()}>
  {#if $command.title !== undefined}{$command.title}{/if}
  <slot />
  {#if $command.active}
    <div class="spinner" />
  {/if}
</button>
