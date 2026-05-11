const pool = require("../../databasePool");

class invoiceTable {
  static insert({ cargo_admin_id, user_code, package_id, text, image }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO invoice(
            cargo_admin_id,
            user_code,
            package_id,
            text,
            image,
            sent_date
          ) VALUES ($1, $2, $3, $4, $5, NOW())`,
        [cargo_admin_id, user_code, package_id, text, image],
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

  static update({ id, text, image }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE invoice SET
            text = $2,
            image = $3
          WHERE id = $1`,
        [id, text, image],
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

  static getAllByUserCode({ userCode }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT prt.name AS partner_name, pck.package_name, i.* FROM invoice i
            INNER JOIN packages pck ON pck.id = i.package_id
            INNER JOIN partner prt ON prt.cargo_admin_id = i.cargo_admin_id
          WHERE i.user_code = $1
          ORDER BY i.id DESC`,
        [userCode],
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

  static getByPackageID({ packageID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM invoice
          WHERE package_id = $1`,
        [packageID],
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

  static getByID({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT prt.name AS partner_name, pck.package_name, i.* FROM invoice i
            INNER JOIN packages pck ON pck.id = i.package_id
            INNER JOIN partner prt ON prt.cargo_admin_id = i.cargo_admin_id
          WHERE i.id = $1
          ORDER BY i.id DESC`,
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
        `DELETE FROM invoice
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

module.exports = invoiceTable;
