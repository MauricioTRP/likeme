const express = require('express')
const morgan = require('morgan')
const { insertar, leer, editarPost } = require('./db')
const app = express()

app.listen(3000, () => console.log("Aplicación en puerto 3000"))
app.use(express.json())
app.use(morgan('dev'))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

// POST /post
app.post("/post", async (req, res) => {
  // usuario, URL, descripcion
  const payload = req.body

  try {
    const result = await insertar(payload)

    res.send(result.rows)
  } catch (error) {
    console.log(error)
    res.statusCode = 500
    res.json({ error: "algo salió mal, intentalo más tarde" })
  }
})

app.get("/posts", async (req, res) => {
  try {
    const response = await leer()
    res.send(response.rows)
  } catch (error) {
    res.statusCode = 500
    res.json({ error: "Algo salió mal" })
  }
})

// PUT /post    ? id = 5
// id=5 -> queryString
app.put("/post", async (req, res) => {
  const id = req.query;

  try {
    const response = await editarPost(id);
    res.send(response.rows);
  } catch (error) {
    res.statusCode = 500
    res.json({error: 'No fue posible dar like al post.'})
  }
})