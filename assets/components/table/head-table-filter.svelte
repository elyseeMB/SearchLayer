<script lang="ts">
  interface Props {
    rowEnabled: Record<string, any>
  }

  let { rowEnabled: row }: Props = $props()

  import { MoveUp, MoveDown, ListFilter } from '@lucide/svelte'
  import Button from '../ui/button/button.svelte'
  import { Head } from '../ui/table/index.js'
  import DropdownMenu from '@/components/ui/dropdown-menu/dropdown-menu.svelte'
  import {
    Trigger as TriggerDropdown,
    Item as ItemDropdown,
    Group as GroupDropdown,
    Content as ContentDropdown,
  } from '@/components/ui/dropdown-menu/index.js'
  import { page, router } from '@inertiajs/svelte'

  const updateOrder = (order: 'asc' | 'desc') => {
    const url = new URL($page.url, window.location.origin)
    url.searchParams.set(
      'sort',
      JSON.stringify({
        field: row.key,
        order,
      })
    )
    return router.get(url.toString())
  }

  const items = [
    {
      label: 'Sort Ascending',
      icon: MoveUp,
      order_y: (): void => {
        return updateOrder('asc')
      },
    },
    {
      label: 'Sort Descending',
      icon: MoveDown,
      order_y: (): void => {
        return updateOrder('desc')
      },
    },
  ]

  console.log(row)
</script>

<Head class="text-end px-4 w-full">
  <DropdownMenu>
    <TriggerDropdown>
      {#snippet child({ props })}
        <Button
          {...props}
          variant="ghost"
          class="flex items-center gap-1 p-0! m-0! hover:text-primary hover:cursor-pointer hover:bg-transparent"
        >
          <ListFilter />
          {row.label}
        </Button>
      {/snippet}
    </TriggerDropdown>
    <ContentDropdown class="w-56" align="start">
      <GroupDropdown>
        {#each items as item, _}
          <ItemDropdown disabled={!row.sortable} onclick={item.order_y}>
            <item.icon />
            {item.label}
          </ItemDropdown>
        {/each}
      </GroupDropdown>
    </ContentDropdown>
  </DropdownMenu>
</Head>
