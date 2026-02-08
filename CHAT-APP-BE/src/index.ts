import express from 'express'
import { WebSocketServer, WebSocket } from "ws"
import http from "http"

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

interface RoomData {
    messages : { type: string; message: string}[];
    users: Set <WebSocket>
}

const rooms = new Map<string, RoomData>()

wss.on("connection", (socket) => {
    let currentRoomId: string | null = null;
    
    socket.on("message", (message) => {
    try{
        const data = JSON.parse(message.toString())
        console.log(data)

        if(data.type === "create"){
            const roomId = data.payload.roomId 
            if(!rooms.has(roomId)){
                rooms.set(roomId, { messages: [] , users: new Set()})
                console.log('room created')
            }
                
            handleJoin(socket, roomId)
            currentRoomId = roomId
        }

        if(data.type === "join"){
            const roomId = data.payload.roomId;
            if(!rooms.has(roomId)){
                socket.send(JSON.stringify({
                    type: "error",
                    message: "Room doesn't exist, check the code"
                }))
            }
            
            handleJoin(socket, roomId)
            currentRoomId = roomId
        }
        
        
        if(data.type === "chat"){
            if(currentRoomId && rooms.has(currentRoomId)){
                const room = rooms.get(currentRoomId)
                
                const msgObj = {
                    type: "received",
                    message: data.payload.message
                } 
                
                room?.messages.push(msgObj)
                
                room?.users.forEach(client => { 
                    if(client !== socket && client.readyState === WebSocket.OPEN){
                        client.send(JSON.stringify(msgObj))
                    }})
                    
                }
            }
    }
    catch(e){
        console.error("Error " , e)
    }    

})  

socket.on("close", () => {
        if(currentRoomId && rooms.has(currentRoomId)){
            const room = rooms.get(currentRoomId)
            room?.users.delete(socket)
// @ts-ignore
            if(room?.users.size < 1){
                rooms.delete(currentRoomId)
            }
        }
    })
})

function handleJoin(socket: WebSocket, roomId: string) {
    const room = rooms.get(roomId);
    room?.users.add(socket)

    socket.send(JSON.stringify({
        type: "joined",
        payload: {
            roomId: roomId
        }
    }))
    // @ts-ignore
    if(room?.messages.length > 0){
        socket.send(JSON.stringify({
            type: "history",
            payload: room?.messages
        }))
    }
}
// 'joined', 'history', 'error', 'received'

//  {
//     type: "join",
//     payload: {
//         roomId: "red"
//     }
//  },
//  {
//     type: "chat", 
//     payload: {
//         message: "hello"
//     }
//  }

server.listen(3000, () => {
    console.log("server running on the port 3000")
})