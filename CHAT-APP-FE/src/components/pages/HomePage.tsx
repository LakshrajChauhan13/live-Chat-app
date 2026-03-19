import BlurText from "../BlurText"
import ProjectTitle from "../brandName/ProjectTitle"
import DotGrid from "../DotGrid"
import Heading from "../ui/Heading"
import LinkTag from "../ui/LinkTag"

const HomePage = () => {
  return (
    <div className="bg-neutral-950 min-h-screen relative overflow-hidden ">
        <div className=" absolute inset-0 mask-x-from-60% ">
            <DotGrid 
                activeColor="#981651"
                baseColor="#271E37"
                dotSize={4}
                gap={20}
                className="opacity-100"
            />
        </div>
        
        <div className='max-w-7xl mx-auto flex flex-col gap-23.5 items-center justify-center relative z-10  '>

            <main className="flex flex-col w-full text-center items-center ">
                <ProjectTitle className="text-[250px] pt-12 -mt-25" />
                <h3 className="text-5xl text-center leading-0 -mt-10 font-Bitcount-Prop-Double-Ink tracking-widest">
                    <BlurText 
                      text="Anonymous. Encrypted. Erasable."
                      delay={500}
                      easing={"circOut"}
                    />
                    <span className="opacity-40">
                        Anonymous. Encrypted. Erasable.
                    </span>
                </h3>
            </main>

            <p className="text-xl bg-neutral-500/10 px-10 py-5 pointer-events-none backdrop-blur-[2px] w-[90%] mask-x-from-85% max-w-6xl font-sans-flex text-center tracking-wider text-shadow-neutral-800 text-shadow-2xs font-thin text-pink-100 ">
                Encrypted chat rooms that vanish the moment you leave.  
                No Accounts, no logs, no history, just secure conversation.       
            </p>
            

            <div className=" flex gap-5 font-sans-flex w-120 justify-center items-center relative max-w-5xl ">
                <LinkTag to={'create'} className="h-full w-[45%] " >
                    Create Room
                </LinkTag>

                <LinkTag to={'/join'} className="w-[45%]" >
                    Join Room
                </LinkTag>
            </div>
            <div className="max-w-6xl  mx-auto space-y-5">

                    <div className=" bg-linear-to-r from-transparent via-pink-500/50 to-transparent h-px w-full " />

                    <div className=" flex font-sans-flex gap-5 w-full">
                        <Heading heading="Live-Chat" title="Real-time delivery with zero latency via WebSockets." />
                        <Heading heading="Auto-Deletion" title="Data is wiped from memory the moment the room closes." />
                        <Heading heading="No Registration" title="Zero friction. No email or phone number required." />
                        <Heading heading="Session Recover" title="Seamlessly reconnect within a 10-minute grace period if your network drops." />
                    </div>
            </div>
          
        </div>
    </div>

  )
}

export default HomePage