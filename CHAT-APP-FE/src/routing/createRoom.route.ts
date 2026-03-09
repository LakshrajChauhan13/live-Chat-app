import CreateRoomPage from "@/components/pages/CreateRoomPage";
import { createRoute } from "@tanstack/react-router";


export const createRoomRoute = (rootRoute: any) => createRoute({
    getParentRoute: () => rootRoute,
    path: '/create',
    component: CreateRoomPage
})