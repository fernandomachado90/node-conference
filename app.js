const api = require("./src/api")

const host = process.env.HOST || "127.0.0.1"
const port = process.env.PORT || "3000"

api.startServer(host, port)
