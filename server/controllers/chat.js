import query from '../database/connect.js'

import {response} from '../response.js'

export const home = (req, res) => {
  response(200, 'selamat datang', 'TELKOM API', res)
}

export const chat = async (req, res) => {
  try {
    const {message, type} = req.body

    // Assuming you have a properly initialized database connection
    const result = await query('INSERT INTO chat (content,type,created_at) VALUES (?,?,NOW())', [message, type])

    res.json({status: 'Message saved successfully', result})
  } catch (error) {
    console.error('Error saving message to database:', error)
    console.error('SQL Error details:', error.sql, error.sqlMessage, error.sqlState)
    res.status(500).json({error: 'Internal Server Error'})
  }
}
export const history = async (req, res) => {
  try {
    const result = await query(
      `
      SELECT id,content as message,type,created_at
      FROM chat
      ORDER BY id ASC
      
    `
    )

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json(error.message || 'Internal Server Error')
  }
}
