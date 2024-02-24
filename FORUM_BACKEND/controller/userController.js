const dbConnection = require("../db/dbConfing")
const bcrypt = require("bcrypt")
const {StatusCodes} = require("http-status-codes")
const jwt = require("jsonwebtoken")
// register part
async function register(req,res) {
    const {username, firstname, lastname,email, password} = req.body
    if (!username || !firstname || !lastname || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide all the required info"})
    }
    try {
        const [user] = await dbConnection.query("SELECT username,email from users WHERE username = ? or email = ?",[username,email])
        // authentication
        if (user.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"User already registered!"})
        }
        if (password.length <= 8) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 characters"})
        }
        // encrypt password
        const salt  = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password,salt)
        // inserting user
        await dbConnection.query("INSERT INTO users (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",[username,firstname,lastname,email,encryptedPassword])
        res.status(StatusCodes.CREATED).json({msg:"user registered!"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong, please try again later!"})
    }
}
async function login(req,res) {
    const {email,password} = req.body

    if(!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please insert all required fields"})
    }
    try {
        const [user] = await dbConnection.query("SELECT username,userid,password FROM users WHERE email = ? ",[email])
        if(user.length == 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invalid credential!"})
        } 
        // comparing password
        const isMatch = await bcrypt.compare(password,user[0].password)
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invalid credential!"})
        } 
        // setting up token
        const username = user[0].username
        const userid = user[0].userid

        const token = jwt.sign({username,userid},"secret",{expiresIn:"30days"})
        return res.status(StatusCodes.OK).json({token:"login successful",token})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong, please try again later!"})
    }
}
function checkUser(req,res) {
    const username = req.user.username
    const userid = req.user.userid

    return res.status(StatusCodes.OK).json({msg:"valid user",username,userid})
}
module.exports = {register,login,checkUser}