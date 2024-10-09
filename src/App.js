import { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])

	const API_URL = 'https://itunes.apple.com/search?term='

	useEffect(() => {
		if (search) {
			const fetchData = async () => {
				const url = encodeURI(`https://itunes.apple.com/search?term=${search}`)
				const response = await fetch(url)
				const data = await response.json()
				console.log(data)
				if (data.results.length > 0) {
					setData(data.results)
				} else {
					setData([])
					setMessage('Not Found')
				}
			}

			fetchData()
		} else {
			if (data) setData([])
		}
	}, [search])

	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	return (
		<div>
			{message}
			<Router>
				<Routes>
					<Route path="/" element={
						<Fragment>
							<SearchBar handleSearch={handleSearch} />
							<Gallery data={data} />
						</Fragment>
					} />
					<Route path="/album/:id" element={<AlbumView />} />
					<Route path="/artist/:id" element={<ArtistView />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

