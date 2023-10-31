import express from 'express'
const app = express()
import cors from 'cors'
import 'dotenv/config'
const PORT = process.env.PORT || 8080
import db from './config/db/index.js'
import route from './routes/index.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb'}))
app.use(express.urlencoded({ limit: '10mb', extended: true })); 
route(app)

app.listen(PORT, async() => {
  await db.connect()
  console.log(`Example app listening on port ${PORT}`)
})