export function asyncEffect(cb) {
  $effect(() => {
    return cb()
  })
}
