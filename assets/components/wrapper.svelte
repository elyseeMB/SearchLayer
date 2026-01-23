<script lang="ts">
  import type { WithElementRef } from '@/lib/utils.js'
  import type { HTMLAttributes } from 'svelte/elements'

  let { children, title }: WithElementRef<HTMLAttributes<HTMLElement>> = $props()
</script>

<section class="flex flex-1 flex-col gap-4">
  <h1 class="text-2xl">{title?.toUpperCase()}</h1>
  {@render children?.()}
</section>
