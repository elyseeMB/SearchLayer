<script lang="ts">
  import AppSidebar from '@/components/app-sidebar.svelte'
  import * as Breadcrumb from '@/components/ui/breadcrumb/index.js'
  import { Separator } from '@/components/ui/separator/index.js'
  import * as Sidebar from '@/components/ui/sidebar/index.js'

  import debounce from 'debounce'
  import type { ChangeEventHandler } from 'svelte/elements'
  import Input from '@/components/ui/input/input.svelte'
  import { fetchApi } from '@/runes/fetchApi.svelte.js'

  let query: string | null = $state(null)
  const api = fetchApi()

  const HOST = 'http://localhost:3333'
  const SEARCH = new URL('/search', HOST)

  let results = $derived.by(() => {
    let data: Array<{}>
    data = api.data
    if (query === '') {
      return []
    }

    if (query !== '' && query !== null && api.data.length > 0) {
      SEARCH.searchParams.set('q', encodeURI(query))
      SEARCH.searchParams.set('redirect', '0')
      data = [...api.data, { url: `${SEARCH}` }]
    }
    return data
  })

  const suggest = debounce((e: Event) => {
    SEARCH.searchParams.set('q', encodeURI((e.target as HTMLInputElement)!.value))
    api.load(SEARCH.href, {
      method: 'PATCH',
    })
  }, 300)

  const onInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    query = e.currentTarget.value
    suggest(e)
  }

  $inspect(results)
</script>

<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <Sidebar.Trigger class="-ms-1" />
      <Separator orientation="vertical" class="me-2 h-4" />
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item class="hidden md:block">
            <Breadcrumb.Link href="##">Building Your Application</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator class="hidden md:block" />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4">
      <Input oninput={onInput} type="text" value={query} placeholder="search..." name="q" />

      <ul>
        {#each results as item}
          <li>
            {JSON.stringify(item)}
          </li>
        {/each}
      </ul>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
