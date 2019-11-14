import React, { useState, useRef, useEffect } from "react"
import useMouse from "../hooks/useMouse"
import useAnimation from "../hooks/useAnimation"
import useListener from "../hooks/useListener"
import useLogger from "../hooks/useLogger"

const src = [
	'https://images.unsplash.com/photo-1488741824574-82b39614583c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80',
	'https://inews.co.uk/images-i.jpimedia.uk/imagefetch/https://inews.co.uk/wp-content/uploads/2019/10/shutterstock_1479789158.jpg'
]

const Clipper = () => {

	let pos = { x: 0, y: 0 }
	const [ drag, setDrag ] = useState(pos)

	useListener("mousemove", e => pos = { x: e.clientX, y: e.clientY })

	useAnimation(() => {

		setDrag(prev => ({
      x: prev.x + ((pos.x - prev.x) / 12),
      y: prev.y + ((pos.y - prev.y) / 12),
    }))

	})

	return (

		<svg viewBox={`0 0 ${ window.innerWidth } ${ window.innerHeight }`} width={ window.innerWidth } height={ window.innerHeight }>
			<clipPath id="circle">
				<circle cx={ drag.x } cy={ drag.y } r="200" fill="skyblue" />
			</clipPath>
			<image xlinkHref={ src[0] } width={ window.innerWidth } height={ window.innerHeight } />
			<image clipPath="url(#circle)" xlinkHref={ src[1] } width={ window.innerWidth } height={ window.innerHeight } />
		</svg>
	)
}

export default Clipper
