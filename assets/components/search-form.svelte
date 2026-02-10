<script lang="ts">
  import { Label } from '@/components/ui/label/index.js'
  import { Group, GroupContent, Input } from '@/components/ui/sidebar/index.js'
  import type { WithElementRef } from '@/lib/utils.js'
  import { SearchIcon } from '@lucide/svelte'
  import type {
    ChangeEventHandler,
    HTMLFormAttributes,
    HTMLInputTypeAttribute,
  } from 'svelte/elements'

  let {
    ref = $bindable(null),
    value = $bindable(''),
    handler,
    type,
    name,
    ...restProps
  }: WithElementRef<HTMLFormAttributes> & {
    handler: ChangeEventHandler<HTMLInputElement>
    type: HTMLInputTypeAttribute
    value: string
  } = $props()

  function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
    value = e.currentTarget.value
    if (handler) {
      handler(e)
    }
  }
</script>

<form bind:this={ref} {...restProps}>
  <Group class="py-0">
    <GroupContent class="relative">
      <Label for="search" class="sr-only">Search</Label>
      <Input
        {type}
        oninput={handleInput}
        {value}
        {name}
        id="search"
        placeholder="Search the docs..."
        class="ps-8"
      />
      <SearchIcon
        class="pointer-events-none absolute start-2 top-1/2 size-4 -translate-y-1/2 opacity-50 select-none"
      />
    </GroupContent>
  </Group>
</form>
