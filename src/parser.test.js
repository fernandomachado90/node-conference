const parser = require("./parser")

describe("deserialize talks from json", () => {
  it("should deserialize a talk with a given duration", () => {
    const json = JSON.stringify({
      data: ["Writing Fast Tests Against Enterprise Rails 60min"],
    })

    const talks = parser.deserialize(json)

    expect(talks.length).toBe(1)
    expect(talks[0].title).toBe("Writing Fast Tests Against Enterprise Rails")
    expect(talks[0].duration).toBe(60)
  })

  it("should deserialize a talk with lightning duration", () => {
    const json = JSON.stringify({
      data: ["Rails for Python Developers lightning"],
    })

    const talks = parser.deserialize(json)

    expect(talks.length).toBe(1)
    expect(talks[0].title).toBe("Rails for Python Developers")
    expect(talks[0].duration).toBe(5)
  })
})

describe("serialize tracks to json", () => {
  it("should serialize an empty conference track", () => {
    const tracks = [
      {
        title: "Track 1",
        talks: [
          { title: "Lunch", start: 720 },
          { title: "Networking Event", start: 1020 },
        ],
      },
    ]

    const json = parser.serialize(tracks)

    expect(JSON.parse(json)).toMatchObject({
      data: [
        {
          title: "Track 1",
          data: ["12:00PM Lunch", "05:00PM Networking Event"],
        },
      ],
    })
  })

  it("should serialize a complete two track conference", () => {
    const tracks = [
      {
        title: "Track 1",
        talks: [
          { title: "Writing Fast Tests Against Enterprise Rails", start: 540, duration: 60 },
          { title: "Overdoing it in Python", start: 600, duration: 45 },
          { title: "Lua for the Masses", start: 645, duration: 30 },
          { title: "Ruby Errors from Mismatched Gem Versions", start: 675, duration: 45 },
          { title: "Lunch", start: 720 },
          { title: "Common Ruby Errors", start: 780, duration: 45 },
          { title: "Rails for Python Developers", start: 825, duration: 5 },
          { title: "Communicating Over Distance", start: 830, duration: 60 },
          { title: "Accounting-Driven Development", start: 890, duration: 45 },
          { title: "Woah", start: 935, duration: 30 },
          { title: "Sit Down and Write", start: 965, duration: 30 },
          { title: "Networking Event", start: 1020 },
        ],
      },
      {
        title: "Track 2",
        talks: [
          { title: "Pair Programming vs Noise", start: 540, duration: 45 },
          { title: "Rails Magic", start: 585, duration: 60 },
          { title: "Ruby on Rails: Why We Should Move On", start: 645, duration: 60 },
          { title: "Lunch", start: 720 },
          { title: "Clojure Ate Scala (on my project)", start: 780, duration: 45 },
          { title: "Programming in the Boondocks of Seattle", start: 825, duration: 30 },
          { title: "Ruby vs. Clojure for Back-End Development", start: 855, duration: 30 },
          { title: "Ruby on Rails Legacy App Maintenance", start: 885, duration: 60 },
          { title: "A World Without HackerNews", start: 945, duration: 30 },
          { title: "User Interface CSS in Rails Apps", start: 975, duration: 30 },
          { title: "Networking Event", start: 1020 },
        ],
      },
    ]

    const json = parser.serialize(tracks)

    expect(JSON.parse(json)).toMatchObject({
      data: [
        {
          title: "Track 1",
          data: [
            "09:00AM Writing Fast Tests Against Enterprise Rails 60min",
            "10:00AM Overdoing it in Python 45min",
            "10:45AM Lua for the Masses 30min",
            "11:15AM Ruby Errors from Mismatched Gem Versions 45min",
            "12:00PM Lunch",
            "01:00PM Common Ruby Errors 45min",
            "01:45PM Rails for Python Developers lightning",
            "01:50PM Communicating Over Distance 60min",
            "02:50PM Accounting-Driven Development 45min",
            "03:35PM Woah 30min",
            "04:05PM Sit Down and Write 30min",
            "05:00PM Networking Event",
          ],
        },
        {
          title: "Track 2",
          data: [
            "09:00AM Pair Programming vs Noise 45min",
            "09:45AM Rails Magic 60min",
            "10:45AM Ruby on Rails: Why We Should Move On 60min",
            "12:00PM Lunch",
            "01:00PM Clojure Ate Scala (on my project) 45min",
            "01:45PM Programming in the Boondocks of Seattle 30min",
            "02:15PM Ruby vs. Clojure for Back-End Development 30min",
            "02:45PM Ruby on Rails Legacy App Maintenance 60min",
            "03:45PM A World Without HackerNews 30min",
            "04:15PM User Interface CSS in Rails Apps 30min",
            "05:00PM Networking Event",
          ],
        },
      ],
    })
  })
})
