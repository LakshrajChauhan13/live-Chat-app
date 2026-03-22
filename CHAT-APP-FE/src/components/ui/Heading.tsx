const Heading = ({heading, title}: { heading: string; title: string}) => {
  return (
    <div className="bg-clip-text text-transparent bg-linear-to-r from-transparent via-pink-200/80 to-transparent flex flex-col items-center gap-1 py-4 sm:py-5 px-4 sm:px-3 text-center">
        <span className="text-sm sm:text-base font-bold"> {heading} </span>
        <span className="text-[8.5px] sm:text-xs text-white/50 text-center tracking-wide leading-relaxed"> {title} </span>
    </div>
  )
}

export default Heading