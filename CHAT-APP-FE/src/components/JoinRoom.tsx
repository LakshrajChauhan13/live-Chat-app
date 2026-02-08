import { useState } from "react";

interface JoinRoomPropsInterface{
    joinChatRoom: (roomId: string) => void;
    isLoading: boolean;
    createChatRoom: (roomId: string) => void
}

const JoinRoom = ({joinChatRoom, isLoading, createChatRoom}: JoinRoomPropsInterface) => {
    const[roomId, setRoomId] = useState<string>('')

const generateRoomId = () => {
    const timestamp = Date.now().toString(36).substring(4); 
    const randomPart = Math.random().toString(36).substring(2, 6);
    return(`${timestamp}-${randomPart}`)
}

    function handleCreateRoomId() {
        // e.preventDefault()
        const RandomRoomId = generateRoomId()
        console.log(RandomRoomId)
        createChatRoom(RandomRoomId)
    }

    function handleJoinRoomId(e: any){
        e.preventDefault()
        console.log(roomId)
        joinChatRoom(roomId)
    }

    
  return (
    <div className="max-w-6xl mx-auto h-screen  w-full flex flex-col items-center ">
        <h1 className="text-7xl font-bold font-sans-flex tracking-tight py-3  bg-clip-text text-transparent 
            bg-linear-to-r from-black via-yellow-900 to-black ">
            Join the private room
        </h1>

        <div className="h-80 w-150 shadow-aceternity my-20  rounded-2xl font-mono">
            <h2 className="text-black font-semibold font-mono tracking-tighter text-2xl px-4 pt-5 ">
                Real time secure chats
            </h2>
            <div className="flex flex-col items-center mx-auto max-w-137.5 my-5">
                <button onClick={handleCreateRoomId} className="h-14 w-full  active:scale-98 transition-all duration-200
                text-neutral-950 font-mono shadow-aceternity hover:rounded-lg  hover:inset-shadow-aceternity cursor-pointer ">
                   {isLoading? "Creating..." : "Create the room"} 
                </button>

                <h1 className="flex tracking-tight justify-center text-xl text-neutral-950/30 my-3">
                        OR
                </h1>

                {/* <button className="h-14 w-full text-2xl font-semibold active:scale-98 hover:translate-y-0.5 transition-all duration-200
                text-neutral-950 font-mono tracking-tighter shadow-aceternity mx-auto max-w-137.5 rounded-2xl hover:inset-shadow-aceternity cursor-pointer ">
                    Join the room
                </button> */}

                <form onSubmit={(e:any) => handleJoinRoomId(e)} className="w-full h-14  flex gap-1 transition-all duration-200 ">
                    <input 
                    type="text" 
                    placeholder="Enter room code..."
                    value={roomId}
                    required
                    onChange={(e) => setRoomId(e.target.value)}
                    className="h-full outline-none focus:inset-shadow-aceternity/40 hover:rounded-lg focus:rounded-lg transition-all duration-200 hover:inset-shadow-aceternity 
                    flex-1 shadow-aceternity placeholder:text-neutral-900 p-3" 
                    />
                    <button
                    className="w-[25%] h-full  shadow-aceternity hover:rounded transition-all 
                    duration-200 hover:inset-shadow-aceternity active:scale-85"> {isLoading? "joining" : "Join"} </button>
                </form>

                <h3 className="bg-neutral-100/50 mt-5 text-neutral-950/50">
                    Temporary chat rooms for private conversation.
                </h3>
                
            </div>
                

        </div>
    </div>
  )
}

export default JoinRoom