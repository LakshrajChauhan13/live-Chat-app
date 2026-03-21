import { cn } from "../lib/utils"
import Vertical_ellipsisIcon from '../icons/Vertical_ellipsisIcon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { messageArrayInterface } from "./pages/ChatRoomPage";
import { toast } from "sonner";

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
      <div className=" flex flex-col items-start gap-1.5 shrink-0  w-full ">
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
    // const [isVisible, setIsVisible] = useState(false)
    
    // function visible() {
    //     setIsVisible(c => !c);    
    // }

    function copyToClipBoard(){
        navigator.clipboard.writeText(message.message);
        toast.success('Copied to clipboard')
    }

    const isDeleted = message.type === 'deleted';
    const isSender = userId === 'You';
    
    return (
        <div className={cn("flex flex-col gap-1 group max-w-[80%]", isSender ? "items-end" : "items-start")} >

            {/* Header / Avatar Row */}
            <div className={cn("flex items-center gap-1", className3)}>
                <div className={cn("size-8 shrink-0 rounded-full", className1)} />
                <span className="text-xs px-1.5 py-1 rounded-lg shadow-aceternity-dark text-neutral-500 whitespace-nowrap"> 
                    {userId}  
                </span>
                
                {/* Popover */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button className={`cursor-pointer ${isDeleted && 'hidden'}`}>
                            {isSender && <Vertical_ellipsisIcon /> }      
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-auto h-10 ">
                        <span className="flex gap-2 items-center justify-center font-sans-flex">
                            <button onClick={deleteMessage} className="active:text-red-700 text-sm hover:underline transition-all underline-offset-3 cursor-pointer">Delete</button>
                            <h3 className="text-neutral-500/50 cursor-default text-xl"> | </h3>
                            <button onClick={copyToClipBoard} className="active:text-neutral-400 font-thin text-sm  hover:underline transition-all text-neutral-200 underline-offset-3 cursor-pointer"> Copy </button>
                        </span>
                    </PopoverContent>
                </Popover>
            </div>

            <div className={cn("flex w-full", isSender ? "justify-end pr-9" : "justify-start pl-9")}>
                <div className={cn(
                    "inline-block w-fit max-w-full break-words text-base font-mono inset-shadow-aceternity-dark shadow-aceternity-dark px-3 py-2 text-neutral-50 rounded-b-xl",
                    isDeleted ? "italic bg-neutral-700 opacity-50" : "bg-neutral-900",
                    className2
                )}>
                    {message.message}
                </div>
            </div>
        </div>
    )
}