export function fetchApi<T = Array<unknown>>(options: RequestInit = {}) {
  let data = $state<T>([] as T)
  let loading = $state<boolean>(false)
  let errors = $state<string | null>(null)

  const load = async (localUrl: string, localOption: RequestInit = {}) => {
    loading = true
    errors = null

    try {
      const response = await fetch(localUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...localOption.headers,
        },
        credentials: 'include',
        ...localOption,
      })
      if (!response.ok) {
        throw new Error('HTTP Error', {
          cause: response.status,
        })
      }
      data = (await response.json()) as T
    } catch (err) {
      errors = err instanceof Error ? err.message : 'Error server'
    } finally {
      loading = false
    }
  }

  return {
    load,
    get errors() {
      return errors
    },
    get loading() {
      return loading
    },
    get data() {
      return data
    },
  }
}
