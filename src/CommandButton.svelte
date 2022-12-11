<script>
  export let command;

  function handleKeydown(event) {
    if (command?.matchesKeydown && command.matchesKeydown(event)) {
      command.start();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<button
  disabled={$command.disabled}
  aria-keyshortcuts={$command.disabled ? undefined : $command.shortcuts}
  class:active={$command.active}
  class:failed={$command.failed}
  on:click|preventDefault={() => command.start()}>
  {#if $command.title !== undefined}
    {$command.title}
    {$command.shortcutDefinition}
  {/if}
  <slot />

  {#if $command.active}
    <div class="spinner" />
  {/if}
</button>
