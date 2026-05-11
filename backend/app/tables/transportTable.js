const pool = require("../../databasePool");

class transportTable {
  static insert({
    cargo_admin_id,
    container_code,
    transport_type,
    location_from,
    location_to,
    price_metr,
    price_tn,
    date_from,
    date_to,
    capacity_tn,
    capacity_metr,
    tonnage,
    container_size,
    status,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO transport(
          cargo_admin_id,
          container_code,
          transport_type,
          location_from,
          location_to,
          price_metr,
          price_tn,
          date_from,
          date_to,
          capacity_tn,
          capacity_metr,
          tonnage,
          container_size,
          status,
          signed_date
        )VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())`,
        [
          cargo_admin_id,
          container_code,
          transport_type,
          location_from,
          location_to,
          price_metr,
          price_tn,
          date_from,
          date_to,
          capacity_tn,
          capacity_metr,
          tonnage,
          container_size,
          status,
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
    cargo_admin_id,
    container_code,
    transport_type,
    location_from,
    location_to,
    price_tn,
    price_metr,
    date_from,
    id,
    date_to,
    status,
    signed_date,
    tonnage,
    container_size,
    capacity_metr,
    capacity_tn,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE transport SET
          cargo_admin_id = $2,
          container_code = $3,
          transport_type = $4,
          location_from = $5,
          location_to = $6,
          price_tn = $7,
          price_metr = $8,
          date_from = $9,
          date_to = $10,
          status = $11,
          signed_date = $12,
          capacity_tn = $13,
          capacity_metr = $14,
          tonnage = $15,
          container_size = $16
          WHERE id = $1`,
        [
          id,
          cargo_admin_id,
          container_code,
          transport_type,
          location_from,
          location_to,
          price_tn,
          price_metr,
          date_from,
          date_to,
          status,
          signed_date,
          capacity_tn,
          capacity_metr,
          tonnage,
          container_size,
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

  static getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT t.*, p.name, p.profile_file FROM transport t
          INNER JOIN partner p ON t.cargo_admin_id = p.cargo_admin_id
          ORDER BY t.id DESC`,
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

  static crGetAllByAdminID({ adminID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT t.*, p.head_number FROM transport t
          INNER JOIN partner_cross_road p ON t.cargo_admin_id = p.cargo_admin_id
          WHERE t.cargo_admin_id = $1
          ORDER BY t.id DESC`,
        [adminID],
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

  static getAllByAdminID({ adminID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT t.*, p.name FROM transport t
          INNER JOIN partner p ON t.cargo_admin_id = p.cargo_admin_id
          WHERE t.cargo_admin_id = $1
          ORDER BY t.id DESC`,
        [adminID],
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

  static getAllByAdminID_CR({ adminID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT t.*, cr.head_number FROM transport t
          INNER JOIN partner_cross_road cr ON t.cargo_admin_id = cr.cargo_admin_id
          WHERE t.cargo_admin_id = $1
          ORDER BY t.id DESC`,
        [adminID],
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
        `SELECT t.*, p.name as cargo_name FROM transport t
          INNER JOIN partner p ON t.cargo_admin_id = p.cargo_admin_id
          WHERE t.id = $1`,
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
        `UPDATE packages SET
            transport_id = null
          WHERE transport_id = $1`,
        [id],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            pool.query(
              `DELETE FROM transport
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
          }
        }
      );
    });
  }
}

module.exports = transportTable;
