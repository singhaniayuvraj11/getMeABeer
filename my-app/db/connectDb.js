
import mongoose from "mongoose";

const connectDb = async () => {
        try {
            const conn = await mongoose.connect("mongodb+srv://singhaniayuvraj11:Yuvraj123@getmeabeer.z97jkov.mongodb.net/beer", {
                useNewUrlParser: true,
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return conn;
            
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
    }

  export default connectDb;