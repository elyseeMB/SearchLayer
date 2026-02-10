<script lang="ts">
  import { asyncEffect } from '@/runes/asyncEffect.svelte.js'
  import { page } from '@inertiajs/svelte'
  import { resolvePageComponent } from '@adonisjs/inertia/helpers'

  let { source, children }: { source: string; children: any } = $props()
  let version = $derived($page.version)
  let cmpProps = $state<null | any>(null)
  let Cmp = $state<null | any>(null)

  asyncEffect(async () => {
    const rs = await fetch(source, {
      // @ts-ignore
      headers: {
        'X-Inertia': 'true',
        'X-Inertia-Fragment': 'true',
        'X-Inertia-Version': version,
      },
    })

    if (rs.ok) {
      const data = await rs.json()
      cmpProps = data.props

      const { default: module } = await resolvePageComponent(
        `../pages/${data.component}.svelte`,
        import.meta.glob(['../pages/**/*.svelte', '../pages/**/*.svelte'])
      )

      Cmp = module
    }
  })
</script>

{#if Cmp && cmpProps}
  <Cmp {...cmpProps}>
    {@render children?.()}
  </Cmp>
{/if}
