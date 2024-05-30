const { Pool } = require('pg')

const config = {
  user: process.env.USERDB,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASS,
  port: process.env.PORT,
}

const pool = new Pool(config)

// Función asincrona cree un nuevo post
const insertar = async (payload) => {
  const text = 'INSERT INTO posts (usuario, url, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *'
  const values = [payload.usuario, payload.URL, payload.descripcion, 0]

  const result = await pool.query(text, values)
  return result
}

// Función asincrona que devuelve los posts
const leer = async () =>{
  const text = 'SELECT * FROM posts'
  const result = await pool.query(text)
  return result
}

// Función asincrona que da likes
const editarPost = async (payload) => {
  const text = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
  const values = [payload.id];

  const queryObject = {
    text : text,
    values : values
  }

  const result = await pool.query(queryObject);
  return result;
}

module.exports = { insertar, leer, editarPost }
