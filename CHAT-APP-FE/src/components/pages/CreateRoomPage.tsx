import { useGlobalWebSocket } from "@/ContextApi/WebSocketContextProvider"
import CreateOrJoinRoomModal from "../rooms/CreateOrJoinRoomModal"
import { useEffect } from "react"
import { useAppDispatch } from "@/store/hook"
import { setRoomId } from "@/store/slice/roomIdSlice"
import { useNavigate } from "@tanstack/react-router"


const CreateRoomPage = () => {
    const {sendMessage, lastMessage, userId} = useGlobalWebSocket()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    function createChatRoom(roomId: string){
        sendMessage(JSON.stringify({        // using libraries' sendMessage function to send message instead of the ws.send
            type: "create",
            payload: {
                roomId: roomId
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
                navigate({ to: `/chat/room/${roomId}`})
            }

            if(data.type === 'error'){
                const errorMessage = data.message
                alert(errorMessage)    
                localStorage.removeItem("currentRoom")
            }
        }
    },[lastMessage])
    
  return (
     <>
        <CreateOrJoinRoomModal isCreateRoom={true} isJoinRoom={false} createChatRoom={createChatRoom} userId={userId} />
     </>
  )
}

export default CreateRoomPage