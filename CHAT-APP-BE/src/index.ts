import { WebSocketServer, WebSocket } from "ws"
import  express from 'express'
import http from "http"

// const app = express()
// const server = http.createServer(http)

const wss = new WebSocketServer({ port: 8080})

interface WebSocketsArrayInterface {
    socket: WebSocket;
    payload: {
        roomId: string
    }
}

let allSockets: WebSocketsArrayInterface[] = []

wss.on("connection", (socket) => {
    // socket.send("heya connected")
    
    socket.on("message", (message) => {
    // console.log(message.toString());

    const parsedMessage = JSON.parse(message as unknown as string)   

    // console.log(parsedMessage)

    if(parsedMessage.type === "join"){
        allSockets.push({
            socket: socket,
            payload:{
                roomId: parsedMessage.payload.roomId
            }
        })
        
    }

    if(parsedMessage.type === "chat"){
        const currentUserRoom = allSockets.find(x => x.socket === socket)?.payload.roomId
        console.log(currentUserRoom)
        setTimeout(() => {
        allSockets.forEach((x) => {
            if(x.payload.roomId === currentUserRoom && x.socket !== socket && x.socket.readyState === WebSocket.OPEN){
                x.socket.send(parsedMessage.payload.message)
            }
        })            
        }, 1000);      
    }
})
    socket.on("close", () => {
        allSockets = allSockets.filter(x => x.socket !== socket)
    })
})  

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

// app.listen(3000, () => {
//     console.log("server running on the port 3000")
// })