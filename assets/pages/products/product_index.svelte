<script lang="ts">
  import TableItem from '@/components/table/table-item.svelte'
  import Wrapper from '@/components/wrapper.svelte'
  import MainLayout from '@/layouts/main-layout.svelte'

  import { page } from '@inertiajs/svelte'

  interface Props {
    products: Array<{
      id: string
      title: HTMLElement
      body: string
      description: string
      createdAt: number
      url: string
    }>
    columns: unknown
  }
  $inspect($page)
  let { products, columns }: Props = $props()
</script>

<div></div>

<MainLayout>
  <Wrapper title="Products" class="flex flex flex-col gap-4">
    <TableItem collections={products} {columns} />
  </Wrapper>
</MainLayout>
