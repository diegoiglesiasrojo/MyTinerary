const User = require("../models/User.js")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userControllers = {
    createAccount: (req, res) => {
        const {name, surname, image, country, mail, password, admin, google} = req.body
        let encryptedPassword = bcryptjs.hashSync(password)
        const newUser = new User({
            name, surname, image, country, mail, password: encryptedPassword, admin, google
        })
        const token = jwt.sign({...newUser}, process.env.SECRETORKEY)
        User.findOne({mail: mail})
        .then(response => {
            if(response) {
                throw new Error("Username already exist")
            } else {
                newUser.save()
                .then(() => res.json({success: true, response: {name: newUser.name, image: newUser.image, token}}))
                .catch(() => res.json({success: false, error: "Fail to connect with the database"}))
            }
        })
        .catch(e => {
            res.json({success: false, error: [{path: ["failDataBase"], message: e.message}]})
        })
    },
    updateAccountById: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then(account => {
            if(account) {
                res.json({success: true})
            } else {
                throw new Error
            }
        })
        .catch(e => {
            res.json({success: false, error: e.message})
        })
    },
    deleteAccountById: (req, res) => {
        User.findOneAndDelete({_id: req.params.id})
        .then(account => {
            if(account) {
                res.json({success: true})
            } else {
                throw new Error
            }
        })
        .catch(e => {
            res.json({success: false, error: e.message})
        })
    },
    logIn: (req, res) => {
        const {mail, password, googleLogIn} = req.body
        User.findOne({mail: mail})
        .then(account => {
            if(!account) {
                throw new Error("Username or password incorrect")
            } else {
                if(account.google && !googleLogIn) {
                    throw new Error("This account was created with Google. Please use them to Log In")
                }
                if(bcryptjs.compareSync(password, account.password)) {
                    const token = jwt.sign({...account}, process.env.SECRETORKEY)
                    res.json({success: true, response: {name: account.name, image: account.image, token}})
                } else {
                    throw new Error("Username or password incorrect")
                }
            }
        })
        .catch(e => {
            res.json({success: false, error: e.message})
        })
    }
}

module.exports = userControllers