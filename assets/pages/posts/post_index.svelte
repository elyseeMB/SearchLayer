<script lang="ts">
  import TableItem from '@/components/table/table-item.svelte'
  import Wrapper from '@/components/wrapper.svelte'

  import MainLayout from '@/layouts/main-layout.svelte'
  import { page } from '@inertiajs/svelte'

  export const layout = MainLayout

  interface Props {
    posts: Array<{
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
  let { posts, columns }: Props = $props()
</script>

<MainLayout>
  <Wrapper title="Posts" class="flex flex flex-col gap-4">
    <TableItem collections={posts} {columns} />
  </Wrapper>
</MainLayout>
