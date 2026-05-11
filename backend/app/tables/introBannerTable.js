const pool = require("../../databasePool");

class introBannerTable {
  static insert({ type, file_url }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO intro_banner (type, file_url)
          VALUES ($1, $2)`,
        [type, file_url],
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

  static update({ type, file_url }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE intro_banner SET file_url = $2
          WHERE type = $1`,
        [type, file_url],
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

  static getByType({ type }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM intro_banner
          WHERE type = $1`,
        [type],
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
        `DELETE FROM intro_banner
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

module.exports = introBannerTable;
