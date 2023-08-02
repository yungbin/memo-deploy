const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const database = require('./database')

app.use(bodyParser.json())

app.use(express.static('dist'))

app.get('/api/memos', async (req, res) => {
    const result = await database.run("SELECT * FROM memos");
    res.send(result)
});

app.post("/api/memos", async (req, res) => {
    await database.run(`INSERT INTO memos (content) VALUES (?)`, [req.body.content]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result)
})

app.put("/api/memos/:id", async (req, res) => {
    await database.run(`UPDATE memos SET content = ? WHERE id = ?`,[req.body.content, req.params.id]);
    memos[req.params.id] = req.body.content;
    const result = await database.run("SELECT * FROM memos");
    res.send(result)
})
app.listen(
    port,
    () => console.log(`Example app listening at http://localhost:${port}`)
)