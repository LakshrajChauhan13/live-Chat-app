import ChatRoomPage from "@/components/pages/ChatRoomPage";
import SpinnerLoader from "@/components/ui/SpinnerLoader";
import { createRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";


export const chatRoomRoute = (rootRoute: any) => createRoute({
    getParentRoute: () => rootRoute,
    path: "/chat/room/$roomId",
    component: ChatRoomPage,
    pendingComponent: SpinnerLoader,
    beforeLoad: async({ params }) => {
        try{
            await new Promise((resolve) => {       // just for showing the spinner initially for the 3 sec
                setTimeout(()=> {
                    resolve('')
                }, 3000)
            });
                        
            const response = await fetch(`http://localhost:3000/chat/room/${params.roomId}/check`);
            const data = await response.json();
            
            if(data.exists === false){
                toast.error("Room doesn't exists");
                throw redirect({ to: '/join'});
            }
        }
        catch(error){
            if (error instanceof Response || (error as any)?.name === 'RedirectError') {
                throw error; // Let TanStack handle the redirect you threw above
            }
            console.error("Network error:", error);
            // Optionally redirect on network failure
            throw redirect({ to: '/' });
        }
    } 
})

