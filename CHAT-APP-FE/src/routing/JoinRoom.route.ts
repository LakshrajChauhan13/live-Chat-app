import JoinRoomPage from "@/components/pages/JoinRoomPage";
import { createRoute } from "@tanstack/react-router";


export const joinRoomRoute = (rootRoute: any) => createRoute({
    getParentRoute: () => rootRoute,
    path: '/join',
    component: JoinRoomPage
})