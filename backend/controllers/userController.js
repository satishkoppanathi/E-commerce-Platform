import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { genSalt } from "bcrypt";
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body; //taking the email and password through axios
  try {
    const user = await userModel.findOne({ email }); //checks whether the email is available or  not
    if (!user) {
      //if email is not availble then
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password); //checking the user entered password with the password that is stored in the database in hashed format,using the bcrypt to decrypt
    if (!isMatch) {
      //if they are not matched returns invalid
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(
      //if login credentials are true ,then it creates the token with the id,name,profile,email
      user._id,
    //   user.name,
    //   user.profileImage,
    //   user.email
    );
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error logging in" });
  }

  //   const { email, password } = req.body;  //taking the email and password through axios
  //   try {
  //     const user = await userModel.findOne({ email });   //checks whether the email is available or  not
  //     if (!user) {  //if email is not availble then
  //       return res.json({ success: false, message: "User doesn't exist" });
  //     }

  //     const isMatch = await bcrypt.compare(password, user.password);  //checking the user entered password with the password that is stored in the database in hashed format,using the bcrypt to decrypt
  //     if (!isMatch) { //if they are not matched returns invalid
  //       return res.json({ success: false, message: "Invalid password" });
  //     }

  //     const token = createToken( //if login credentials are true ,then it creates the token with the id,name,profile,email
  //       user._id,
  //       user.name,
  //       user.profileImage,
  //       user.email
  //     );
  //     res.json({ success: true, token });
  //   } catch (error) {
  //     console.log(error);
  //     res.json({ success: false, message: "Error logging in" });
  //   }
};

// //requwst forgot password otp
// const requestForgetPasswordOTP = async (req, res) => {
//   const { name, email, password, repassword } = req.body;  //taking the name,email,password and repassword from the user through the axios
//   try {
//     const user = await userModel.findOne({ email }); //checks the email is available or not in the database
//     const now = Date.now(); //creating the current date
//     if (!user) { //if user is not found
//       return res.json({ success: false, message: "no user existed" });
//     }

//     if ( //if otp count is greater than 3 with in the timespan of 3 minutes
//       user.otpRequestCount >= 3 &&
//       now - user.lastOtpRequest <= 5 * 60 * 1000
//     ) {
//       return res.json({
//         success: false,
//         message: "Too Many OTP requests .please try again some times",
//       });
//     }
//     if (now - user.lastOtpRequest >= 5 * 60 * 1000) { //if time exceeds the more than 5 mins ,then otpcount sets to 0
//       user.otpRequestCount = 0;
//     }
//     if (password !== repassword) { //checks if entered password and repassword same or not
//       return res.json({
//         success: false,
//         message: "password not matching with repassword",
//       });
//     }

//     const otp = generateOTP(); //generating the otp
//     user.otp = otp; //assign the generated otp to the database usermode
//     user.otpExpiration = Date.now() + 3 * 60 * 1000; //adding 3 mins to the expiration time
//     user.otpRequestCount += 1; //incrementing the request count
//     user.lastOtpRequest = now;
//     await user.save(); //saving the user model

//     await sendOTPEmail(email, otp, name); //send the otp to the email

//     res.json({ success: true, message: "otp sent successfully" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "error" });
//   }
// };

// //function to reset the password
// const resetPassword = async (req, res) => {
//   const { email, password, repassword, otp } = req.body; //taking the email and password and repasswird and otp from the user
//   try {
//     const user = await userModel.findOne({ email }); //finds the user
//     if (!user) {
//       return res.json({ success: false, message: "no user found" });
//     }

//     if (password !== repassword) {
//       return res.json({
//         success: false,
//         message: "password not matching with repassword",
//       });
//     }
//     if (user.otp !== otp || Date.now() > user.otpExpiration) { //checks if user entered otp and  otp in the database matches or not
//       console.log("Invalid or expired OTP");
//       return res.json({ success: false, message: "invalid or expired OTP" });
//     }

//     const salt = await bcrypt.genSalt(10); //encrypting the password
//     const hashedPassword = await bcrypt.hash(password, salt);
//     user.password = hashedPassword;
//     user.otp = null;
//     user.otpExpiration = null;

//     await user.save(); //saving the user

//     res.json({ success: true, message: "password reset successfully!!" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "error" });
//   }
// };
// //function to clean the user that are saved in the database but they are not verified through the email
// const cleanupExpiredUsers = async (req, res) => {
//   try {
//     const now = Date.now(); //creating the now variable with present time
//     const expiredUser = await userModel.find({ //find the expired users that otp not equals to null and otpexpiration less than now
//       otp: { $ne: null },
//       otpExpiration: { $lt: now },
//     });
//     if (expiredUser.length > 0) { //if there are any expireduuser then delete that user
//       await userModel.deleteMany({
//         otp: { $ne: null },
//         otpExpiration: { $lt: now },
//       });
//     }
//   } catch (error) {
//     console.error("Error cleaning up expired users:", error);
//   }
// };

// //creating an intervel to check for every five mins
// const HOUR = 5 * 60 * 1000;
// setInterval(cleanupExpiredUsers, HOUR);

// //admin login check

// const adminLoginCheck = async (req, res) => {
//   const { email, password } = req.body; //taking the email and password
//   try {
//     if ( //checks whether email and password matches or not
//       process.env.ADMIN_EMAIL === email &&
//       process.env.ADMIN_PASSWORD === password
//     ) { //if they match create the admin  token with the email
//       const adminToken = createAdminToken(email); // Using admin email as ID
//       res.json({ success: true, adminToken, message: "Login successful" });
//     } else {
//       res.json({ success: false, message: "Login failed" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Login failed" });
//   }
// };

// Function to create JWT token
const createToken = (id) => {
  //creating the token that contains the id,name ,profileImage and email
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { email, name, password } = req.body; //taking the email,name,password from the user ,they are sending through the axios
  try {
    // checking is user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    // hasjing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };

// requestOTP,
//   verifyOTPAndRegister,
//   requestForgetPasswordOTP,
//   resetPassword,
//   adminLoginCheck,
