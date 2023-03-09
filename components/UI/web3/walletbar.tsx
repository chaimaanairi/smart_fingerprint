  /* eslint-disable jsx-a11y/alt-text */
import {useAccount,useNetwork} from "../../hooks/useHooks";

export default function WalletBar() {
  const { account } = useAccount();
  const { network } = useNetwork();

    return (
      <section className="mt-10 text-white bg-green rounded-3xl">
      <div className="px-8 pb-5">
      <div className="text-2xl pb-9 pt-3">
        <p className="text-black font-semibold text-base">Smart<span className="text-white font-bold"> Fingerprint</span></p>
      </div>  

      <div className="mb-5">        
        <h1 className="text-2xl">Hello, {account.data} </h1>
        <h2 className="subtitle  text-xl mb-2">I hope you are having a great day!</h2>
        <p className="text-gray-100 ">
        Welcome to the sharing process, our platform gives you the opportunity to make your mark 
        by sharing your knowledge to help others perform better, and become stronger as professionals.  
        </p> 
      </div>

        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
              <div className="">
            </div>
          </div>

          <div>
        
              <div>
                
                <span>Currently on </span>
                <strong className="text-2xl"> 
                   {network.data}
                </strong>

              </div>
            
          </div>

          </div>
        </div>
        </section>
    )
  }