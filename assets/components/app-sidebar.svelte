<script lang="ts" module>
  import { router, Link } from '@inertiajs/svelte'

  // sample data
  const data = {
    versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
    navMain: [
      {
        title: 'Getting Started',
        url: '#',
        items: [
          {
            title: 'post',
            url: '/post',
          },
        ],
      },
    ],
  }
</script>

<script lang="ts">
  import SearchForm from './search-form.svelte'
  import VersionSwitcher from './version-switcher.svelte'
  import * as Sidebar from '@/components/ui/sidebar/index.js'
  import type { ComponentProps } from 'svelte'

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props()
</script>

<Sidebar.Root {...restProps} bind:ref>
  <Sidebar.Header>
    <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
    <SearchForm />
  </Sidebar.Header>
  <Sidebar.Content>
    <!-- We create a Sidebar.Group for each parent. -->
    {#each data.navMain as group (group.title)}
      <Sidebar.Group>
        <Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each group.items as item (item.title)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton isActive={item.isActive}>
                  {#snippet child({ props })}
                    <Link href={item.url} {...props}>{item.title}</Link>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    {/each}
  </Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>
