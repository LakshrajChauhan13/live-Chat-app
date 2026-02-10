import { cn } from "../lib/utils"

interface MessageInterface {
    message: string;
    key: number;
    userId: string
}

const MessageBox = ({message,userId, key}: MessageInterface) => {        //receiver
  return (
      <div className=" flex flex-col gap-1.5 shrink-0  w-full ">
        <ChatMessage key={key} message={message} userId={userId} className3="flex" className2="ml-1 rounded-tr-lg bg-neutral-950" className1="bg-green-500" />
          {/* <div className="size-8 bg-yellow-500 rounded-full" />
          <div className="w-[40%] min-h-8 max-h-full ml-1 text-sm p-1 pl-2 bg-neutral-950 text-white  rounded-b-lg ">
            {message}
          </div> */}
      </div>
  )
}
export default MessageBox


export const MessageBox2 = ({message,userId, key}: MessageInterface) => {        //sender
    return (
      <div className=" flex flex-col items-end gap-1.5 shrink-0  w-full">
         <ChatMessage key={key} message={message} userId={userId} className3=" flex flex-row-reverse" className2="mr-1 rounded-tl-lg bg-neutral-950 " />
      </div>
    )
}

const ChatMessage = ({className1, className2, className3, message, userId}: {className1?: string, message: string, className3?: string, className2?: string, userId: string}) => {
    return (
        <>
            <div className={cn( "flex items-center gap-1", className3)}>
                <div className={cn("size-8 bg-amber-500 rounded-full", className1)} />
                <span className="text-xs px-1 py-1 rounded-lg shadow-aceternity"> {userId}  </span>
            </div>
            <div className={cn(" min-h-8 max-h-full max-w-100  wrap-break-word mr-1 text-sm p-1 pl-2 bg-amber-950/90 text-neutral-50  rounded-b-lg", className2)}>
                {message}
            </div>
        </>
    )
}   