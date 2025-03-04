import './App.css'
import { Token } from './Token';
import { useState, useEffect } from "react";
import { isMobileContext } from './context';


//const SAVED_FIVE = [{name: "Bitcoin", tag: 'BTC'}, "Ethereum", "Ripple", "Tether", "Cardano"]; // ["BTC-USD", "XRP-USD", "ADA-USD", "ETH-USD", "SOL-USD"];

const SAVED_FIVE = [
	{ name: "Bitcoin", tag: "BTC" },
	{ name: "Ethereum", tag: "ETH" },
	{ name: "Ripple", tag: "XRP" },
	{ name: "Tether", tag: "USDT" },
	{ name: "Cardano", tag: "ADA" },
];
function App() {
	const [isMobile, setIsMobile] = useState(false)
  	const [search, setSearch] = useState('')
  
  	function handleWindowSizeChange() {
		setIsMobile(window.innerWidth <= 768);
	}

	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		handleWindowSizeChange()
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

  	return (
		<div id='App'>
			<isMobileContext.Provider value={{ isMobile }}>
				<div className="w-100">
					<input
						type="text"
						class="form-control search-input"
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<i class="fas fa-search search-icon"></i>
				</div>
				<div className={`${isMobile ? "col-12" : "col-12 mx-auto"} row w-100`}>
					{SAVED_FIVE.map((coin) =>
						coin.name.toLowerCase().includes(search.toLowerCase()) ||
						coin.tag.toLowerCase().includes(search.toLowerCase()) ? (
							<Token token={coin} />
						) : (
							<></>
						)
					)}
				</div>
			</isMobileContext.Provider>
		</div>
	);
}

export default App
