import app from "./app.js"
import "./config/db.js"
import config from "./config/config.js"
import ormConfig from "./config/db.js"

ormConfig()
app.listen(config.PORT)
// eslint-disable-next-line no-console
console.log("SERVER: Server started on port", app.get("port"))
