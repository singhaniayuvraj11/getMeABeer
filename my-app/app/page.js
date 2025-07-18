import Link from "next/link";
import Head from "next/head";
export default function Home() {
  return (
    <>
      {/* <Head>
        <title>Get Me A Beer - Home</title>
        <meta name="description" content="Get Me A Beer is a crowdfunding platform for creators." />
        <link rel="icon" href="/favicon.ico" />

      </Head> */}
      <div className="flex flex-col justify-center items-center gap-3 text-white h-[38vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold flex gap-2 text-xl md:text-4xl justify-center items-center">
          Buy me a beer{" "}
          <span>
            <img src="/beer.gif" alt="beer" className="w-8" />
          </span>
        </div>
        <p className="text-center">
          Get me A beer is a platform that allows you to fund your projects with
          beer. Share your project, set a goal, and let the community support
          you with beer contributions.
        </p>
        <div>
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              start here
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              read more
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-0.5 opacity-10"></div>

      <div className="text-white container mx-auto py-14">
        <h2 className="text-2xl font-bold text-center mb-14 mx-5 md:mx-0">
          your fans can buy you a beer
        </h2>

        <div className="flex gap-5 justify-around mx-5 md:mx-0">
          <div className="item space-y-2 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full py-2 "
              src="/man.gif"
              alt="man"
              width={90}
            />
            <p className="font-bold text-center">fans want to help </p>
            <p className="text-sm text-center">your fans are available to buy you a beer</p>
          </div>
          <div className="item space-y-2 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full py-2 "
              src="/coin.gif"
              alt="coin"
              width={90}
            />
            <p className="font-bold text-center">fans want to help </p>
            <p className="text-sm text-center">your fans are available to buy you a beer</p>
          </div>
          <div className="item space-y-2 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full py-2 "
              src="/group.gif"
              alt="people"
              width={90}
            />
            <p className="font-bold text-center">fans want to help </p>
            <p className="text-sm text-center">your fans are available to buy you a beer</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-0.5 opacity-10"></div>

      <div className="text-white container mx-auto py-14 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-14">
          ABOUT THIS PROJECT
        </h2>
        <iframe
          className="w-2/3 md:h-[500px] rounded-lg"
          src="https://www.youtube.com/embed/QtaorVNAwbI?si=MnybafMtdx9EO-My"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
