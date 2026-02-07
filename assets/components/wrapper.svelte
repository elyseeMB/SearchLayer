<script lang="ts">
  import { cn, type WithElementRef } from '@/lib/utils.js'
  import type { HTMLAttributes } from 'svelte/elements'

  let { children, title, class: className }: WithElementRef<HTMLAttributes<HTMLElement>> = $props()
</script>

<section class={cn('w-full', className)}>
  <h1 class="text-lg font-bold text-heading">{title?.toUpperCase()}</h1>
  {@render children?.()}
</section>
