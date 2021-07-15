const S = require("sequelize");
const db = require("../db")

class Users extends S.Model {}


Users.init({
    email: {    
        type: S.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    full_name: {
        type: S.STRING,
        allowNull: false,
    },
    facebookId:{
        type: S.STRING,
    },
    googleId:{
        type: S.STRING,
    },
    img:{
        type: S.STRING,
    }
},{sequelize:db , modelName:"users"})

module.exports = Users ;

