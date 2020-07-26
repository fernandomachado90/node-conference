const scheduler = {
  organize: (talks) => {
    const tracks = []
    let currentTrack = pushTrack(tracks)

    for (let t = 0; t < talks.length; t++) {
      const talk = talks[t]

      let talkStart = currentTrack.nextSlot
      if (isLunchBreak(talkStart, talk.duration)) {
        talkStart = pushBreak(currentTrack, lunchSlot)
      }

      if (isCoffeeBreak(talkStart, talk.duration)) {
        talkStart = pushBreak(currentTrack, coffeeSlot)
        currentTrack = pushTrack(tracks)
      }

      pushTalk(currentTrack, talk)
    }

    addMissingBreaks(currentTrack)
    return tracks
  },
}

const pushTrack = (tracks) => {
  const id = tracks.length + 1
  tracks.push({
    title: "Track " + id,
    talks: [],
    nextSlot: day.start,
  })
  return tracks[id - 1]
}

const pushTalk = (track, talk) => {
  track.talks.push({
    title: talk.title,
    start: track.nextSlot,
    duration: talk.duration,
  })
  track.nextSlot += talk.duration
  return track.nextSlot
}

const pushBreak = (track, slot) => {
  track.talks.push({
    title: slot.title,
    start: slot.start,
    duration: slot.duration,
  })
  track.nextSlot = slot.start + slot.duration
  return track.nextSlot
}

const isLunchBreak = (start, duration) => {
  return (
    (lunchSlot.start <= start && start < lunchSlot.start + lunchSlot.duration) ||
    (lunchSlot.start < start + duration && start + duration < lunchSlot.start + lunchSlot.duration)
  )
}

const isCoffeeBreak = (start, duration) => {
  return coffeeSlot.start <= start || coffeeSlot.start < start + duration
}

const addMissingBreaks = (track) => {
  const hasLunch = track.talks.find((talk) => talk.title == lunchSlot.title)
  if (!hasLunch) pushBreak(track, lunchSlot)

  const hasCoffee = track.talks.find((talk) => talk.title == coffeeSlot.title)
  if (!hasCoffee) pushBreak(track, coffeeSlot)
}

const day = {
  start: 9 * 60, //9:00AM
}

const lunchSlot = {
  title: "Lunch",
  start: 12 * 60, //12:00PM
  duration: 60, //13:00PM
}

const coffeeSlot = {
  title: "Networking Event",
  start: 17 * 60, //05:00PM
  duration: 60, //06:00PM
}

module.exports = scheduler
