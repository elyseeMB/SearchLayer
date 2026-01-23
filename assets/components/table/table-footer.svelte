<script lang="ts">
  import Button from '@/components/ui/button/button.svelte'
  import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '@lucide/svelte'
  import Label from '@/components/ui/label/label.svelte'
  import Select from '@/components/ui/select/select.svelte'
  import { Content, Item, Trigger } from '@/components/ui/select/index.js'
  import { router } from '@inertiajs/svelte'

  const { meta } = $props()

  function urlWithQueryParams(url: string) {
    const currentUrl = new URL(window.location.href)
    const targetUrl = new URL(url, window.location.origin)

    currentUrl.searchParams.forEach((value, key) => {
      if (!targetUrl.searchParams.has(key)) {
        targetUrl.searchParams.set(key, value)
      }
    })

    return router.visit(targetUrl.toString(), {
      preserveState: true,
    })
  }
</script>

<div class="flex items-center justify-end">
  <div class="flex w-full items-center justify-end gap-8 lg:w-fit">
    <div class="hidden items-center gap-2 lg:flex">
      <Label for="rows-per-page" class="text-sm font-medium">Rows per page</Label>
      <Select type="single">
        <Trigger size="sm" class="w-20" id="rows-per-page">{meta.perPage}</Trigger>
        <Content side="top">
          {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
            <Item
              onclick={() => urlWithQueryParams(`/?limit=${pageSize}`)}
              value={pageSize.toString()}
            >
              {pageSize}
            </Item>
          {/each}
        </Content>
      </Select>
    </div>
    <div class="flex w-fit items-center justify-center text-sm font-medium">
      Page {meta.firstPage} of {meta.lastPage}
    </div>
    <div class="ms-auto flex items-center gap-2 lg:ms-0">
      <Button
        variant="outline"
        class="hidden h-8 w-8 p-0 lg:flex"
        onclick={() => urlWithQueryParams(meta.firstPageUrl)}
        disabled={meta.currentPage === meta.firstPage}
      >
        <span class="sr-only">Go to first page</span>
        <ChevronsLeft />
      </Button>

      <Button
        variant="outline"
        class="size-8"
        size="icon"
        onclick={() => urlWithQueryParams(meta.previousPageUrl)}
        disabled={meta.currentPage === meta.firstPage}
      >
        <span class="sr-only">Go to previous page</span>
        <ChevronLeft />
      </Button>

      <Button
        variant="outline"
        class="size-8"
        size="icon"
        onclick={() => urlWithQueryParams(meta.nextPageUrl)}
        disabled={meta.currentPage === meta.lastPage}
      >
        <span class="sr-only">Go to next page</span>
        <ChevronRight />
      </Button>

      <Button
        variant="outline"
        class="hidden size-8 lg:flex"
        size="icon"
        onclick={() => urlWithQueryParams(meta.lastPageUrl)}
        disabled={meta.currentPage === meta.lastPage}
      >
        <span class="sr-only">Go to last page</span>
        <ChevronsRight />
      </Button>
    </div>
  </div>
</div>
