const User = require("../models/User.model");

class UserRepository{
    async findByEmail(email){
        const user = await User.findOne({email});
        return user;
    }

    async createUser(userData){
        const create = await User.create({
           userData
        })
        return create;
    }
}

module.exports = new UserRepository();