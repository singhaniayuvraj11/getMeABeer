"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();

  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
      console.log(session);
  
      if (!session) {
        router.push("/login");
      } else {
        getData();
      }
    }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("Payment successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    router.push(`/${username}`);
  }, []);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    // Get the order Id
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me A Beer", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full relative">
        <img
          className="object-cover w-full h-48 md:h-[350px]"
          src={currentUser.coverpic}
          alt=""
        />
        <div className="profile absolute w-28 h-28 top-[75%] md:top-[85%] left-[42%] md:left-[46.5%] border-4 border-white rounded-full overflow-hidden">
          <img src={currentUser.profilepic} alt="" />
        </div>
      </div>
      <div className="info flex flex-col justify-center items-center mt-18 mb-28">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400 text-center mx-2">{currentUser.bio}</div>
        <div className="text-slate-400 text-center">
          {payments.length} supporters . ₹{payments.reduce((acc, p) => acc + p.amount, 0) / 100} raised
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          <div className="supporters md:w-1/2 bg-slate-900 rounded-lg p-8 ">
            {/* show list of all supporters as leaderboard */}
            <h2 className="text-2xl font-bold">Top 10 Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length == 0 && (
                <li className="my-2">No supporters yet</li>
              )}
              {payments.map((p, i) => {
                if (p.done != false) {
                  return (
                    <li className="my-2 flex gap-2" key={i}>
                      <img
                        src="user.gif"
                        alt="user"
                        className="w-10 h-10 border-2 border-black rounded-full"
                      />
                      {p.name} donated rs {p.amount / 100} with a msg {`"${p.message}"`}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <div className="makePayment md:w-1/2 bg-slate-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex  flex-col gap-2">
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Name"
                onChange={handleChange}
                value={paymentform.name}
                name="name"
              />
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
                onChange={handleChange}
                value={paymentform.message}
                name="message"
              />
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
              />
              <button
                onClick={() => pay(paymentform.amount * 100)}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  !paymentform.name ||
                  !paymentform.message ||
                  !paymentform.amount ||
                  paymentform.amount <= 0
                }
              >
                Pay
              </button>
            </div>
            <div>
              <div className="flex gap-2 mt-4 flex-col md:flex-row">
                <button
                  className="bg-slate-800 p-2 rounded-lg cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!paymentform.name || !paymentform.message}
                  onClick={() => pay(10000)}
                >
                  ₹100
                </button>
                <button
                  className="bg-slate-800 p-2 rounded-lg cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!paymentform.name || !paymentform.message}
                  onClick={() => pay(20000)}
                >
                  ₹200
                </button>
                <button
                  className="bg-slate-800 p-2 rounded-lg cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!paymentform.name || !paymentform.message}
                  onClick={() => pay(50000)}
                >
                  ₹500
                </button>
              </div>
            </div>
          </div>
          <div className="makePayment"></div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
