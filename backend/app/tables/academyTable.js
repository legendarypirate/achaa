const pool = require("../../databasePool");

class academyTable {
  static insert({ title, sort, information, image }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO academy(
            title,
            sort,
            information,
            image
          ) VALUES ($1, $2, $3, $4)`,
        [title, sort, information, image],
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

  static update({ id, title, sort, information, image }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE academy SET
            title = $2,
            sort = $3,
            information = $4,
            image = $5
          WHERE id = $1`,
        [id, title, sort, information, image],
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

  static getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM academy
          ORDER BY id DESC`,
        [],
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

  static getByID({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM academy
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

  static delete({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM academy
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
}

module.exports = academyTable;
