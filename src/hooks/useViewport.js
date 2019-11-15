import React, { useState } from "react"
import useListener from "./useListener"

const useViewport = () => {

  const [ size, setSize ] = useState({ width: window.innerWidth, height: window.innerHeight })

  useListener("resize", e => setSize({ width: window.innerWidth, height: window.innerHeight }))

  return size
}

export default useViewport
