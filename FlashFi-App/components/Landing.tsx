import { useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'

import {
  DynamicWidget,
  // useDynamicContext,
} from "@/lib/dynamic";
//import { useAccount} from 'wagmi'
//import Spinner from "@/components/Spinner";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

//  const { sdkHasLoaded, user } = useDynamicContext();
//  const [isLoading, setIsLoading] = useState<boolean>(true);
//  const { address } = useAccount();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            FlashFi
          </div>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-yellow-400 transition-colors">Developers</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Ecosystem</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Community</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Resources</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">FlashFi (DAO)</a>
          </div>
          {/* <button className="hidden md:block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-2 px-4 rounded">
            Launch App *
          </button> */}
          <div className="ml-auto flex items-center gap-4">
              <div className="ml-auto flex items-center gap-4">
                 <DynamicWidget />
              </div>
            </div>          
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <a href="#" className="block py-2 hover:text-yellow-400 transition-colors">Developers</a>
          <a href="#" className="block py-2 hover:text-yellow-400 transition-colors">Ecosystem</a>
          <a href="#" className="block py-2 hover:text-yellow-400 transition-colors">Community</a>
          <a href="#" className="block py-2 hover:text-yellow-400 transition-colors">Resources</a>
          <a href="#" className="block py-2 hover:text-yellow-400 transition-colors">FlashFi (DAO)</a>
          <button className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-2 px-4 rounded">
            Launch App
          </button>
        </div>
      )}

      <main className="container mx-auto mt-16 px-4">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-30"></div>
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
                Flash Loans to
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                  Empower DeFi
                </span>
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-300 text-center mb-8 max-w-2xl">
            Unlock the power of decentralized flash loans with FlashFi. Seamlessly borrow and lend assets in a single transaction.
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200">
            Get Started
          </button>
        </div>
      </main>
    </div>
  )
}