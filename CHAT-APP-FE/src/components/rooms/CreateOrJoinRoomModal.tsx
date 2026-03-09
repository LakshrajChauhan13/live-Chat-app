import { useRef, useState } from "react";
import ProjectTitle from "../brandName/ProjectTitle"
import { Link } from "@tanstack/react-router";

interface CreateOrJoinRoomPropsInterface{
    joinChatRoom: ((roomId: string) => void) ;
    isLoading?: boolean;
    createChatRoom: ((roomId: string) => void) ;
    isJoinRoom?: boolean;
    isCreateRoom? : boolean;
    userId: string
}

// {join}: {join: boolean}
const CreateOrJoinRoomModal = ({isJoinRoom, isCreateRoom, joinChatRoom, isLoading, createChatRoom, userId}: CreateOrJoinRoomPropsInterface) => {
        const[roomId, setRoomId] = useState<string>('')
        const checkValueRef = useRef<HTMLInputElement>(null)
        
        const generateRoomId = () => {
            const timestamp = Date.now().toString(36).substring(2); 
            const randomPart = Math.random().toString(36).substring(2, 8);
            const secondRandomPart = Math.random().toString(36).substring(2,8)
            return(`${timestamp}-${randomPart}-${secondRandomPart}`)
        }

        
        function handleCreateRoomId() {
            const randomRoomId = generateRoomId()
            console.log(randomRoomId)
            createChatRoom(randomRoomId)
        }
        
        function handleJoinRoomId(e: any){
            e.preventDefault()
            console.log(roomId)
            joinChatRoom(roomId)
        }
        
  return (
    <div className="bg-bg font-sans-flex">
        <div className="max-w-6xl mx-auto h-screen text-white flex flex-col gap-5 justify-center items-center ">

            <div className="flex flex-col gap-1 items-center w-70">
                <Link to={'/'} >
                    <ProjectTitle className="text-4xl  hover:cursor-pointer hover:transition-all hover:duration-500 hover:bg-linear-to-t hover:from-pink-400 hover:via-pink-400 hover:to-pink-300" />
                </Link>
                <h2 className="text-xs text-center font-light w-full tracking-widest text-neutral-400">
                    Maintain your privacy with Flamingo.
                </h2>
            </div>

            <div className="min-h-70 w-120 border-neutral-600/30 transition-all duration-100  border-2 flex flex-col gap-5 rounded-4xl px-5 py-5 bg-neutral-900 ">
                <div className="flex-col flex gap-1">
                    <h1 className="text-xl text-neutral-300">
                        {isJoinRoom && "Join Room"}
                        {isCreateRoom && "Create Room"}
                    </h1>
                    <h2 className="text-sm text-neutral-500 ">
                        {isJoinRoom && "Join the chat room start your private conversation. You'll be joining with the below mentioned random Id."}
                        {isCreateRoom && "Just create the chat room to start your private conversation. You'll be joining with the below mentioned random Id ."}
                    </h2>
                </div>

                {/* <SaveInput /> */}
                    <div className="h-16 w-full px-3 py-5 text-shadow-2xs text-shadow-black bg-neutral-500/10 rounded-lg  text-neutral-100/50 tracking-wider flex gap-2 justify-start items-center ">
                        <span className="size-9 bg-amber-500 rounded-full "> </span>
                        <span className="text-sm">
                            {userId}
                        </span>
                    </div>

                {isJoinRoom && 
                <form onSubmit={(e:any) => handleJoinRoomId(e)} className="w-full flex flex-col gap-2 transition-all duration-200 ">
                    <input 
                        type="text" 
                        placeholder="Enter room code..."
                        value={roomId}
                        ref={checkValueRef}
                        required
                        onChange={(e) => setRoomId(e.target.value)}
                        className="h-14 outline-none focus:inset-shadow-aceternity/40 bg-neutral-500/10 rounded-lg text-neutral-400 transition-all duration-200 hover:inset-shadow-aceternity 
                        w-full shadow-aceternity placeholder:text-neutral-600 hover:placeholder:text-neutral-500 p-3" 
                    />
                    <button 
                        disabled={checkValueRef.current?.value === ''} 
                        className="w-full h-14 disabled:text-neutral-600 disabled:cursor-not-allowed disabled:active:scale-none
                        text-neutral-200 shadow-aceternity hover:inset-shadow-aceternity transition-all duration-200  bg-neutral-500/10 cursor-pointer active:scale-99 
                        rounded-full"
                    >
                        {isLoading? "joining" : "Join Room"}
                    </button>
                </form>}

                {isCreateRoom && 
                    <button onClick={handleCreateRoomId} className="w-full h-14 text-neutral-200 shadow-aceternity hover:inset-shadow-aceternity transition-all duration-200  bg-neutral-500/10 cursor-pointer active:scale-99 
                        rounded-full">
                        {isLoading? "Creating" : "Create Room"}
                    </button>}

                <h6 className="text-xs font- text-neutral-500 w-full text-center ">
                    Note: Room will be vanished after all users left.
                </h6>
                
            </div>            
        </div>
    </div>
  )
}

export default CreateOrJoinRoomModal