const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

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
      password: sPassword,
    });

    const user = await newUser.save();

    const token = await generateToken(user._id);

    const userObj = user.toObject();
    delete userObj.password;
    return res
      .status(201)
      .json({ message: "user created successfully", user: userObj, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  register,
};
