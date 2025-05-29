function findClosestEquation( availableMaterials, equations ) {
	let bestMatch = false;
	let bestMatchCount = 0;
	equations.forEach( ( eq ) => {
		const reactants = eq.f;
		let matchCount = 0;
		availableMaterials.forEach( ( material ) => {
			if ( reactants[ material ] ) {
				matchCount += Math.abs( eq.y ) / 1000000 + 1;
			}
		} );
		if ( matchCount > bestMatchCount ) {
			bestMatch = eq;
			bestMatchCount = matchCount;
		}
	} );
	return bestMatch;
}

function splitCase( str ) {
	const result = [];
	const regex = /([A-Z][a-z]?)(?:<sub>([0-9]+)<\/sub>)?|\(([^)]+)\)(?:<sub>([0-9]+)<\/sub>)?/g;

	let match;
	while ( ( match = regex.exec( str ) ) !== null ) {
		if ( match[ 1 ] ) { // 匹配单个元素
			const element = match[ 1 ];
			const count = match[ 2 ] ? parseInt( match[ 2 ], 10 ) : 1;
			for ( let i = 0; i < count; i++ ) {
				result.push( element );
			}
		} else if ( match[ 3 ] ) { // 匹配括号内的化学式
			const subFormula = match[ 3 ];
			const subCount = match[ 4 ] ? parseInt( match[ 4 ], 10 ) : 1;

			// 递归处理括号内的化学式
			const subResult = splitCase( subFormula );
			for ( let i = 0; i < subCount; i++ ) {
				result.push( ...subResult );
			}
		}
	}

	return result;
}

function difference( array, values ) {
	// 创建一个 Map 来统计第二个数组中每个元素的数量
	const valuesCount = new Map();
	for ( const value of values ) {
		valuesCount.set( value, ( valuesCount.get( value ) || 0 ) + 1 );
	}

	// 创建一个结果数组
	const result = [];

	// 遍历第一个数组，检查每个元素是否在第二个数组中
	for ( const item of array ) {
		if ( valuesCount.has( item ) ) {
			// 如果元素在第二个数组中，减少其计数
			const count = valuesCount.get( item ) - 1;
			if ( count === 0 ) {
				valuesCount.delete( item );
			} else {
				valuesCount.set( item, count );
			}
		} else {
			// 如果元素不在第二个数组中，添加到结果数组
			result.push( item );
		}
	}

	return result;
}

function findSimilarMk( md, mks ) {
  if ( md.length < 1 || mks.length < 1 ) return [];
	const result = [];
	const mda = splitCase( md );
	mks.map( mk => {
		let mka = splitCase( mk );
		if ( mda.length <= mka.length ) {
			let diff = difference( mka, mda );
			if ( mka.length - diff.length == mda.length ) {
				result.push( {
					mk: mk,
					diff: diff
				} );
			}
		}
	} );
	result.sort( ( a, b ) => a.diff.length - b.diff.length );
	return result;
}

onmessage = ( event ) => {
	const method = event.data[ 2 ] || "eq";

	let result;
	switch ( method ) {
		case "eq":
			result = findClosestEquation( event.data[ 0 ], event.data[ 1 ] );
			break;
		case "mk":
			result = findSimilarMk( event.data[ 0 ], event.data[ 1 ] );
			break;
	}
	postMessage( result );
};