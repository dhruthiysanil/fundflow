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


    static async findById(userId) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT id, email, name, last_name, phone_number, pan_name, pan_number, address, country, state, city, pincode, profile_pic FROM users WHERE id = ?", 
                [userId], 
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                }
            );
        });
    }



    static async updateUser(userId, userData) {
        return new Promise((resolve, reject) => {
            const {
                fullName,
                email,
                phoneCode,
                phoneNumber,
                panNumber,
                panName,
                address,
                country,
                state,
                city,
                pincode,
                profile_pic
            } = userData;
    
            const sql = `
                UPDATE users SET 
                    name = ?, 
                    email = ?, 
                    phone_number = ?, 
                    pan_number = ?, 
                    pan_name = ?, 
                    address = ?, 
                    country = ?, 
                    state = ?, 
                    city = ?, 
                    pincode = ?,
                    profile_pic = ?
                WHERE id = ?
            `;
    
            const values = [
                fullName, 
                email, 
                phoneNumber, 
                panNumber, 
                panName, 
                address, 
                country, 
                state, 
                city, 
                pincode,
                profile_pic, 
                userId
            ];
            console.log(values)

            console.log(sql)
    
            db.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }
    
}

module.exports = User;
