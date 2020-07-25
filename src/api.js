const http = require("http")

const parser = require("./parser")

const api = {
  startServer: async (hostname, port) => {
    const server = http.createServer((req, res) => {
      if (req.method !== "POST") {
        res.writeHead(501)
        res.end()
        return
      }

      const chunks = []
      req.on("data", (chunk) => chunks.push(chunk))
      req.on("end", () => {
        const json = Buffer.concat(chunks).toString()

        try {
          input = parser.deserialize(json)
        } catch (err) {
          res.writeHead(500)
          res.end()
          return
        }

        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(json)
      })
    })

    await server.listen(port, hostname)
    console.log(`Server running at http://${hostname}:${port}/`)

    return server
  },
}

module.exports = api
