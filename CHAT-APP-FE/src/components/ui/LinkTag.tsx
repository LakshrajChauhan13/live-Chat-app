import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

const LinkTag = ({ to, className, children }: { to: string; className?: string; children: string }) => {
  return (
    <Link
      to={`${to}`}
      className={cn(
        "text-sm sm:text-lg min-h-14 flex justify-center items-center border-2",
        "border-neutral-600/50 text-neutral-400 overflow-hidden shadow-aceternity",
        "hover:-translate-y-0.5 active:translate-0 bg-bg shadow-white transition-all duration-200",
        "after:content-[''] after:w-[90%] after:h-100 after:bg-neutral-600/10 backdrop-blur-2xl after:absolute after:inset-x-0 after:-bottom-10",
        "after:rotate-22 after:-translate-x-10 hover:after:bg-neutral-200/10 after:-z-1 z-0",
        "hover:after:translate-x-10 after:duration-200 after:transition-all relative",
        className
      )}
    >
      {children}
    </Link>
  )
}

export default LinkTag