import { cn } from "../lib/utils"
import Vertical_ellipsisIcon from '../icons/Vertical_ellipsisIcon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import type { messageArrayInterface } from "./pages/ChatRoomPage";

interface MessageInterface {
    message: messageArrayInterface;
    key: number;
    userId: string;
    id: string;
    deleteMessage: (messageId: string) => void;
}

const MessageBox = ({message, userId, key, id, deleteMessage}: MessageInterface) => {        //receiver
    function onDelete(){
        deleteMessage(id)
    }

  return (
      <div className=" flex flex-col gap-1.5 shrink-0  w-full ">
        <ChatMessage key={key} message={message} userId={userId} deleteMessage={onDelete} messageId={id}  
        className3="flex" 
        className2={`ml-1 rounded-tr-lg  `} 
        className1="bg-green-500" />
      </div>
  )
}
export default MessageBox


export const MessageBox2 = ({message, userId, key, id, deleteMessage}: MessageInterface) => {        //sender
    function onDelete(){
        deleteMessage(id)
    }

    return (
      <div className=" flex flex-col items-end gap-1.5 shrink-0 w-full  ">
        <ChatMessage key={key} message={message} userId={userId} deleteMessage={onDelete} messageId={id} 
        className3="flex flex-row-reverse" 
        className2={`mr-1 rounded-tl-lg `} 
        className1="bg-amber-500"/>
      </div>
    )
}

const ChatMessage = ({className1, className2, className3, message, userId, deleteMessage}: {
    className1?: string, 
    className2?: string, 
    className3?: string, 
    message: messageArrayInterface, 
    userId: string, 
    deleteMessage: () => void,
    messageId: string
}) => {
    const [isVisible, setIsVisible] = useState(false)
    
    function visible() {
        setIsVisible(c => !c);    
    }

    const isDeleted = message.message === 'This message has been deleted.';
    return (
        <div className="flex flex-col gap-2 group">
            <div className={cn( "flex items-center gap-1 " , className3)}>
                <div className={cn("size-8 bg-red-500 rounded-full", className1)} />
                <span className="text-xs px-1 py-1 rounded-lg shadow-aceternity-dark text-neutral-500"> 
                    {userId}  
                </span>
                <Popover>
                    <PopoverTrigger asChild>
                        <button onClick={visible} className={`group-hover:visible invisible ${isVisible ? 'visible' : ''} cursor-pointer ${isDeleted && 'hidden'}`}>
                            {userId === "You" && <Vertical_ellipsisIcon /> }      
                        </button>
                    </PopoverTrigger>
                    <PopoverContent onClick={deleteMessage} align="end" className="w-20 h-10">
                        Delete
                    </PopoverContent>
                </Popover>
            </div>
            <div className={cn(" min-h-8 max-h-full max-w-120 wrap-break-word mr-1 text-base font-mono inset-shadow-aceternity-dark shadow-aceternity-dark p-2 bg-amber-950/90 text-neutral-50 rounded-b-lg",
                `${message.type === 'deleted' ? "italic bg-neutral-700 opacity-50" : 'bg-neutral-950'}`,
                className2)}>
                {message.message}
            </div>
        </div>
    )
}   