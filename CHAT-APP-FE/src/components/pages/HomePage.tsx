import { Link } from "@tanstack/react-router"
import ProjectTitle from "../brandName/ProjectTitle"

const HomePage = () => {
  return (
    <div className="bg-neutral-950">
        <div className='max-w-7xl mx-auto  h-screen flex flex-col gap-25 items-center '>

            <main className="flex flex-col items-center">
                <ProjectTitle  />
                <h3 className="text-4xl font-sans-flex tracking-wider text-neutral-600">
                    Fast. Secure. Private.
                </h3>
            </main>

            <p className=" text-2xl max-w-3xl text-center leading-normal text-neutral-500">
                Private chat rooms, that will be vanished after all users left. No Accounts, no history.       
            </p>
            

            <div className=" flex gap-5 font-sans-flex ">

                <Link to={'/create'} className="text-xl border border-neutral-500 px-10 py-5  text-neutral-500">
                    Create Room
                </Link>

                <Link to={'/join'} className="text-xl px-11 py-5 border border-neutral-500 text-neutral-500">
                    Join Room
                </Link>
            </div>

        </div>
    </div>

  )
}

export default HomePage