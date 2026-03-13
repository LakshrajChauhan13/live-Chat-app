import { Outlet } from "@tanstack/react-router"
import { Toaster } from "sonner"

const App = () => {
 
  return (
    <div className="selection:bg-pink-500/20">
      <Outlet />
      <Toaster />
    </div>
  )
}

export default App