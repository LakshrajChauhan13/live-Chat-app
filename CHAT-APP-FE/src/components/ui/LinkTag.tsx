import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

const LinkTag = ({ to, className, children, link, a }: { to?: string; className?: string ; children: string | React.JSX.Element | string & React.JSX.Element, a?: boolean, link?: boolean }) => {
    const classStyle = cn(
            "text-sm bg-transparent sm:text-lg min-h-14 flex justify-center items-center border-2",
            "border-neutral-600/50 text-neutral-400 overflow-hidden shadow-aceternity",
            "hover:-translate-y-0.5 active:translate-0 bg-bg shadow-white transition-all duration-200",
            "after:content-[''] after:w-[90%] after:h-100 after:bg-neutral-600/10 backdrop-blur-2xl after:absolute after:inset-x-0 after:-bottom-15",
            "after:rotate-22 after:-translate-x-10 hover:after:bg-neutral-200/10 after:-z-1 z-0",
            "hover:after:translate-x-15 after:duration-200 after:transition-all relative",
            className)
  return (
    <>
    
    {
        link &&
            <Link
             to={to}
             className={classStyle}
            >
            {children}
            </Link>
    }

    {
        a &&
            <a
             href={to}
             target="_blank" rel="noopener noreferrer"
             className={classStyle}
            >
            {children}
            </a>
    }
    </>
  )
}

export default LinkTag