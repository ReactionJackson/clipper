import { useEffect } from "react"

const useLogger = (label, data) => {

  useEffect(() => console.log(`useLogger(${ label }):`, data), [ data ])
}

export default useLogger
