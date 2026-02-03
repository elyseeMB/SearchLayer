<script lang="ts">
  import Table from '@/components/ui/table/table.svelte'
  import { Body, Cell, Header, Row } from '@/components/ui/table/index.js'

  import { DateFormatter } from '@internationalized/date'
  import HeadTableFilter from '@/components/table/head-table-filter.svelte'

  import TableHeader from '@/components/table/table-header.svelte'
  import { toCamelCase } from '@/helpers/string.js'
  import TableFooter from '@/components/table/table-footer.svelte'

  const { collections, columns } = $props()

  let items = $derived.by(() =>
    collections.data.map((i) => ({
      ...i,
      createdAt: new DateFormatter(navigator.language.split('-')[0], {
        dateStyle: 'medium',
      }).format(new Date(i.createdAt)),
    }))
  )

  // $inspect(items)

  console.log(items)
  console.log(toCamelCase(columns[0].label))
</script>

<TableHeader items={collections} />
<div class="table-item rounded-lg border border-border overflow-hidden overflow-x-scroll w-screen">
  <Table>
    <Header>
      <Row>
        {#each columns as row}
          <HeadTableFilter rowEnabled={row} />
        {/each}
      </Row>
    </Header>
    <Body>
      {#each items as item}
        <Row>
          {#each columns as row, i}
            <Cell class={`font-medium px-4 ${collections.length - 1 === i ? 'text-end' : ''}`}>
              {item[toCamelCase(row.key)]}
            </Cell>
          {/each}
        </Row>
      {/each}
    </Body>
  </Table>
</div>

<TableFooter meta={collections.meta} />

<style>
  .table-item {
    width: calc(100vw - 3rem);
  }
</style>
