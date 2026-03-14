
const SpinnerLoader = () => {
  return (
    <div className="h-screen relative w-full bg-bg">
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 font-mono text-neutral-600">Entering the Room...</p>
        </div>
    </div>
  )
}

export default SpinnerLoader