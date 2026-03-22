import { Outlet } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Toaster } from "sonner"

const App = () => {
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
   function checkScreenSize(){
    setIsMobile(window.innerWidth < 768)
   }

   checkScreenSize()
  
   window.addEventListener("resize", checkScreenSize)

   return ()=> {
    window.removeEventListener("resize", checkScreenSize)
   }
 },[])
 
  return (
    <div className="selection:bg-pink-500/20">
      <Outlet />
      <Toaster position={isMobile ? 'top-center' : 'bottom-right'} />
    </div>
  )
}

export default App