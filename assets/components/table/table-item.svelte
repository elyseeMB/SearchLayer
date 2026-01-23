<script lang="ts">
  import Table from '@/components/ui/table/table.svelte'
  import { Body, Cell, Header, Row } from '@/components/ui/table/index.js'

  import { DateFormatter } from '@internationalized/date'
  import HeadTableFilter from '@/components/table/head-table-filter.svelte'
  import MainLayout from '@/layouts/main-layout.svelte'

  import TableHeader from '@/components/table/table-header.svelte'
  import { toCamelCase } from '@/helpers/string.js'
  import TableFooter from '@/components/table/table-footer.svelte'

  const { collections } = $props()

  let items = $derived.by(() =>
    collections.data.map((i) => ({
      title: i.title,
      description: i.description,
      createdAt: new DateFormatter(navigator.language.split('-')[0], {
        dateStyle: 'medium',
      }).format(new Date(i.createdAt)),
      pageTitle: i.pageTitle,
    }))
  )

  // $inspect(items)

  let rowsEnabled = $derived.by(() => {
    return Object.keys(items[0]).map((i) => toCamelCase(i))
  })
</script>

<TableHeader items={collections} />
<div class="rounded-lg border border-border overflow-hidden">
  <Table>
    <Header>
      <Row>
        {#each rowsEnabled as row}
          <HeadTableFilter title={row} />
        {/each}
      </Row>
    </Header>
    <Body>
      {#each items as item}
        <Row>
          <Cell class="font-medium px-4">{item.title}</Cell>
          <Cell class="px-4">{item.description}</Cell>
          <Cell class="px-4">{item.createdAt}</Cell>
          <Cell class="text-end px-4">{item.pageTitle}</Cell>
        </Row>
      {/each}
    </Body>
  </Table>
</div>

<TableFooter meta={collections.meta} />
