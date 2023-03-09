/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Image from "next/image";
import HeroImage from "../../../public/images/BlockchainTech.png";
import CategoriesPart from "./categoriesPart";
import Services from "./services";
import Notify from "./getStarted";
import ActiveLink from "../link";

 const navigation = [
    { name: "Student", href: "/studentPage", current: false },
    { name: "Teacher", href: "/teacherPage", current: false },
  ];  
  function classNames(...classes:string[]) {
    return classes.filter(Boolean).join(" ");
  }

function HomePage() {

  return (
    <>
    <div id="home" className="flex md:flex-row flex-col justify-around items-center min-w-7xl">
      {/* textual area */}
      <div className="flex flex-col items-start justify-start md:ml-20 mx-10 mt-10 md:mt-0">
        <p className="text-black font-semibold text-base">Smart<span className="text-green font-bold"> Fingerprint</span></p>
        <h2 className="font-bold md:text-6xl text-5xl text-gray-800">
        Advance your career 
        </h2>
        <p className="md:text-base text-sm font-semibold text-gray-700 mt-5">
          {" "}
          Gain and share new knowledge and skills.<br/>
You can upload any type of your training content to leave your fingerprint with us.<br/>
Create and upload your own videos and course photos, and share them with anyone.<br/>
Learn different areas in an easy way! Get unlimited access to all our courses.<br/>
<br/>
Get started !
        </p>
        <div className="mt-5 flex justify-center items-center gap-5">
          {navigation.map((item) => (
              <ActiveLink
                key={item.name}
                href={item.href}
                activeclass=" bg-green text-white"
              >
                <button 
                className="text-white bg-green font-semibold rounded-full px-5 md:py-4 py-2 hover:shadow-lg hover:scale-105"
                aria-current={item.current ? 'page' : undefined}
                >                                
                {item.name}
              </button>
              </ActiveLink>
           ))}

        </div>
      </div>
      {/* image area */}
      <div className="pointer-events-none mr-20 md:block hidden p-10">
        <Image alt="bt" src={HeroImage} width={400} height={400} objectFit="cover" />
      </div>
    </div>
    <div className="pb-14">
      <CategoriesPart />
    </div>
    <div className="pb-10">
      <Services />
    </div>
    <Notify />
</>
  );
}

export default HomePage;