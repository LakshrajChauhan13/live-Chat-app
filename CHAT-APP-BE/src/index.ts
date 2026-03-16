import 'dotenv/config'
import express from 'express'
import { WebSocketServer, WebSocket } from "ws"
import http from "http"
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5174'
}))

interface RoomData {
    messages : {
        type: string; 
        message: string, 
        userId: string, 
        id: string
    }[];
    users: Set <WebSocket>          // using set instead of an [], coz SET always carries the unique values. as all websocket/user are unique.
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
            const userId = data.userId
            console.log(roomId)
            if(!rooms.has(roomId)){
                rooms.set(roomId, { messages: [] , users: new Set()})
                console.log('room created')
            }
                
            handleJoin(socket, roomId, userId)
            currentRoomId = roomId
        }

        if(data.type === "join"){
            const roomId = data.payload.roomId;
            const userId =  data.userId
                if(!rooms.has(roomId)){
                    socket.send(JSON.stringify({
                        type: "error",
                        message: "Room doesn't exist, check the code"
                    }))

                    return
                }
                handleJoin(socket, roomId, userId )
                currentRoomId = roomId
        }
        
        if(data.type === "chat"){
            if(currentRoomId && rooms.has(currentRoomId)){
                const room = rooms.get(currentRoomId)
                
                const msgObj = {
                    type: "received",
                    message: data.payload.message,
                    userId: data.userId,
                    id: data.payload.id
                } 
                
                room?.messages.push(msgObj)
                
                room?.users.forEach(client => { 
                    if(client !== socket && client.readyState === WebSocket.OPEN){
                        client.send(JSON.stringify(msgObj))
                    }})
                }
            }

        if(data.type === "delete"){                 //delete the message
            if(currentRoomId && rooms.has(currentRoomId)){
                const room = rooms.get(currentRoomId);
                const messageId = data.payload.id
                const message = data.payload.message;
                const userId = data.userId

                const deletedMsg = {
                    type: 'deleted',
                    message: message, 
                    userId: userId, 
                    id: messageId
                } 
                
                if(room){
                    room.messages = room?.messages.map(msg => msg.id === messageId ? 
                        msg = deletedMsg : msg )
                }

                room?.users.forEach(client => {
                    if(client.readyState === WebSocket.OPEN){
                        client.send(JSON.stringify({
                            type: "deleted",
                            payload: room?.messages
                        }))
                    }
                })
            }}

        if(data.type === "leave"){
            const userId = data.userId
            if(currentRoomId && rooms.has(currentRoomId) && data.payload.roomId === currentRoomId){
                const room = rooms.get(currentRoomId);
                room?.users.delete(socket);

                const systemObj = {
                    type: 'system',
                    message: `${userId} has left the chat!`,
                    userId: userId,
                    id: Math.random().toString(36).substring(2, 9),
                    roomUserCount: room?.users.size
                }
                room?.messages.push(systemObj)

                room?.users.forEach((client) => {           // sending message to everyone in the room that this user has left the room !
                  if(client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify(systemObj))
                }
    })
// @ts-ignore
                if(room?.users.size < 1){
                    rooms.delete(currentRoomId)
                }
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
        }
    })
})

function handleJoin(socket: WebSocket, roomId: string, userId: string ){
    const room = rooms.get(roomId);
    const isAlreadyInRoom = room?.users.has(socket);

    if(!room) return;
    
    if(!isAlreadyInRoom){
        if(room?.users.size < 2){
            room?.users.add(socket)
        }
        else{
            socket.send(JSON.stringify({
                type: 'error',
                payload : {
                    roomId: roomId,
                },
                message: 'Room is full ( Max 2 allowed )'
            }))
            return;
        }
    }
    
    socket.send(JSON.stringify({
        type: "joined",
        payload: {
            roomId: roomId
        },
        roomUserCount: room?.users.size
    }))
    
    if(!isAlreadyInRoom){               // if socket already in the room , no need to send again if already done once. 
        const systemObj = {
            type: 'system',
            message: `${userId} has joined!`,
            userId: userId,
            id: Math.random().toString(36).substring(2, 9),
            roomUserCount : room?.users.size
        }

        room?.messages.push(systemObj)
        
        room?.users.forEach((client) => {           // sending message to everyone in the room that this user has joined the room !
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify(systemObj))
            }
        })
    }
    // @ts-ignore
    if(room?.messages.length > 0){
        socket.send(JSON.stringify({
            type: "history",
            payload: room?.messages
        }))
    }
}

app.get('/chat/room/:roomId/check', (req, res) => {     // check room exists before joining
    const roomId = req.params.roomId;
    console.log(roomId.toString())
    console.log(` check - ${rooms.has(roomId)}`)
    if(rooms.has(roomId)){
        res.json({
            exists: true,
            message: 'room exists'
        })
    }
    else{
        res.json({
            exists: false,
            message: "room doesn't exists"
        })
    }
})


server.listen(process.env.PORT || 3000, () => {
    console.log(`server running on the port ${process.env.PORT || 3000} ` )
})