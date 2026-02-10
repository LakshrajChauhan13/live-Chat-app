import { useRef, useState } from "react";
import type { messageArrayInterface } from "../App";
import CopyIcons from "../icons/CopyIcon";
import MessageBox, { MessageBox2 } from "./MessageBox";
import TickIcon from "../icons/TickIcon";

interface ChatPropsInterface {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (e: any) => void;
    chatRoomId: string;
    connectionStatus: string;
    messageArray: messageArrayInterface[];
    leaveRoom: () => void;
    userId: string
}

const ChatRoom = ({message, setMessage, sendMessage, chatRoomId, messageArray, connectionStatus, leaveRoom, userId}: ChatPropsInterface ) => {
  const [isCopied, setIsCopied] = useState(false)
  const ref = useRef(0)
  
  function copyToClipBoard(){
    navigator.clipboard.writeText(chatRoomId)
    setIsCopied(true)
    if(ref.current){
      clearTimeout(ref.current)
    }
    ref.current = setTimeout(()=> {
        setIsCopied(false)
    }, 2000)
  }
  
  return (
   <div className="h-170 w-190 shadow-aceternity relative rounded-2xl p-2 flex flex-col gap-1 font-mono items-end overflow-hidden">
    {/* <div className=" bg-red-500 "> */}
           <div className=" w-full  h-10 z-10 font-sans-flex  flex justify-between items-center">
            <div className="flex gap-2 justify-start items-center " >
              <h2 className="tracking-wide flex items-center gap-1 text-xs ">
                ROOM ID: 
                <span className="px-1.5 py-1 rounded-full text-[12px] font-sans-flex bg-neutral-200/50 hover:bg-neutral-200 cursor-default">
                  {chatRoomId}
                </span> 
              </h2>
              <button onClick={copyToClipBoard} className={`flex gap-1 justify-between items-center px-2 py-1 rounded-full hover:bg-neutral-200  
                 duration-150 transition-all group   p-2 ${isCopied? "cursor-not-allowed" : "cursor-pointer active:scale-99 " } `}>
               {isCopied ? <TickIcon /> : <CopyIcons className=" " /> } 
                <h2 className="font-sans-flex text-xs  ">
                  {isCopied ? "Copied" : "Copy ID"}
                </h2> 
              </button>
            </div>
            <button className="px-2 active:scale-95 rounded-full   hover:bg-red-500 bg-red-500/10 text-xs py-1 text-red-500 hover:text-white tracking-wide cursor-pointer transition-all duration-150  "
            onClick={leaveRoom}
            > Leave </button>
            </div>

    {/* </div> */}
          <div className=" h-full w-full  py-2 px-1 overflow-y-auto flex flex-col gap-4 mask z-5 overflow-x-hidden">
           
            {messageArray.map((message, idx) => 
              message.userId == userId ? <MessageBox2 message={message.message} key={idx} userId={"You"}  /> : <MessageBox message={message.message} key={idx} userId={message.userId}/>
            )}
          </div>
          
          <form onSubmit={(e) => sendMessage(e)} className="flex h-15 w-full gap-2 ">
            <input 
              type="text" 
              required
              // ref={inputRef}
              placeholder="Enter message..."
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              className="flex-1 h-full focus:shadow-aceternity inset-shadow-aceternity rounded-lg py-2 px-3
              placeholder:text-neutral-950 outline-none duration-300 transition-all hover:shadow-aceternity " 
              />
            
            <button className="h-full w-[25%] inset-shadow-aceternity rounded-lg hover:shadow-aceternity active:scale-95  cursor-pointer"
            > 
              {/* {isJoined ? "Send" : "Join "}  */}
              Send
            </button>
  
          </form>
        </div>
  )
}

export default ChatRoom