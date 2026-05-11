const pool = require("../../databasePool");

class partnerRateTable {
  static insert({ adminID, rate, total_rate, total_people }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO partner_rate(
            cargo_admin_id,
            rate,
            total_rate,
            total_people
          ) VALUES ($1, $2, $3, $4)`,
        [adminID, rate, total_rate, total_people],
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

  static toRate({ id, adminID, rate, total_rate, total_people }) {
    // return new Promise((resolve, reject) => {
    //   pool.query(
    //     `UPDATE partner_rate SET
    //         cargo_admin_id = $2,
    //         rate = $3,
    //         total_rate = $4,
    //         total_people = $5
    //       WHERE id = $1`,
    //     [id, adminID, rate, total_rate, total_people],
    //     (error) => {
    //       if (error) {
    //         return reject(error);
    //       } else {
    //         resolve({ message: "success" });
    //       }
    //     }
    //   );
    // });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT p.name, p.phone, p.email, r.* FROM partner_rate r
          INNER JOIN partner p ON p.id = r.adminID
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
        `SELECT * FROM partner_rate
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

  static deleteByAdminID({ adminID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM partner_rate
          WHERE cargo_admin_id = $1`,
        [adminID],
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
        `DELETE FROM partner_rate
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

module.exports = partnerRateTable;
