import express from "express";
import bcrypt from "bcryptjs";
import { Admin, genAdminAuthToken } from "../../Model/admin.js";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(404).json({ message: "invalid credentials email" });
    }

    const passwordValidate = await bcrypt.compare(
      req.body.password,
      admin.password
    );
   
    console.log(passwordValidate);
    if (!passwordValidate) {
      return res.status(404).json({ message: "invalid credentials password" });
    }
    const authAdminToken = genAdminAuthToken(admin.id);

    console.log("authToken",authAdminToken)

    return res
      .status(200)
      .json({
        message: "Admin logged in successfully",
        token: authAdminToken,
        admin,
      });

     

  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const adminLoginRouter = router;
