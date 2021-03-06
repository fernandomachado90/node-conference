const http = require("http")

const parser = require("./parser")
const scheduler = require("./scheduler")

const api = {
  startServer: async (port) => {
    const server = http.createServer((req, res) => {
      if (req.method !== "POST") {
        res.writeHead(501)
        res.end()
        return
      }

      const chunks = []
      req.on("data", (chunk) => chunks.push(chunk))
      req.on("end", () => {
        try {
          const request = Buffer.concat(chunks).toString()
          const talks = parser.deserialize(request)
          const tracks = scheduler.organize(talks)
          const response = parser.serialize(tracks)
          res.writeHead(200, { "Content-Type": "application/json" })
          res.end(response)
        } catch (err) {
          res.writeHead(500)
          res.end()
        }
      })
    })

    await server.listen(port)
    console.log(`Server running at port ${port}.`)

    return server
  },
}

module.exports = api
