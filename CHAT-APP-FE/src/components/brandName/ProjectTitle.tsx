import { cn } from "@/lib/utils"


const ProjectTitle = ({className}:{className?: string}) => {
  return (
    <h1 className={cn("text-[200px] font-sans-flex font-extrabold leading-55 tracking-tight cursor-default",
    " bg-clip-text text-transparent bg-linear-to-t from-pink-500 via-pink-500 to-pink-600 px-1", className)}>
        Flamingo
    </h1>
  )
}

export default ProjectTitle