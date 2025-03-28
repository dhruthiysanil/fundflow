var express = require('express');
var router = express.Router();
const {
  getUser,
  updateUser
} = require("../controllers/indexController");

const pool = require("../config/db2.js");


const multer = require("multer");
const path = require("path");
const fs = require("fs");



router.get('/user', getUser);
router.put('/update-user', updateUser);



// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// Configure multer for campaign photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "../uploads/campaigns")
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, "campaign-" + uniqueSuffix + ext)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(new Error("Only image files are allowed!"))
  },
})

// Get all campaigns
router.get("/latest-campaigns", async (req, res) => {
  try {
    const rows = await pool.query(`
      SELECT c.*, cat.category_name, u.name AS user_name 
      FROM campaign c
      JOIN category cat ON c.category_id = cat.category_id
      JOIN users u ON u.id = c.user_id
      ORDER BY c.created_at DESC
      LIMIT 12
    `)

    const updatedCampaigns = rows.map(campaign => ({
      ...campaign,
      percentage: ((campaign.raised_amount / campaign.target_amount) * 100).toFixed(2) // Rounded to 2 decimal places
    }));
    res.json(updatedCampaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    res.status(500).json({ error: "Failed to fetch campaigns", details: error.message })
  }
})

// Get campaign by ID
router.get("/campaign/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT c.*, cat.category_name, u.name AS user_name 
      FROM campaign c
      JOIN category cat ON c.category_id = cat.category_id
      JOIN users u ON u.id = c.user_id
      WHERE c.campaign_id = ?
    `,
      [req.params.id],
    )

    if (!rows) {
      return res.status(404).json({ error: "Campaign not found" })
    }

    rows.percentage = ((rows.raised_amount / rows.target_amount) * 100).toFixed(2);


    // console.
    res.json(rows)
  } catch (error) {
    console.error("Error fetching campaign:", error)
    res.status(500).json({ error: "Failed to fetch campaign", details: error.message })
  }
})


router.get("/donations/:id", async (req, res) => {
  try {
    const rows = await pool.query(
      `
      SELECT u.* 
      FROM campaigns c
      JOIN updates u ON u.campaign_id = c.campaign_id
      WHERE c.campaign_id = ?
    `,
      [req.params.id],
    )

    if (!rows) {
      return res.status(404).json({ error: "Updates not found." })
    }

    res.json(rows)
  } catch (error) {
    console.error("Error fetching Updates:", error)
    res.status(500).json({ error: "Failed to fetch Updates", details: error.message })
  }
})

router.get("/donations/:id", async (req, res) => {
  try {
    const rows = await pool.query(
      `
      SELECT u.name AS donor_name, d.amount, d.note
      FROM users u
      JOIN donations d ON d.donor_id = u.id
      JOIN campaign c ON d.campaign_id = c.campaign_id
      WHERE c.campaign_id = ?
    `,
      [req.params.id],
    )

    if (!rows) {
      return res.status(404).json({ error: "Donations not found." })
    }

    res.json(rows)
  } catch (error) {
    console.error("Error fetching donations:", error)
    res.status(500).json({ error: "Failed to fetch donations", details: error.message })
  }
})

// Get all categories
router.get("/categories/all", async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM category ORDER BY category_name")
    res.json(rows)
  } catch (error) {
    console.error("Error fetching categories:", error)
    res.status(500).json({ error: "Failed to fetch categories", details: error.message })
  }
})

// Create new campaign
router.post("/create", upload.single("campaign_photo"), async (req, res) => {

  try {

    req.body.user_id = req.user.userId;
    // Extract data from request body
    const {
      user_id,
      campaign_title,
      beneficiary_type,
      beneficiary_name,
      beneficiary_age,
      beneficiary_location,
      beneficiary_phone,
      category_id,
      target_amount,
      campaign_duration,
      campaign_story,
    } = req.body

    // console.log(req.body)

    // Validate required fields
    if (
      !user_id ||
      !campaign_title ||
      !beneficiary_type ||
      !beneficiary_name ||
      !beneficiary_location ||
      !category_id ||
      !target_amount ||
      !campaign_duration ||
      !campaign_story
    ) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Validate numeric fields
    if (isNaN(Number.parseFloat(target_amount)) || Number.parseFloat(target_amount) <= 0) {
      return res.status(400).json({ error: "Target amount must be a positive number" })
    }

    if (isNaN(Number.parseInt(campaign_duration)) || Number.parseInt(campaign_duration) <= 0) {
      return res.status(400).json({ error: "Campaign duration must be a positive integer" })
    }

    // Handle file upload
    let campaign_photo = null
    if (req.file) {
      campaign_photo = `/uploads/campaigns/${path.basename(req.file.path)}`
    }



    // Insert campaign into database


    const result = await pool.query(
      `INSERT INTO campaign (
        user_id, campaign_title, beneficiary_type, beneficiary_name, 
        beneficiary_age, beneficiary_location, beneficiary_phone, 
        category_id, target_amount, campaign_duration, 
        campaign_photo, campaign_story
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        campaign_title,
        beneficiary_type,
        beneficiary_name,
        beneficiary_age || null,
        beneficiary_location,
        beneficiary_phone || null,
        category_id,
        target_amount,
        campaign_duration,
        campaign_photo,
        campaign_story,
      ],
    )




    const [campaign] = await pool.query(
      `SELECT c.*, cat.category_name 
       FROM campaign c
       JOIN category cat ON c.category_id = cat.category_id
       WHERE c.campaign_id = ?`,
      [result.insertId],
    )

    res.status(201).json({
      message: "Campaign created successfully",
      campaign: campaign[0],
    })
  } catch (error) {
    console.error("Error creating campaign:", error)
    res.status(500).json({ error: "Failed to create campaign", details: error.message })
  }
})

