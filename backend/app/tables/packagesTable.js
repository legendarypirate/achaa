const pool = require("../../databasePool");

class packagesTable {
  static insert({
    account_id,
    package_category,
    addition,
    package_name,
    bundle_sort,
    total_piece,
    weight_tn,
    weight_kg,
    weight_metr,
    come_from,
    go_to,
    loaded_place,
    pinned_file,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO packages(
            account_id,
            package_category,
            addition,
            package_name,
            bundle_sort,
            total_piece,
            weight_tn,
            weight_kg,
            weight_metr,
            come_from,
            go_to,
            loaded_place,
            pinned_file,
            status_id
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 1)`,
        [
          account_id,
          package_category,
          addition,
          package_name,
          bundle_sort,
          total_piece,
          weight_tn,
          weight_kg,
          weight_metr,
          come_from,
          go_to,
          loaded_place,
          pinned_file,
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
    package_category,
    addition,
    package_name,
    bundle_sort,
    total_piece,
    weight_tn,
    weight_kg,
    weight_metr,
    come_from,
    go_to,
    loaded_place,
    pinned_file,
    status_id,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE packages SET
            package_category = $2,
            addition = $3,
            package_name = $4,
            bundle_sort = $5,
            total_piece = $6,
            weight_tn = $7,
            weight_kg = $8,
            weight_metr = $9,
            come_from = $10,
            go_to = $11,
            loaded_place = $12,
            pinned_file = $13,
            status_id = $14
          WHERE id = $1`,
        [
          id,
          package_category,
          addition,
          package_name,
          bundle_sort,
          total_piece,
          weight_tn,
          weight_kg,
          weight_metr,
          come_from,
          go_to,
          loaded_place,
          pinned_file,
          status_id,
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

  static getFreeAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT a.user_code, p.* FROM packages p
          INNER JOIN accounts a on a.id = p.account_id
          WHERE status_id = 1
          ORDER BY p.id DESC`,
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

  static getAllByStatusID({ statusID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT a.user_code, a.firstname, p.*, ps.status, pr.name as cargo_name FROM packages p
            INNER JOIN package_status ps on ps.id = p.status_id
            INNER JOIN accounts a on a.id = p.account_id
            INNER JOIN transport t on t.id = p.transport_id
            INNER JOIN partner pr on pr.cargo_admin_id = t.cargo_admin_id
          WHERE p.status_id = $1
          ORDER BY p.id DESC`,
        [statusID],
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

  static getAllByCargoAdminID_StatusID({ cargoAdminID, statusID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT a.user_code, p.*, ps.status, pr.name as cargo_name FROM packages p
            INNER JOIN package_status ps on ps.id = p.status_id
            INNER JOIN accounts a on a.id = p.account_id
            INNER JOIN transport t on t.id = p.transport_id
            INNER JOIN partner pr on pr.cargo_admin_id = t.cargo_admin_id
          WHERE pr.cargo_admin_id = $1 AND p.status_id = $2
          ORDER BY p.id DESC`,
        [cargoAdminID, statusID],
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

  static getApprovedAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT a.user_code, a.firstname, p.*, ps.status, pr.name as cargo_name FROM packages p
            INNER JOIN package_status ps on ps.id = p.status_id
            INNER JOIN accounts a on a.id = p.account_id
            INNER JOIN transport t on t.id = p.transport_id
            INNER JOIN partner pr on pr.cargo_admin_id = t.cargo_admin_id
          WHERE p.status_id >= 4
          ORDER BY p.id DESC`,
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

  static getApprovedAllByCargoAdminID({ cargoAdminID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT a.user_code, p.*, ps.status, pr.name as cargo_name FROM packages p
            INNER JOIN package_status ps on ps.id = p.status_id
            INNER JOIN accounts a on a.id = p.account_id
            INNER JOIN transport t on t.id = p.transport_id
            INNER JOIN partner pr on pr.cargo_admin_id = t.cargo_admin_id
          WHERE pr.cargo_admin_id = $1 AND p.status_id >= 4
          ORDER BY p.id DESC`,
        [cargoAdminID],
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

  static getFreeByAccountID({ accountID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT a.user_code, p.* FROM packages p 
          INNER JOIN accounts a on p.account_id = a.id
          WHERE p.status_id = 1 AND p.account_id = $1
          ORDER BY p.id DESC`,
        [accountID],
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

  static getRequestedByAccountID({ accountID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        // `SELECT a.user_code, p.*, ps.status FROM packages p
        //     INNER JOIN accounts a ON p.account_id = a.id
        //     INNER JOIN package_status ps ON p.status_id = ps.id
        //   WHERE p.status_id <> 1 AND p.account_id = $1
        //   ORDER BY p.id DESC`,
        `SELECT a.user_code, prt.name AS partner_name, p.*, ps.status FROM packages p 
            INNER JOIN accounts a ON p.account_id = a.id
            INNER JOIN package_status ps ON p.status_id = ps.id
            INNER JOIN transport t ON p.transport_id = t.id
            INNER JOIN partner prt ON prt.cargo_admin_id = t.cargo_admin_id
          WHERE p.status_id <> 1 AND p.account_id = $1
          ORDER BY p.id DESC`,
        [accountID],
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

  static getFreeByID({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT a.user_code, p.* FROM packages p 
          INNER JOIN accounts a ON p.account_id = a.id
          WHERE p.id = $1`,
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

  static getByID({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT a.user_code, pr.name as cargo_name, p.*, ps.status FROM packages p 
            INNER JOIN accounts a ON p.account_id = a.id
            INNER JOIN package_status ps ON p.status_id = ps.id
            INNER JOIN transport t ON t.id = p.transport_id
            INNER JOIN partner pr ON pr.cargo_admin_id = t.cargo_admin_id
          WHERE p.id = $1`,
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

  static sendRequest({ packageID, transportID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE packages SET 
          status_id = 2,
          transport_id = $2
        WHERE id = $1`,
        [packageID, transportID],
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

  static getStatuses() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM package_status
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

  static changeStatus({ packageID, statusID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE packages SET status_id = $2
          WHERE id = $1`,
        [packageID, statusID],
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
        `DELETE FROM packages
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

module.exports = packagesTable;
