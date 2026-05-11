const pool = require("../../databasePool");

class AccountsTable {
  static signup({
    user_code,
    membership,
    firstname,
    lastname,
    phone_number,
    email,
    password,
    image,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO accounts(
            role_id,
            user_code,
            membership,
            firstname,
            lastname,
            phone_number,
            email,
            password,
            image
          ) VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          user_code,
          membership,
          firstname,
          lastname,
          phone_number,
          email,
          password,
          image,
        ],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static update({
    id,
    membership,
    firstname,
    lastname,
    phone_number,
    email,
    image,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE accounts SET
            membership = $2,
            firstname = $3,
            lastname = $4,
            phone_number = $5,
            email = $6,
            image = $7
          WHERE id = $1`,
        [id, membership, firstname, lastname, phone_number, email, image],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static checkUserCode({ user_code }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM accounts WHERE user_code = $1`,
        [user_code],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ code: response.rows[0]?.user_code });
          }
        }
      );
    });
  }

  static getAll({ roleID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM accounts 
          WHERE role_id = $1
          ORDER BY id DESC`,
        [roleID],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows);
          }
        }
      );
    });
  }

  static getByEmail({ email }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM accounts WHERE email = $1`,
        [email],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ user: response.rows[0] });
          }
        }
      );
    });
  }

  static getByID({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM accounts
          WHERE id = $1`,
        [id],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows[0]);
          }
        }
      );
    });
  }

  static selectingMembership({ id, membership }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE accounts SET membership = $2
          WHERE id = $1`,
        [id, membership],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static memberConfirm({ id, expiredDay }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE accounts SET
            expired_date = NOW() + INTERVAL '${expiredDay}' DAY,
            confirm = TRUE
          WHERE id = $1`,
        [id],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static finishExpired({ userID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE accounts SET
            expired_date = NULL,
            membership = NULL,
            confirm = NULL
          WHERE id = $1`,
        [userID],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static delete({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM accounts
          WHERE id = $1`,
        [id],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static recoverPassword({ id, passwordHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE accounts SET password = $2
          WHERE id = $1`,
        [id, passwordHash],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }
}

module.exports = AccountsTable;
