const User = require("../models/UserModel");
const bcrypt = require('bcrypt')



const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }

    const nameCheck = await User.findOne({ name });
    const emailCheck = await User.findOne({ email });

    if (nameCheck) {
      return res.status(400).json({ message: "name already exists" });
    }
    if (emailCheck) {
      return res.status(400).json({ message: "email already exists" });
    }


    const sPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name: name,
        email: email,
        password: sPassword
    })

   await newUser.save()

    return res.status(201).json({ message: "user created succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};


module.exports = {
    register
}