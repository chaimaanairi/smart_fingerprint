/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Image from "next/image";
import HeroImage from "../../../public/images/BlockchainTech.png";
import Link from "../link";
import ActiveLink from "../link";

const navigation1 = [
  { name: "Create", href: "/nftCreatePage", current: false },
  { name: "Purchase", href: "/marketPlacePage", current: false },
]; 

const navigation2 = [
  { name: "Your profile", href: "/ProfilePage", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function HomePageT() {
  return (
    <div id="homeT" className="my-16 flex md:flex-row flex-col justify-around items-center min-w-7xl">
      {/* textual area */}
      <div className="flex flex-col items-start justify-start md:ml-20 mx-10 mt-10 md:mt-0">
        <p className="text-black font-semibold text-base">
            Smart<span className="text-green font-bold"> Fingerprint</span>
        </p>
        
        <p className="md:text-base text-sm font-semibold text-gray-700 mt-5">
          {" "}
          <span className="font-bold text-2xl "> Hello, </span> <br/> <br/>
          Mint your own course and share your knowledge<br/>
          You can also purchase the course you want<br/> <br/>
        </p>
        <div className="mt-10 flex justify-center items-center gap-5">
            {navigation1.map((item) => (
              <Link 
              activeclass="bg-green text-white"
                key={item.name}
                href={item.href}
              >
                <button 
                className="text-white bg-green font-semibold rounded-full px-5 md:py-4 py-2 hover:shadow-lg hover:scale-105"
                aria-current={item.current ? 'page' : undefined}
                >                                
                {item.name}
              </button>
              </Link>
            ))}
        </div>
        
        <div className="">
            {navigation2.map((item) => (
              <ActiveLink
                key={item.name}
                href={item.href}
                activeclass="bg-Lightorange text-black"
              >
                <button 
                className="mt-20 text-gray-700 bg-Lightorange font-semibold rounded-full px-10 md:py-4 py-3 hover:bg-orangeHover hover:shadow-lg hover:scale-105"
                aria-current={item.current ? 'page' : undefined}
                >                                
                {item.name}
              </button>
              </ActiveLink>
            ))}
        </div>

      </div>


      {/* image area */}
      <div className="mr-20 md:block hidden p-10">
        <Image alt="bt" src={HeroImage} width={400} height={400} objectFit="cover" />
      </div>
    </div>
  );
}

export default HomePageT;



