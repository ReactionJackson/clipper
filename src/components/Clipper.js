import React, { useState, useRef, useEffect } from "react"
import useAnimation from "../hooks/useAnimation"
import useListener from "../hooks/useListener"
import useViewport from "../hooks/useViewport"
import useMouse from "../hooks/useMouse"

const Clipper = () => {

	let pos = { x: 0, y: 0 }
	const [ drag, setDrag ] = useState(pos)
	const [ path, setPath ] = useState("")
	const [ offset, setOffset ] = useState({ x: 0, y: 0 })
	const mouse = useMouse()
	const [ bgToggle, setBgToggle ] = useState(true)
	const { width, height } = useViewport()

	useListener("mousemove", e => pos = { x: e.clientX, y: e.clientY })

	const parallaxRef = useRef()
	const maxOffset = 20

	useEffect(() => {

		const calculateOffset = ({ x, y }, distance) => {

			const origin = {
				x: width / 2,
				y: height / 2
			}

			const diff = {
				x: x - origin.x,
				y: y - origin.y
			}

			const pc = {
				x: diff.x / origin.x,
				y: diff.y / origin.y
			}

			return {
				x: parseInt(distance * pc.x),
				y: parseInt(distance * pc.y)
			}
		}

		setOffset(calculateOffset(mouse, maxOffset))

	}, [ mouse ])

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

		if(a + 1 > 360) {

			a = 0

			setBgToggle(prev => !prev)

		} else {

			a++
		}

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

		<svg viewBox={`0 0 ${ width } ${ height }`} width={ width } height={ height } ref={ parallaxRef }>
			<clipPath id="circle">
				<path d={ path } transform={`translate(${ drag.x },${ drag.y })`} />
			</clipPath>
			<image x={ offset.x - (maxOffset) } y={ offset.y - (maxOffset) } xlinkHref={ require(`../assets/img/${ bgToggle ? 1 : 2 }.png`) } width={ width + (maxOffset * 2) } height={ height + (maxOffset * 2) } preserveAspectRatio="none" />
			<image x={ offset.x - (maxOffset) } y={ offset.y - (maxOffset) } xlinkHref={ require(`../assets/img/${ bgToggle ? 2 : 1 }.png`) } width={ width + (maxOffset * 2) } height={ height + (maxOffset * 2) } preserveAspectRatio="none" clipPath="url(#circle)" />
		</svg>
	)
}

export default Clipper
