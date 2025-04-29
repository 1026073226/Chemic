Vue.config.errorHandler = function( err, vm, info ) {
	if ( info == "render" ) {
		return false;
	}
	prompt( info + "\n发生错误:", err );
	return false;
};
const MOD_FILES = {};
const FR = new FILE_TOOLS();
document.addEventListener( "plusready", () => {
	FR.readDirectory( "Chemic/mods" )
		.then( res => {
			for ( let i = 0; i < res.length; i++ ) {
				MOD_FILES[ res[ i ].name ] = res[ i ].content;
			}
			if ( Object.keys( MOD_FILES ).length > 0 ) {
				if ( localStorage.mods ) {
					let mods = JSON.parse( localStorage.mods );
					localStorage.mods = JSON.stringify( Object.assign( {}, mods, MOD_FILES ) );
				}
			}
		} )
		.catch( err => {
			prompt( "加载模组文件时遇到了问题:", err );
		} )
} );
var app = new Vue( {
	el: "#app",

	data: {
		fLoader: true,

		openBottomline: true,

		bgmNum: 4,

		playing: true,

		usingt: {
			effect: {
				exo: 1,
				end: 1,
				suc: 0,
				prevent: [],
			},
			added: false,

		},

		detailsQue: {
			o: false,
		},

		loaded: 0,

		impeQue: [],
		drawQue: [],
		imped: false,

		srm: false,
		cssStore: 0,

		appform: 1,

		rounds: 0,

		handbook: false,
		reaction: false,
		fty: false,
		h: false,
		shop: false,
		draw: false,
		ballm: false,

		tplist: {
			handbook: false,
			reaction: false,
			fty: false,
			h: false,
			shop: false,
			draw: false,
			ballm: false,
		},

		present: {
			require: "",
		},

		chemist: {},
		colors: {},
		maked: [],

		f: {},
		t: {},

		h1: 0,
		h2: 0,
		maxh: 1000,

		text: {},
		val: [],
		alts: {},
		force: 0,
		fcost: 10,

		brand: [],
		perNewBrand: 10,

		alting: false,

		a: false,
		d: false,

		player: "p1",

		ip: "localhost",

		port: 8080,

		rootHosts: [ "10.6.22.", "192.168.50.", "192.168.10.", "192.168.1.", "192.168.0.", "localhost",
			"127.0.0.1"
		],

		connectType: 0,
		typemsg: {
			"-1": "连接失败",
			0: "未连接",
			1: "已连接",
			2: "连接中",
		},
		err: false,

		msg: {
			ht1: 0,
			ht2: 0,
			maxp1: 100,
			maxp2: 100,
			p1e: 0,
			p2e: 0,
			modVar: {},
		},

		matcher: false,
		matched: false,

		name: {
			p1: "p1",
			p2: "p2",
		},

		inter: {
			msg: false,
			new: false,
			tip: false,
			z: false,
			hdb: false,
			delMod: false,
			form: false,
			load: false,
			audio: false,
			rec: false,
		},

		pushing: false,

		pressedVal: [ "*" ],
		worker: false,

		settings: {
			srecycle: true,
			sht: true,
			sf: true,
			bw: 10,
			ac: true,
			an: true,
			am: false,
			as: true,
			font: "consola",
			fs: 100,
			ap: false,
			maxe: 100,
			senv: false,
		},
		modSettings: {},

		goods: {},

		searchRes: [],

		attrs: {
			hkx: 0,
			psf: 0,
			dj: 0,
			fz: 0,
		},

		attrTom: {
			hkx: "🌚热抗性",
			psf: "💉破伤风",
			dj: "💎多金",
			fz: "🔄反转",
		},

		workerCount: navigator.hardwareConcurrency || 4,
		workers: [],
		results: [],
		intermediateResults: [],
		sorter: false,

		quests: [],

		version: "17.3_beta",

		cannext: true,

		altSub: false,

		env: {
			now: {
				effect: {
					exo: 1,
					end: 1,
					suc: [ 0, 0 ]
				}
			},
			cd: 0,
			suc: 100,
		},
		styleStore: {},
		ex: true,
		acts: {},
		equi: {},
		prop: false,
		mods: {
			dismod: [],
		},
		crystal: 0,

		tipQueue: [],
		isTipShowing: false,

	},

	created() {
		this.d = new Dom();
		this.a = new Anima();
		this.chemist = chemist;
		this.colors = colors;
		this.prop = prop;
		this.goodsSet();
		this.initWorker();
		this.loadSettings();
		this.quest();
		document.documentElement.style.setProperty( "--font",
			this.settings.font );
		document.documentElement.style.setProperty( "--fs",
			this.settings.fs + "%" );
		this.loadMod( this.fLoader );
	},

	mounted() {
		this.init();
	},

	computed: {
		prand() {
			if ( this.settings.ap ) {
				return this.brand.reduce( ( counts, element ) => {
					counts[ element ] = ( counts[ element ] || 0 ) + 1;
					return counts;
				}, {} );
			}
		},
	},

	methods: {
		init() {
			onload = function() {
				this.animaSet();
				this.colorSet();
				this.soundSet();
				this.checkVersion();
				this.bgmSet();
				this.fxSet();
				if ( this.settings.ac ) this.tryFindHost();
				if ( this.settings.an ) {
					this.themeSet();
				}
				document.addEventListener( "click", function() {
					this.firstTime();
				}.bind( this ), {
					once: true
				} );
				if ( localStorage.hasOwnProperty( "ee" ) && localStorage.ee == "false" ) {
					this.removeBlur( false );
					this.ex = false;
				}
				this.loaded = 100;
				this.d.$( "#loadTp" ).addEventListener( "transitionend", () => {
					this.d.$( "#loadTp" ).style.opacity = 0;
					this.inter.load = setTimeout( () => {
						this.d.$( "#getIn" ).style.opacity = 1;
						setTimeout( () => {
							this.d.$( "#getIn" ).style.animation =
								"blink 1891ms infinite";
							this.d.$( "#getIn" ).style.animation =
								"blink 1891ms infinite";
							this.d.$( "#loadPic" ).addEventListener( "click", this
								.getIn, {
									once: true
								} );
						}, 512 );
					}, 1012 );
				}, {
					once: true
				} );
			}.bind( this );
			window.addEventListener( "beforeunload", this.saveAllData );
		},
		saveAllData() {
			localStorage.acts = JSON.stringify( this.acts );
			localStorage.equi = JSON.stringify( this.equi );
			localStorage.acts = JSON.stringify( this.acts );
			localStorage.settings = JSON.stringify( this.settings );
			localStorage.mods = JSON.stringify( this.mods );
		},
		getIn() {
			if ( this.loaded < 100 ) {
				return;
			}
			this.playSound( "ta" );
			this.d.$( "#loadPic" ).style.opacity = 0;
			setTimeout( () => {
					this.d.$( "#loadPic" ).remove();
					clearTimeout( this.inter.load );
					if ( this.settings.ac ) {
						this.tryConnect();
					}
				},
				452 );
		},
		joinAdven() {
			document.body.style.opacity = 0;
			document.body.style.backgroundColor = "#FFF";
			setInterval( () => {
					this.d.$( "#bgm" ).volume -= 0.01;
				},
				9 );
			setTimeout( () => {
					location.href = "adven.html?acts=" + JSON.stringify( this.acts );
				},
				881 );
		},
		changeSub() {
			this.altSub = !this.altSub;
			this.playSound( "di" );
		},
		addMod( event ) {
			const file = event.target.files[ 0 ];
			const fileName = file.name;
			if ( file ) {
				const reader = new FileReader();
				reader.onload = function( e ) {
					this.mods[ fileName ] = e.target.result;
					localStorage.mods = JSON.stringify( this.mods );
					this.confirm( "安装成功，要重启游戏吗？", function( t ) {
						if ( t ) {
							location = location;
						}
					} );
				}.bind( this );
				reader.readAsText( file );
			} else {
				this.tip( "未选择文件" );
			}
		},
		disabledMod( key ) {
			let i = this.mods.dismod.indexOf( key );
			if ( i < 0 ) {
				this.mods.dismod.push( key );
			} else {
				this.mods.dismod.splice( i, 1 );
			}
			localStorage.mods = JSON.stringify( this.mods );
			this.playSound( "di" );
		},
		loadMod( type ) {
			if ( localStorage.mods ) {
				this.mods = JSON.parse( localStorage.mods );
				let modConfig = {};
				window.config = ( config ) => {
					modConfig = config;
				};
				for ( let key in this.mods ) {
					if ( this.mods.dismod.includes( key ) || key == "dismod" ) {
						continue;
					}
					try {
						if ( !type ) {
							eval( this.mods[ key ] );
						} else {
							const f = new Function( this.mods[ key ] ).bind( this );
							f();
						}
						for ( let k in modConfig ) {
							if ( k == "onload" ) {
								window.addEventListener( "load", modConfig[ k ] );
							} else {
								this.$options[ k ].push( modConfig[ k ] );
							}
						}
					} catch ( e ) {
						this.confirm( "模组" + key + "加载失败: <br />" + e );
					}
				}
			}
		},
		deleteMod( key, e ) {
			if ( !key && !e.target.gup ) {
				e.target.style.opacity = 1;
				clearTimeout( this.inter.delMod );
				return;
			} else {
				e.target.style.opacity = 0;
				this.inter.delMod = setTimeout( () => {
					if ( !key ) {
						return;
					}
					e.target.gup = true;
					this.confirm( "确认要删除" + key + "吗？", ( t ) => {
						if ( t ) {
							delete this.mods[ key ];
							localStorage.mods = JSON.stringify( this.mods );
							FR.delFile( "Chemic/mods/" + key );
						} else {
							e.target.style.opacity = 1;
							e.target.gup = false;
						}
					} );
				}, 2000 );
			}
		},
		fxSet() {
			document.addEventListener( 'click', function( e ) {
				const ripple = document.createElement( 'div' );
				ripple.className = 'ripple-effect';
				const posX = e.clientX;
				const posY = e.clientY;
				const maxSize = Math.min(
					window.innerWidth - posX,
					window.innerHeight - posY
				);
				ripple.style.maxWidth = `${maxSize}px`;
				ripple.style.maxHeight = `${maxSize}px`;
				ripple.style.left = `${posX}px`;
				ripple.style.top = `${posY}px`;
				const col = Object.values( colors );
				const randomHue = col[ this.randint( 0,
					col.length - 1 ) ];
				ripple.style.backgroundColor = randomHue;
				document.body.appendChild( ripple );
				ripple.addEventListener( 'animationend',
					() => {
						ripple.remove();
					} );
			}.bind( this ) );
		},
		bgmSet() {
			let r = this.randint( 0, this.bgmNum );
			this.d.$( "#bgm" ).src = "media/bgm/create/bgm" + r + ".mp3";
			this.d.$( "#bgm" ).volume = ( r == 1 ? 1 : 0.5 );
			this.d.$( "#bgm" ).play()
				.catch( err => {
					document.addEventListener( "click",
						function() {
							this.d.$( "#bgm" ).play();
						}.bind( this ), {
							once: true
						} );
				} );
			this.d.$( "#bgm" ).addEventListener( "ended", function( e ) {
				let s = this.randint( 0,
					this.bgmNum );
				if ( s == r ) {
					if ( s + 1 > this.bgmNum ) {
						s--;
					} else {
						s++
					}
				}
				r = s;
				e.target.src = "media/bgm/create/bgm" + r + ".mp3";
				this.d.$( "#bgm" ).volume = ( r == 1 ? 1 : 0.5 );
				e.target.play();
			}.bind( this ) );
		},
		firstTime() {
			if ( localStorage.hasOwnProperty( "firstTime" ) ) {
				return;
			} else {
				this.confirm( "第一次玩这款游戏吗？", function( c ) {
					if ( c ) {
						this.srm = true;
					} else {
						setTimeout( this.confirm, 100, "也可在📖-更多的底部点击查看哦！" );
					}
				}.bind( this ) );
				localStorage.firstTime = true;
			}
		},
		checkVersion() {
			if ( this.version != localStorage.version ) {
				if ( Math.abs( Number( localStorage.version ) - Number( this.version ) < 1 ) ) {
					delete localStorage.settings;
				} else if ( this.version.includes( "alpha" ) ) {
					localStorage.clear();
				}
				localStorage.version = this.version;
				location = location;
			}
		},
		soundSet() {
			this.d.cbattr( ".switch", function( d ) {
				d.addEventListener( "click", function() {
					this.tip( "已修改" );
				}.bind( this ) );
			}.bind( this ) );
		},
		themeSet() {
			let t = new Date().getHours();
			if ( t >= 21 || t <= 5 ) {
				this.settings.am = true;
			} else {
				this.settings.am = false;
			}
		},
		colorSet() {
			this.d.cbattr( ".notes b", function( d ) {
				d.style.color = colors[ d.innerHTML ] || "#FFF";
			} );
		},
		animaSet() {
			this.d.cbattr( "summary", function( e ) {
				e.addEventListener( "click", app.toggleDetails );
			} );
			this.d.cbattr( "button", function( e ) {
				e.addEventListener( "click", function() {
					this.a.play( e, "clicked 384ms" );
				}.bind( this ) );
			}.bind( this ) );
		},
		goodsSet() {
			let l = true;
			let l0 = true;
			let l1 = true;
			let l2 = true;
			for ( let key in prop ) {
				if ( l ) {
					this.goods.l = "元素";
					l = false;
				}
				if ( ( key.includes( '<' ) || key == 'OH' ) && l0 ) {
					this.goods.l0 = "原子团";
					l0 = false;
				}
				if ( key[ 0 ] == "+" && l1 ) {
					this.goods.l1 = "加量";
					l1 = false;
				}
				if ( key[ 0 ] == "*" ) {
					if ( l2 ) {
						this.goods.l2 = "属性";
						l2 = false;
					}
					this.goods[ key ] = prop[ key ];
				} else {
					this.goods[ key ] = Math.floor( 0.5 / prop[ key ] );
				}
			}
		},
		format( arr ) {
			let str = "";
			for ( let i = 0; i < arr.length; i++ ) {
				if ( arr[ i ] > 0 ) {
					str += "+";
				}
				str += arr[ i ];
				if ( i === arr.length - 1 ) {
					return str;
				}
				str += ",";
			}
		},
		press( obj ) {
			let str = "";
			for ( let key in obj ) {
				str += key + ( obj[ key ] === 1 ? "" : ( "<sub>" + obj[ key ] + "</sub>" ) );
			}
			return str;
		},
		change( key, value, sz = true ) {
			if ( this.srm && sz ) {
				this.srm = false;
				return;
			}
			if ( this.inter.z ) {
				clearTimeout( this.inter.z );
			}
			if ( key === "ballm" && value ) {
				this.balls.update();
			}
			let z = ( value ? -1 : 1 );
			let a = ( value ? "slideout 206ms" : "slidein 286ms" );
			this.playSound( "ka" );
			if ( value ) {
				this.closeAll();
			}
			this.a.play( this.d.$( "#" + key ), a, 0 );
			this.inter.z = setTimeout( function() {
					return this[ key ] = value;
				}.bind( this ),
				286 );
		},
		closeAll() {
			for ( let key in this.tplist ) {
				if ( this[ key ] == true ) {
					this.change( key, false, false );
				}
			}
		},
		initWorker() {
			this.sorter = new Worker( "js/index/sort.js" );
			if ( this.workers ) {
				for ( let i = 0; i < this.workers.length; i++ ) {
					this.workers[ i ].terminate();
				}
			}
			this.matcher = new Worker( "js/index/match.js" );
			this.matcher.onmessage = ( event ) => {
				this.matched = event.data;
			};
			this.workers = [];
			for ( let i = 0; i < this.workerCount; i++ ) {
				let worker = new Worker( "js/index/combine.js" );
				worker.onmessage = this.handleWorkerMessage.bind( this, i );
				this.workers.push( worker );
			}
		},
		handleWorkerMessage( workerIndex, event ) {
			let result = event.data;
			this.intermediateResults.push( result );
			if ( this.intermediateResults.length === this.workerCount ) {
				this.mergeResults();
			}
		},
		mergeResults() {
			let finalResult = this.intermediateResults.reduce( ( acc, result ) => {
				return this.combineIterative( acc, result );
			}, [ 0 ] );
			this.sorter.onmessage = function( event ) {
				this.pressedVal = event.data;
			}.bind( this );
			this.sorter.postMessage( finalResult );
			this.intermediateResults = [];
		},
		combineIterative( arr1, arr2 ) {
			let result = [];
			for ( let i = 0; i < arr1.length; i++ ) {
				for ( let j = 0; j < arr2.length; j++ ) {
					result.push( arr1[ i ] + arr2[ j ] );
				}
			}
			return result;
		},
		combine( arrays ) {
			if ( arrays.length === 0 ) {
				this.pressedVal = [ "*" ];
				return;
			}
			let chunkSize = Math.ceil( arrays.length / this.workerCount );
			for ( let i = 0; i < this.workerCount; i++ ) {
				let start = i * chunkSize;
				let end = Math.min( start + chunkSize, arrays.length );
				let subArray = arrays.slice( start, end );
				this.workers[ i ].postMessage( subArray );
			}
		},
		make() {
			this.playSound( "ding" );
			this.maked.push( this.press( this.text ) );
			this.a.play( this.d.$( "#showEle" ), "slidein 286ms" );
			this.matcher.postMessage( [ this.maked, this.chemist.x ] );
			setTimeout( function() {
				this.isQuest( this.press( this.text ) );
				this.val = [];
				let num = 0;
				for ( let key in this.text ) {
					num += this.text[ key ];
				};
				this.text = {};
				this.comh( -num );
			}.bind( this ), 286 );
		},
		splitCamelCase( str ) {
			const result = str.match( /[A-Z][a-z]?/g );
			return result || [];
		},
		add( v, i = -1, bd = false ) {
			this.playSound( "da" );
			if ( i == -1 ) {
				i = this.brand.indexOf( v );
			} else if ( !v && i > -1 ) {
				v = this.brand[ i ];
			}
			if ( v in this.chemist.elements ) {
				this.addInObj( ( this.alting ? this.alts : this.text ), v );
				this.val.push( this.chemist.elements[ v ].valence );
			} else {
				v = Number( v );
				let keys = Object.keys( this.text );
				let lastone = keys[ keys.length - 1 ];
				if ( lastone == undefined ) {
					this.tip( "数字不能在首位" );
					return false;
				}
				this.text[ lastone ] += v;
				for ( let i = 0; i < v; i++ ) {
					let eles = this.splitCamelCase( lastone.replaceAll( /\(|\)/g, "" ) );
					for ( let j = 0; j < eles.length; j++ ) {
						this.val.push( this.chemist.elements[ eles[ j ] ].valence );
					}
				}
			}
			if ( bd && ( !this.settings.ap || bd.target.children[ 0 ].innerText == "" ) ) {
				this.a.play( bd.target, "jslidein 236ms ease-in", 0 );
				bd.target.addEventListener( "animationend", function() {
					this.brand.splice( i, 1 );
				}.bind( this ), {
					once: true
				} );
			} else {
				return this.brand.splice( i, 1 );
			}
			return true;
		},
		addInObj( obj, v ) {
			if ( v in obj ) {
				obj[ v ]++;
			} else {
				obj[ v ] = 1;
			}
		},
		tryFindHost() {
			let result = [];
			let promises = [];
			let eru = [];
			this.rootHosts.map( host => {
				if ( host.slice( -1 ) == "." ) {
					let i = 1;
					let r = setInterval( () => {
						if ( i < 200 ) {
							promises.push( axios.get( `http://${ host + i }:${ this.port }/`, {
									params: {
										test: "test",
									},
									timeout: 1000
								} )
								.then( res => {
									if ( res ) {
										result.push( host + i );
									}
								} )
								.catch( err => {
									eru.push(
										`http://${ host + i }:${ this.port }/:${err}`
									);
								} ) );
							i++;
						} else {
							clearInterval( r );
						}
					}, 100 );
				} else {
					promises.push( axios.get( `http://${ host }:${ this.port }/`, {
							params: {
								test: "test",
							},
							timeout: 1000
						} )
						.then( res => {
							if ( res.data == "test" ) {
								result.push( host );
							}
						} )
						.catch( err => {
							eru.push( `http://${ host }:${ this.port }/:${err}` );
						} ) );
				}
			} );

			Promise.all( promises )
				.then( () => {
					if ( result.length < 1 ) {
						this.tip( "未发现服务器" );
						return;
					}
					let er = 0;
					this.tip( "找到了可能的服务器: " + result.toString() );
					result.map( r => {
						axios.get( `http://${ this.ip }:${ this.port }/`, {
								params: {
									test: "test",
								}
							} )
							.then( res => {
								if ( res.data == "test" ) {
									this.ip = r;
								}
							} )
							.catch( err => {
								er++;
								if ( result.length == er ) {
									this.tip( "未发现服务器" );
									return;
								}
							} );
					} );
				} )
				.finally( () => {
					if ( result.length < 1 ) {
						this.tip( "未发现服务器" );
					}
					console.log( eru );
				} );

		},
		next() {
			if ( this.brand.length >= this.settings.maxe ) {
				this.tip( "元素数量超过上限" );
				this.playSound( "duong", false );
				return;
			}
			if ( this.connectType === 1 ) this.rounds++;
			this.quest();
			this.randEnv();
			axios.get( `http://${ this.ip }:${ this.port }/`, {
				params: {
					next: this.player,
					r: this.rounds,
				}
			} );
			this.a.play( this.d.$( "#showEle" ), "slidein 286ms" );
			setTimeout( function() {
				this.val = [];
				this.text = [];
			}.bind( this ), 286 );
			if ( this.connectType != 1 ) {
				this.newBrand();
			} else {
				this.cannext = false;
				this.newBrand();
			}
		},
		newBrand() {
			this.playSound( "budong" );
			let i = 0;
			this.pushing = true;
			this.inter.new = setInterval( function() {
					if ( i < this.perNewBrand ) {
						this.brand.push( this.random( prop ) );
					} else {
						this.pushing = false;
						clearInterval( this.inter.new );
					}
					i++;
				}.bind( this ),
				100 );
		},
		newPresent() {
			let es = Object.keys( this.chemist.elements );
			this.present.require = es[ this.randint( 0,
				es.length - 1 ) ];
		},
		getPresent() {
			let i = this.brand.indexOf( this.present.require );
			if ( i < 0 ) {
				this.tip( this.present.require + " 不足" );
				this.playSound( "duong", false );
				return;
			} else {
				this.brand.splice( i, 1 );
				this.present.require = "";
			}
			let r = this.chemist.x[
				this.randint( 0, this.chemist.x.length - 1 )
			];
			let w = r.f;
			let m = Object.keys( w );
			let z = m[ this.randint( 0, m.length - 1 ) ];
			this.maked.push( z );
			this.matcher.postMessage( [ this.maked, this.chemist.x ] );
			this.tip( "获得了: " + z );
		},
		random( p ) {
			let s = 0;
			let lastKey = null;
			// 计算有效键的总和并记录最后一个有效键
			for ( let key in p ) {
				if ( key[ 0 ] === "*" ) continue;
				s += p[ key ];
				lastKey = key; // 记录最后一个有效键
			}
			// 处理总和为0的情况（可选，根据需求调整）
			if ( s === 0 ) return null; // 或抛出错误，或返回默认键

			let r = Math.random();
			let cumulative = 0;
			// 遍历键并累加归一化后的概率
			for ( let key in p ) {
				if ( key[ 0 ] === "*" ) continue;
				cumulative += p[ key ] / s; // 归一化
				if ( r < cumulative ) return key;
			}
			return lastKey; // 处理浮点精度问题
		},
		recycle( i, e ) {
			this.playSound( "di" );
			const targetElement = e.target;
			if ( !targetElement || !this.maked[ i ] ) {
				return;
			}
			if ( !( targetElement.open ) ) {
				let d = document.createElement( "div" );
				let menu = targetElement.open = targetElement.insertAdjacentElement( "afterend",
					d );
				menu.style.width = "0px";
				menu.className = "madesMenu";
				menu.innerHTML = `
        <button class="menuBtn" style="background-color: #AFA;">回收</button>
        <br />
        <button class="menuBtn" style="background-color: #AFD;">反应</button>
        <br />
        <button class="menuBtn" style="background-color: #FAD;">中子</button>
        `;
				let recycleButton = menu.querySelector( ".menuBtn:nth-child(1)" );
				let reactionButton = menu.querySelector( ".menuBtn:nth-child(3)" );
				let nButton = menu.querySelector( ".menuBtn:nth-child(5)" );
				nButton.style.display = ( ( this.maked[ i ] == 'H<sub>2</sub>' || this.maked[ i ] == 'H-2' ) &&
					nButton
					.lastRound != this.rounds ) ? "inline-block" : "none";
				this.matcher.postMessage( [ this.maked, this.chemist.x ] );
				recycleButton.addEventListener( "click", function() {
					this.doRec( true, targetElement, i );
				}.bind( this ) );
				reactionButton.addEventListener( "click", function() {
					this.doRec( false, targetElement, i );
				}.bind( this ) );
				nButton && nButton.addEventListener( "click", function() {
					nButton.lastRound = this.rounds;
					let d = this.maked[ i ];
					let num = Number( this.maked[ i ].includes( "-" ) ? this.maked[ i ].split( "-" )[
						1 ] : 1 );
					let r = this.randint( 0, 9 );
					if ( r < 3 ) {
						this.maked[ i ] = "H-" + ( num + 1 );
						targetElement.querySelector( "b" ).innerHTML = this.maked[ i ];
						this.matcher.postMessage( [ this.maked, this.chemist.x ] );
						this.playSound( "dd" );
					} else {
						this.tip( `未击中 ${r}/2` );
					}
					nButton.style.display = "none";
				}.bind( this ) );
				targetElement.open.style.display = "inline-block";
				this.inter.menu = setTimeout( () => {
						targetElement.open.style.width = "calc(10% - 6px)";
						targetElement.open.style.opacity = 1;
					},
					132 );
			} else if ( targetElement.open.style.width != "0px" ) {
				targetElement.open.style.width = "0px";
				targetElement.open.style.opacity = 0;
				this.inter.menu = setTimeout( function() {
					//targetElement.open.style.display = "none";
				}, 386 );
			} else {
				//targetElement.open.style.display = "inline";
				this.inter.menu = setTimeout( () => {
					targetElement.open.style.width = "calc(10% - 6px)";
					targetElement.open.style.opacity = 1;
				}, 0 );
				let nButton = targetElement.open.querySelector( ".menuBtn:nth-child(5)" );
				nButton.style.display = ( ( this.maked[ i ] == 'H<sub>2</sub>' || this.maked[ i ] == 'H-2' ) &&
					nButton
					.lastRound != this.rounds ) ? "inline-block" : "none";
			}
		},
		doRec( method, targetElement, i ) {
			if ( method ) {
				let k = Math.ceil( this.maked[ i ].split( "" ).length / 2 * ( 1 + this.attrs.dj * 0.1 ) );
				this.force += k;
				this.tip( "元素力 <span style='color:#AFA'>+" + k );
			} else {
				this.addInObj( this.f, this.maked[ i ] );
				this.matcher.postMessage( [ this.maked, this.chemist.x ] );
				this.setLvl();
			}
			this.playSound( "ga" );
			this.a.play( targetElement, "jslidein 386ms", 0 );
			targetElement.open.style.width = "0px";
			targetElement.open.style.opacity = 0;
			setTimeout( function() {
				this.removeMaked( i, targetElement );
			}.bind( this ), 386 );
		},
		startRec( e ) {
			e.target.style.backgroundColor = "#8A8";
			this.inter.rec = setInterval( () => {
				const targetElement = this.d.$$( ".mades" )[ 0 ];
				let k = Math.ceil( this.maked[ 0 ].split( "" ).length / 2 * ( 1 + this.attrs.dj *
					0.1 ) );
				this.force += k;
				this.tip( "元素力 <span style='color:#AFA'>+" + k );
				this.playSound( "ga" );
				this.a.play( targetElement, "slidein 186ms", 0 );
				setTimeout( function() {
					this.removeMaked( 0, targetElement );
				}.bind( this ), 186 );
			}, 300 );
		},
		stopRec( e ) {
			clearInterval( this.inter.rec );
			e.target.style.backgroundColor = "#585";
		},
		removeMaked( i, e = false ) {
			this.maked.splice( i, 1 );
			this.matcher.postMessage( [ this.maked, this.chemist.x ] );
		},
		isEq( a, b ) {
			let k1 = Object.keys( a ).sort();
			let k2 = Object.keys( b ).sort();
			if ( k1.length != k2.length ) {
				return false;
			}
			for ( let i = 0; i < k1.length; i++ ) {
				if ( a[ k1[ i ] ] != b[ k2[ i ] ] || k1[ i ] != k2[ i ] ) {
					return false;
				}
			}
			this.playSound( "cilllllll", false );
			return true;
		},
		fail( msg = "反应失败" ) {
			this.tip( msg );
			let allf = [];
			for ( let key in this.f ) {
				Array.prototype.push.apply( allf, new Array( this.f[ key ] ).fill( key ) );
			}
			Array.prototype.push.apply( this.maked, this.randArr( allf, this.env.suc ) );
			this.matcher.postMessage( [ this.maked, this.chemist.x ] );
			this.f = {};
			this.playSound( "duong", false );
		},
		randArr( arr, percentage ) {
			let numElements = Math.floor( arr.length * ( percentage / 100 ) );
			let shuffledArray = [ ...arr ]; // 创建数组副本
			let len = shuffledArray.length;
			for ( let i = len - 1; i > 0; i-- ) {
				let randomIndex = Math.floor( Math.random() * ( i + 1 ) );
				[ shuffledArray[ i ],
					shuffledArray[ randomIndex ]
				] = [ shuffledArray[ randomIndex ],
					shuffledArray[ i ]
				];
			}
			return shuffledArray.slice( 0, numElements );
		},
		isIn( a, b ) {
			if ( b == "*" ) {
				return true;
			}
			let k1 = Object.keys( a ).sort();
			let k2 = b.split( "+" ).sort();
			let res = true;
			for ( let i = 0; i < k2.length; i++ ) {
				res = ( res && k1.includes( k2[ i ] ) );
			}
			return res;
		},
		findEq( f ) {
			if ( this.force < this.fcost ) {
				this.tip( "元素力不足!" );
				return;
			}
			for ( let i = 0; i < this.chemist.x.length; i++ ) {
				if ( this.isEq( this.chemist.x[ i ].f, f ) ) {
					let crt = this.chemist.x[ i ];
					if ( crt.hasOwnProperty( "cost" ) ) {
						if ( this.force >= crt.cost ) {
							this.force -= crt.cost;
						} else {
							this.tip( `元素力不足 ${this.force}/${crt.cost}` );
							return;
						}
					}
					if ( crt.t.hasOwnProperty( "H<sub>2</sub>O" ) && !this.usingt.effect.prevent.includes(
							"wet" ) ) {
						this.env.now = this.chemist.env.wet;
						this.env.cd = crt.t[ "H<sub>2</sub>O" ];
					}
					if ( crt.hasOwnProperty( "env" ) && !this.usingt.effect.prevent.includes( crt.env.key ) ) {
						this.env.now = this.chemist.env[ crt.env.key ];
						if ( this.env.cd ) {
							this.env.cd = crt.env.cd;
						}
					}
					if ( this.randint( 0, 100 ) > ( this.env.now.effect.suc[ ( this.chemist.x[ i ].y > 0 ) ? 0 :
								1 ] +
							this.env.suc ) ) {
						this.fail();
						return;
					}
					this.t = this.chemist.x[ i ];
					return;
				}
			}
			this.fail( "反应不存在" );
		},
		clear() {
			this.confirm( "将废弃物倒入指定容器？", function( t ) {
				if ( t ) {
					this.doClear();
				}
			}.bind( this ) );
		},
		doClear() {
			this.playSound( "ga" );
			this.a.play( this.d.$( "#showEle" ),
				"slidein 386ms" );
			setTimeout( function() {
					this.val = [];
					this.text = [];
				}.bind( this ),
				386 );
		},
		save( obj,
			pd = false,
			lvl = false,
			rece = false ) {
			let arr = [];
			for ( let key in obj ) {
				Array.prototype.push.apply( arr, new Array( obj[ key ] ).fill( key ) );
			}
			if ( pd ) {
				this.comh();
				if ( !this.t.cost ) {
					this.fcost += 10;
				}
			}
			if ( pd && this.env.now.cost == "U" && this.randint( 0, 1 ) == 1 ) {
				let r = this.chemist.x[
					this.randint( 0, this.chemist.x.length - 1 )
				];
				let w = r.t;
				let m = Object.keys( w );
				let z = m[ this.randint( 0, m.length - 1 ) ];
				let n = this.randint( 0, arr.length - 1 );
				this.tip( arr[ n ] + "-->" + z );
				arr[ n ] = z;
			}
			Array.prototype.push.apply( this.maked, arr );
			this.matcher.postMessage( [ this.maked, this.chemist.x ] );
			this.f = {};
			if ( lvl ) this.setLvl();
			this.t = {};
			this.playSound( "dd" );
		},
		addtEffect() {
			if ( this.usingt.added ) {
				this.env.suc -= this.usingt.effect.suc;
				this.env.now.effect.end /= this.usingt.effect.end;
				this.env.now.effect.exo /= this.usingt.effect.exo;
				this.usingt.added = false;
			} else {
				this.env.suc += this.usingt.effect.suc;
				this.env.now.effect.end *= this.usingt.effect.end;
				this.env.now.effect.exo *= this.usingt.effect.exo;
				this.usingt.added = true;
			}
		},
		randEnv() {
			this.env.cd--;
			this.env.suc = this.randint( 600, 1000 ) / 10;
			this.usingt.added = false;
			this.addtEffect();
			if ( this.env.cd <= 0 ) {
				let k = Object.keys( this.chemist.env );
				this.env.now = this.chemist.env[ k[ this.randint( 0, k.length - 1 ) ] ];
				this.env.cd = this.env.now.dur;
			} else if ( this.env.now.cost = "H<sub>2</sub>O" && this.randint( 0, 18 ) == 6 ) {
				let rx = this.maked.splice( this.randint( 0, this.maked.length - 1 ), 1 )[ 0 ];
				this.matcher.postMessage( [ this.maked, this.chemist.x ] );
				this.confirm( `环境潮湿，恭喜您成为"滑铲大蛇"，打碎了一瓶试剂(${rx})!` );
				this.playSound( "duong", false );
			}
		},
		createSettings( config = {
			name: "",
			key: "",
			attrs: {},
			value: "",
			temp: false,
			cust: false,
			more: "",
			stateChange: function() {},
		} ) {
			this.settings[ config.key ] = config.value;
			this.modSettings[ config.key ] = config;
			return;
		},
		comh( h ) {
			let k = {
				h1: 0,
				h2: 0,
			};
			let nh = h || this.t.y;
			let keyname = "max" + ( this.player == "p1" ? "p2" : "p1" );
			let mag = 1 + this.attrs.psf / 100;
			let realh = nh;
			if ( realh > 0 ) {
				realh *= mag;
			} else {
				realh *= this.msg[ keyname ] / 100;
			}
			if ( this.env.now ) {
				if ( nh > 0 ) {
					realh *= this.env.now.effect.end;
				} else {
					realh *= this.env.now.effect.exo;
				}
			}
			realh = Number( realh.toFixed( 1 ) );
			let tipstr = ( nh > 0 ? ( "<span style='color:#AAF'>" + nh + "(" + realh + ")" ) : (
				"<span style='color:#FAA'>" + ( -nh ) + "(" + -realh + ")" ) );
			this.tip( ( h ? "制取: " : "反应: " ) + tipstr );
			if ( nh > 0 ) {
				this.h1 += realh;
				k.h1 += realh;
			} else {
				this.h2 -= realh;
				k.h2 -= realh;
			}
			if ( this.connectType === 1 ) this.setMsg( k );
			this.updateMsg();
		},
		pdif() {
			if ( this.rounds <= this.msg[ ( this.player == "p1" ? "p2" : "p1" ) + "e" ] ) {
				this.cannext = true;
			}
			if ( this.msg.ht1 > this.maxh ) {
				this.handbook = false;
				this.reaction = false;
				this.fty = false;
				if ( !this.h ) {
					this.change( "h", true );
				}
				setTimeout( function() {
						clearTimeout( this.inter.msg );
						if ( this.player == "p1" ) {
							this.tip( `
              你已
              <span style="color: #FAA">热寂</span>
              ` );
						} else {
							this.tip( `
              对手已
              <span style="color: #AAF">热寂</span>
              ` );
						}
						this.countdown();
					}.bind( this ),
					206 );
			} else if ( this.msg.ht2 > this.maxh ) {
				this.handbook = false;
				this.reaction = false;
				this.fty = false;
				if ( !this.h ) {
					this.change( "h", true );
				}
				setTimeout( function() {
						clearTimeout( this.inter.msg );
						if ( this.player == "p2" ) {
							this.tip( `
              你已
              <span style="color: #FAA">热寂</span>
              ` );
						} else {
							this.tip( `
              对手已
              <span style="color: #AAF">热寂</span>
              ` );
						}
						this.countdown();
					}.bind( this ),
					206 );
			}
		},
		countdown() {
			document.body.style.overflow = "hidden";
			document.body.style.pointerEvents = "none";
			this.d.$( "#app" ).style.overflow = "hidden";
			setTimeout( this.tip,
				3000,
				"[即将重新开始] 3s" );
			setTimeout( this.tip,
				4000,
				"[即将重新开始] 2s", false );
			setTimeout( this.tip,
				5000,
				"[即将重新开始] 1s", false );
			setTimeout( this.reset,
				6000 );
		},
		choosep( p ) {
			if ( p ) {
				this.player = "p1";
			} else {
				this.player = "p2";
			}
			this.playSound( "ziya" );
		},
		chooseFont( p ) {
			if ( p ) {
				this.settings.font = "consola";
				this.sfs( {
					target: {
						value: 100
					}
				} );
			} else {
				this.settings.font = "silver";
				this.sfs( {
					target: {
						value: 103
					}
				} );
			}
			document.documentElement.style.setProperty( "--font", this.settings.font );
			this.playSound( "ziya" );
		},
		alt( type ) {
			this.playSound( "ta" );
			this.alting = type;
			if ( !type ) {
				this.addInObj( this.text, "(" + this.press( this.alts ) + ")" );
				this.alts = {};
			}
		},
		tryConnect() {
			if ( this.connectType == 1 ) {
				clearInterval( this.inter.msg );
				this.connectType = 0;
				this.rounds = 0;
				this.msg = {
					ht1: 0,
					ht2: 0,
					maxp1: 100,
					maxp2: 100,
					p1e: 0,
					p2e: 0,
					modVar: {},
				};
				this.maked = [];
				this.brand = [];
				this.cannext = true;
				axios.get( `http://${ this.ip }:${ this.port }/`, {
						params: {
							reset: true,
						}
					} )
					.catch( err => {
						this.connectType = -1;
						this.err = err;
					} );
				return;
			}
			this.connectType = 2;
			this.err = "";
			axios.get( `http://${ this.ip }:${ this.port }/`, {
					params: {
						test: "test",
					},
					timeout: 1000
				} )
				.then( res => {
					if ( res.data == "test" ) {
						this.connectType = 1;
						this.next();
						this.tip( `
            <span style="color:#8F8">
            ${this.typemsg[this.connectType]}
            </span>
            ` );
						if ( !this.inter.msg ) {
							this.inter.msg = setInterval( this.updateMsg,
								500 );
						}
					}
				} )
				.catch( err => {
					this.connectType = -1;
					this.err = err;
					this.tip( `
          <span style="color:#F88">
          ${this.typemsg[this.connectType]}
          </span>
          ` );
				} );
		},
		updateMsg() {
			if ( this.connectType === 1 ) {
				this.getMsg( function( res ) {
					this.msg = res.data;
					this.pdif();
				}.bind( this ) );
			} else if ( this.connectType == -1 ) {
				clearInterval( this.inter.msg );
			}
		},
		setMsg( k = {
			h1: 0,
			h2: 0
		} ) {
			axios.get( `http://${ this.ip }:${ this.port }/`, {
					params: {
						h1: k.h1,
						h2: k.h2,
						p: this.player,
						max: this.msg[ "max" + this.player ],
					}
				} )
				.then( res => {
					this.connectType = 1;
				} )
				.catch( err => {
					this.connectType = -1;
					this.err = err;
					this.tip( `
					<span style="color:#F88">
					${this.typemsg[this.connectType]}
					</span>
					` );
				} );
		},
		getMsg( callback ) {
			axios.get( `http://${ this.ip }:${ this.port }/`, {
					params: {
						msg: true,
					}
				} )
				.then( res => {
					this.connectType = 1;
					callback( res );
				} )
				.catch( err => {
					this.connectType = -1;
					this.err = err;
					this.tip( `
					<span style="color:#F88">
					${this.typemsg[this.connectType]}
					</span>
					` );
				} );
		},
		reset( rel = true ) {
			this.msg = {
				ht1: 0,
				ht2: 0,
			};
			if ( this.connectType != 1 ) {
				if ( rel ) location = location;
			}
			axios.get( `http://${ this.ip }:${ this.port }/`, {
					params: {
						reset: true,
					}
				} )
				.then( res => {
					this.connectType = 0;
					if ( rel ) location = location;
				} )
				.catch( err => {
					this.connectType = -1;
					this.err = err;
				} );
		},
		altRecycle() {
			this.make();
			let i = this.maked.length - 1;
			let k = Math.ceil( this.maked[ i ].split( "" ).length / 2 * ( 1 + this.attrs.dj * 0.1 ) );
			this.force += k;
			setTimeout( () => {
				this.removeMaked( i );
				this.tip( "元素力 <span style='color:#AFA'>+" + k );
				this.playSound( "ga" );
			}, 0 );
		},
		saveSettings() {
			localStorage.settings = JSON.stringify( this.settings );
		},
		loadSettings() {
			if ( localStorage.settings ) {
				this.settings = JSON.parse( localStorage.settings );
			}
			if ( localStorage.ip ) {
				this.ip = localStorage.ip;
			}
			if ( localStorage.p ) {
				this.player = localStorage.p;
			}
			if ( localStorage.acts ) {
				let acts = JSON.parse( localStorage.acts );
				this.acts = acts;
				for ( let key in this.acts ) {
					this.acts[ key ].con = false;
				}
			}
			if ( localStorage.equi ) {
				let equi = JSON.parse( localStorage.equi );
				this.equi = equi;
				for ( let key in this.equi ) {
					this.equi[ key ].con = false;
				}
			}
			if ( localStorage.crystal ) {
				this.crystal = Number( localStorage.crystal );
			}
		},
		opd() {
			let sd = this.d.$( "#setb" );
			if ( sd.className == "closed" ) {
				sd.className = "opend";
			} else {
				sd.className = "closed";
			}
		},
		buy( key ) {
			if ( key[ 0 ] == "*" ) {
				let idx = this.maked.indexOf( prop[ key ] );
				if ( idx > -1 ) {
					if ( this.attrs[ key.replace( "*", "" ) ] < 50 ) {
						this.removeMaked( idx );
						this.setAttr( key );
						this.tip( this.attrTom[ key.replace( "*", "" ) ] + " +1" );
					} else {
						this.tip( "该属性已到达上限" );
					}
				} else {
					this.tip( prop[ key ] + " 不足" );
					this.playSound( "duong", false );
				}
				return;
			}
			if ( this.force >= this.goods[ key ] ) {
				this.force -= this.goods[ key ];
				this.goods[ key ] = Math.floor( 1.01 * this.goods[ key ] + 1 );
				this.brand.push( key );
				this.tip( "购买了: " + key + " *1" );
				this.playSound( "cilllllll", false );
			} else {
				this.tip( "元素力不足" );
				this.playSound( "duong", false );
			}
		},
		checkQueue( array, targetString ) {
			// 检查数组长度是否至少为3
			if ( array.length < 3 ) {
				return false;
			}

			// 获取数组末尾的三个元素
			const lastThreeElements = array.slice( -3 );

			// 检查这三个元素是否都等于目标字符串
			return lastThreeElements.every( element => element === targetString );
		},
		tip( msg, rep ) {
			if ( !this.checkQueue( this.tipQueue, msg ) ) {
				// 将消息添加到队列
				this.tipQueue.push( msg );
			}
			// 如果当前没有正在显示的提示，则显示下一个提示
			if ( !this.isTipShowing || rep ) {
				this.showNextTip();
			}
		},
		showNextTip() {
			if ( this.tipQueue.length === 0 ) {
				this.isTipShowing = false; // 没有提示时，设置为未显示状态
				return;
			}
			this.isTipShowing = true; // 设置为正在显示状态
			const msg = this.tipQueue.shift(); // 从队列中取出下一个提示
			let t = this.d.$( "#tip" );
			t.innerHTML = msg;
			t.style.opacity = 0.8;
			this.inter.tip = setTimeout( () => {
				t.style.opacity = 0;
				setTimeout( () => {
					this.isTipShowing = false; // 提示完成后，设置为未显示状态
					this.showNextTip(); // 显示下一个提示
				}, 400 );
			}, 2198 );
		},
		confirm( msg, f = function() {}, ym = "确认", nm = "取消" ) {
			this.playSound( "ta" );
			let t = this.d.$( "#conf" );
			t.innerHTML = `
      <p>${msg}</p>
      <button class="menuBtn" style="background-color: #AFA;width: calc(50% - 8px)">${ym}</button>
      <button class="menuBtn" style="background-color: #FAA;width: calc(50% - 8px)">${nm}</button>
      `;
			t.style.opacity = 0.8;
			t.style.pointerEvents = "all";
			t.querySelector( ".menuBtn:nth-child(2)" ).addEventListener( "click", function() {
				f( true );
				t.style.opacity = 0;
				t.style.pointerEvents = "none";
			} );
			t.querySelector( ".menuBtn:nth-child(3)" ).addEventListener( "click", function() {
				f( false );
				t.style.opacity = 0;
				t.style.pointerEvents = "none";
			} );
		},
		search( text ) {
			this.searchRes = [];
			for ( let i = 0; i < this.chemist.x.length; i++ ) {
				if ( this.isIn( this.chemist.x[ i ].f, text.replace( /\*(\d+)/g, "<sub>$1</sub>" ) ) || this
					.isIn( this
						.chemist.x[ i ].t, text.replace( /\*(\d)/g, "<sub>$1</sub>" ) ) ) {
					let p = this.chemist.x[ i ];
					p.sv = false;
					this.searchRes.push( p );
				}
			}
			this.playSound( "ding" );
		},
		setAttr( key ) {
			let k = key.replace( "*", "" );
			this.attrs[ k ]++;
			switch ( key ) {
				case "*hkx":
					this.msg[ "max" + this.player ] = ( 100 - this.attrs[ k ] / 100 );
					this.setMsg();
					break;
				case "*fz":
					let x = Math.round( 0.5 * this.h1 + 1000 / this.h1 );
					this.h2 += x;
					this.h1 = 0;
					this.setMsg( {
						h1: -x,
						h2: x,
					} );
					break;
			}
		},
		toggleDetails( event ) {
			this.playSound( "di" );
			let details = event.target.closest( ".details" );
			if ( details.open ) {
				details.style.maxHeight = details.scrollHeight + "px";
				setTimeout( () => {
					details.style.maxHeight = '1em';
					details.style.opacity = 0.5;
				}, 10 );
			} else {
				details.style.maxHeight = details.scrollHeight + "px";
				details.style.opacity = 1;
			}
			details.open = !details.open;
		},
		quest() {
			if ( this.rounds % 3 != 0 ) {
				return;
			}
			this.newPresent();
			let r = this.chemist.x[
				this.randint( 0, this.chemist.x.length - 1 )
			];
			let w = r.f;
			let m = Object.keys( w );
			let z = m[ this.randint( 0, m.length - 1 ) ];
			this.quests.push( {
				f: z,
				t: Math.floor( Math.abs( r.y / 12 ) ),
			} );

		},
		randint( min, max ) {
			let c = max - min + 1;
			return Math.floor( Math.random() * c + min );
		},
		isQuest( text ) {
			if ( this.quests.length === 0 ) {
				return;
			}
			if ( text == this.quests[ 0 ].f ) {
				this.force += this.quests[ 0 ].t;
				this.quests.splice( 0, 1 );
			}
		},
		playSound( name, inter = true ) {
			let d = this.d.$( "#aud" );
			if ( inter ) {
				d.src = `media/sounds/${name}.wav`;
				d.play();
			} else {
				if ( this.inter.audio ) {
					return;
				}
				d = new Audio();
				d.src = `media/sounds/${name}.wav`;
				d.play();
				this.inter.audio = setTimeout( () => {
					this.inter.audio = false;
				}, 100 );
			}
		},
		hidb() {
			this.playSound( "huu", false );
			if ( this.openBottomline ) {
				this.openBottomline = false;
			} else {
				this.openBottomline = true;
				if ( !this.settings.as ) {
					return;
				}
				this.sorter.onmessage = function( event ) {
					this.brand = event.data;
				}.bind( this );
				this.sorter.postMessage( this.brand );
			}
		},
		explain( key ) {
			if ( smsg.hasOwnProperty( key ) ) {
				this.confirm( smsg[ key ] );
			}
		},
		setLvl( key = false ) {
			if ( !key ) {
				for ( let k in this.acts ) {
					this.setLvl( k );
				}
				return;
			}
			this.prop[ key ] = prop[ key ] + Math.sqrt( this.acts[ key ].lvl / 10000 );
			let fstr = JSON.stringify( this.f );
			let adn = Math.pow( this.acts[ key ].lvl * 3, 0.8 );
			this.env.suc += adn;
			if ( fstr.includes( "Hg" ) || !fstr.includes( key ) ) {
				this.env.suc -= adn;
				if ( this.acts[ key ].added ) {
					this.env.suc -= adn;
					this.acts[ key ].added = false;
				}
			} else if ( fstr.includes( key ) ) {
				this.acts[ key ].added = true;
			}
		},
		changeForm( type, v = false, e = false ) {
			if ( type ) {
				this.inter.form = setTimeout( () => {
					this.a.play( e.target, "jslidein 452ms forwards", 0, false );
					setTimeout( () => {
						v.form = !v.form;
					}, 452 );
					setTimeout( () => {
						this.a.play( e.target, "jslideout 452ms forwards", 0, false );
					}, 532 );
				}, 800 );
			} else {
				clearTimeout( this.inter.form );
			}
		},
		lvlUp( k, v ) {
			let i = this.maked.indexOf( this.chemist.sub[ k ] );
			if ( i > -1 ) {
				this.removeMaked( i );
				v.xp++;
				this.playSound( "cilllllll", false );
				if ( v.xp >= prop[ k ] * 1000 ) {
					v.lvl++;
					v.xp -= prop[ k ] * 1000;
					this.playSound( "liang", false );
				}
				this.setLvl( k );
				localStorage.acts = JSON.stringify( this.acts );
			} else {
				this.tip( k + " 不足" );
				this.playSound( "duong", false );
			}
		},
		changeEnv( key ) {
			let n = this.chemist.env[ key ];
			this.confirm( `确定要${n.name}吗？`, function( t ) {
				if ( t ) {
					let idx = this.maked.indexOf( n.cost );
					if ( idx > -1 ) {
						this.removeMaked( idx );
						this.env.now = n;
						this.env.cd = 1;
						this.playSound( "ziya" );
					} else {
						this.tip( n.cost + " 不足" );
						this.playSound( "duong", false );
					}
				}
			}.bind( this ) );
		},
		removeBlur( e ) {
			let c;
			if ( typeof e == "object" ) {
				c = e.target.checked;
			} else {
				c = e;
			}
			this.toggleStyles( {
				opacity: 1,
				backdropFilter: "none",
				boxShadow: "none",
				textShadow: "none",
				backgroundImage: "none",
				transition: "none",
				animation: "empty 10ms",
			}, c );
			localStorage.ee = c;
		},
		toggleStyles( config, enable ) {
			let sheet = document.styleSheets[ 0 ];
			let cssString = "";
			for ( let key in config ) {
				let cssValue = config[ key ];
				let cssKey = this.toKebabCase( key );
				cssString += `\n  ${cssKey}: ${cssValue} !important;`;
			}
			if ( enable ) {
				sheet.deleteRule( this.cssStore );
			} else {
				this.cssStore = sheet.cssRules.length;
				sheet.insertRule(
					`*:not(img):not(#tip):not(#conf):not(#more):not(.details *):not(.details) {${cssString}}`,
					sheet.cssRules.length );
			}
		},
		toKebabCase( str ) {
			return str.replace( /([a-z])([A-Z])/g,
				'$1-$2' ).toLowerCase()
		},
		sfs( e ) {
			this.settings.fs = e.target.value;
			document.documentElement.style.setProperty( "--fs",
				this.settings.fs + "%" );
		},
		showCount( i,
			value ) {
			let d = this.d.$$( ".brand" )[ i ];
			if ( d ) {
				let n = d.children[ 0 ];
				if ( n.innerText != value && value > 1 ) {
					n.style.fontSize = "100%";
					n.style.color = "#FE8";
					setTimeout( () => {
						n.style.fontSize = "90%";
						n.style.color = "#888";
					}, 384 );
				}
			}
			return value > 1 ? value : "";
		},
		showAct( k, v, e, f = false ) {
			v.con = !v.con;
			f && ( this.detailsQue.o = v.con );
			this.playSound( "huu", false );
		},
		showSv( value ) {
			value.sv = !value.sv;
			this.$forceUpdate();
			this.playSound( "di" );
		},
		doDraw( cb = false, i = 0, im = true ) {
			let res = true;
			if ( this.crystal > 0 ) {
				this.crystal--;
				if ( Math.random() < 0.97 ) {
					let r = this.chemist.x[
						this.randint( 0, this.chemist.x.length - 1 )
					];
					let m = Object.keys( r.f ).concat( Object.keys( r.t ) );
					let z = m[ this.randint( 0, m.length - 1 ) ];
					this.maked.push( z );
					this.matcher.postMessage( [ this.maked, this.chemist.x ] );
					im && this.impe( `<b>${z}</b>` );
					res = `<b>${z}</b>`;
				} else if ( Math.random() < 0.6 ) {
					let r = Object.keys( this.chemist.acts );
					let m = r[ this.randint( 0, r.length - 1 ) ];
					let z = this.chemist.acts[ m ];
					if ( this.acts.hasOwnProperty( m ) ) {
						this.acts[ m ].lvl++;
					} else {
						this.acts[ m ] = z;
					}
					im && this.impe( `<img src="img/act/${m}/a.png" />` );
					res = `<img src="img/act/${m}/a.png" />`;
				} else {
					let r = Object.keys( this.chemist.equi );
					let m = r[ this.randint( 0, r.length - 1 ) ];
					let z = this.chemist.equi[ m ];
					if ( this.equi.hasOwnProperty( m ) ) {
						this.crystal += 99;
					} else {
						this.equi[ m ] = z;
					}
					im && this.impe( `<img src="img/equi/${m}.png" />` );
					res = `<img src="img/equi/${m}.png" />`;
				}
				localStorage.acts = JSON.stringify( this.acts );

				localStorage.equi = JSON.stringify( this.equi );
				if ( i == 0 ) this.playSound( "liang", false );
			} else if ( !cb ) {
				this.confirm( "晶体不足，是否使用30元素力购买?", ( t ) => {
					if ( t ) {
						if ( this.force >= 30 ) {
							this.force -= 30;
							this.crystal++;
							this.tip( "购买了: 晶体*1" );
						} else {
							this.tip( "元素力不足" );
							this.playSound( "duong", false );
						}
					}
				} );
			} else {
				return cb();
			}
			return res;
		},
		impe( m = false ) {
			this.playSound( "ta" );
			if ( m ) {
				this.impeQue.push( m );
			} else {
				this.imped = false;
			}
			if ( this.imped ) {
				return;
			}
			if ( this.impeQue[ 0 ] ) {
				this.imped = true;
				this.d.$( "#impeh" ).innerHTML = this.impeQue[ 0 ];
				this.d.$( "#impeh" ).style.display = "block";
				const ele = this.d.$( "#impeh img" ) || this.d.$( "#impeh b" );
				ele.addEventListener( "animationend", () => {
					this.playing = false;
				} );
				this.drawQue.push( this.impeQue[ 0 ] );
				this.impeQue.shift();
				this.playing = true;
				setTimeout( () => {
					this.d.$( "#impeh" ).style.opacity = 1;
				}, 50 );
			} else if ( this.impeQue.length <= 0 ) {
				this.d.$( "#impeh" ).style.opacity = 0;
				setTimeout( () => {
					this.imped = false;
					this.d.$( "#impeh" ).style.display = "none";
				}, 384 );
			}
		},
		altDraw() {
			this.impeQue = [];
			this.drawQue = [];
			for ( let i = 0; i < 10; i++ ) {
				if ( !this.doDraw( () => {
						this.confirm( "晶体不足，是否使用300元素力购买?", ( t ) => {
							if ( t ) {
								if ( this.force >= 300 ) {
									this.force -= 300;
									this.crystal += 10;
									this.tip( "购买了: 晶体*10" );
								} else {
									this.tip( "元素力不足" );
									this.playSound( "duong", false );
								}
							}
							return false;
						} );
					}, i ) ) {
					return;
				}
			}
		},
		oneDraw() {
			this.drawQue = [];
			this.imped = true;
			let m = this.doDraw( false, 0, false );
			if ( m === true ) {
				return;
			}
			this.d.$( "#impeh" ).style.display = "block";
			this.d.$( "#impeh" ).innerHTML = m;
			setTimeout( () => {
				this.d.$( "#impeh" ).style.opacity = 1;
				const ele = this.d.$( "#impeh img" ) || this.d.$( "#impeh b" );
				ele.addEventListener( "animationend", () => {
					this.playing = false;
				} );
			}, 0 );
		},
		excrystal() {
			this.confirm( `
      <input type="range" id="rangec"  max="${Math.floor(this.force / 30)}" min="0" value="0" step="1" />
	  <br />
      <span id="numc" style="color: #FFF">0</span>
      `, ( t ) => {
				if ( t ) {
					this.force -= Number( this.d.$( "#numc" ).innerHTML ) * 30;
					this.crystal += Number( this.d.$( "#numc" ).innerHTML );
					this.playSound( "liang", false );
				}
			} );
			this.d.$( "#rangec" ).addEventListener( "input",
				( e ) => {
					this.d.$( "#numc" ).innerHTML = e.target.value;
				} )
		},
		exforce() {
			this.confirm( `
      <input type="range" id="rangec"  max="${Math.floor(this.crystal * 30)}" min="0" value="0" step="30" />
	  <br />
      <span id="numc" style="color: #FFF">0</span>
      `,
				( t ) => {
					if ( t ) {
						this.force += Number( this.d.$( "#numc" ).innerHTML );
						this.crystal -= Math.round( Number( this.d.$( "#numc" ).innerHTML ) / 30 );
						this.playSound( "liang", false );
					}
				} );
			this.d.$( "#rangec" ).addEventListener( "input",
				( e ) => {
					this.d.$( "#numc" ).innerHTML = e.target.value;
				} )
		},
		uset( key,
			value ) {
			this.playSound( "cilllllll",
				false );
			if ( this.usingt.name != value.name ) {
				if ( this.usingt.added ) {
					this.addtEffect();
				}
				this.usingt = value;
			} else {
				if ( this.usingt.added ) {
					this.addtEffect();
				}
				this.usingt = {
					effect: {
						exo: 1,
						end: 1,
						suc: 0,
						prevent: [],
					},
					added: false,
				};
				return;
			}
			this.addtEffect();
		},
		stcry() {
			const n = Math.round( ( this.h1 + this.h2 ) / 320 + this.randint( 0, ( this.h1 + this.h2 ) /
				640 ) );
			this.crystal += n;
			this.tip( "凝聚晶体 " + n );
			this.h1 = 0;
			this.h2 = 0;

		},

		queryCom( query ) {
			axios.get(
					`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/record/JSON/?record_type=2d`
				)
				.then( res => {
					console.log( res.data );
				} )
				.catch( err => {
					console.log( err );
				} );
		},
		giveUp() {
			axios.get( `http://${ this.ip }:${ this.port }/`, {
					params: {
						h1: 0,
						h2: this.maxh + 1,
						p: this.player == "p1" ? "p2" : "p1",
						max: this.msg[ "max" + this.player ],
					}
				} )
				.then( res => {
					this.connectType = 1;
				} )
				.catch( err => {
					this.connectType = -1;
					this.err = err;
					this.tip( `
					<span style="color:#F88">
					${this.typemsg[this.connectType]}
					</span>
					` );
				} );
		},
	},

	watch: {
		h() {
			this.saveSettings();
		},
		val() {
			this.combine( this.val );
		},
		ip() {
			localStorage.ip = this.ip;
		},
		player() {
			localStorage.p = this.player;
		},
		"settings.am"() {
			if ( this.settings.am ) {
				document.body.style.backgroundColor = "#000";
				document.body.style.color = "#FFF";
				document.body.style.filter = "brightness(0.7) contrast(1.4) grayscale(0.4)";
			} else {
				document.body.style.backgroundColor = "#FFF";
				document.body.style.color = "#000";
				document.body.style.filter = "none";
			}
		},
		crystal() {
			localStorage.crystal = this.crystal;
		},
	},

} );