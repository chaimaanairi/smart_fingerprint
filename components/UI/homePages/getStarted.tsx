import React from "react";
import ActiveLink from "../link";

const navigation = [
  { name: "Create", href: "/nftCreatePage", current: false },
  { name: "Purchase", href: "/marketPlacePage", current: false },
];
  
function GetStarted() {
  return (
    <div className="flex-col min-w-7xl mx-20 my-20 bg-green flex rounded-lg shadow-lg p-10 ">
      <div className="text-center">
        <h2 className="mb-14 font-semibold md:text-5xl text-4xl text-white">
          Get Started Today
        </h2>
        <p className="my-8 font-semibold md:text-base text-sm text-white ">
        The  <span className="text-black font-semibold">Smart Fingerprint</span> platform provides a great experience no matter where the learners are or what device they are using.<br/>
Mint or buy an NFT course to get unlimited ownership forever!<br/>
Show your content to anyone in no time.
        </p>

          <div className="flex justify-center items-center gap-5">
            {navigation.map((item) => (
              <ActiveLink
                key={item.name}
                href={item.href}
                activeclass="bg-green text-white"
              >
                <button 
                className="mt-5 text-black bg-white w-auto font-semibold hover:font-bold rounded-full px-5 md:py-4 py-2 hover:scale-105 hover:shadow-lg"
                aria-current={item.current ? 'page' : undefined}
                >                                
                {item.name}
              </button>
              </ActiveLink>
            ))}
        </div>

      </div>
    </div>
  );
}

export default GetStarted;


