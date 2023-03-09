/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Image from "next/image";
import AboutImage from "../../../public/images/services.png";

function Services() {
  return (
    <div id="services">
        <h2 className=" font-bold text-center p-5 text-4xl text-black leading-none">Services</h2>
        <div className="flex justify-between min-w-7xl my-10 md:flex-row flex-col gap-y-10">
        <div className="mx-20">
            <Image
            src={AboutImage}
            width={400}
            height={400}
          //  objectfit="cover"
            className="rounded-2xl shadow-lg"
            alt="services"
            />
        </div>
        <div className="md:mr-20 mx-10">
            <p className="mt-2 mb-5 text-5xl font-bold text-gray-900 sm:text-4xl">
            Lets get to know the platform more closely
            </p>
            <p className="md:text-base text-sm  text-black">
            <span className="font-bold"> Smart</span> <span className="text-green font-bold"> FingerPrint</span> is a Blockchain-based learning platform, a responsive educational DApp that: <br></br>
            <br></br> * provides direct communication between learners and course providers.
            <br></br> * provides the ability to learn anytime and anywhere through laptops, desktops, phones or tablets.
            <br></br> * provides fast, secure and low-cost payments as well as easy cross-border payments.
            <br></br> * eliminates third-party processors, and money transfer waiting times.
            <br></br> * And more ...  .
            </p>
        </div>
        </div>
    </div>
  );
}

export default Services;