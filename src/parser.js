const parser = {
  deserialize: (json) => {
    const data = JSON.parse(json).data

    const talks = data.map((talk) => {
      const separator = talk.lastIndexOf(" ")
      const title = talk.slice(0, separator)
      const duration = talk.slice(separator + 1)
      return {
        title: title,
        duration: parseDuration(duration),
      }
    })

    return talks
  },
  serialize: (tracks) => {
    const data = tracks.map((track) => {
      const talks = track.talks.map((talk) => {
        let title = formatTimestamp(talk.start) + " " + talk.title
        if (talk.duration) title += " " + formatDuration(talk.duration)
        return title
      })

      return {
        title: track.title,
        data: talks,
      }
    })

    return JSON.stringify({ data: data })
  },
}

const parseDuration = (str) => {
  if (str == lightning.label) {
    return lightning.duration
  }
  return parseInt(str)
}

const formatTimestamp = (mins) => {
  let hh = Math.floor(mins / 60)
  if (hh > 12) hh = hh - 12
  hh = hh.toString().padStart(2, "0")

  const mm = Math.floor(mins % 60)
    .toString()
    .padStart(2, "0")

  const a = Math.floor(mins / 60) < 12 ? "AM" : "PM"

  return hh + ":" + mm + a
}

const formatDuration = (min) => {
  return min == lightning.duration ? lightning.label : min + "min"
}

const lightning = {
  label: "lightning",
  duration: 5,
}

module.exports = parser