// Update campaign
router.put("/update/:id", upload.single("campaign_photo"), async (req, res) => {


  try {


    const campaignId = req.params.id

    // Check if campaign exists
    const [existingCampaign] = await pool.query("SELECT * FROM campaign WHERE campaign_id = ?", [campaignId])

    if (existingCampaign) {
      return res.status(404).json({ error: "Campaign not found" })
    }

    // Extract data from request body
    const {
      campaign_title,
      beneficiary_type,
      beneficiary_name,
      beneficiary_age,
      beneficiary_location,
      beneficiary_phone,
      category_id,
      target_amount,
      campaign_duration,
      campaign_story,
    } = req.body

    // Handle file upload
    let campaign_photo = existingCampaign[0].campaign_photo
    if (req.file) {
      campaign_photo = `/uploads/campaigns/${path.basename(req.file.path)}`

      // Delete old photo if exists
      if (existingCampaign[0].campaign_photo) {
        const oldPhotoPath = path.join(__dirname, "..", existingCampaign[0].campaign_photo)
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath)
        }
      }
    }

    // Build update query dynamically
    const updateFields = []
    const updateValues = []

    if (campaign_title) {
      updateFields.push("campaign_title = ?")
      updateValues.push(campaign_title)
    }

    if (beneficiary_type) {
      updateFields.push("beneficiary_type = ?")
      updateValues.push(beneficiary_type)
    }

    if (beneficiary_name) {
      updateFields.push("beneficiary_name = ?")
      updateValues.push(beneficiary_name)
    }

    if (beneficiary_age !== undefined) {
      updateFields.push("beneficiary_age = ?")
      updateValues.push(beneficiary_age || null)
    }

    if (beneficiary_location) {
      updateFields.push("beneficiary_location = ?")
      updateValues.push(beneficiary_location)
    }

    if (beneficiary_phone !== undefined) {
      updateFields.push("beneficiary_phone = ?")
      updateValues.push(beneficiary_phone || null)
    }

    if (category_id) {
      updateFields.push("category_id = ?")
      updateValues.push(category_id)
    }

    if (target_amount) {
      if (isNaN(Number.parseFloat(target_amount)) || Number.parseFloat(target_amount) <= 0) {
        return res.status(400).json({ error: "Target amount must be a positive number" })
      }
      updateFields.push("target_amount = ?")
      updateValues.push(target_amount)
    }

    if (campaign_duration) {
      if (isNaN(Number.parseInt(campaign_duration)) || Number.parseInt(campaign_duration) <= 0) {
        return res.status(400).json({ error: "Campaign duration must be a positive integer" })
      }
      updateFields.push("campaign_duration = ?")
      updateValues.push(campaign_duration)
    }

    if (campaign_photo) {
      updateFields.push("campaign_photo = ?")
      updateValues.push(campaign_photo)
    }

    if (campaign_story) {
      updateFields.push("campaign_story = ?")
      updateValues.push(campaign_story)
    }

    // Add campaign_id to values array
    updateValues.push(campaignId)

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" })
    }

    // Update campaign
    await db.execute(`UPDATE campaign SET ${updateFields.join(", ")} WHERE campaign_id = ?`, updateValues)


    // Return the updated campaign
    const [campaign] = await db.query(
      `SELECT c.*, cat.category_name 
       FROM campaign c
       JOIN category cat ON c.category_id = cat.category_id
       WHERE c.campaign_id = ?`,
      [campaignId],
    )

    res.json({
      message: "Campaign updated successfully",
      campaign: campaign[0],
    })
  } catch (error) {
    console.error("Error updating campaign:", error)
    res.status(500).json({ error: "Failed to update campaign", details: error.message })
  }
})

