import { useEffect, useRef, useState } from "react"
import MessageBox, { MessageBox2 } from "./components/MessageBox"
import JoinRoom from "./components/JoinRoom"
import ChatRoom from "./components/ChatRoom"

export interface messageArrayInterface{
  type : 'sent' | 'received' 
  message: string
}

const App1 = () => {
  const [ws, setWs] = useState<WebSocket>()
  const [message, setMessage] = useState('')
  const inputRef = useRef('')
  const [isJoined, setIsJoined] = useState(false)
  const [chatRoomId, setChatRoomId] = useState('')
  
  const [messageArray, setMessageArray] = useState<messageArrayInterface[]>([])

  function sendMessage(e: any) {
    e.preventDefault()
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
      // console.log("sent message -" + message)
      setMessageArray(prev => [...prev, {
        type: "sent",
        message: message
      }])
      
      setMessage('')
      // console.log(messageArray)
  }
}

  function joinChat(roomId: string) {
    setChatRoomId(roomId)
    console.log(roomId)

      ws?.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: roomId
        }
      }))
    setIsJoined(c => !c)
    //  dedicated function for joining the room and separate function for sending the message
  }

  useEffect(() => {
    const ws =  new WebSocket("ws://localhost:8080")
    setWs(ws)

    ws.onmessage = (e) => {
      console.log(e.data)
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
    <>
    {isJoined ? (
      <ChatRoom message={message} setMessage={setMessage} sendMessage={sendMessage} chatRoomId={chatRoomId} messageArray={messageArray} />
    ): <JoinRoom joinChat={joinChat} />  }
      
    </>
  )
}

export default App1