<script lang="ts">
  import AppSidebar from '@/components/app-sidebar.svelte'
  import * as Breadcrumb from '@/components/ui/breadcrumb/index.js'
  import { Separator } from '@/components/ui/separator/index.js'
  import * as Sidebar from '@/components/ui/sidebar/index.js'

  import debounce from 'debounce'
  import type { ChangeEventHandler } from 'svelte/elements'
  import Input from '@/components/ui/input/input.svelte'
  import { fetchApi } from '@/runes/fetchApi.svelte.js'

  import Table from '@/components/ui/table/table.svelte'
  import { Body, Caption, Cell, Footer, Head, Header, Row } from '@/components/ui/table/index.js'
  import Button, { buttonVariants } from '@/components/ui/button/button.svelte'
  import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ChevronsUpDown,
    Funnel,
    ListFilter,
    PlusIcon,
    SearchIcon,
  } from '@lucide/svelte'
  import Label from '@/components/ui/label/label.svelte'
  import Select from '@/components/ui/select/select.svelte'
  import { Content, Item, Trigger } from '@/components/ui/select/index.js'
  import { DateFormatter } from '@internationalized/date'
  import { router } from '@inertiajs/svelte'
  import InputGroup from '@/components/ui/input-group/input-group.svelte'
  import { Addon } from '@/components/ui/input-group/index.js'
  import InputGroupInput from '@/components/ui/input-group/input-group-input.svelte'

  import DropdownMenu from '@/components/ui/dropdown-menu/dropdown-menu.svelte'
  import {
    Trigger as TriggerDropdown,
    Item as ItemDropdown,
    Group as GroupDropdown,
    Content as ContentDropdown,
  } from '@/components/ui/dropdown-menu/index.js'
  import ButtonGroup from '@/components/ui/button-group/button-group.svelte'
  import HeadTableFilter from '@/components/head-table-filter.svelte'
  type Item = Array<{
    id: string
    title: HTMLElement
    body: string
    description: string
    createdAt: number
    url: string
  }>

  const { posts } = $props()

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
  }

  let items = $derived.by(() =>
    posts.data.map((i) => ({
      ...i,
      createdAt: new DateFormatter(navigator.language.split('-')[0], {
        dateStyle: 'medium',
      }).format(new Date(i.createdAt)),
    }))
  )

  $inspect(items)

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
      <div class="flex w-full items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <div class="hidden items-center gap-2 lg:flex">
            <ButtonGroup>
              <DropdownMenu>
                <TriggerDropdown>
                  {#snippet child({ props })}
                    <Button {...props} variant="outline">
                      <ListFilter />
                    </Button>
                  {/snippet}
                </TriggerDropdown>
                <ContentDropdown class="w-56" align="start">
                  <GroupDropdown>
                    {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
                      <ItemDropdown onclick={() => console.log('filter')}>
                        {pageSize}
                      </ItemDropdown>
                    {/each}
                  </GroupDropdown>
                </ContentDropdown>
              </DropdownMenu>

              <DropdownMenu>
                <TriggerDropdown>
                  {#snippet child({ props })}
                    <Button {...props} variant="outline">
                      <Calendar />
                    </Button>
                  {/snippet}
                </TriggerDropdown>
                <ContentDropdown class="w-56" align="start">
                  <GroupDropdown>
                    {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
                      <ItemDropdown onclick={() => console.log('filter')}>
                        {pageSize}
                      </ItemDropdown>
                    {/each}
                  </GroupDropdown>
                </ContentDropdown>
              </DropdownMenu>
            </ButtonGroup>

            <!-- <Popover>
              <TriggerPopover class={buttonVariants({ variant: 'outline' })}>
                <Funnel />
              </TriggerPopover>
              <ContentPopover>
                {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
                  <Item onclick={() => console.log} value={pageSize.toString()}>
                    {pageSize}
                  </Item>
                {/each}
              </ContentPopover>
            </Popover> -->
          </div>

          <InputGroup>
            <InputGroupInput
              oninput={onInput}
              type="text"
              value={query}
              name="q"
              placeholder="Search..."
            />
            <Addon>
              <SearchIcon />
            </Addon>
          </InputGroup>
        </div>

        <div class="flex items-center gap-2">
          <!-- <DropdownMenu>
            <TriggerDropdown>
              {#snippet child({ props })}
                <Button variant="outline" size="sm" {...props}>
                  <Columns2Icon />
                  <span class="hidden lg:inline">Customize Columns</span>
                  <span class="lg:hidden">Columns</span>
                  <ChevronDownIcon />
                </Button>
              {/snippet}
            </TriggerDropdown>
            <ContentDropdown align="end" class="w-56">bonjour les gens</ContentDropdown>
          </DropdownMenu> -->
          <Button variant="default" size="sm">
            <PlusIcon />
            <span class="hidden lg:inline">Add Section</span>
          </Button>
        </div>
      </div>
      <div class="rounded-lg border border-border overflow-hidden">
        <Table>
          <Header>
            <Row>
              <HeadTableFilter title="Title" />
              <HeadTableFilter title="Description" />
              <HeadTableFilter title="Created at" />
              <HeadTableFilter title="Page title" />
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

      <div class="flex items-center justify-end">
        <!-- <Footer class="border-t-0 ">
          <Row class="flex justify-between">
            <Cell colspan={3}>Total</Cell>
            <Cell class="text-end">$2,500.00</Cell>
          </Row>
        </Footer>
        <Caption>A list of your recent invoices.</Caption> -->
        <div class="flex w-full items-center justify-end gap-8 lg:w-fit">
          <div class="hidden items-center gap-2 lg:flex">
            <Label for="rows-per-page" class="text-sm font-medium">Rows per page</Label>
            <Select type="single">
              <Trigger size="sm" class="w-20" id="rows-per-page">{posts.meta.perPage}</Trigger>
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
            Page {posts.meta.firstPage} of {posts.meta.lastPage}
          </div>
          <div class="ms-auto flex items-center gap-2 lg:ms-0">
            <Button
              variant="outline"
              class="hidden h-8 w-8 p-0 lg:flex"
              onclick={() => urlWithQueryParams(posts.meta.firstPageUrl)}
              disabled={posts.meta.currentPage === posts.meta.firstPage}
            >
              <span class="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>

            <Button
              variant="outline"
              class="size-8"
              size="icon"
              onclick={() => urlWithQueryParams(posts.meta.previousPageUrl)}
              disabled={posts.meta.currentPage === posts.meta.firstPage}
            >
              <span class="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>

            <Button
              variant="outline"
              class="size-8"
              size="icon"
              onclick={() => urlWithQueryParams(posts.meta.nextPageUrl)}
              disabled={posts.meta.currentPage === posts.meta.lastPage}
            >
              <span class="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>

            <Button
              variant="outline"
              class="hidden size-8 lg:flex"
              size="icon"
              onclick={() => urlWithQueryParams(posts.meta.lastPageUrl)}
              disabled={posts.meta.currentPage === posts.meta.lastPage}
            >
              <span class="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
