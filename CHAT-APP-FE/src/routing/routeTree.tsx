import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import WebSocketContextProvider from "../ContextApi/WebSocketContextProvider";
import { createRoomRoute } from "./createRoom.route";
import { joinRoomRoute } from "./JoinRoom.route";
import { HomePageRoute } from "./homePage.route";
import { chatRoomRoute } from "./ChatRoom.route";

const rootRoute = createRootRoute({
    component : () => (
        <WebSocketContextProvider>
          <App />
        </WebSocketContextProvider>
    )
})

const routeCreateRoomPage = createRoomRoute(rootRoute)
const routeJoinRoomPage = joinRoomRoute(rootRoute)
const routeHomePage = HomePageRoute(rootRoute)
const routeChatRoomPage = chatRoomRoute(rootRoute)

export const routeTree = rootRoute.addChildren([routeHomePage, routeCreateRoomPage, routeJoinRoomPage, routeChatRoomPage])