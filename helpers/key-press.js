export function onEnter(cb) {
  return event => {
    if (!cb) return

    event.preventDefault()

    if (event.charCode === 13 || event.key === 'Enter') {
      cb(event)
    }
  }
}
