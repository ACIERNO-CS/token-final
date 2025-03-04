const DEMO_KEY = "REPLACE ME";

const coin = {
	async ping() {
		return fetch(`https://api.coingecko.com/api/v3/ping`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				"x-cg-demo-api-key": DEMO_KEY,
			},
		})
	},

	async callToken(name) {
		return fetch(`https://api.coingecko.com/api/v3/coins/${name}`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				"x-cg-demo-api-key": DEMO_KEY,
			},
		});
	},
	
	async getTokens() {
		const SAVED_FIVE = ["BTC-USD", "XRP-USD", "ADA-USD", "ETH-USD", "SOL-USD"];
		const results = await Promise.all(SAVED_FIVE.map((token) => this.callToken(token)))
		if (results.some((elm) => !elm.success)) throw new Error("Error fetching data")
		else return results.map(result => result.json())
	},

	async searchTokens(name) {
		if (!name) throw new Error('Name parameter required by search endpoint.')
		const result = await this.callToken(name)
		console.log(result)
		if (!result.ok) throw new Error("Error fetching data");
		else return result.json()
	}
};

export default coin