<script lang="ts">
  interface Props {
    title: string
  }

  let { title }: Props = $props()

  import { ChevronsUpDown, MoveUp, MoveDown } from '@lucide/svelte'
  import Button from '../ui/button/button.svelte'
  import { Head } from '../ui/table/index.js'
  import DropdownMenu from '@/components/ui/dropdown-menu/dropdown-menu.svelte'
  import {
    Trigger as TriggerDropdown,
    Item as ItemDropdown,
    Group as GroupDropdown,
    Content as ContentDropdown,
  } from '@/components/ui/dropdown-menu/index.js'

  const items = [
    { label: 'Sort Ascending', icon: MoveUp },
    { label: 'Sort Descending', icon: MoveDown },
  ]
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
          <ChevronsUpDown size={16} />
          {title}
        </Button>
      {/snippet}
    </TriggerDropdown>
    <ContentDropdown class="w-56" align="start">
      <GroupDropdown>
        {#each items as item, _}
          <ItemDropdown onclick={() => console.log('filter')}>
            <item.icon />
            {item.label}
          </ItemDropdown>
        {/each}
      </GroupDropdown>
    </ContentDropdown>
  </DropdownMenu>
</Head>
