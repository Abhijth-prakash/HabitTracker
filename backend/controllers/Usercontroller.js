const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

//registering user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }

    const nameCheck = await User.findOne({ name });
    const emailCheck = await User.findOne({ email });
    ``;

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
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userObj = user.toObject();
    delete userObj.password;
    return res
      .status(201)
      .json({ message: "user created successfully", user: userObj });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};


//login user
const login = async (req, res) => {
    try {

        const email = req.body.email?.trim().toLowerCase();
        const { password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message: "All fields required",
            });
        }

        const emailCheck = await User.findOne({ email });


        if (!emailCheck) {
            return res.status(401).json({
                message: "Email or password is incorrect",
            });
        }

        const passCheck = await bcrypt.compare(
            password,
            emailCheck.password
        );


        if (!passCheck) {
            return res.status(401).json({
                message: "Email or password is incorrect",
            });
        }

        const token = generateToken(emailCheck._id);


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
            user: emailCheck,
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
  register,
  login,
};
