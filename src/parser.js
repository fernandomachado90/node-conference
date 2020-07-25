const parser = {
  deserialize: (json) => {
    const data = JSON.parse(json).data

    const talks = data.map((talk) => {
      const separator = talk.lastIndexOf(" ")
      const title = talk.slice(0, separator)
      const duration = talk.slice(separator + 1)
      return {
        title: title,
        duration: duration == "lightning" ? 5 : parseInt(duration),
      }
    })

    return talks
  },
}

module.exports = parser
