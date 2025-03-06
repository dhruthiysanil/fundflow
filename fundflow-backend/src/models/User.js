const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    static async create(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [name, email, hashedPassword],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result.insertId);
                }
            );
        });
    }
}

module.exports = User;
