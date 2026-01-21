<script lang="ts">
  import Card from './ui/card/card.svelte'
  import { Content, Description, Header, Title } from './ui/card/index.js'

  interface Props {
    title: HTMLElement
    description: string
    body: string
  }

  let { title = $bindable(), description, body }: Props = $props()
</script>

<Card>
  <Header>
    <Title contenteditable="true" bind:innerHTML={title} />
    <Description>
      {description}
    </Description>
  </Header>
  <Content>
    {body}
  </Content>
</Card>
