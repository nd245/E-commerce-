const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Ensure jwt is required

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "This account already exists" }] });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).send({
      msg: "User registered successfully", user: newUser,
      token,
    });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: `Server error ${error}` }] }); $
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).send({ errors: [{ msg: "Incorrect email" }] });
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);

    if (!checkPassword) {
      return res.status(400).send({ errors: [{ msg: "Incorrect password" }] });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      msg: "Login successful", user:foundUser,
      token,
    });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Server error" }] });
  }
};
