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
  serialize: (tracks) => {
    let data = {
      abc: "123",
    }

    // const data = tracks.map((track) => {
    //   Math.floor(slot.start / 60) + ":" + (slot.start % 60),
    //
    //   return {
    //     title: title,
    //     duration: duration == "lightning" ? 5 : parseInt(duration),
    //   }
    // })

    return JSON.stringify(data)
  },
}

module.exports = parser
