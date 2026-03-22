import { useGlobalWebSocket } from '@/ContextApi/WebSocketContextProvider'
import ChatRoom from '../rooms/ChatRoom'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router';
import { ReadyState } from 'react-use-websocket';
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner';

export interface messageArrayInterface{
  type?: string;
  userId : string; 
  message: string;
  id : string;
}

const ChatRoomPage = () => {
  const {sendMessage, lastMessage, userId, connectionStatus, readyState} = useGlobalWebSocket();
  const { roomId } = useParams({ strict: false })                                                          // useAppSelector(state => state.roomId.roomId) 
  const [message, setMessage] = useState('')
  const [messageArray, setMessageArray] = useState<messageArrayInterface[]>([])
  const navigate = useNavigate()
  const [userCount, setUserCount] = useState<number>(0);
  const hasJoined = useRef(false)
  

  useEffect(() => {
    if(lastMessage !== null){
      const data = JSON.parse(lastMessage.data);

       if(data.type === "joined"){
        const roomId = data.payload.roomId
        console.log('dnk')
        localStorage.setItem("currentRoom", roomId)
        setUserCount(data.roomUserCount);
        console.log(`inside joined - ${data.roomUserCount}`)
      }

      if(data.type === 'received'){
        setMessageArray(prev => [...prev, {
          userId: data.userId,
          message: data.message, 
          id: data.id,
          type: data.type
        }])
      }

      if(data.type === 'history'){
        setMessageArray(data.payload)
      }

      if(data.type === 'deleted'){
        setMessageArray(data.payload)
      }

      if(data.type === 'system'){
        setMessageArray((prev) => 
          [...prev, {
          type: data.type,
          message: data.message,
          userId: data.userId,   
          id: data.id
        }]
      )
      setUserCount(data.roomUserCount)
      console.log(`inside system - ${data.roomUserCount}` )
      }

      if(data.type === 'error'){
        const errorMessage = data.message
        toast.error(errorMessage)    
        localStorage.removeItem("currentRoom")
        navigate({ to: '/'})
      }
    }
  },[lastMessage, navigate])

  useEffect(() => {
    if(readyState == ReadyState.OPEN && !hasJoined.current){
    const savedRoom = roomId || localStorage.getItem('currentRoom');
    if(savedRoom){
      sendMessage(JSON.stringify({
        type: 'join',
        payload: {
          roomId: savedRoom 
        },
        userId: userId
      }))
    }
      hasJoined.current = true
    }
  },[readyState, roomId])
  
  function sendChat(e: any) {
    e.preventDefault()
    if(!message) return;
    const newId = uuidv4()
    sendMessage(JSON.stringify({    // using libraries' sendMessage function to send message instead of the ws.send
        type: "chat",
        payload: {
          message: message,
          id: newId
        },
        userId: userId
      }))

      setMessageArray(prev => [...prev, {
        userId: userId,
        message: message,
        id: newId
      }])
      setMessage('')
  }

  function leaveRoom() {
      setMessageArray([]);
      localStorage.removeItem('currentRoom');
      sendMessage(JSON.stringify({
        type: "leave",
        payload: {
          roomId: roomId
        },
        userId: userId
      }))
      navigate({ to: '/'})
      // Ideally send a 'leave' message to server too
  }

   function DeleteMessage(messageId: string) {
    const message = 'This message has been deleted.'
     sendMessage(JSON.stringify({    // using libraries' sendMessage function to send message instead of the ws.send
        type: "delete",
        payload: {
          message: message,
          id: messageId
        },
        userId: userId
      }))
  }
  
  return (
    <>
    {/* <div className='h-screen w-screen  flex bg-neutral-500 justify-center items-center'> */}
    <div className='bg-bg w-full h-[100dvh] flex flex-col'>

      <ChatRoom 
        message={message}
        setMessage={setMessage}
        sendMessage={sendChat}
        chatRoomId={roomId } 
        messageArray={messageArray}
        setMessageArray={setMessageArray}
        connectionStatus={connectionStatus} 
        leaveRoom={leaveRoom} 
        userId={userId}
        DeleteMessage={DeleteMessage} 
        userCount = {userCount}
      />
    </div>
    {/* </div> */}
    </>    
  )
}

export default ChatRoomPage