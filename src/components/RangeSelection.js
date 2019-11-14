
import React, { useState, useEffect } from "react"

const RangeSelection = ({ segments = 3 }) => {

	const [ isFirstSelection, setIsFirstSelection ] = useState(true)
	const [ selections, setSelections ] = useState({ a: null, b: null })
	const [ range, setRange ] = useState([])

	useEffect(() => {

		const { a, b } = selections

		if(b !== null) {

			const sorted = a > b ? { a: b, b: a } : { a, b }

			setRange([...Array(sorted.b - sorted.a + 1)].map((_, i) => sorted.a + i))

		} else {

			setRange([])
		}

	}, [ selections ])

	const selectSegment = index => {

		if(isFirstSelection) {

			setSelections({ a: index, b: null })

		} else {
		
			setSelections({ a: selections.a, b: index })
		}

		setIsFirstSelection(!isFirstSelection)
	}

	const inRange = index => range.find(f => f === index) >= 0

	return (

		<ul>
		{
			[...Array(segments)].map((_, segment) =>

				<li
					key={ segment }
					onClick={ () => selectSegment(segment) }
					style={{ color: inRange(segment) ? "tomato" : "#dadada" }}
				>{ segment }</li>
			)
		}
		</ul>
	)
}

export default RangeSelection
