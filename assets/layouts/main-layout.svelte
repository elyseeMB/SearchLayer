<script lang="ts">
  let { children }: WithElementRef<HTMLAttributes<HTMLElement>> = $props()

  import AppSidebar from '@/components/app-sidebar.svelte'
  import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb.svelte'
  import {
    List,
    Item,
    Link,
    Separator as BreadcrumbSepartor,
    Page,
  } from '@/components/ui/breadcrumb/index.js'
  import { Separator } from '@/components/ui/separator/index.js'
  import { Inset, Trigger } from '@/components/ui/sidebar/index.js'
  import SidebarProvider from '@/components/ui/sidebar/sidebar-provider.svelte'
  import type { WithElementRef } from '@/lib/utils.js'
  import type { HTMLAttributes } from 'svelte/elements'
</script>

{#snippet header()}
  <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    <Trigger class="-ms-1" />
    <Separator orientation="vertical" class="me-2 h-4" />
    <Breadcrumb>
      <List>
        <Item class="hidden md:block">
          <Link href="##">Building Your Application</Link>
        </Item>
        <BreadcrumbSepartor class="hidden md:block" />
        <Item>
          <Page>Data Fetching</Page>
        </Item>
      </List>
    </Breadcrumb>
  </header>
{/snippet}

<SidebarProvider>
  <AppSidebar />
  <Inset>
    {@render header()}

    <div class="flex flex-1 flex-col gap-10 p-4">
      {@render children?.()}
    </div>
  </Inset>
</SidebarProvider>
