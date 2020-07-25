const http = require("http")

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
        let input
        try {
          input = JSON.parse(json)
        } catch (err) {
          res.writeHead(500)
          res.end()
          return
        }

        res.writeHead(200, { "Content-Type": "application/json" })
        const output = JSON.stringify(input)
        res.end(output)
      })
    })

    await server.listen(port, hostname)
    console.log(`Server running at http://${hostname}:${port}/`)

    return server
  },
}

module.exports = api
