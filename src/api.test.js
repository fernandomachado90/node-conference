const supertest = require("supertest")

const api = require("./api")

let server

beforeAll(async () => {
  server = await api.startServer(9999)
})

afterAll(async () => {
  await server.close()
})

describe("reaches unimplemented /endpoint", () => {
  it("should respond with 501 error", (done) => {
    supertest(server).get("/").expect(501, done)
  })
})

describe("reaches POST /", () => {
  it("should respond with 500 error when payload is not provided", (done) => {
    supertest(server).post("/").expect(500, done)
  })

  it("should respond with 500 error when payload cannot be parsed", (done) => {
    const request = {
      unknown: "error",
    }

    supertest(server).post("/").send(request).expect(500, done)
  })

  it("should respond with 200 success and an empty conference track", (done) => {
    const request = {
      data: [],
    }

    const response = {
      data: [
        {
          title: "Track 1",
          data: ["12:00PM Lunch", "05:00PM Networking Event"],
        },
      ],
    }

    supertest(server)
      .post("/")
      .send(request)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, response, done)
  })

  it("should respond with 200 success and a complete two track conference", (done) => {
    const request = {
      data: [
        "Writing Fast Tests Against Enterprise Rails 60min",
        "Overdoing it in Python 45min",
        "Lua for the Masses 30min",
        "Ruby Errors from Mismatched Gem Versions 45min",
        "Common Ruby Errors 45min",
        "Rails for Python Developers lightning",
        "Communicating Over Distance 60min",
        "Accounting-Driven Development 45min",
        "Woah 30min",
        "Sit Down and Write 30min",
        "Pair Programming vs Noise 45min",
        "Rails Magic 60min",
        "Ruby on Rails: Why We Should Move On 60min",
        "Clojure Ate Scala (on my project) 45min",
        "Programming in the Boondocks of Seattle 30min",
        "Ruby vs. Clojure for Back-End Development 30min",
        "Ruby on Rails Legacy App Maintenance 60min",
        "A World Without HackerNews 30min",
        "User Interface CSS in Rails Apps 30min",
      ],
    }

    const response = {
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
    }

    supertest(server)
      .post("/")
      .send(request)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, response, done)
  })
})
