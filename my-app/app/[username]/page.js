import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import User from "@/models/User";
import connectDb from "@/db/connectDb";



 const checkUser = async (username) => {
    await connectDb();
    let user = await User.findOne({ username: username });
    if (!user) {
      return notFound();
    }
  };


const Username = async ({ params }) => {

  const { username } = await params;
  
  // Pass the username to checkUser
  const user = await checkUser(username);


  return (
    <>
      <PaymentPage username={username} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get Me A Beer`,
    description: "This website is a crowdfunding platform for creators.",
  };
}