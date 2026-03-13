import { cn } from "@/lib/utils"


const ProjectTitle = ({className}:{className?: string}) => {
  return (
    <>
      <h1 className={cn("text-[200px] font-sans-flex font-extrabold tracking-tight cursor-default",
      "bg-clip-text text-transparent bg-linear-to-r from-pink-900 via-pink-500 to-pink-900 px-1 ", className)}>
          Vaulrizz
      </h1>
    </>
  )
}

export default ProjectTitle