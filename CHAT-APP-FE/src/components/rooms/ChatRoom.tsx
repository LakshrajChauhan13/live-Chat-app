import { useEffect, useRef, useState } from "react";
import CopyIcons from "../../icons/CopyIcon";
import MessageBox, { MessageBox2 } from "../MessageBox";
import TickIcon from "../../icons/TickIcon";
import type { messageArrayInterface } from "../pages/ChatRoomPage";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface ChatPropsInterface {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (e: any) => void;
    chatRoomId: string | string;
    connectionStatus: string;
    messageArray: messageArrayInterface[];
    setMessageArray: React.Dispatch<React.SetStateAction<messageArrayInterface[]>>;
    leaveRoom: () => void;
    userId: string;
    DeleteMessage: (messageId: string) => void;
    userCount: number
}

const ChatRoom = ({ message, setMessage, sendMessage, chatRoomId, messageArray, leaveRoom, userId, DeleteMessage, userCount }: ChatPropsInterface) => {
  const [isCopied, setIsCopied] = useState(false)
  const copyRef = useRef(0)
  const checkValueRef = useRef<HTMLInputElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  function copyToClipBoard() {
    navigator.clipboard.writeText(chatRoomId)
    setIsCopied(true)
    if (copyRef.current) clearTimeout(copyRef.current)
    copyRef.current = setTimeout(() => setIsCopied(false), 2000)
  }

  function scrollToBottom() {
    if (!chatContainerRef.current || messageArray.length === 0) return;
    const container = chatContainerRef.current;
    const lastMsg = messageArray[messageArray.length - 1]
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (isNearBottom || lastMsg.userId === userId) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => { scrollToBottom() }, [messageArray])

  return (
    <>
      <nav className="h-14 sm:h-17 shrink-0 min-h-14 w-full bg-neutral-950/90 text-white px-3 sm:px-10 flex items-center justify-between font-sans-flex border-b border-neutral-500 gap-2">

        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <h2 className="tracking-wide items-center gap-1 sm:text-xs text-[8px]  sm:flex shrink-0">
            ROOM ID:
          </h2>
          <span className="px-2 sm:px-3.5 py-1.5 sm:py-2 border-2 border-neutral-200/50 rounded-full text-[10px] sm:text-[14px] font-thin font-sans-flex bg-neutral-800 cursor-default max-w-[110px] sm:max-w-none truncate">
            {chatRoomId}
          </span>
          <button
            onClick={copyToClipBoard}
            className={`flex gap-1 items-center rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-neutral-800 duration-150 transition-all shrink-0
              ${isCopied ? "cursor-not-allowed" : "cursor-pointer active:scale-99"}`}
          >
            {isCopied ? <TickIcon /> : <CopyIcons className="sm:size-3.5  size-3" />}
            <span className="font-sans-flex text-xs sm:text-sm hidden sm:inline">
              {isCopied ? "Copied!!" : "Copy ID"}
            </span>
          </button>
        </div>

        <div className="flex gap-1 sm:gap-2 items-center shrink-0">
          <div className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] text-neutral-200/50 text-xs sm:text-sm rounded-full bg-neutral-800">
            {userCount}/2
            <span className="hidden sm:inline"> Users</span>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm active:scale-95 rounded-full hover:bg-red-500 bg-red-500/10 text-red-500 hover:text-white tracking-wide cursor-pointer transition-all duration-150">
                Leave
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-sans-flex bg-neutral-900 rounded-4xl border-none text-white w-[90%] sm:w-auto">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl text-neutral-200">Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm tracking-tight">
                  This action cannot be undone. You will be removed from the chat room,
                  and if you are the last person, the room and all messages will be
                  <span className="text-red-400"> vanished </span> forever.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-neutral-800 py-5 hover:bg-neutral-700 text-white hover:text-white border-neutral-700">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500/10 hover:bg-red-500 py-5 font-bold text-sm text-red-500 hover:text-white rounded-full"
                  onClick={leaveRoom}
                >
                  Leave Room
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </nav>

      <div className="flex-1 w-full selection:bg-white/30 max-w-4xl mx-auto relative rounded-2xl p-2 bg-bg py-4 flex flex-col gap-1 font-mono items-end overflow-hidden">

        <div ref={chatContainerRef} className="relative text-white h-full w-full no-scrollbar py-2 pt-4 px-1 overflow-y-auto flex flex-col items-center gap-4 mask-t-from-97% mask-b-from-95% z-5 overflow-x-hidden">
          {messageArray.length < 1 ?
            <span className="absolute text-neutral-400 opacity-70 flex-col flex gap-2 top-1/2 -translate-y-1/2 text-center font-sans-flex left-1/2 -translate-x-1/2 w-[80%]">
              <h1 className="text-xl sm:text-2xl tracking-wider italic">No messages yet!</h1>
              <h6 className="text-xs sm:text-sm tracking-widest font-thin">
                Start your conversation right away by sending the message below.
              </h6>
            </span>
            :
            messageArray.map((message, idx) => {
              if (message.type === 'system') {
                return (
                  <div key={idx} className="w-full text-xs sm:text-sm bg-neutral-600/50 italic text-neutral-100 text-center font-sans-flex font-thin tracking-wider mask-r-from-20% mask-l-from-20%">
                    {message.userId === userId ? 'You joined the chat!!' : message.message}
                  </div>
                )
              }
              return message.userId === userId
                ? <MessageBox2 message={message} id={message.id} key={idx} userId={"You"} deleteMessage={DeleteMessage} />
                : <MessageBox message={message} id={message.id} key={idx} userId={message.userId} deleteMessage={DeleteMessage} />
            })
          }
          <div ref={messageEndRef} />
        </div>

        <form onSubmit={(e) => sendMessage(e)} className="flex h-14 sm:h-18 text-base bg-neutral-500/50 w-full mx-auto gap-2 shadow-aceternity-dark p-1 rounded-full">
          <input
            type="text"
            required
            ref={checkValueRef}
            placeholder="Enter message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 h-full rounded-full py-2 px-3 pl-4 sm:pl-5 text-sm sm:text-base placeholder:text-neutral-500/50 hover:placeholder:text-neutral-500 text-neutral-300 outline-none duration-300 transition-all"
          />
          <button
            disabled={checkValueRef.current?.value.trim() === ''}
            className="h-full w-[22%] sm:w-[20%] disabled:bg-accent/40 text-neutral-800 bg-accent/85 disabled:cursor-not-allowed transition-all duration-100 text-sm sm:text-lg font-sans-flex inset-shadow-aceternity-dark rounded-full hover:shadow-aceternity-dark active:scale-95 disabled:active:scale-100 cursor-pointer"
          >
            Send
          </button>
        </form>

      </div>
    </>
  )
}

export default ChatRoom