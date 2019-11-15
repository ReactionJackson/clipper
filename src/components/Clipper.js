import React, { useState, useRef, useEffect } from "react"
import useAnimation from "../hooks/useAnimation"
import useListener from "../hooks/useListener"
import useViewport from "../hooks/useViewport"

const Clipper = () => {

	let pos = { x: 0, y: 0 }
	const [ drag, setDrag ] = useState(pos)
	// const [ radius, setRadius ] = useState(100)
	const [ path, setPath ] = useState("")
	const { width, height } = useViewport()

	useListener("mousemove", e => pos = { x: e.clientX, y: e.clientY })

	let a = 0

	var startPointX = 0
	var startPointY = 0
	var startAngle = -90
	var endAngle = -90
	var radius = 200

	var x1 = startPointX + radius * Math.cos(Math.PI * startAngle / 180)
	var y1 = startPointY + radius * Math.sin(Math.PI * startAngle / 180)
	var x2 = startPointX + radius * Math.cos(Math.PI * endAngle / 180)
	var y2 = startPointY + radius * Math.sin(Math.PI * endAngle / 180)

	useAnimation(() => {

		a = a + 1 > 360 ? 0 : a + 1
		endAngle = -90 + a
		x1 = startPointX + radius * Math.cos(Math.PI * startAngle / 180)
		y1 = startPointY + radius * Math.sin(Math.PI * startAngle / 180)
		x2 = startPointX + radius * Math.cos(Math.PI * endAngle / 180)
		y2 = startPointY + radius * Math.sin(Math.PI * endAngle / 180)

		setPath("M0,0 L" + x1 + "," + y1 + " A" + radius + "," + radius + " 0 " + (endAngle > 90 ? 1 : 0) + ",1 " + x2 + "," + y2 + " z")

		setDrag(prev => ({
      x: prev.x + ((pos.x - prev.x) / 12),
      y: prev.y + ((pos.y - prev.y) / 12),
    }))

	})

	return (

		<svg viewBox={`0 0 ${ width } ${ height }`} width={ width } height={ height }>
			<clipPath id="circle">
				<path d={ path } fill="#c60f1d" transform={`translate(${ drag.x },${ drag.y })`} />
			</clipPath>
			<image xlinkHref={ require("../assets/img/1.png") } width={ width } height={ height } preserveAspectRatio="none" />
			<image xlinkHref={ require("../assets/img/2.png") } width={ width } height={ height } preserveAspectRatio="none" clipPath="url(#circle)" />
		</svg>
	)
}

export default Clipper
