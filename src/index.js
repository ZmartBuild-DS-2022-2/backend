import app from './app.js'
import './config/db.js'
import { PORT } from './config/config.js'

app.listen(PORT)

// eslint-disable-next-line no-console
console.log('SERVER: Server started on port', app.get('port'))
