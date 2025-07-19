"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setshowDropdown] = useState(false);
  //   if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  return (
    <nav className="bg-gray-900 text-white flex justify-between px-4 md:h-16 items-center ">
      <Link href={"/"}>
        <div className="logo font-bold text-bold md:text-lg flex items-center justify-center">
          <span>
            <img src="/beer.gif" alt="" className="w-7" />
          </span>
          getMeABeer
        </div>
      </Link>

      <div className="relative ">
        {session && (
          <>
            <button
              onClick={() => setshowDropdown(!showDropdown)}
              onBlur={() =>
                setTimeout(() => {
                  setshowDropdown(false);
                }, 500)
              }
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-4 md:m-0"
              type="button"
            >
               {session.user.email}{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
  id="dropdown"
  className={`absolute left-[125px] z-10 ${
    showDropdown ? "" : "hidden"
  } bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 border border-gray-200 dark:border-gray-600`}
>
  <ul
    className="py-2 text-sm text-gray-700 dark:text-gray-200"
    aria-labelledby="dropdownDefaultButton"
  >
    <li>
      <Link
        href="/dashboard"
        onClick={() => setshowDropdown(false)}
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
      >
        Dashboard
      </Link>
    </li>
    <li>
      <Link
        href={`/${session.user.name}`}
        onClick={() => setshowDropdown(false)}
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
      >
        Your Page
      </Link>
    </li>
    <li>
      <button
        onClick={() => {
          setshowDropdown(false);
          signOut();
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
      >
        Sign out
      </button>
    </li>
  </ul>
</div>
          </>
        )}

        {!session && (
          <>
            <Link href={"/login"}>
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
