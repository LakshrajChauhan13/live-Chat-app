import { useEffect, useRef, useState } from "react"
import MessageBox, { MessageBox2 } from "./components/MessageBox"
import JoinRoom from "./components/JoinRoom"
import ChatRoom from "./components/ChatRoom"
import useWebSocketRaw, { ReadyState } from "react-use-websocket"
const useWebSocket = (useWebSocketRaw as any).default || useWebSocketRaw;

export interface messageArrayInterface{
  type?: string;
  userId : string; 
  message: string
}

const App = () => {
  // const [ws, setWs] = useState<WebSocket>()
  const [message, setMessage] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  const [chatRoomId, setChatRoomId] = useState('')
  const [socketUrl , setSocketUrl] = useState("ws://localhost:3000")
  const [userId] = useState(()=> {
    const savedUserId = localStorage.getItem('userId')
    if(savedUserId) {
      return savedUserId;
    }
    
    const randomId =  Math.random().toString(36) + Date.now().toString(36)
    const userId = "Anon-user-" + randomId.substring(3,10)
    localStorage.setItem("userId", userId)
    return userId;
  })
  
  const [messageArray, setMessageArray] = useState<messageArrayInterface[]>([])
  const {sendMessage, lastMessage, readyState} = useWebSocket(socketUrl)
 
  const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState as ReadyState];

  useEffect(() => {
    if(readyState == ReadyState.OPEN && !isJoined){
      if(localStorage.getItem("currentRoom")){
        const savedRoom = localStorage.getItem("currentRoom")
        if(savedRoom){
          sendMessage(JSON.stringify({
            type: "join",
            payload: {
              roomId: savedRoom
            }
        }))
      }
    } 
  }
  },[readyState, isJoined])

  useEffect(() => {
    if(lastMessage !== null){         // lastMessage to get the message into this instead of using the ws.onmessage event listener to receive the message from the server
      const data = JSON.parse(lastMessage.data)

      if(data.type === "joined"){
        setIsJoined(true)
        setChatRoomId(data.payload.roomId)
        localStorage.setItem("currentRoom", data.payload.roomId)
      }

      if(data.type === 'received'){
          setMessageArray(prev => [...prev, {
          userId: data.userId,
          message: data.message
      }])
      }
    
      if(data.type === 'history'){
        setMessageArray(data.payload)
      }

      if(data.type === 'error'){
        const errorMessage = data.message
        alert(errorMessage)    
        setIsJoined(false)
        setChatRoomId('')
        localStorage.removeItem("currentRoom")
      }
    }
  }, [lastMessage])
    
  function sendChat(e: any) {
    e.preventDefault()
    if(!message) return;

    sendMessage(JSON.stringify({    // using libraries' sendMessage function to send message instead of the ws.send
        type: "chat",
        payload: {
          message: message,
        },
        userId: userId
      }))

      setMessageArray(prev => [...prev, {
        userId: userId,
        message: message
      }])
      setMessage('')
}

  function createChatRoom(roomId: string){
      sendMessage(JSON.stringify({        // using libraries' sendMessage function to send message instead of the ws.send
          type: "create",
          payload: {
            roomId: roomId
          },
          userId: userId
      }))
  }

  function joinChatRoom(roomId: string) {
    if(readyState !== ReadyState.OPEN) return;
    setChatRoomId(roomId)
    console.log(roomId)
    sendMessage(JSON.stringify({        
      type: "join",
      payload: {
        roomId: roomId,
      }
    }))
  }

  function leaveRoom() {
      setIsJoined(false);
      setChatRoomId('');
      setMessageArray([]);
      localStorage.removeItem('currentRoom');
      sendMessage(JSON.stringify({
        type: "leave",
        payload: {
          roomId: chatRoomId
        }
      }))
      // Ideally send a 'leave' message to server too
  }

  const isLoading = readyState !== ReadyState.OPEN
  // console.log("Debug Import:", useWebSocket);
  return (
    <>
    <div className="max-w-7xl mx-auto h-screen flex justify-center items-center">

      {isJoined ? (
        <ChatRoom 
          message={message} 
          setMessage={setMessage} 
          sendMessage={sendChat} 
          chatRoomId={chatRoomId} 
          messageArray={messageArray} 
          connectionStatus={connectionStatus} 
          leaveRoom={leaveRoom}
          userId={userId}
        />
      ): <JoinRoom joinChatRoom={joinChatRoom} isLoading={isLoading} createChatRoom={createChatRoom} />  }
    </div>

    </>
  )
}

export default App