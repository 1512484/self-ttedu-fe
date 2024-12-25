const shorten = (string, length = 12) => {
  const arr = string?.split(' ')
  return arr?.length > length ? `${arr.splice(0, length).join(' ')}...` : string
}

export default shorten
