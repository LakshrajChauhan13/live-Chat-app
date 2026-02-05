import { useEffect, useRef, useState } from "react"
import MessageBox, { MessageBox2 } from "./components/MessageBox"

interface messageArrayInterface{
  type : 'sent' | 'received' 
  message: string
}

const App2 = () => {
  const [ws, setWs] = useState<WebSocket>()
  const [message, setMessage] = useState('')
  const inputRef = useRef('')
  const [isJoined, setIsJoined] = useState(false)

  const [messageArray, setMessageArray] = useState<messageArrayInterface[]>([])

  function send() {
    if(isJoined){
      if(!ws){
          return
        }
        
        ws.send(JSON.stringify({
          type: "chat",
          payload: {
            message: message
          }
        }))
        console.log("sent message -" + message)
        
        setMessageArray(prev => [...prev, {
          type: "sent",
          message: message
        }])
        
        console.log(messageArray)
  }
    else{
      if(!ws){
          return
        }

        ws.send(JSON.stringify({
          type: "join",
          payload: {
              roomId: message
            }
        }))
  setIsJoined(c => !c)

  }
}

//  function toggleJoin() {
//   setIsJoined(c => !c)
//     setTimeout(() => {
//         send()
//     }, 500);
//   }
 

  useEffect(() => {
    const ws =  new WebSocket("ws://localhost:8080")
    setWs(ws)

    ws.onmessage = (e) => {
      console.log(e.data)
      // console.log("received message -" + e.data)
      setMessageArray(prev => [...prev, {
        type: "received",
        message: e.data
    }])
  }
    return () => {
      ws.close()
    }

  }, [])


  return (
      <div className="h-120 bg-red-200 w-120 rounded-2xl p-2 flex flex-col gap-1 items-end">
        <div className=" h-full w-full border-2 py-2 px-1 overflow-y-auto flex flex-col gap-2 ">
          
          <div className="text-2xl">
            Join the room
          </div> 

          {messageArray.map((message) => 
            message.type == "sent" ? <MessageBox2 message={message.message} /> : <MessageBox message={message.message}/>
          )}
          
        </div>
        
        <div className="flex h-10 w-full gap-2 ">
          <input 
            type="text" 
            // ref={inputRef}
            placeholder="Enter message..."
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            className="flex-1 h-full bg-black/50 rounded-lg p-2 placeholder:text-neutral-100 outline-none focus:ring-2 focus:ring-offset-2 ring-white" 
          />
          
          <button className="h-full w-[25%] bg-amber-50 rounded-lg active:scale-95 cursor-pointer"
            onClick={send}
          > 
            {isJoined ? "Send" : "Join "} 
          </button>
        </div>
      </div>
  )
}

export default App2