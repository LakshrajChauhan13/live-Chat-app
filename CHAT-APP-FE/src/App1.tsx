import { useEffect, useRef, useState } from "react"
import MessageBox, { MessageBox2 } from "./components/MessageBox"
import JoinRoom from "./components/JoinRoom"
import ChatRoom from "./components/ChatRoom"
import useWebSocketRaw, { ReadyState } from "react-use-websocket"
const useWebSocket = (useWebSocketRaw as any).default || useWebSocketRaw;

export interface messageArrayInterface{
  type : 'sent' | 'received' 
  message: string
}

const App1 = () => {
  // const [ws, setWs] = useState<WebSocket>()
  const [message, setMessage] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  const [chatRoomId, setChatRoomId] = useState('')
  const [socketUrl , setSocketUrl] = useState("ws://localhost:3000")
  
  const [messageArray, setMessageArray] = useState<messageArrayInterface[]>([])
  const {sendMessage, lastMessage, readyState} = useWebSocket(socketUrl)
  console.log("websocket - " + useWebSocket)
  const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState as ReadyState];

  function sendChat(e: any) {
    e.preventDefault()
    if(!message) return;
      // if(!ws){
      //     return
      //   }

      //   ws.send(JSON.stringify({
      //   type: "chat",
      //   payload: {
      //     message: message
      //   }
      // }))
      sendMessage(JSON.stringify({    // using libraries' sendMessage function to send message instead of the ws.send
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
}

  function joinChatRoom(roomId: string) {
    if(readyState !== ReadyState.OPEN) return;
    setChatRoomId(roomId)
    console.log(roomId)
    sendMessage(JSON.stringify({        
      type: "join",
      payload: {
        roomId: roomId
      }
    }))
    //  dedicated function for joining the room and separate function for sending the message
  }

  function createChatRoom(roomId: string){
    sendMessage(JSON.stringify({        // using libraries' sendMessage function to send message instead of the ws.send
        type: "create",
        payload: {
          roomId: roomId
        }
    }))
  }

  useEffect(() => {
    if(lastMessage !== null){         // lastMessage to get the message into this instead of using the ws.onmessage event listener to receive the message from the server
      const data = JSON.parse(lastMessage.data)

      if(data.type === "joined"){
        setIsJoined(true)
        setChatRoomId(data.payload.roomId)
      }
      
      if(data.type === 'received'){
        const message = data.message
        setTimeout(() => {
          setMessageArray(prev => [...prev, {
          type: "received",
          message: message
      }])  
        },1000);
        
    }
    
      if(data.type === 'history'){
        setMessageArray(data.payload)
    }

      if(data.type === 'error'){
        const errorMessage = data.message
        alert(errorMessage)    
        setIsJoined(false)
        setChatRoomId('')
      }

    }
    // const ws =  new WebSocket("ws://localhost:8080")
    // setWs(ws)

    // ws.onmessage = (e) => {
    //   console.log(e.data)
    //   setMessageArray(prev => [...prev, {
    //     type: "received",
    //     message: e.data
    // }])
  
    // return () => {
    //   ws.close()
    // }
  }, [lastMessage])
  
  const isLoading = readyState !== ReadyState.OPEN
  console.log("Debug Import:", useWebSocket);
  return (
    <>
      {isJoined ? (
        <ChatRoom 
        message={message} 
        setMessage={setMessage} 
        sendMessage={sendChat} 
        chatRoomId={chatRoomId} 
        messageArray={messageArray} 
        connectionStatus={connectionStatus} 
        />
      ): <JoinRoom joinChatRoom={joinChatRoom} isLoading={isLoading} createChatRoom={createChatRoom} />  }
    </>
  )
}

export default App1