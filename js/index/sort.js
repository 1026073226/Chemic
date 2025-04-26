onmessage = function(event) {
	let arr = event.data;
	let res;
	if (typeof arr[0] == "number") {
		res = Array.from(new Set(arr.sort((a, b) => a - b)));
	} else {
		res = arr.sort();
	}
	postMessage(res);
}