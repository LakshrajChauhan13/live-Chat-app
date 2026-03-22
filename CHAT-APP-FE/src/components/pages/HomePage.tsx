import BlurText from "../BlurText"
import ProjectTitle from "../brandName/ProjectTitle"
import DotGrid from "../DotGrid"
import Heading from "../ui/Heading"
import LinkTag from "../ui/LinkTag"
import GitHubIcon from "@/icons/GitHubIcon"

const HomePage = () => {
  return (
    <div className="bg-neutral-950 h-screen relative overflow-hidden">

      <div className="absolute inset-0 mask-x-from-60%">
        <DotGrid
          activeColor="#981651"
          baseColor="#271E37"
          dotSize={4}
          gap={20}
          className="opacity-100"
        />
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto flex flex-col gap-15 sm:gap-16 lg:gap-22 items-center justify-center relative z-10 px-4 pt-16 pb-12 lg:pt-0">

        <main className="flex flex-col w-full text-center items-center">
          <ProjectTitle className="text-[80px] sm:text-[140px] md:text-[200px] lg:text-[250px] pt-6 lg:pt-12 lg:-mt-25" />
          <h3 className="text-lg sm:text-3xl lg:text-5xl text-center -mt-2 sm:-mt-4 lg:-mt-15 font-Bitcount-Prop-Double-Ink tracking-wide sm:tracking-widest flex flex-col items-center">
            <BlurText
              text="Anonymous. Encrypted. Erasable."
              delay={500}
              easing={"anticipate"}
            />
            {/* <span className="opacity-40 -mt-12">
              Anonymous. Encrypted. Erasable.
            </span> */}
          </h3>
        </main>

        <p className="text-xs sm:text-base lg:text-xl bg-neutral-500/10 px-6 sm:-mt-2 sm:px-10 py-4 pointer-events-none backdrop-blur-[2px] w-full max-w-6xl mask-x-from-85% font-sans-flex text-center tracking-wider text-shadow-neutral-800 text-shadow-2xs sm:font-thin font-[10] text-pink-100">
          Encrypted chat rooms that vanish the moment you leave.
          No Accounts, no logs, no history, just secure conversation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 font-sans-flex w-full sm:w-auto justify-center items-center">
          <LinkTag link={true} to={'/create'} className="w-full sm:w-52 py-4 sm:py-6">
            Create Room
          </LinkTag>
          <LinkTag link={true} to={'/join'} className="w-full sm:w-52 py-4 sm:py-6">
            Join Room
          </LinkTag>
          <LinkTag a={true} to={'https://github.com/lakshrajchauhan13/live-chat-app'} className="w-full sm:w-52 py-4 sm:py-6 ">
            <GitHubIcon />
          </LinkTag>
        </div>

        <div className="w-full max-w-6xl mx-auto ">
          <div className="bg-linear-to-r from-transparent via-pink-500/50 to-transparent h-px w-full mb-7 sm:mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-4 font-sans-flex gap w-full">
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