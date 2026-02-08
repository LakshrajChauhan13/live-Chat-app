import { cn } from "../lib/utils"

interface message {
    message: string
}

const MessageBox = ({message}: message) => {        //receiver
  return (
      <div className=" flex flex-col gap-1.5 shrink-0  w-full ">
        <ChatMessage message={message} className2="ml-1 rounded-tr-lg" className1="bg-green-500" />
          {/* <div className="size-8 bg-yellow-500 rounded-full" />
          <div className="w-[40%] min-h-8 max-h-full ml-1 text-sm p-1 pl-2 bg-neutral-950 text-white  rounded-b-lg ">
            {message}
          </div> */}
      </div>
  )
}
export default MessageBox


export const MessageBox2 = ({message}: message) => {        //sender
    return (
      <div className=" flex flex-col items-end gap-1.5 shrink-0  w-full">
         <ChatMessage message={message} className2="mr-1 rounded-tl-lg" />
      </div>
    )
}

const ChatMessage = ({className1, className2, message}: {className1?: string, message: string,  className2?: string}) => {
    return (
        <>
            <div className={cn("size-8 bg-amber-500 rounded-full", className1)} />
            <div className={cn(" min-h-8 max-h-full max-w-100  break-all mr-1 text-sm p-1 pl-2 bg-neutral-950 text-white rounded-b-lg", className2)}>
                {message}
            </div>
        </>
    )
}