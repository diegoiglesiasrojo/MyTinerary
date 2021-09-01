const joi = require("joi")

const validator = (req, res, next) => {
	const schema = joi.object({
        name: joi.string().trim().min(2).max(30).required().messages({
            "string.min": "'name' requires a minimum of 2 characters",
            "string.max": "'name' requires a maximum of 30 characters"
        }),
        surname: joi.string().trim().min(2).max(30).required().messages({
            "string.min": "'surname' requires a minimum of 2 characters",
            "string.max": "'surname' requires a maximum of 30 characters"
        }),
        image: joi.string().trim().min(2).max(100).required().messages({
            "string.min": "'image' requires a minimum of 2 characters",
            "string.max": "'image' requires a maximum of 100 characters"
        }),
        country: joi.string().trim().required(),
        mail: joi.string().email().trim().min(2).max(100).required().messages({
            "string.min": "'mail' requires a minimum of 2 characters",
            "string.max": "'mail' requires a maximum of 30 characters",
            "string.email": "'mail' must be a valid email"
        }),
        password: joi.string().trim().min(5).max(50).required().messages({
            "string.min": "password requires a minimum of 5 characters",
            "string.max": "password requires a maximum of 50 characters"
        }),
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