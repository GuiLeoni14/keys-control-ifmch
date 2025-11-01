export const extractSpreadsheetId = (input: string) => {
  const urlMatch = input.match(/\/d\/([a-zA-Z0-9_-]{16,})(\/|$|\?|#)/)
  if (urlMatch) {
    return urlMatch[1]
  }

  if (/^[a-zA-Z0-9_-]{16,}$/.test(input)) {
    return input
  }

  return null
}
