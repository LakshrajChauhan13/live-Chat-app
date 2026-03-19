import getOrGenerateUserId from '@/utils/utils';
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { SendMessage } from 'react-use-websocket'
import useWebSocketRaw, {ReadyState} from 'react-use-websocket'
const useWebSocket = (useWebSocketRaw as any).default || useWebSocketRaw;

interface WebSocketContextInterface{
    sendMessage: SendMessage;
    lastMessage: any;      /* MessageEvent<any> | null */
    readyState: ReadyState;
    connectionStatus: string;
    userId: string;
}

const webSocketContext = createContext<WebSocketContextInterface | null>(null);

const WebSocketContextProvider = ({children} : {children: ReactNode}) => {
        
    const { sendMessage, lastMessage, readyState } = useWebSocket( import.meta.env.VITE_WS_URL || "ws://localhost:3000", {
    shouldReconnect: () => true
    });
    const [userId] = useState(()=> getOrGenerateUserId())


    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState as ReadyState];
    
  return (
    <webSocketContext.Provider value={{sendMessage, lastMessage, readyState, connectionStatus, userId}}>
        {children}
    </webSocketContext.Provider>
  )
}

export default WebSocketContextProvider;

export const useGlobalWebSocket = () => {
        const context = useContext(webSocketContext)
        if(!context){
            throw new Error("useGlobalWebSocket must be used within a WebSocketProvider");
        }
    return context;
}
