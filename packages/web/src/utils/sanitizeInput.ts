const sanitizeInput = (input: string) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }

  return input.replace(/[&<>"']/g, (m) => map[m])
}


export default sanitizeInput
