import mongoose from "mongoose"

const dbConnection=()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Db Connected Successfully")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection