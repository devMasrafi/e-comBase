import apiResponse from "quick-response"
import { Variation } from "../models/variationSchema.model.js"

const createVariation = async (req, res) => {
    try {
        const { name } = req.body
        const variation = await Variation.create({ name })
        return res.json(apiResponse(201, "variation created", { variation }))
    } catch (error) {

    }
}

export { createVariation }