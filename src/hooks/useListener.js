import { useEffect } from "react"

const useListener = (event, fn) => {

  useEffect(() => {

    window.addEventListener(event, fn)

    return () => window.removeEventListener(event, fn)

  }, [])
}

export default useListener
