const emptyText = (text) => {
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