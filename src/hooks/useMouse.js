import { useState, useEffect } from "react"
import useListener from "./useListener"
import useLogger from "./useLogger"

const useMouse = () => {

  const [ position, setPosition ] = useState({ x: 0, y: 0 })

  useListener("mousemove", e => setPosition({ x: e.clientX, y: e.clientY }))

  return position
}

export default useMouse
