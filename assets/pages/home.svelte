<script lang="ts">
  import debounce from 'debounce'
  import type { ChangeEventHandler } from 'svelte/elements'
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
  import HeadTableFilter from '@/components/table/head-table-filter.svelte'
  import MainLayout from '@/layouts/main-layout.svelte'
  import SearchForm from '@/components/search-form.svelte'

  import TableHeader from '@/components/table/table-header.svelte'
  import { toCamelCase } from '@/helpers/string.js'
  import TableFooter from '@/components/table/table-footer.svelte'
  import TableItem from '@/components/table/table-item.svelte'
  import Wrapper from '@/components/wrapper.svelte'

  type Item = Array<{
    id: string
    title: HTMLElement
    body: string
    description: string
    createdAt: number
    url: string
  }>

  const { posts, products } = $props()

  console.log(products)
  console.log(posts)

  let items = $derived.by(() =>
    posts.data.map((i) => ({
      title: i.title,
      description: i.description,
      createdAt: new DateFormatter(navigator.language.split('-')[0], {
        dateStyle: 'medium',
      }).format(new Date(i.createdAt)),
      pageTitle: i.pageTitle,
    }))
  )

  // $inspect(items)

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

  let rowsEnabled = $derived.by(() => {
    return Object.keys(items[0]).map((i) => toCamelCase(i))
  })
</script>

<MainLayout>
  <Wrapper title="Posts" class="flex flex-1 flex-col gap-4">
    <TableItem collections={posts} />
  </Wrapper>

  <Wrapper title="Products">
    <TableItem collections={products} />
  </Wrapper>
</MainLayout>
