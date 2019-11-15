import { useRef, useEffect } from "react"

const useAnimation = updates => {

  const frameRef = useRef()

  const animate = () => {

    updates()

    frameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {

    frameRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameRef.current)

  }, [])
}

export default useAnimation
