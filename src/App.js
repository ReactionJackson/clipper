
import React from "react"
import styled from "styled-components"
import Three from "./components/Three"
import RangeSelection from "./components/RangeSelection"
import Clipper from "./components/Clipper"

const App = () => {
	return (
		<Container>
			{/*<Three />*/}
			<Clipper />
			{/*<RangeSelection segments={ 8 } />*/}
		</Container>
	)
}

const Container = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

export default App
