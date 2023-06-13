const connectionUser = require('./connections');

interface User {
  id?: number;
  user: string;
  name: string;
  password: string;
  token: string;
}

interface error {
  code: string,
  errno: number,
  sqlState: string,
  sqlMessage: string,
  sql: string
}

const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    connectionUser.query('SELECT * FROM users', (err: error, rows: User[]) => {
      if (err) {
        resolve({
          status: 'error',
          error: true,
          message: err.sqlMessage,
        })
      } else {
        resolve({
          status: 'success',
          error: false,
          data: rows,
        });
      }
    });
  });
}

const getUserById = async (id: number) => {
  return new Promise((resolve, reject) => {
    connectionUser.query('SELECT * FROM users WHERE id = ?', [id], (err: error, rows: User[]) => {
      if (err) {
        resolve({
          status: 'error',
          error: true,
          message: err.sqlMessage,
        })
      } else {
        resolve({
          status: 'success',
          error: false,
          data: rows[0],
        });
      }
    });
  });
}

const getUserByToken = async (token: string) => {
  return new Promise((resolve, reject) => {
    connectionUser.query('SELECT * FROM users WHERE token = ?', [token], (err: error, rows: User[]) => {
      if (err) {
        resolve({
          status: 'error',
          error: true,
          message: err.sqlMessage,
        })
      } else {
        resolve({
          status: 'success',
          error: false,
          data: rows[0],
        });
      }
    });
  });
}

const insertUser = async (user: User) => {
  return new Promise((resolve) => {
    connectionUser.query('INSERT INTO users (user, name, password, token) VALUES (?, ?, ?, ?)', [
      user.user,
      user.name,
      user.password,
      user.token
    ], (err: error, rows: any) => {
      if (err) {
        resolve({
          status: 'error',
          error: true,
          message: err.sqlMessage,
          data: err,
        });
      } else {
        resolve({
          status: 'success',
          error: false,
          message: "User inserted successfully",
          data: rows,
        });
      }
    })
  })
}

const updateUserById = async (user: User) => {
  return new Promise((resolve, reject) => {
    connectionUser.query('UPDATE users S SET S.user = ?, S.name = ?, S.password = ? WHERE S.id = ?',
      [user.user, user.name, user.password, user.id], (err: error, rows: User[]) => {
        if (err) {
          resolve({
            status: 'error',
            error: true,
            message: err.sqlMessage,
          })
        } else {
          resolve({
            status: 'success',
            error: false,
            data: 'Data updated successfully',
          });
        }
      });
  });
}

const deleteUserById = async (id: number) => {
  return new Promise((resolve, reject) => {
    connectionUser.query('DELETE FROM users WHERE id = ?', [id], (err: error, rows: User[]) => {
      if (err) {
        resolve({
          status: 'error',
          error: true,
          message: err.sqlMessage,
        })
      } else {
        resolve({
          status: 'success',
          error: false,
          data: 'User deleted successfully',
        });
      }
    });
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByToken,
  insertUser,
  updateUserById,
  deleteUserById
}