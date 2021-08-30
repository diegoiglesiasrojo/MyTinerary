const joi = require("joi")

const validator = (req, res, next) => {
	const schema = joi.object({
        name: joi.string().trim().min(2).max(20).required().messages({
            "string.empty": "test",
            "string.min": "test2"
        }),
        surname: joi.string().trim().min(2).max(20).required(),
        image: joi.string().trim().min(2).max(100).required(),
        country: joi.string().trim().min(2).max(20).required(),
        mail: joi.string().email().trim().min(2).required(),
        password: joi.string().trim().min(2).max(50).required(),
        admin: joi.boolean(),
        google: joi.boolean()
    })
    const validation = schema.validate(req.body, {abortEarly: false})
    if (!validation.error) {
        next()
    } else {
        res.json({success: false, error: validation.error.details})
    }
}
module.exports = validator