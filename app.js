const api = require("./src/api")

const port = process.env.PORT || "3000"

api.startServer("localhost", port)
