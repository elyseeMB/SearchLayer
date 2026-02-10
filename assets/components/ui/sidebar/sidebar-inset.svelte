<script lang="ts">
  import { cn, type WithElementRef } from '@/lib/utils.js'
  import type { HTMLAttributes } from 'svelte/elements'

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props()
</script>

<main
  bind:this={ref}
  data-slot="sidebar-inset"
  class={cn(
    'min-h-[calc(100vh-56px)] flex flex-col min-w-0 transition-[margin-right] duration-300',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</main>
