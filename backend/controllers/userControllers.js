const User = require("../models/User.js")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userControllers = {
    createAccount: (req, res) => {
        const {name, surname, image, country, mail, password, admin} = req.body
        let encryptedPassword = bcryptjs.hashSync(password)
        const newUser = new User({
            name, surname, image, country, mail, password: encryptedPassword, admin
        })
        const token = jwt.sign({...newUser}, process.env.SECRETORKEY)
        User.findOne({mail: mail})
        .then(response => {
            if(response) {
                throw new Error("Username already exist")
            } else {
                newUser.save()
                .then(() => res.json({success: true, response: {name: newUser.name, image: newUser.image, token}}))
                .catch(e => res.json({success: false, error: e.message}))
            }
        })
        .catch(e => {
            res.json({success: false, error: e.message})
        })
    },
    readAccountById: (req, res) => {
        User.findOne({_id: req.params.id})
        .then(account => {
            if (account) {
                res.json({success: true, response: account})
            } else {
                throw new Error
            }
        })
        .catch(e => {
            res.json({success: false, error: e.message})
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
        const {mail, password} = req.body
        User.findOne({mail: mail})
        .then(account => {
            if(!account) {
                throw new Error("Username or password incorrect")
            } else {
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