onmessage = (event) => {
	function findClosestEquation(availableMaterials, equations) {
		let bestMatch = false;
		let bestMatchCount = 0;
		equations.forEach((eq) => {
			const reactants = eq.f;
			let matchCount = 0;
			availableMaterials.forEach((material) => {
				if (reactants[material]) {
					matchCount += Math.abs(eq.y) / 1000000 + 1;
				}
			});
			if (matchCount > bestMatchCount) {
				bestMatch = eq;
				bestMatchCount = matchCount;
			}
		});
		return bestMatch;
	}
	let result = findClosestEquation(event.data[0], event.data[1]);
	postMessage(result);
};