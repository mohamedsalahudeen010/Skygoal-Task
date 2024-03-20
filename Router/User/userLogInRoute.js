import express from "express";
import bcrypt from "bcryptjs";
import { User, genAuthToken } from "../../Model/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "invalid credentials email" });
    }

    const passwordValidate = await bcrypt.compare(
      req.body.password,
      user.password
    );
    
    if (!passwordValidate) {
      return res.status(404).json({ message: "invalid credentials password" });
    }
    const authToken = genAuthToken(user.id);

   
    return res.status(200)
      .json({
        message: "User logged in successfully",
        token: authToken,
        user,
      });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  const {email}=req.query
  try {
    const actor = await User.find({email:email});
    if (!actor) {
      res.status(400).json({ message: "can't get the Actor data" });
    }
    res.status(200).json(actor);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

router.put("/:id", async (req, res) => {
    try {
      const updatedActor= await Actor.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedActor) {
        return res.status(400).json({ message: "Couldn'nt update your content" });
      }
      return res.status(200).json("updated Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

export const userLoginRouter = router;
