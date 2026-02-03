<script lang="ts">
  import DropdownMenu from '@/components/ui/dropdown-menu/dropdown-menu.svelte'
  import {
    Trigger as TriggerDropdown,
    Item as ItemDropdown,
    Group as GroupDropdown,
    Content as ContentDropdown,
  } from '@/components/ui/dropdown-menu/index.js'
  import ButtonGroup from '@/components/ui/button-group/button-group.svelte'
  import Button from '../ui/button/button.svelte'
  import { Calendar, Funnel } from '@lucide/svelte'
</script>

<div class="hidden items-center gap-2 lg:flex">
  <ButtonGroup>
    <DropdownMenu>
      <TriggerDropdown>
        {#snippet child({ props })}
          <Button {...props} variant="outline">
            <Funnel />
          </Button>
        {/snippet}
      </TriggerDropdown>
      <ContentDropdown class="w-56" align="start">
        <GroupDropdown>
          {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
            <ItemDropdown onclick={() => console.log('filter')}>
              {pageSize}
            </ItemDropdown>
          {/each}
        </GroupDropdown>
      </ContentDropdown>
    </DropdownMenu>

    <DropdownMenu>
      <TriggerDropdown>
        {#snippet child({ props })}
          <Button {...props} variant="outline">
            <Calendar />
          </Button>
        {/snippet}
      </TriggerDropdown>
      <ContentDropdown class="w-56" align="start">
        <GroupDropdown>
          {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
            <ItemDropdown onclick={() => console.log('filter')}>
              {pageSize}
            </ItemDropdown>
          {/each}
        </GroupDropdown>
      </ContentDropdown>
    </DropdownMenu>
  </ButtonGroup>
</div>
