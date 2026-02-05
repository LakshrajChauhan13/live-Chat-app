import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App1 from './App1.tsx'
import App2 from './App2.tsx'
import JoinRoom from './components/JoinRoom.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className=' flex w-full h-screen justify-center items-center gap-70'>
      <App1 />
      {/* <App2 /> */}
      {/* <JoinRoom /> */}
    </div>
  </StrictMode>,
)
