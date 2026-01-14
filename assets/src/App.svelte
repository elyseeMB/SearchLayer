<script lang="ts">
  import debounce from 'debounce'
  import type { ChangeEventHandler } from 'svelte/elements'
  import { fetchApi } from './runes/fetchApi.svelte.js'
  let query: string | null = $state(null)
  const api = fetchApi()

  const HOST = 'http://localhost:3333'
  const SEARCH = new URL('/search', HOST)

  let results = $derived.by(() => {
    let data: []
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
    SEARCH.searchParams.set('q', encodeURI(e.target!.value))
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

<main>
  <input oninput={onInput} type="text" value={query} placeholder="search..." name="q" />

  <ul>
    {#each results as item}
      <li>
        {JSON.stringify(item)}
      </li>
    {/each}
  </ul>
</main>
