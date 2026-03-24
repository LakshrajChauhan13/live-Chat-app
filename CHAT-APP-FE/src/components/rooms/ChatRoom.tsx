import { useEffect, useRef, useState } from "react";
import CopyIcons from "../../icons/CopyIcon";
import MessageBox, { MessageBox2 } from "../MessageBox";
import TickIcon from "../../icons/TickIcon";
import type { messageArrayInterface } from "../pages/ChatRoomPage";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import SendIcon from "@/icons/SendIcon";

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
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const copyRef = useRef(0)
  const checkValueRef = useRef<HTMLTextAreaElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  function copyToClipBoard() {
    navigator.clipboard.writeText(chatRoomId)
    setIsCopied(true)
    if (copyRef.current) clearTimeout(copyRef.current)
    copyRef.current = setTimeout(() => setIsCopied(false), 2000)
  }

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    // If the user is more than 150px away from the bottom, they are "scrolled up"
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
    
    setIsScrolledUp(!isNearBottom);

    // If they scroll back to the bottom manually, reset unread counts
    if (isNearBottom) {
      setUnreadCount(0);
      if (!document.hidden) {
        document.title = "Vaulrizz - Anonymous Chat"; // Reset title
      }
    }
  };

  useEffect(() => {
    if (!chatContainerRef.current || messageArray.length === 0) return;
    
    const container = chatContainerRef.current;
    const lastMsg = messageArray[messageArray.length - 1];
    
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

    // Condition 1: User sent the message OR they are already at the bottom
    if (isNearBottom || lastMsg.userId === userId) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setUnreadCount(0);
    } 
    // Condition 2: Someone else sent a message AND user is scrolled up
    else {
      setUnreadCount(prev => prev + 1);
    }

    // Condition 3: Tab is backgrounded/inactive
    if (document.hidden && lastMsg.userId !== userId) {
      setUnreadCount(prev => {
        const newCount = prev + 1;
        document.title = `(${newCount}) New Message - Vaulrizz`;
        return newCount;
      });
    }
  }, [messageArray]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        document.title = "Vaulrizz - Anonymous Chat";
        // If they are at the bottom when they return, clear the badge
        if (!isScrolledUp) setUnreadCount(0); 
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isScrolledUp]);

  const forceScrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setUnreadCount(0);
    setIsScrolledUp(false);
  };

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

  useEffect(() => {
    const textarea = checkValueRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to recalculate
      if (message === '') {
        textarea.style.height = 'auto'; // Go back to default when empty
      } else {
        // Expand to fit content (up to max-height defined in Tailwind classes)
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default new line
      if (message.trim() !== '') {
        sendMessage(e);
      }
    }
  };

  return (
    <>
      <nav className="h-14 sm:h-17 shrink-0 min-h-14 w-full bg-neutral-950/90 text-white px-3 sm:px-10 flex items-center justify-between font-sans-flex border-b border-neutral-500 gap-2">

        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <h2 className="tracking-wide items-center gap-1 sm:text-xs text-[8px]  sm:flex shrink-0">
            ROOM ID:
          </h2>
          <span className="px-2 sm:px-3.5 py-1.5 sm:py-2 border-2 border-neutral-200/50 rounded-full text-[10px] sm:text-[14px] font-thin font-sans-flex bg-neutral-800 cursor-default max-w-27.5 sm:max-w-none truncate">
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

        <div ref={chatContainerRef} onScroll={handleScroll} className="relative text-white h-full w-full no-scrollbar py-2 pt-4 px-1 overflow-y-auto flex flex-col items-center gap-4 mask-t-from-97% mask-b-from-95% z-5 overflow-x-hidden">
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
                  <div key={idx} className="sm:w-full w-[90%] text-[10px] sm:text-sm bg-neutral-600/50 italic text-neutral-100 text-center font-sans-flex font-thin tracking-wider mask-x-from-20% sm:mask-x-from-20% ">
                    {message.userId === userId ? `You (${message.userId}) joined the chat!!` : message.message}
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

        {isScrolledUp && (
          <button 
            onClick={forceScrollToBottom}
            className="absolute bottom-24 right-1/2 translate-x-1/2 z-50 flex items-center gap-2 bg-neutral-800/90 backdrop-blur-sm border border-neutral-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-700 active:scale-95 transition-all text-[11px] sm:text-sm font-sans-flex"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            {unreadCount > 0 ? `${unreadCount} New Message${unreadCount > 1 ? 's' : ''}` : 'Scroll to bottom'}
          </button>
        )}

        <form 
          onSubmit={(e) => sendMessage(e)} 
          // 1. Changed rounded-full to rounded-[28px] so it looks like a pill when short, but a clean rounded box when tall
          className="flex items-end min-h-14 sm:min-h-[72px]  w-full mx-auto gap-2  p-1 rounded-full shrink-0"
        >
          <textarea
            required
            ref={checkValueRef}
            placeholder="Enter message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="flex-1 max-h-32 hover:shadow-aceternity-dark inset-shadow-aceternity-dark sm:max-h-40 sm:rounded-[32px] rounded-[24px] bg-transparent resize-none overflow-y-auto no-scrollbar outline-none py-3.5 sm:py-5 px-4 sm:px-5 text-sm sm:text-lg placeholder:text-neutral-500/50  hover:placeholder:text-neutral-500 duration-150 text-neutral-300 transition-all"
          />
          <button
            disabled={message.trim() === ''}
            className="h-12 sm:h-16 shrink-0  flex justify-center items-center sm:p-4 p-3.5 disabled:bg-bg text-neutral-800 bg-emerald-600 disabled:cursor-not-allowed transition-all duration-100 text-sm sm:text-lg font-sans-flex inset-shadow-aceternity-dark rounded-full hover:shadow-aceternity-dark active:scale-95 disabled:active:scale-100 cursor-pointer"
          >
            <SendIcon className="sm:size-8 stroke-white  size-5" />
          </button>
        </form>

      </div>
    </>
  )
}

export default ChatRoom