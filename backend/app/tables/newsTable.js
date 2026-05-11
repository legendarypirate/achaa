const pool = require("../../databasePool");

class newsTable {
  static insert({ title, sort_id, info, image }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO news(
            title,
            sort_id,
            information,
            image,
            created_date
          ) VALUES ($1, $2, $3, $4, NOW())`,
        [title, sort_id, info, image],
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

  static update({ id, title, sort_id, info, image }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE news SET
            title = $2,
            sort_id = $3,
            information = $4,
            image = $5
          WHERE id = $1`,
        [id, title, sort_id, info, image],
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
        `SELECT s.sort, n.* FROM news n
          INNER JOIN news_sort s ON s.id = n.sort_id
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
        `SELECT * FROM news
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

  static getCountBySort({ sortID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(*) FROM news
          WHERE sort_id = $1`,
        [sortID],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ count: response.rows[0].count });
          }
        }
      );
    });
  }

  static getBySort({ sortID, offset, limit }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM news
          WHERE sort_id = $1
          ORDER BY id DESC
          OFFSET $2 LIMIT $3`,
        [sortID, offset, limit],
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

  static sortGetAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM news_sort
          ORDER BY id ASC`,
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

  static delete({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM news
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

module.exports = newsTable;
