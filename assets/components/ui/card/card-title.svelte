<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn, type WithElementRef } from '@/lib/utils.js'

  interface Props extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
    innerHTML?: HTMLElement
  }

  let {
    ref = $bindable(null),
    class: className,
    children,
    innerHTML = $bindable(),
    ...restProps
  }: Props = $props()
</script>

<div
  bind:this={ref}
  bind:innerHTML
  data-slot="card-title"
  contenteditable="true"
  class={cn('leading-none font-semibold', className)}
  {...restProps}
>
  {#if !innerHTML}
    {@render children?.()}
  {/if}
</div>
