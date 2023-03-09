import { FunctionComponent, ReactNode } from "react";

import Navbar from "../UI/navbar_footer/navbar";
import Footer from "../UI/navbar_footer/footer";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout:FunctionComponent<BaseLayoutProps> = ({ children }) => {
  return (
    <>
        <Navbar />
        <div className="py-20 bg-gray-50 overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8 ">
          {children}
        </div>
        </div>
      <Footer />
    </>
  ) 
}

export default BaseLayout;