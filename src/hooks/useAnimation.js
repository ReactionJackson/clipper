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

// import { useRef, useEffect, useLayoutEffect } from "react"

// const useAnimation = callback => {

//   const callbackRef = useRef(callback)

//   useEffect(() => callbackRef.current = callback, [ callback ])

//   const updates = () => {

//     frameRef.current = requestAnimationFrame(updates)

//     const cb = callbackRef.current

//     cb()
//   }

//   const frameRef = useRef()

//   useLayoutEffect(() => {

//     frameRef.current = requestAnimationFrame(updates)

//     return () => cancelAnimationFrame(frameRef.current)

//   }, [])
// }

// export default useAnimation
