const User = require("../models/User");

const multer = require("multer");
const path = require('path');


// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/profile'); // Ensure this folder exists or create it dynamically
    },
    filename: function (req, file, cb) {
        const userId = req.user.userId; // Extracted from the auth middleware
        const ext = path.extname(file.originalname);
        cb(null, `${userId}${ext}`); // Rename file to userId
    }
});
const upload = multer({ storage: storage }).single('profileImage');


exports.getUser = async (req, res) => {
    try {
        const userId = req.user.userId; // Get user ID from request parameters
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user); // Return user details
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: "File upload failed", error: err.message });
        }

        try {
            const userId = req.user.userId; // Extracted from the auth middleware
            const {
                fullName,
                email,
                phoneNumber,
                panNumber,
                panName,
                address,
                country,
                state,
                city,
                pincode
            } = req.body;

            let profileImagePath = null;
            if (req.file) {
                profileImagePath = `/uploads/profile/${req.file.filename}`;
            }

            const updatedData = {
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
                ...(profileImagePath && { profile_pic: profileImagePath })
            };

            

            const updated = await User.updateUser(userId, updatedData);

           

            if (updated) {
                const user = await User.findById(userId);
                console.log(user)
                user.userId = user.id; // Assign id to userId
                // user.profile_pic = user.profileImage;
                delete user.id; // Optional: Remove original id field

                // delete user.profileImage;
                // console.log(user)
                res.status(200).json({ message: "User details updated successfully", updated: updated, updatedData: user  });
            } else {
                res.status(404).json({ message: "Couldn't update user", updated: updated });
            }
        } catch (error) {
            console.error("Error updating user details:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
};


// exports.updateUser = async (req, res) => {
//     try {
//         const userId = req.user.userId; // Extracted from the auth middleware
//         const {
//             fullName,
//             email,
//             phoneNumber,
//             panNumber,
//             panName,
//             address,
//             country,
//             state,
//             city,
//             pincode
//         } = req.body;


//         console.log(req.body)
       
//         const updated = await User.updateUser(userId, {
//             fullName,
//             email,
//             phoneNumber,
//             panNumber,
//             panName,
//             address,
//             country,
//             state,
//             city,
//             pincode
//         });

//         if (updated) {
//             res.status(200).json({ message: "User details updated successfully", updated : updated }    );
//         }
//         else {

//             res.status(404).json({ message: "Couldnt update user", updated : updated });
//         }

//     } catch (error) {
//         console.error("Error updating user details:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };
