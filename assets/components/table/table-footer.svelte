<script lang="ts">
  import Button from '@/components/ui/button/button.svelte'
  import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '@lucide/svelte'
  import Label from '@/components/ui/label/label.svelte'
  import Select from '@/components/ui/select/select.svelte'
  import { Content, Item, Trigger } from '@/components/ui/select/index.js'
  import { page, router } from '@inertiajs/svelte'

  const { meta } = $props()

  function handlePagination(pageNumber: number | null) {
    if (!pageNumber) return

    const url = new URL($page.url, window.location.origin)
    url.searchParams.set('page', pageNumber.toString())

    router.visit(url.toString(), {
      preserveState: true,
      preserveScroll: true,
    })
  }

  function changeLimit(newLimit: number) {
    const url = new URL($page.url, window.location.origin)
    url.searchParams.set('limit', newLimit.toString())
    url.searchParams.set('page', '1')

    router.visit(url.toString(), {
      preserveState: true,
      preserveScroll: true,
    })
  }
</script>

<div class="flex items-center justify-end">
  <div class="flex w-full items-center justify-end gap-8 lg:w-fit">
    <div class="hidden items-center gap-2 lg:flex">
      <Label for="rows-per-page" class="text-sm font-medium">Rows per page</Label>
      <Select type="single" value={meta.perPage.toString()}>
        <Trigger size="sm" class="w-20" id="rows-per-page">
          {meta.perPage}
        </Trigger>
        <Content side="top">
          {#each [10, 20, 30, 40, 50] as pageSize}
            <Item onclick={() => changeLimit(pageSize)} value={pageSize.toString()}>
              {pageSize}
            </Item>
          {/each}
        </Content>
      </Select>
    </div>

    <div class="flex w-fit items-center justify-center text-sm font-medium">
      Page {meta.currentPage} of {meta.lastPage}
    </div>

    <div class="ms-auto flex items-center gap-2 lg:ms-0">
      <Button
        variant="outline"
        class="hidden h-8 w-8 p-0 lg:flex"
        onclick={() => handlePagination(1)}
        disabled={meta.currentPage === 1}
      >
        <ChevronsLeft size={16} />
      </Button>

      <Button
        variant="outline"
        class="size-8"
        size="icon"
        onclick={() => handlePagination(meta.currentPage - 1)}
        disabled={meta.currentPage === 1}
      >
        <ChevronLeft size={16} />
      </Button>

      <Button
        variant="outline"
        class="size-8"
        size="icon"
        onclick={() => handlePagination(meta.currentPage + 1)}
        disabled={meta.currentPage === meta.lastPage}
      >
        <ChevronRight size={16} />
      </Button>

      <Button
        variant="outline"
        class="hidden size-8 lg:flex"
        size="icon"
        onclick={() => handlePagination(meta.lastPage)}
        disabled={meta.currentPage === meta.lastPage}
      >
        <ChevronsRight size={16} />
      </Button>
    </div>
  </div>
</div>
