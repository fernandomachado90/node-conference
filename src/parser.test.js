const parser = require("./parser")

describe("deserialize talks json", () => {
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
