onmessage = function(event) {
	let arrays = event.data;

	function combineIterative(arrays) {
		let result = [0];
		for (let i = 0; i < arrays.length; i++) {
			let currentArray = arrays[i];
			let tempResult = [];
			for (let j = 0; j < result.length; j++) {
				for (let k = 0; k < currentArray.length; k++) {
					tempResult.push(result[j] + currentArray[k]);
				}
			}
			result = tempResult;
		}
		return result;
	}

	let result = combineIterative(arrays);
	postMessage(result);
};