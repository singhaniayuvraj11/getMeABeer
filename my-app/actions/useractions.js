"use server";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;
  var instance = new Razorpay({
    key_id: user.razorpayid, // Enter the Key ID generated from the Dashboard
    key_secret: secret,
  });

  instance.orders.create({
    amount: 5000,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  await Payment.create({
    oid: x.id,
    amount: amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
    done: false,
  });
  return x;
};

export const fetchuser = async (username) => {
  await connectDb();
  let u = await User.findOne({
    username: username,
  });
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchpayments = async (username) => {
  await connectDb();
  let p = await Payment.find({ to_user: username })
    .sort({ amount: -1 })
    .limit(10)
    .lean();
  return p;
};

export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata = Object.fromEntries(data);
  if (oldusername != ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { success: false, message: "Username already exists" };
    }
      await User.updateOne({ email: ndata.email }, ndata);
      await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username });
      return { success: true, message: "Profile updated successfully" };
  }
  
  else{
    await User.updateOne({ username: oldusername }, ndata);
  }
};
