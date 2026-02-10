import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <div className=' flex w-full h-screen justify-center items-center gap-70'> */}
      <App />
      
    {/* </div> */}
  </StrictMode>,
)
