<script lang="ts">
  import Table from '@/components/ui/table/table.svelte'
  import { Body, Cell, Header, Row } from '@/components/ui/table/index.js'

  import { DateFormatter } from '@internationalized/date'
  import HeadTableFilter from '@/components/table/head-table-filter.svelte'

  import TableHeader from '@/components/table/table-header.svelte'
  import { toCamelCase } from '@/helpers/string.js'
  import TableFooter from '@/components/table/table-footer.svelte'

  const { collections, columns } = $props()

  let search = $state<any[]>([])

  let items = $derived.by(() =>
    collections.data.map((i) => ({
      ...i,
      createdAt: new DateFormatter(navigator.language.split('-')[0], {
        dateStyle: 'medium',
      }).format(new Date(i.createdAt)),
    }))
  )

  let filteredItems = $derived.by(() => {
    if (search.length === 0) {
      return items
    }

    return search.map((s) => {
      return Object.fromEntries(
        Object.entries(s).map(([k, value]) => {
          const key = toCamelCase(k)
          return [key, value]
        })
      )
    })
  })

  $inspect(filteredItems)

  // $inspect(items)
</script>

<div class="flex flex-col gap-4">
  <TableHeader bind:searchData={search} items={collections} />
  <div class="rounded-lg border border-border w-full">
    <Table>
      <Header>
        <Row>
          {#each columns as row}
            <HeadTableFilter rowEnabled={row} />
          {/each}
        </Row>
      </Header>
      <Body>
        {#each filteredItems as item}
          <Row>
            {#each columns as row, i}
              <Cell class={`font-medium px-4 ${collections.length - 1 === i ? 'text-end' : ''}`}>
                {#if filteredItems}
                  {@html item[toCamelCase(row.key)]}
                {:else}
                  {item[toCamelCase(row.key)]}
                {/if}
              </Cell>
            {/each}
          </Row>
        {/each}
      </Body>
    </Table>
  </div>

  <TableFooter meta={collections.meta} />
</div>
