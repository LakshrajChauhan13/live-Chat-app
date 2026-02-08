import { useRef, useState } from "react";
import type { messageArrayInterface } from "../App1";
import CopyIcons from "../icons/CopyIcon";
import MessageBox, { MessageBox2 } from "./MessageBox";

interface ChatPropsInterface {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (e: any) => void;
    chatRoomId: string;
    connectionStatus: string;
    messageArray: messageArrayInterface[]
}

const ChatRoom = ({message, setMessage, sendMessage, chatRoomId, messageArray, connectionStatus}: ChatPropsInterface ) => {
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
   <div className="h-170  w-190 shadow-aceternity relative rounded-2xl p-2 flex flex-col gap-1 font-mono items-end overflow-hidden">
    {/* <div className=" bg-red-500 "> */}
           <div className=" w-full  h-10 z-10 font-sans-flex  flex justify-between items-center">
            <div className="flex gap-2 justify-start items-center " >

              <h2 className="tracking-wide flex items-center gap-1 ">
                RoomId: {" "}<span className="px-1.5 py-0.5 rounded-full text-[12px] font-sans-flex bg-neutral-200/50 hover:bg-neutral-200 cursor-default">
                {" "} {chatRoomId}</span> 
              </h2>
              <button onClick={copyToClipBoard} className={`flex gap-1 justify-between items-center 
                 duration-300 transition-all group  p-2 ${isCopied? "cursor-not-allowed" : "cursor-pointer hover:scale-110 active:scale-99 " } `}>
               {isCopied ? "" : <CopyIcons className=" " /> } 
                <h2 className="font-sans-flex text-sm ">
                  {isCopied ? "Copied" : "Copy"}
                </h2> 
              </button>
            </div>
            {/* <span > Status: {connectionStatus} </span> */}
            </div>

    {/* </div> */}
          <div className=" h-full w-full  py-2 px-1 overflow-y-auto flex flex-col gap-4 mask z-5 overflow-x-hidden">
           
            {messageArray.map((message) => 
              message.type == "sent" ? <MessageBox2 message={message.message} /> : <MessageBox message={message.message}/>
            )}
          </div>
          
          <form onSubmit={(e) => sendMessage(e)} className="flex h-15 w-full gap-1 ">
            <input 
              type="text" 
              required
              // ref={inputRef}
              placeholder="Enter message..."
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              className="flex-1 h-full focus:shadow-aceternity inset-shadow-aceternity rounded-lg p-2 
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