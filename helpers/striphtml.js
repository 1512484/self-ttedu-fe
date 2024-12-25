const striphtml = string => {
  return string?.replace(/(<([^>]+)>)/gi, '')
}

export default striphtml
