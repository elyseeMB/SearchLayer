<script lang="ts">
  import Button from '../ui/button/button.svelte'
  import { PlusIcon } from '@lucide/svelte'
  import { fetchApi } from '@/runes/fetchApi.svelte.js'
  import debounce from 'debounce'
  import type { ChangeEventHandler } from 'svelte/elements'
  import SearchForm from '../search-form.svelte'
  import TableFilter from './table-filter.svelte'

  type Item = Array<{
    id: string
    title: HTMLElement
    body: string
    description: string
    createdAt: number
    url: string
  }>

  interface Props {
    items: Item
    searchData: any[]
  }

  let { items, searchData = $bindable([]) }: Props = $props()

  let query: string | null = $state(null)
  const api = fetchApi<Item>()

  const HOST = 'http://localhost:3333'
  const SEARCH = new URL('/search', HOST)

  let results = $derived.by(() => {
    let data: Item
    data = api.data
    if (query === '') {
      return []
    }

    if (query !== '' && query !== null && api.data.length > 0) {
      SEARCH.searchParams.set('q', encodeURI(query))
      SEARCH.searchParams.set('redirect', '0')
      data = [...api.data]
      const last = data.pop()
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
    searchData = results
  }
</script>

<div class="flex w-full items-center justify-between gap-2">
  <div class="flex items-center gap-2">
    <TableFilter />

    <SearchForm
      handler={onInput}
      type="text"
      value={query ?? ''}
      name="q"
      placeholder="Search..."
    />
  </div>

  <div class="flex items-center gap-2">
    <Button variant="default" size="sm">
      <PlusIcon />
      <span class="hidden lg:inline">Add Section</span>
    </Button>
  </div>
</div>
