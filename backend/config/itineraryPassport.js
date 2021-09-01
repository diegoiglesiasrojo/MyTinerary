const passport = require("passport")
const jwtStrategy = require("passport-jwt").Strategy
const extractJwt = require("passport-jwt").ExtractJwt
const Itinerary = require("../models/Itinerary.js")

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETORKEY
}, (payload, done) => {
    Itinerary.findOne({_id: payload._doc._id})
    .then(response => {
        if (!response) {
            return done(null, false)
        } else {
            return done(null, response)
        }
    })
    .catch(error => done(error, false))
}))