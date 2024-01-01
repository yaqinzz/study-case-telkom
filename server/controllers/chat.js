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
    // const page = parseInt(req.query.page) || 0
    // const limit = parseInt(req.query.limit) || 5
    const offset = 10

    // Count total rows
    // const totalRowsResult = await query(
    //   `
    //   SELECT COUNT(*) as totalRows
    //   FROM chat

    // `
    // )

    // if (!totalRowsResult || totalRowsResult.length === 0 || totalRowsResult[0].totalRows === undefined) {
    //   throw new Error('Failed to retrieve totalRows')
    // }

    // const totalRows = totalRowsResult[0].totalRows

    // const totalPage = Math.ceil(totalRows / limit)

    // Fetch data with pagination
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

export const loginAdmin = async (req, res) => {
  const {username, password} = req.body
  try {
    const q = 'SELECT * FROM admin WHERE username = ?'

    const data = await query(q, [username])

    if (data.length === 0) {
      return res.status(404).json('User not found!')
    }

    const checkPassword = bcryptjs.compareSync(password, data[0].password)
    if (!checkPassword) {
      return res.status(400).json('Wrong password or name!')
    }

    const token = jwt.sign({id_admin: data[0].id_admin}, 'secretkey')

    const {password: _, ...others} = data[0] // Rename password to _ to exclude it
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Something went wrong!')
  }
}
export const loginCustomer = async (req, res) => {
  const {username, password} = req.body
  try {
    const q = 'SELECT * FROM customer WHERE username = ?'

    const data = await query(q, [username])

    if (data.length === 0) {
      return res.status(404).json('User not found!')
    }

    const checkPassword = bcryptjs.compareSync(password, data[0].password)
    if (!checkPassword) {
      return res.status(400).json('Wrong password or name!')
    }

    const token = jwt.sign({id_customer: data[0].id_customer}, 'secretkey')

    const {password: _, ...others} = data[0] // Rename password to _ to exclude it
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Something went wrong!')
  }
}
export const logout = async (req, res) => {
  try {
    res
      .clearCookie('accessToken', {
        secure: true,
        sameSite: 'none',
      })
      .status(200)
      .json('User has been logged out.')
  } catch (error) {
    console.error('Error during logout:', error)
    res.status(500).json('Internal Server Error')
  }
}
