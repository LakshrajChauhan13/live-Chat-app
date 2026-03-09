import CreateRoomPage from "@/components/pages/CreateRoomPage";
import HomePage from "@/components/pages/HomePage";
import { createRoute } from "@tanstack/react-router";


export const HomePageRoute = (rootRoute: any) => createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
})