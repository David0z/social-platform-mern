const emptyText = (text: string) => {
  if (text.trim() === "") {
    return false
  } else {
    return true
  }
}

const VALIDATORS = {
  emptyText
}

export default VALIDATORS