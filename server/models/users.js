const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class Users extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validPassword(password) {
    return this.password === Users.hash(password, this.salt);
  }
}

Users.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    full_name: {
      type: S.STRING,
      allowNull: false,
    },
    facebookId: {
      type: S.STRING,
    },
    googleId: {
      type: S.STRING,
    },
    img: {
      type: S.STRING,
    },
    password: {
      type: S.STRING,
    },
    salt: {
      type: S.STRING,
    },
},{sequelize:db , modelName:"users"})

Users.addHook("beforeCreate", async user => {
    if (user.password) {
        user.salt = await bcrypt.genSalt(6)
        user.password = await user.hash(user.password, user.salt)
    }
  })

  Users.addHook("afterBulkUpdate", async user => {
      usuario = await Users.findByPk(user.where.id)
      if (usuario.password){
      usuario.password = await bcrypt.hash(usuario.password, usuario.salt)
      usuario.save()
      }
  })

 
module.exports = Users ;

