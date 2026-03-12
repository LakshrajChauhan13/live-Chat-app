import React, { useEffect, useState } from 'react'
import ProjectTitle from '../brandName/ProjectTitle'
import CreateOrJoinRoomModal from '../rooms/CreateOrJoinRoomModal';
import { useGlobalWebSocket } from '@/ContextApi/WebSocketContextProvider';
import { ReadyState } from 'react-use-websocket';
import { useAppDispatch } from '@/store/hook';
import { setRoomId } from '@/store/slice/roomIdSlice';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

const JoinRoomPage = () => {
    const [chatRoomId, setChatRoomId] = useState('');
    const {sendMessage, lastMessage, readyState, userId} = useGlobalWebSocket();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
      function joinChatRoom(roomId: string) {
         if(readyState !== ReadyState.OPEN) return;
         sendMessage(JSON.stringify({        
            type: "join",
            payload: {
               roomId: roomId,
            },
            userId: userId
         }))
      }

      useEffect(() => {
            if(lastMessage !== null){
               const data = JSON.parse(lastMessage.data);
                  
            if(data.type === "joined"){
                const roomId = data.payload.roomId
                localStorage.setItem("currentRoom", roomId)
                dispatch(setRoomId(roomId));
                // data.payload.roomId , dispatch the room 
                navigate({ to: `/chat/room/${roomId}`})
            }

               if(data.type === 'error'){
                     const errorMessage = data.message
                     toast.error(errorMessage)    
                     localStorage.removeItem("currentRoom")
               }
            }
         },[lastMessage])

  return (
     <>
        <CreateOrJoinRoomModal isJoinRoom={true} isCreateRoom={false} joinChatRoom={joinChatRoom} userId={userId} />
     </>
  )
}

export default JoinRoomPage