import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 8000


app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("server is running at docker container")
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})