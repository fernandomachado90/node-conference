const supertest = require("supertest")

const api = require("./api")

let server

beforeAll(async () => {
  server = await api.startServer("localhost", "9999")
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
    const payload = {
      unknown: "error",
    }

    supertest(server).post("/").send(payload).expect(500, done)
  })

  it("should respond with 200 success and a possible schedule", (done) => {
    const payload = {
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

    supertest(server)
      .post("/")
      .send(payload)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, payload, done)
  })
})
