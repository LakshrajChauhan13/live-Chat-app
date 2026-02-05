import type { messageArrayInterface } from "../App1";
import MessageBox, { MessageBox2 } from "./MessageBox";

interface ChatPropsInterface {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (e: any) => void;
    chatRoomId: string;
    messageArray: messageArrayInterface[]
}

const ChatRoom = ({message, setMessage, sendMessage, chatRoomId, messageArray}: ChatPropsInterface ) => {
  return (
   <div className="h-170  w-190 shadow-aceternity relative rounded-2xl p-2 flex flex-col gap-1 font-mono items-end overflow-hidden">
           <h1 className=" w-full  h-10 z-10 ">
              RoomId-{chatRoomId}
            </h1>

          <div className=" h-full w-full  py-2 px-1 overflow-y-auto flex flex-col gap-2 mask z-5 overflow-x-hidden">
           
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
              className="flex-1  h-full  inset-shadow-aceternity rounded-lg p-2 placeholder:text-neutral-950 outline-none focus:ring-2 focus:ring-offset-2 ring-white" 
              />
            
            <button className="h-full w-[25%] inset-shadow-aceternity rounded-lg active:scale-95 cursor-pointer"
            > 
              {/* {isJoined ? "Send" : "Join "}  */}
              Send
            </button>
  
          </form>
        </div>
  )
}

export default ChatRoom