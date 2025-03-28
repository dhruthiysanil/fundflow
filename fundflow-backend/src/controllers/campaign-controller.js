// import { pool } from "../server.js"
// import path from "path"
// import { fileURLToPath } from "url"

const { db } = require("../server.js");
const path = require("path");

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Validate campaign data
const validateCampaignData = (data) => {
  const errors = {}

  if (!data.user_id) errors.user_id = "User ID is required"
  if (!data.campaign_title) errors.campaign_title = "Campaign title is required"
  if (!data.beneficiary_type) errors.beneficiary_type = "Beneficiary type is required"
  if (!data.beneficiary_name) errors.beneficiary_name = "Beneficiary name is required"
  if (!data.beneficiary_location) errors.beneficiary_location = "Beneficiary location is required"
  if (!data.category_id) errors.category_id = "Category is required"

  if (!data.target_amount) {
    errors.target_amount = "Target amount is required"
  } else if (isNaN(Number.parseFloat(data.target_amount)) || Number.parseFloat(data.target_amount) <= 0) {
    errors.target_amount = "Target amount must be a positive number"
  }

  if (!data.campaign_duration) {
    errors.campaign_duration = "Campaign duration is required"
  } else if (isNaN(Number.parseInt(data.campaign_duration)) || Number.parseInt(data.campaign_duration) <= 0) {
    errors.campaign_duration = "Campaign duration must be a positive integer"
  }

  if (!data.campaign_story) errors.campaign_story = "Campaign story is required"

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Get campaigns by user ID
export const getCampaignsByUser = async (req, res) => {
  try {
    const userId = req.params.userId

    const [rows] = await db.query(
      `
      SELECT c.*, cat.category_name 
      FROM campaign c
      JOIN category cat ON c.category_id = cat.category_id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
    `,
      [userId],
    )

    res.json(rows)
  } catch (error) {
    console.error("Error fetching user campaigns:", error)
    res.status(500).json({ error: "Failed to fetch user campaigns", details: error.message })
  }
}

// Get campaigns by category
export const getCampaignsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId

    const [rows] = await db.query(
      `
      SELECT c.*, cat.category_name 
      FROM campaign c
      JOIN category cat ON c.category_id = cat.category_id
      WHERE c.category_id = ?
      ORDER BY c.created_at DESC
    `,
      [categoryId],
    )

    res.json(rows)
  } catch (error) {
    console.error("Error fetching category campaigns:", error)
    res.status(500).json({ error: "Failed to fetch category campaigns", details: error.message })
  }
}

// Search campaigns
export const searchCampaigns = async (req, res) => {
  try {
    const { query, category } = req.query

    let sql = `
      SELECT c.*, cat.category_name 
      FROM campaign c
      JOIN category cat ON c.category_id = cat.category_id
      WHERE 1=1
    `

    const params = []

    if (query) {
      sql += ` AND (c.campaign_title LIKE ? OR c.campaign_story LIKE ? OR c.beneficiary_name LIKE ?)`
      const searchTerm = `%${query}%`
      params.push(searchTerm, searchTerm, searchTerm)
    }

    if (category) {
      sql += ` AND c.category_id = ?`
      params.push(category)
    }

    sql += ` ORDER BY c.created_at DESC`

    const [rows] = await db.query(sql, params)

    res.json(rows)
  } catch (error) {
    console.error("Error searching campaigns:", error)
    res.status(500).json({ error: "Failed to search campaigns", details: error.message })
  }
}
module.exports = {
  validateCampaignData,
  getCampaignsByUser,
  getCampaignsByCategory,
  searchCampaigns,
};

