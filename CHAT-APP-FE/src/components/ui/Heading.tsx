
const Heading = ({heading, title}: { heading: string; title: string}) => {
  return (
    <div className="bg-clip-text text-transparent bg-linear-to-r from-transparent via-pink-200/80 to-transparent flex flex-col items-center gap-2 py-5 px-10">
        <span className="text-base font-bold"> {heading} </span>
        <span className="text-xs text-white/50 text-center tracking-wide "> {title} </span>
    </div>
  )
}

export default Heading