// Delete campaign
router.delete("/:id", async (req, res) => {


  try {


    const campaignId = req.params.id

    // Check if campaign exists and get photo path
    const [existingCampaign] = await db.query("SELECT campaign_photo FROM campaign WHERE campaign_id = ?", [
      campaignId,
    ])

    if (existingCampaign.length === 0) {
      return res.status(404).json({ error: "Campaign not found" })
    }

    // Delete campaign from database
    await db.execute("DELETE FROM campaign WHERE campaign_id = ?", [campaignId])


    // Delete campaign photo if exists
    if (existingCampaign[0].campaign_photo) {
      const photoPath = path.join(__dirname, "..", existingCampaign[0].campaign_photo)
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath)
      }
    }

    res.json({ message: "Campaign deleted successfully" })
  } catch (error) {
    console.error("Error deleting campaign:", error)
    res.status(500).json({ error: "Failed to delete campaign", details: error.message })
  }
})




// router.get('/campaigns', (req, res) => {
//   const sql = 'SELECT * FROM campaigns';

//   db.query(sql, (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: err.message });
//       }
//       res.json(results);
//   });
// });



// Get all campaigns
router.get("/my-campaigns", async (req, res) => {
  try {
    const rows = await pool.query(`
      SELECT c.*, cat.category_name, u.name AS user_name 
      FROM campaign c
      JOIN category cat ON c.category_id = cat.category_id
      JOIN users u ON u.id = c.user_id
      WHERE u.id = ${req.user.userId}
      ORDER BY c.created_at DESC
    `)

    // const updatedCampaigns = rows.map(campaign => ({
    //   ...campaign,
    //   percentage: ((campaign.raised_amount / campaign.target_amount) * 100).toFixed(2) // Rounded to 2 decimal places
    // }));


    const updatedCampaigns = rows.map(campaign => {
      const createdAt = new Date(campaign.created_at); // Convert created_at to a Date object
      const endDate = new Date(createdAt); // Clone createdAt date
      endDate.setDate(endDate.getDate() + campaign.campaign_duration); // Add duration to get end date

      const today = new Date();
      const timeDiff = endDate - today;


      const daysRemaining = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0;

      return {
        ...campaign,
        percentage: ((campaign.raised_amount / campaign.target_amount) * 100).toFixed(2), // Rounded to 2 decimal places
        daysRemaining: daysRemaining // Calculated based on duration
      };
    });

    res.json(updatedCampaigns);
  } catch (error) {
    console.error("Error fetching your campaigns:", error)
    res.status(500).json({ error: "Failed to fetch your campaigns", details: error.message })
  }
})



// Update campaign story
router.put("/update-story", async (req, res) => {
  const { campaignId, content } = req.body; // Extract campaign ID and new story content

  if (!campaignId || !content) {
    return res.status(400).json({ error: "Campaign ID and story are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO updates (campaign_id, note) VALUES (?, ?);`,
      [campaignId, content]
    );

    if (result.affectedRows > 0) {
      res.json({ updated: true, message: "Story updated successfully!" });
    } else {
      res.status(404).json({ updated: false, message: "Campaign not found" });
    }
  } catch (error) {
    console.error("Error updating story:", error);
    res.status(500).json({ error: "Failed to update story", details: error.message });
  }
});



router.get("/updates/:id", async (req, res) => {
  try {

    const campaignId = req.params.id

    const rows = await pool.query(`
      SELECT *
      FROM updates u
      WHERE u.campaign_id = ${campaignId}
      ORDER BY date
    `)



    // const updatedCampaigns = rows.map(campaign => {
    //   const createdAt = new Date(campaign.created_at); // Convert created_at to a Date object
    //   const endDate = new Date(createdAt); // Clone createdAt date
    //   endDate.setDate(endDate.getDate() + campaign.campaign_duration); // Add duration to get end date

    //   const today = new Date();
    //   const timeDiff = endDate - today;


    //   const daysRemaining = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0;

    //   return {
    //     ...campaign,
    //     percentage: ((campaign.raised_amount / campaign.target_amount) * 100).toFixed(2), // Rounded to 2 decimal places
    //     daysRemaining: daysRemaining // Calculated based on duration
    //   };
    // });

    res.json(rows);
  } catch (error) {
    console.error("Error fetching your updates", error)
    res.status(500).json({ error: "Failed to fetch your updates", details: error.message })
  }
})






module.exports = router;
