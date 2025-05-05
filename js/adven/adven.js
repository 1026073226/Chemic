window.addEventListener( "error", oe );

function oe( e ) {
	prompt( "发生错误: ", e.error.stack );
}
window.addEventListener( "beforeunload", ( event ) => {
	destroyGame();
	return true;
} );

function destroyGame() {
	localStorage.QUALITY = QUALITY;
	if ( game ) {
		if ( game.load ) game.load.reset();
		game.destroy( true );
		game = null;
	}
}
const acts = JSON.parse( new URLSearchParams( window.location.search ).get( "acts" ) );
var actList = [
	'O'
];
var loaded = 0;
var bgm;
var QUALITY = localStorage.QUALITY ? Number(localStorage.QUALITY) : 1;
var MAX_PARTICLES = 100 * Math.sqrt( QUALITY );
const settings = JSON.parse( localStorage.settings || "false" );
const decos = [ "flower", "rock", "mushroom", "anthemy", "thick" ];
//道具列表
const POWERUPS = {
	speed: {
		texture: 'powerup_speed',
		duration: 10000,
		effect( player ) {
			player.originalSpeed = player.originalSpeed || this.MOVE_SPEED;
			this.MOVE_SPEED *= 1.2;
			CURRENT_EFFECTS.speed = {
				color: "#75FE86",
				icon: "⏩",
			};
		},
		clear( player ) {
			this.MOVE_SPEED = player.originalSpeed;
			CURRENT_EFFECTS.speed = null; // 清除状态
		},
	},
	shield: {
		texture: 'powerup_shield',
		duration: 1000,
		effect( player ) {
			CURRENT_EFFECTS.shield = {
				color: "#65FEF8",
				icon: "❄️",
			};
			this.shieldLooper = this.time.addEvent( {
				callback: () => {
					this.currentEntropy -= 0.1;
				},
				delay: 10,
				loop: true,
			} );
		},
		clear( player ) {
			CURRENT_EFFECTS.shield = null; // 清除状态
			this.time.removeEvent( this.shieldLooper );
		},
	}
};
const CURRENT_EFFECTS = {};
if ( acts ) {
	actList = Object.keys( acts );
}

function setTp() {
	loadTp.style = 'width:calc(' + loaded + '% - 10px);background-color:rgb(198, 255,' + ( loaded * 1.28 + 127 ) + ')';
}
/* 预加载场景 */
class PreloadScene extends Phaser.Scene {
	constructor() {
		super( 'PreloadScene' );
		this.bgmNum = 4;
		this.currentBgmIndex = -1;
	}

	preload() {
		this.load.on( 'filecomplete',
			() => {
				loaded = Math.min( loaded + 5, 98 );
				setTp();
			} );
		// 加载角色资源
		actList.forEach( char => {
			this.load.image( `char-${char}`, `img/act/${char}/c.png`, {
				normalMap: false,
				cropHeight: 120
			} );
			this.load.image( `char-select-${char}`, `img/act/${char}/a.png` );
		} );

		// 加载环境资源
		this.load.image( 'ground',
			'img/tloor.png' );
		this.load.image( 'background',
			'img/fbc.png' );
		this.load.image( 'enemy',
			'img/act/F/c.png' );
		// 加载装饰物资源
		for ( let i = 0; i < decos.length; i++ ) {
			this.load.image( decos[ i ], 'img/decorations/' + decos[ i ] + '.png' );
		}
		// 加载道具
		for ( let key in POWERUPS ) {
			this.load.image( "powerup_" + key, 'img/powerups/' + key + '.png' );
		}
		this.createSquareTexture();
		// 预加载所有音效
		for ( let i = 0; i < this.bgmNum + 1; i++ ) {
			this.load.audio( 'bgm' + i, 'media/bgm/adven/bgm' + i + '.mp3' );
		}

		this.load.audio( 'jump',
			'media/sounds/huu.wav' );
		this.load.audio( 'move',
			'media/sounds/ta.wav' );
		this.load.audio( 'behit',
			'media/sounds/duong.wav' );
		this.load.audio( 'cil', 'media/sounds/cilllllll.wav' );
		this.load.audio( 'dd', 'media/sounds/dd.wav' );
		this.load.audio( 'jiu', 'media/sounds/jiu.wav' );
		this.load.audio( 'ding', 'media/sounds/ding.wav' );
		this.load.audio( 'budong', 'media/sounds/budong.wav' );
		this.load.audio( 'hit', 'media/sounds/di.wav' );
		if ( settings ) document.documentElement.style.setProperty( "--font", settings.font );

		// 加载敌人资源
		ADVEN.enemys.forEach( e => {
			this.load.image( `enemy-${e.name}`, `img/act/${e.name}/c.png` );
		} );
	}
	create() {
		loaded = 100;
		setTp();
		this.bgmVolume = 0.25;
		this.loadPage();
		this.playRandomBgm();

		console.log( "preload is completed" );
	}

	loadPage() {
		loadTp.addEventListener( "transitionend",
			() => {
				loadTp.style.opacity = 0;
				setTimeout( () => {
					getIn.style.opacity = 1;
					setTimeout( () => {
						getIn.style.animation =
							"blink 1891ms infinite";
						getIn.style.animation =
							"blink 1891ms infinite";
						loadPic.style.pointerEvents = "all";
						loadPic.addEventListener( "click", () => {
							// 预加载完成后自动跳转
							this.scene.start( 'CharacterSelectScene' );
							loadPic.style.opacity = 0;
							loadPic.addEventListener( "transitionend", () => {
								loadPic.remove();
							} );
						}, {
							once: true
						} );
					}, 512 );
				}, 1012 );
			}, {
				once: true
			} );
	}

	playRandomBgm() {
		let r = Phaser.Math.Between( 0, this.bgmNum ); // 随机选择一个背景音乐
		if ( this.currentBgmIndex == r ) {
			if ( r + 1 > this.bgmNum ) {
				r--;
			} else {
				r++
			}
		}
		this.currentBgmIndex = r;
		if ( bgm ) {
			bgm.stop(); // 停止当前播放的音乐
		}

		bgm = this.sound.add( 'bgm' + this.currentBgmIndex, {
			volume: ( this.bgmVolume )
		} );
		bgm.play();

		// 监听音乐播放结束事件
		bgm.once( 'complete', () => {
			this.playRandomBgm(); // 播放下一首随机音乐
		} );
	}

	createSquareTexture() {
		const size = 8; // 方形大小
		const texture = this.textures.createCanvas( 'squareParticle', size, size );
		const ctx = texture.context;
		ctx.fillStyle = '#FFFFFF'; // 白色，后续通过tint着色
		ctx.fillRect( 0, 0, size, size );
		texture.refresh();
	}

}

/* 角色选择场景 */
class CharacterSelectScene extends Phaser.Scene {
	constructor() {
		super( 'CharacterSelectScene' );
		this.characters = actList;
	}

	create() {
		document.getElementById( "qrange" ).value = QUALITY;
		document.getElementById( 'quality' ).innerText = QUALITY
		const container = document.querySelector( '.character-grid' );
		this.characters.forEach( char => {
			const card = container.appendChild( document.createElement( 'div' ) );
			card.className = 'character-card';
			card.innerHTML = `<img src="img/act/${char}/a.png" />`;
			card.onclick = () => {
				this.scene.start( 'MainGameScene', {
					character: char
				} );
				// 添加卡片点击效果
				// 添加场景切换过渡
				this.cameras.main.fadeOut( 300, 0, 0, 0 );
				this.time.delayedCall( 300, () => {
					this.scene.start( 'MainGameScene', {
						character: card.dataset.char
					} );
					document.getElementById( 'character-select' ).style.display = 'none';
				} );
			};
		} );
		console.log( "character-select-setup is completed" );
	};
}

/* 主游戏场景 */
class MainGameScene extends Phaser.Scene {
	constructor() {
		super( 'MainGameScene' );
		this.MOVE_SPEED = 500;
		this.JUMP_FORCE = -1000;
		this.currentEntropy = 0;
		this.bgmIndex = 0;
		this.CHUNK_WIDTH = 450 * innerWidth / innerHeight;
		this.chunkIndex = 0;
		// 新增技能冷却系统
		this.spellCooldown = 0;
		this.MAX_COOLDOWN = 80;
		// 新增技能颜色定义
		this.SPELL_COLOR = 0x00FF88;
		// 新增技能轨迹数组
		this.spellTrails = [];
		this.particles = null; // 新增粒子
		this.hitParticles = null;
		this.rayTime = 0;
		this.setupPowerups();
		this.lowFPS = [];
		this.sumFPS = 0;
	}

	init( data ) {
		this.selectedChar = data.character;

		let hexColor = colors[ this.selectedChar ] || "#CCC";
		// 转换为 RGB
		const hsv = Phaser.Display.Color.HexStringToColor( hexColor );
		hsv.s += 0.2;
		hsv.v *= 0.9;
		this.SPELL_COLOR = hsv.color;
		// 初始化音效
		this.sfx = {
			jump: this.sound.add( 'jump' ),
			move: this.sound.add( 'move' ),
			behit: this.sound.add( 'behit' ),
			cil: this.sound.add( 'cil' ),
			hit: this.sound.add( 'hit' ),
			dd: this.sound.add( 'dd' ),
			jiu: this.sound.add( 'jiu' ),
			ding: this.sound.add( 'ding' ),
			budong: this.sound.add( 'budong' ),
		};
		this.sfx.ding.volume = 0.4;
	}

	create() {
		// 根据设备性能调整参数
		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator
			.userAgent );

		if ( this.isMobile ) {
			if( QUALITY > 0.2 ) QUALITY -= 0.2;
		} else {
			this.changeControls();
		}

		//显示熵
		document.getElementById( "entropy-display" ).style.opacity = 0.6;
		// 初始化相机
		this.cameras.main.setRoundPixels( true );
		this.cameras.main.setZoom( 0.8 );
		// 创建背景
		this.createParallaxBackground();

		// 创建地面系统
		this.setupGroundSystem();

		// 创建角色
		this.player = this.physics.add.sprite(
			this.scale.width / 2,
			this.scale.height - 200,
			`char-${this.selectedChar}`
		).setOrigin( 0.5,
			0.5 ).setScale( 0.2 )

		// 物理设置
		this.player.setCollideWorldBounds( false );
		this.physics.add.collider( this.player,
			this.groundGroup );
		this.player.body.setSize(
			this.player.width * 0.9,
			// 碰撞箱宽度（原宽度）
			this.player.height * 0.75,
			// 碰撞箱高度（原高度的85%）
			true // 居中偏移
		);

		// 初始化输入
		this.setupControls();

		// 初始化熵值系统
		this.setupEntropySystem();

		// 装饰物生成
		this.decorations = this.physics.add.staticGroup();

		// 隐藏角色选择界面
		document.getElementById( 'character-select' ).style.display = 'none';

		// 显示游戏控制界面
		document.getElementById( 'controls' ).style.display = 'flex';

		// 确保画布层级
		const canvas = document.querySelector( 'canvas' );

		// 游戏循环事件
		this.events.on( 'update',
			this.updateEntropy,
			this );
		console.log( "main-game is completed" );

		// 新增技能指示器
		this.cooldownBar = this.add.graphics()
			.setScrollFactor( 0 ).setDepth( 100 );

		//初始化fps计数器
		this.fpsText = this.add.text( 0, 0, "FPS: 0", {
			fontSize: "20px",
			fill: "#333333",
			stroke: "#FCFCFC",
			strokeThickness: 2,
		} ).setScrollFactor( 0 ).setDepth( 100 );
		
		//初始化调试信息
		this.debugText = this.add.text(0, 50, "", {
			fontSize: "20px",
			fill: "#333333",
			stroke: "#FCFCFC",
			strokeThickness: 2,
		}).setScrollFactor(0).setDepth(100);
		
		//初始化摇杆
		this.setupJoystick();
		// 初始化敌人伤害计数器
		this.enemies = this.physics.add.group();
		// 初始化粒子组
		this.particles = this.physics.add.group( {
			classType: SpellParticle,
			maxSize: MAX_PARTICLES,
			createCallback: particle => particle.setActive( false ).setVisible( false )
		} );
		// 初始化击中粒子组
		this.hitParticles = this.physics.add.group( {
			classType: HitParticle,
			maxSize: MAX_PARTICLES * 0.4,
			createCallback: particle => particle.setActive( false ).setVisible( false )
		} );
		// 初始化道具组
		this.powerups = this.physics.add.group( {
			classType: Phaser.Physics.Arcade.Sprite,
			maxSize: MAX_PARTICLES * 0.2,
			createCallback: powerup => powerup.setActive( false ).setVisible( false )
		} );

		// 设置粒子碰撞检测
		this.physics.add.overlap(
			this.particles,
			this.enemies,
			this.handleParticleHit,
			( particle ) => {
				return particle.emitter !== "enemy"
			},
			this
		);
		// 添加道具碰撞检测
		this.physics.add.overlap(
			this.player,
			this.powerups,
			this.handlePowerUpCollision, // 处理道具获取的碰撞回调
			null,
			this
		);
		this.physics.add.overlap(
			this.player,
			this.particles,
			this.handlePlayerHit,
			null,
			this
		);

		window.$this = this;

		this.setupPostProcessing();

	}

	setupPostProcessing() {
		const fx = this.cameras.main.postFX;

		// 修改Bloom参数
		this.bloomEffect = fx.addBloom(
			0xF9E0A0, // 基础颜色（改为金色高光）
			0, // 水平偏移
			1, // 垂直偏移
			2, // 模糊强度
			0.2, // 强度
			8 * QUALITY
		);

		let fxP = this.player.postFX.addGlow( this.SPELL_COLOR, 1, 0, false, 0.05 * QUALITY, 20 );
		// 添加呼吸效果
		this.tweens.add( {
			targets: fxP,
			outerStrength: 3,
			innerStrength: 1,
			yoyo: true,
			repeat: -1,
			duration: 1000,
			ease: 'Sine.easeInOut'
		} );
	}

	setupPowerups() {
		for ( let key in POWERUPS ) {
			POWERUPS[ key ].effect = POWERUPS[ key ].effect.bind( this );
			POWERUPS[ key ].clear = POWERUPS[ key ].clear.bind( this );
		}
	}

	createParallaxBackground() {
		// 创建视差背景层
		this.bgLayer = this.add.tileSprite( 0,
				0,
				4096,
				4096,
				'background' )
			.setScrollFactor( 0.2 )
			.setScale( 10 );
	}

	setupGroundSystem() {
		this.groundGroup = this.physics.add.staticGroup();
		const ground = this.groundGroup.create( 0,
				this.scale.height,
				'ground' )
			.setScale( this.CHUNK_WIDTH * 0.05,
				1 )
			.refreshBody();
	}

	createTerrainPlatforms() {
		// 平台坐标配置（根据屏幕比例自适应）
		const platforms = ADVEN.terrain[ Phaser.Math.Between( 0, ADVEN.terrain.length - 1 ) ];
		platforms.forEach( config => {
			const platform = this.groundGroup.create(
					this.scale.width * config.x + this.player.x,
					this.scale.height * config.y,
					'ground'
				)
				.setScale( config.width, 0.5 )
				.refreshBody();

			// 在平台上方生成敌人
			if ( config.x !== 0.5 ) {
				// 中央平台不生成敌人
				for ( let t = config.width; t > 0; t -= 5 ) {
					this.spawnEnemy( platform.x, platform.y - 100 );
				}
			}
		} );
	}

	turnEnemy( enemy ) {
		// 停止当前速度
		if ( enemy ) enemy.setVelocityX( 0 );

		// 方向反转
		enemy.moveDirection *= -1;
		enemy.setFlipX( !enemy.flipX );

		// 延迟后重新移动（避免瞬时转向抖动）
		this.time.delayedCall( 100,
			() => {
				if ( enemy.active ) {
					// 防止敌人被销毁后操作
					enemy.setVelocityX( enemy.speed * enemy.moveDirection );
					enemy.setVelocityY( 15 );
				}
			},
			[],
			this );
	}

	generatePlatform() {
		const x = this.player.x + this.scale.width;
		const platform = this.groundGroup.create( x,
				Phaser.Math.Between( GAME_HEIGHT * 0.5, GAME_HEIGHT * 0.95 ),
				'ground' )
			.setScale( 3,
				0.5 )
			.refreshBody();
		const platformTop = platform.y - platform.displayHeight / 2;
		// 30%概率生成敌人
		if ( Math.random() < 0.3 ) {

			this.spawnEnemy( platform.x, platformTop - 100 ); // 在平台上方100像素生成
		}
		// 40%生成装饰物
		if ( Math.random() < 0.68 ) this.spawnDecorations( platform );
		//25%生成道具
		if ( Math.random() < 0.25 ) {
			this.spawnPowerUp( platform );
		}

	}

	spawnEnemy( x, y ) {
		// 根据权重随机选择敌人类型
		const totalOdds = ADVEN.enemys.reduce( ( sum, e ) => sum + e.odds, 0 );
		let random = Math.random() * totalOdds;
		let selectedEnemy;

		for ( const enemy of ADVEN.enemys ) {
			if ( random < enemy.odds ) {
				selectedEnemy = enemy;
				break;
			}
			random -= enemy.odds;
		}

		// 创建敌人精灵
		const enemy = this.physics.add.sprite( x, y, `enemy-${selectedEnemy.name}` )
			.setScale( 0.1 )
			.setFlipX( true )
			.setData( {
				hitCount: 0,
				hp: Phaser.Math.Between( ...selectedEnemy.hp ),
				type: selectedEnemy.name
			} );
		// 设置敌人属性
		const hexColor = colors[ selectedEnemy.name ] || "#CCC";
		// 创建伤害文本
		const text = this.add.text( x, y - 50, '0', {
				fontSize: '64px',
				fontFamily: settings.font || 'consola',
				color: hexColor,
				stroke: "#DDD",
				strokeThickness: 3
			} )
			.setOrigin( 0.5 )
			.setVisible( false );

		enemy.setData( 'hitText', text ); // 绑定文本到敌人

		// 设置巡逻范围
		enemy.patrolRange = this.CHUNK_WIDTH;
		enemy.speed = Phaser.Math.Between( 200, 500 );
		enemy.spawnX = x;
		enemy.moveDirection = 1;
		// 敌人AI行为
		enemy.isGrounded = "borning";
		enemy.update = () => {
		  if (!enemy.body || enemy.destroyed) {
		    this.events.off("update", enemy.update);
		    return;
		  }
		  if (enemy.y > this.scale.height * 2) {
        enemy.destroy();
        enemy.destroyed = true;
      }
		  //检查可见性
			if(Math.abs(enemy.x - this.player.x) >= this.scale.width) {
			    enemy.active = false;
			    if(Math.abs(enemy.x - this.player.x) >= this.scale.width * 2) {
			      enemy.destroy();
			      enemy.destroyed = true;
			    }
			 } else if(!enemy.active) {
			   enemy.active = true;
			 }
			if(!enemy.active) {
			  return;
			}
			//检测生命
			if ( enemy.getData( "hitCount" ) >= enemy.getData( "hp" ) ) {
				enemy.setVelocityX( 0 );
				this.tweens.add( {
					targets: enemy,
					alpha: 0,
					scale: 0.3,
					duration: 500,
					onComplete: () => {
						enemy.destroy();
						enemy.destroyed = true;
						this.currentEntropy -= 0.1;
					}
				} );
				return;
			}
			if(!enemy.body) {
			  enemy.destroyed = true;
			  return;
			}
			// 检测踏空
			if ( enemy.isGrounded === true && !enemy.body.blocked.down ) {
				// 踏空后转向
				enemy.isGrounded = false;
				this.turnEnemy(enemy);
				return;
			} else if ( enemy.body.blocked.down ) {
				enemy.isGrounded = true;
			}
			if ( !enemy.isGrounded ) return; // 未着地时停止AI

			const targetX = enemy.spawnX + ( enemy.moveDirection * enemy.patrolRange );
			const tolerance = 5; // 允许5像素误差
			// 平滑转向逻辑
			if ( Math.abs( enemy.x - targetX ) < tolerance ) {
				enemy.setFlipX( !enemy.flipX );
				enemy.setVelocityX( 0 );
				this.turnEnemy( enemy );
			} else {
				enemy.setVelocityX( enemy.speed * enemy.moveDirection );
			}
			//横向碰撞
			if ( enemy.body.touching.left || enemy.body.touching.right ) {
				this.turnEnemy( enemy ); // 调用转向函数
			}
		};

		// 添加Ar的特殊攻击逻辑
		if ( selectedEnemy.name === 'Ar' ) {
			enemy.attackTimer = this.time.addEvent( {
				delay: selectedEnemy.attack.interval,
				callback: () => {
					this.fireEnemyParticles( enemy, selectedEnemy );
				},
				loop: true
			} );
		}
		enemy.setCollideWorldBounds( false ); // 防止出界
		this.physics.add.collider( enemy, this.groundGroup, () => {
			enemy.body.velocity.y = 0; // 触地时重置垂直速度
		}, null, this );

		this.physics.add.overlap( this.player, enemy, this.handleEnemyCollision, null, this );
		enemy.setGravityY( 800 );
		// 在敌人生成后绑定到场景更新
		this.events.on('update', enemy.update);
		this.enemies.add(enemy);
	}

	// 装饰物生成方法
	spawnDecorations( platform ) {
		const decoTypes = decos;
		const platformWidth = platform.displayWidth;
		const platformHeight = platform.displayHeight;
		// 随机生成1-3个装饰物
		let times = Phaser.Math.RND.between( 1,
			3 );
		for ( let i = 0; i < times; i++ ) {
			if ( Math.random() > 0.6 ) {
				const deco = this.decorations.create(
						platform.x + Phaser.Math.RND.between( -platformWidth / 2, platformWidth / 2 ),
						platform.y - platformHeight / 2 - 10, // 位于平台上方
						decoTypes[ Phaser.Math.RND.between( 0, decoTypes.length - 1 ) ]
					)
					.setScale( Phaser.Math.Between( 0.5, 1 ) );

				// 添加物理碰撞
				deco.body.setSize( deco.width * 0.8, deco.height * 0.8, true );
			}
		}
	}

	// 道具生成方法
	spawnPowerUp( platform ) {
		const types = Object.keys( POWERUPS );
		const type = POWERUPS[ types[ Phaser.Math.Between( 0, types.length - 1 ) ] ];
		const platformWidth = platform.displayWidth;
		const powerup = this.powerups.get();
		if ( powerup ) {
			powerup.enableBody( true, platform.x + Phaser.Math.RND.between( -platformWidth / 2, platformWidth /
					2 ), platform.y - 50, true, true )
				.setTexture( type.texture )
				.setData( 'type', type ) // 存储道具类型数据
				.setGravityY( -2000 ); //重力设为0
			// 添加小幅浮动动画
			this.tweens.add( {
				targets: powerup,
				y: powerup.y - 10,
				duration: 1000,
				yoyo: true,
				repeat: -1
			} );
		}
	}

	// 新增道具碰撞处理逻辑
	handlePowerUpCollision( player, powerup ) {
		const type = powerup.getData( 'type' );
		// 应用效果（业务逻辑核心）
		type.effect( player );
		// 添加视觉效果
		this.add.tween( {
			targets: player,
			scale: player.scale * 1.1,
			yoyo: true,
			duration: 200
		} );

		// 定时恢复原始状态
		this.time.delayedCall( type.duration, () => {
			type.clear( this.player );
		} );
		// 回收道具
		powerup.disableBody( true,
			true );

		// 播放音效
		this.sfx.ding.play();
	}

	setupControls() {
		// 移除原有的键盘配置，改为事件监听方式
		this.input.keyboard.on( 'keydown', ( event ) => {
			this.handlePC( event.code, true );
		} );

		this.input.keyboard.on( 'keyup', ( event ) => {
			this.handlePC( event.code, false );
		} );

		// 保持原有触摸控制不变
		document.getElementById( 'left' ).addEventListener( 'touchstart',
			() => this.moveLeft( true ) );
		document.getElementById( 'left' ).addEventListener( 'touchend',
			() => this.moveLeft( false ) );
		document.getElementById( 'right' ).addEventListener( 'touchstart',
			() => this.moveRight( true ) );
		document.getElementById( 'right' ).addEventListener( 'touchend',
			() => this.moveRight( false ) );
		document.getElementById( 'jump' ).addEventListener( 'touchstart',
			() => this.jump() );
		document.getElementById( "pause" ).addEventListener( 'click',
			() => this.pauseGame() );
		document.getElementById( "jam-out" ).addEventListener( 'click',
			() => this.jamOut() );
		document.getElementById( "quit-app" ).addEventListener( 'click',
			() => this.quitApp() );
		document.getElementById( "quit-game" ).addEventListener( 'click',
			() => {
				this.quitGame();
				this.pauseGame();
			} );
		document.getElementById( 'spell' ).addEventListener( 'touchstart',
			() => {
				if ( this.spellCooldown < this.MAX_COOLDOWN - 10 ) {
					this.castSpell();
				}
			} );
		document.getElementById( "change-controls" ).addEventListener( "click", () => this.changeControls() );
		this.controlsWay = "touch";
	}

	changeControls() {
		if ( this.controlsWay == "touch" ) {
			//关闭触摸控制器
			document.getElementById( "controls" ).querySelectorAll( "*:not(#current-effects)" ).forEach( (
				e ) => {
				e.style.display = "none";
			} );
			this.controlsWay = "keybord";
		} else {
			//开启触摸控制器
			document.getElementById( "controls" ).querySelectorAll( "*:not(#current-effects)" ).forEach( (
				e ) => {
				e.style.display = "";
			} );
			this.controlsWay = "touch";
		}

		if ( this.game.isPaused ) this.pauseGame();
	}

	handlePC( key, active ) {
		if ( this.controlsWay == "touch" ) {
			this.changeControls();
		};
		switch ( key ) {
			case "KeyA":
				this.moveLeft( active );
				break;
			case "KeyD":
				this.moveRight( active );
				break;
			case "Space":
				if ( active ) this.jump();
				break;
			case "KeyW":
				if ( active ) this.jump();
				break;
			case "KeyE":
				if ( this.spellCooldown < this.MAX_COOLDOWN - 10 ) {
					this.castSpell();
				}
				break;
			case "Escape":
				if ( active ) this.pauseGame();
				break;
			default:
				break;
		}
	}

	pauseGame() {
		const h = document.getElementById( "pause-menu" );
		const isPaused = this.game.isPaused;

		if ( isPaused ) {
			this.game.resume();
			h.style.opacity = 0;
			h.style.pointerEvents = "none";
		} else {
			this.game.pause();
			h.style.opacity = 1;
			h.style.pointerEvents = "auto";
		}
	}

	jamOut() {
		this.player.y = 0;
		this.pauseGame();
	}

	quitGame() {
		document.getElementById( "pause" ).remove();
		this.scene.start( 'GameOverScene', {
			force: Math.max( Math.round( this.player.x / 1500 - this.currentEntropy * 0.015, 0 ) )
		} );
	}

	quitApp() {
		destroyGame();
		if ( window.hasOwnProperty( "plus" ) ) {
			plus.runtime.quit();
		}
		window.close();
	}

	updateRay() {
		if ( !this.rayGraphics || this.joystick.force <= 0 ) return;
		// 每帧清空射线
		this.rayGraphics.clear();
		if ( this.joystick.force >= 100 && this.spellCooldown < 20 && this.rayTime < 110 ) {
			this.rayTime++;
		} else if ( this.rayTime > 0 ) {
			this.rayTime--;
		}
		if ( Math.abs( this.rayTime - 100 ) < 1 ) {
			this.sfx.budong.play();
		}
		// 获取摇杆方向角度（弧度）
		const angle = Phaser.Math.DegToRad( this.joystick.angle );
		this.rayAngle = angle;
		// --- 计算射线终点 ---
		const screenWidth = GAME_WIDTH;
		const screenHeight = GAME_HEIGHT;
		const dirX = Math.cos( angle );
		const dirY = Math.sin( angle );

		// 计算与屏幕边缘的交点
		const tValues = {
			right: ( screenWidth ),
			left: ( screenWidth ),
			bottom: ( screenHeight - this.player.y ) / dirY,
			top: ( -this.player.y ) / dirY
		};
		const validTs = Object.values( tValues ).filter( t => t > 0 );
		const t = Math.min( ...validTs );

		const endX = this.player.x + dirX * t;
		const endY = this.player.y + dirY * t;
		// 绘制射线
		// 转换为 RGB
		let hsv = Phaser.Display.Color.HexStringToColor( colors[ this.selectedChar ] || "#CCC" );
		hsv.v -= 0.1;
		hsv.v += ( 1 - hsv.v ) / Phaser.Math.Clamp( this.rayTime / 100, 1, 4 );
		hsv.s *= Phaser.Math.Clamp( ( 200 - this.rayTime ) / 200, 0.3, 1 );
		this.rayGraphics.lineStyle(
			( this.rayTime > 30 ? Phaser.Math.Clamp( this.rayTime / 10, 2, 10 ) : 2 ),
			hsv.color, Phaser.Math.Clamp( this.rayTime / 100, 0.5, 0.8 ) );
		this.rayGraphics.beginPath();
		this.rayGraphics.moveTo( this.player.x, this.player.y );
		this.rayGraphics.lineTo( endX, endY );
		this.rayGraphics.strokePath();
	}

	updateEffects() {
		let cue = document.getElementById( "current-effects" );
		let str = "";
		for ( let key in CURRENT_EFFECTS ) {
			if ( CURRENT_EFFECTS[ key ] ) str +=
				` <div class="bar" style="background-color: ${CURRENT_EFFECTS[key].color}">${CURRENT_EFFECTS[key].icon}</div>`;
		}
		if ( cue.innerHTML != str ) cue.innerHTML = str;
	}

	castSpell() {
		// 重置冷却
		this.spellCooldown = Math.min( this.spellCooldown + 10,
			this.MAX_COOLDOWN );
		//播放音效
		this.sfx.cil.play();
		// 确定方向
		const orien = this.player.flipX ? 180 : 0;
		for ( let i = 0; i < 3; i++ ) {
			const angle = Phaser.Math.DegToRad( -3 + i * 5 + orien );
			const particle = this.particles.get();
			if ( particle ) {
				particle.fire(
					this.player.x,
					this.player.y,
					this.SPELL_COLOR,
					angle,
					Phaser.Math.Between( 800, 1600 ), //速度
					Phaser.Math.Between( 600, 1000 ) //生命周期
				);
			}
		}
	}

	castRay() {
		// 重置冷却
		this.spellCooldown = this.MAX_COOLDOWN;
		//播放音效
		this.sfx.jiu.play();
		let pcolor = Phaser.Display.Color.HexStringToColor( colors[ this.selectedChar ] || "#CCC" );
		pcolor.v *= 1.1;
		let hexColor = pcolor.color;
		for ( let i = 0; i < 10; i++ ) {
			const angle = this.rayAngle;
			const particle = this.particles.get();
			if ( particle ) {
				particle.fire(
					this.player.x,
					this.player.y,
					hexColor,
					angle,
					2500, //速度
					5000, //生命周期
					-2000, //重力
					false, //自动销毁
				);
			}
		}
	}

	moveLeft( isActive ) {
		if ( isActive ) {
			if ( this.player.body.velocity.x == 0 ) { // 仅在状态变化时播放音效
				this.sfx.move.play();
			}
			this.player.setVelocityX( -this.MOVE_SPEED );
			this.player.setFlipX( true );
		} else {
			this.player.setVelocityX( 0 );

		}
	}

	moveRight( isActive ) {
		if ( isActive ) {
			if ( this.player.body.velocity.x == 0 ) { // 仅在状态变化时播放音效
				this.sfx.move.play();
			}
			this.player.setVelocityX( this.MOVE_SPEED );
			this.player.setFlipX( false );
		} else {

			this.player.setVelocityX( 0 );

		}
	}

	jump() {
		if ( this.player.body.touching.down ) {
			this.player.setVelocityY( this.JUMP_FORCE );
			this.sfx.jump.play();
			this.player.canDoubleJump = true;
		} else if ( this.player.canDoubleJump ) {
			this.player.setVelocityY( this.JUMP_FORCE * 0.8 );
			this.sfx.jump.play();
			this.player.canDoubleJump = false;
		}
	}

	setupEntropySystem() {
		this.entropyValue = document.querySelector( '.entropy-value' );
		this.entropyBar = document.querySelector( '#entropy-display' );
	}

	updateEntropy() {
		this.currentEntropy = Phaser.Math.Clamp( this.currentEntropy + 0.01, 0, 100 )
		if ( this.currentEntropy >= 100 ) {
			this.quitGame();
		}
		const hue = 120 * ( 1 - this.currentEntropy / 100 );
		this.entropyValue.textContent = `${this.currentEntropy.toFixed(2)}%`;
		this.entropyValue.style.color = `hsl(${hue}, 70%, 50%)`;
		this.entropyBar.style.setProperty( "--color", `${hue}, 70%, 50%` );
		if ( this.currentEntropy > 80 ) {
			this.entropyBar.style.animation = 'entropy-alert 0.5s infinite';
		} else {
			this.entropyBar.style.animation = '';
		}
	}

	handleEnemyCollision( player, enemy ) {
		// 处理玩家受伤
		this.tweens.add( {
			targets: player,
			x: player.x - 98,
			y: player.y - 38,
			duration: 284,
			ease: 'Sine.easeOut'
		} );
		this.player.body.velocity.y = 0;
		this.sfx.behit.play();
		this.currentEntropy += 1.5;

		// 增强碰撞反馈
		this.cameras.main.shake( 100,
			0.05 );
		this.player.canDoubleJump = true;
		this.tweens.add( {
			targets: this.player,
			tint: 0xFF0000,
			duration: 183,
			yoyo: true,
			onComplete: () => {
				this.player.clearTint(); // 确保完全清除颜色残留
			}
		} );
		// 新增粒子反馈（使用自定义类）
		this.createHitParticles( player.x, player.y );
	}
	// 新增粒子生成方法
	createHitParticles( x, y ) {
		for ( let i = 0; i < 4; i++ ) {
			// 增加粒子数量
			const particle = this.hitParticles.get();
			if ( particle ) {
				particle.fire(
					x, // 使用玩家坐标
					y,
					Phaser.Math.DegToRad( Phaser.Math.Between( 0, 360 ) ), // 随机角度
					Phaser.Math.Between( 200, 600 ), // 降低速度
					Phaser.Math.Between( 1000, 2000 ) // 缩短生命周期
				);
			}
		}
	}

	update(time, delta) {
	  if ( this.sumFPS == 0 ) {
      this.startTime = time;
    }
    this.sumFPS++;

		if ( ( this.sumFPS ) % ( QUALITY >= 0.4 ? 0 : QUALITY * 100 ) === 0 ) {
			return;
		}

	  // 背景滚动
		this.bgLayer.tilePositionX = this.cameras.main.scrollX * 0.1;

		//摇杆处理
		this.updateRay();

		//显示状态
		if ( Object.keys( CURRENT_EFFECTS ).length > 0 ) {
			this.updateEffects();
		}

		//显示fps
		const afps = game.loop.actualFps.toFixed( 1 );
		const vfps = ( this.sumFPS / ( time - this.startTime ) * 1000 ).toFixed( 1 );
		const ufps = ( 1000 / delta ).toFixed( 1 );
		this.fpsText.setText( `FPS: ${afps}/${vfps}/${ufps}` );
		if ( !this.lowm ) {
			if ( afps <= 45 ) {
				this.lowFPS.push( afps );
			} else {
				if ( this.lowFPS.length >= 10 ) {
					if ( QUALITY > 0.1 ) QUALITY -= 0.1;
					this.lowm = true;
					console.log( "low fps" );
				}
				this.lowFPS = [];
			}
		}
		// 相机跟随
		this.cameras.main.scrollX = this.player.x - this.scale.width / 2;

		//区块处理
		const chunkIndex = ( this.player.x + this.scale.width / 2 ) / this.CHUNK_WIDTH;
		if ( chunkIndex - this.chunkIndex > 0.25 ) {
			this.chunkIndex = chunkIndex;
			if ( Phaser.Math.Between( 0, 5 ) < 3 ) {
				this.generatePlatform();
			} else if ( Phaser.Math.Between( 0, 2 ) == 0 ) {
				this.createTerrainPlatforms();
			}
		}
		if ( Math.floor( chunkIndex ) > this.chunkIndex ) {
			this.generatePlatform();
			this.chunkIndex = Math.floor( chunkIndex );
		}
		this.checkFall();
		// 新增技能冷却逻辑
		if ( this.spellCooldown > 0 ) {
			this.spellCooldown -= 0.3;
			this.cooldownBar.clear()
				.fillStyle( 0x888888, 0.3 )
				.fillRect( 0, 120, 200, 20 )
				.fillStyle( this.SPELL_COLOR, 0.6 )
				.fillRect( 0, 120, 200 * ( 1 - this.spellCooldown / this.MAX_COOLDOWN ), 20 );
		}
	}

	handleParticleHit( particle, enemy ) {
		// 新增粒子来源检查
		if ( particle.emitter === "enemy" ) return;

		// 原有逻辑保持不变
		const count = enemy.getData( 'hitCount' ) + 1;
		enemy.setData( 'hitCount', count );

		// 显示伤害数字
		const text = enemy.getData( 'hitText' );
		text.setText( count )
			.setPosition( enemy.x, enemy.y - 50 )
			.setVisible( true );
		// 增强碰撞反馈
		this.cameras.main.shake( 100,
			0.02 );
		// 回收粒子
		if ( particle.isAutoDestroy ) particle.deactivate();
		this.sfx.hit.play();
		// 重置文本可见时间
		this.time.delayedCall( 3000, () => {
			if ( text.active ) text.setVisible( false );
		} );
	}

	checkFall() {
		// 检测是否掉出地图底部（适配不同屏幕高度）
		if ( this.player.y > this.scale.height + 100 && !this.isGameOver ) {
			this.isGameOver = true;

			// 停止所有物理运动
			this.physics.pause();

			// 播放腐蚀音效
			this.sfx.behit.play();
			this.cameras.main.shake( 100, 0.1 );
			// 添加溶解动画
			this.tweens.add( {
				targets: this.player,
				alpha: 0,
				scale: 0.5,
				duration: 1000,
				onComplete: () => {
					// 切换到游戏结束场景
					this.quitGame();
				}
			} );
		}
	}

	setupJoystick() {
		const x = this.scale.width - 200;
		const y = this.scale.height - 200;
		const spell = document.getElementById( "spell" );
		const jump = document.getElementById( "jump" );
		const speed = this.MOVE_SPEED;
		// 初始化摇杆
		this.joystick = this.plugins.get( 'rexVirtualJoystick' ).add( this, {
			x: x, // 摇杆的 x 坐标
			y: y, // 摇杆的 y 坐标
			radius: 70, // 摇杆的半径
			forceMin: 0.1, //最小力度
			base: this.add.circle( 0, 0, 65, 0xEDEDED ).setAlpha( 0.6 ), // 摇杆底座（可选）
			thumb: this.add.circle( 0, 0, 30, this.SPELL_COLOR ).setAlpha( 0.8 ), // 摇杆拇指区域（可选）
			dir: "8dir",
			fixed: true, // 是否固定位置
			enable: true, // 是否启用
			disableOtherTouchEvents: true // 禁用其他事件
		} );
		this.joystick.base.setDepth( 1000 ); // 设置基座的层级
		this.joystick.thumb.setDepth( 1001 ); // 设置拇指摇杆的层级
		this.joystick
			.on( 'pointerdown', () => {
				jump.style.pointerEvents = "none";
				spell.style.pointerEvents = "none";
			} )
			.on( 'pointerup', () => {
				// 立即清除射线
				this.rayGraphics.clear();
				this.MOVE_SPEED = speed;
				jump.style.pointerEvents = "auto";
				spell.style.pointerEvents = "auto";
				if ( this.rayTime > 100 && this.spellCooldown < 20 ) {
					this.castRay();
				}
				this.rayTime = 0;
			} );

		// 创建射线绘制对象
		this.rayGraphics = this.add.graphics();
	}

	fireEnemyParticles( enemy, config ) {
		if ( !enemy.active ) return;

		const angleToPlayer = Phaser.Math.Angle.Between(
			enemy.x, enemy.y,
			this.player.x, this.player.y
		);

		for ( let i = 0; i < config.attack.count; i++ ) {
			const spread = Phaser.Math.DegToRad( 15 * ( i - ( config.attack.count - 1 ) / 2 ) );
			const particle = this.particles.get();
			if ( particle ) {

				particle.fire(
					enemy.x,
					enemy.y,
					0xFF3300,
					angleToPlayer + spread,
					config.attack.speed,
					1500,
					-500,
					true,
					"enemy"
				);
			}
		}
		this.sfx.dd.play( {
			volume: 0.6
		} );
	}

	handlePlayerHit( player, particle ) {
		if ( particle.tint === 0xFF3300 ) { // 仅敌人粒子造成伤害
			this.currentEntropy += 0.8;
			this.cameras.main.shake( 80, 0.02 );
			particle.deactivate();

			this.tweens.add( {
				targets: player,
				tint: 0xFF0000,
				duration: 150,
				yoyo: true,
				onComplete: () => {
					player.clearTint(); // 新增强制清除tint
				}
			} );
			this.sfx.behit.play( {
				volume: 0.7
			} );
		}
	}

}

class GameOverScene extends Phaser.Scene {
	constructor() {
		super( 'GameOverScene' );
	}
	init( data ) {
		this.force = Math.max( data.force, 0 );
	}
	create() {
		console.log( "game-over" );
		window.removeEventListener( "error",
			oe );
		const {
			width,
			height
		} = this.sys.game.config;
		const screenCenterX = width / 2;
		const screenCenterY = height / 2;
		// 黑色半透明背景
		let mask = this.add.rectangle( 0,
				0,
				width,
				height,
				0x131313 )
			.setOrigin( 0 );
		mask.setAlpha( 0 );
		// 游戏结束文字（带动态效果）
		const gameOverText = this.add.text( screenCenterX,
			height - 50,
			'实验终止💥', {
				fontSize: '40px',
				color: '#EF3245',
				fontFamily: ( settings.font || "consola" ) + " ,emoji"
			} ).setAlpha( 0 );
		// 添加呼吸动画
		this.tweens.add( {
			targets: gameOverText,
			scale: {
				from: 0.98,
				to: 1.05
			},
			duration: 1000,
			yoyo: true,
			repeat: -1
		} );
		const forceText = this.add.text( screenCenterX - 200,
			height - 60,
			'获得了 ' + this.force + '晶体', {
				fontSize: '20px',
				color: '#FFF',
				fontFamily: ( settings.font || "consola" ) + " ,emoji"
			} ).setAlpha( 0 );
		// 获取按钮原始尺寸
		const buttonTexture = this.textures.get( 'enemy' );
		const originalHeight = buttonTexture.getSourceImage().height;

		// 计算等比缩放比例
		const targetHeight = height * 0.8; // 保留20%边距
		const scaleRatio = targetHeight / originalHeight;

		// 重新开始按钮（带化学仪器图标）

		const restartButton = this.add.sprite( screenCenterX,
				screenCenterY,
				'enemy' )
			.setInteractive()
			.setScale( scaleRatio )
			.setOrigin( 0.5,
				0.5 )
			.setAlpha( 0 ); // 确保中心对齐

		// 按钮悬浮效果

		// 悬停效果参数
		const hoverScale = scaleRatio * 1.15; // 放大15%
		const animationDuration = 150;

		restartButton.on( 'pointerover',
			() => {
				this.tweens.add( {
					targets: restartButton,
					scale: hoverScale,
					duration: animationDuration
				} );
			} );

		restartButton.on( 'pointerout',
			() => {
				this.tweens.add( {
					targets: restartButton,
					scale: scaleRatio,
					duration: animationDuration
				} );
			} );
		// 添加淡入动画
		this.tweens.add( {
			targets: [ mask,
				gameOverText,
				restartButton,
				forceText
			],
			alpha: 1,
			duration: 452,
			// 淡入动画持续时间
			ease: 'Sine.easeInOut'
		} );
		document.getElementById( "controls" ).remove();
		// 点击退出
		restartButton.on( 'pointerdown',
			() => {
				document.body.style.opacity = 0;
				document.body.style.backgroundColor = "#FFF";
				let fadeV = setInterval( () => {
						bgm.volume -= 0.01;
						if ( bgm.volume <= 0 ) {
							clearTimeout( fadeV );
						}
					},
					9 );
				setTimeout( () => {
						clearTimeout( fadeV );
						localStorage.crystal = Number( localStorage.crystal || 0 ) + this.force;
						destroyGame();
						location.href = "index.html";
					},
					881 );
			} );
	}
}

// 粒子类
class SpellParticle extends Phaser.Physics.Arcade.Sprite {
	constructor( scene, x, y ) {
		super( scene, x, y, 'squareParticle' );
		this.trail = null;
		this.lifespan = 0;
	}

	fire( x, y, color, angle, speed, lifespan, g = 'random', destroy = true, emitter = 'player' ) {
		this.enableBody( true, x, y, true, true );
		this.setBlendMode( 'ADD' );

		// 设置物理参数
		this.setVelocity(
			Math.cos( angle ) * speed,
			Math.sin( angle ) * speed
		);

		// 添加重力效果
		this.setGravityY( g === 'random' ? Phaser.Math.Between( -1000,
			-2100 ) : g );

		this.isAutoDestroy = destroy;

		// 生命周期控制
		this.lifespan = lifespan;
		this.setTint( color );

		// 添加拖尾效果
		this.trail = this.scene.add.graphics()
			.lineStyle( 8, color, 0.6 )
			.setDepth( 5 );

		this.emitter = emitter;
	}

	preUpdate( time, delta ) {
		super.preUpdate( time, delta );

		// 更新生命周期
		this.lifespan -= delta;
		if ( this.lifespan <= 0 ) {
			this.deactivate();
		}
		this.setAlpha( Phaser.Math.Clamp( this.lifespan / 1000, 0, 1 ) );
		// 更新拖尾轨迹
		if ( this.trail ) {
			this.trail.clear()
				.lineStyle( 8, this.tint, 0.6 )
				.lineBetween(
					this.x,
					this.y,
					this.x - this.body.velocity.x * 0.1,
					this.y - this.body.velocity.y * 0.1
				)
				.setAlpha( Phaser.Math.Clamp( this.lifespan / 2000, 0, 0.6 ) );
		}
	}
	deactivate() {
		// 回收粒子到对象池
		this.disableBody( true, true );
		if ( this.trail ) {
			this.trail.destroy();
		}
	}
}

class HitParticle extends Phaser.Physics.Arcade.Sprite {
	constructor( scene, x, y ) {
		super( scene, x, y, 'squareParticle' );
		this.lifespan = 0;
	}
	fire( x, y, angle, speed, lifespan ) {
		this.enableBody( true, x, y, true, true );

		// 设置随机运动参数
		this.setVelocity(
			Math.cos( angle ) * speed,
			Math.sin( angle ) * speed
		);

		// 生命周期控制
		this.lifespan = lifespan;
		this.setTint( 0xFC6569 );
		this.setScale( 0.5 ); // 缩小粒子尺寸
	}
	preUpdate( time, delta ) {
		super.preUpdate( time, delta );
		this.lifespan -= delta;

		// 添加尺寸渐变效果
		this.setScale( 0.5 * ( this.lifespan / 500 ) );

		if ( this.lifespan <= 0 ) {
			this.deactivate();
		}
	}

	deactivate() {
		this.disableBody( true, true );
	}
}

const config = {
	type: Phaser.WEBGL,
	width: GAME_WIDTH,
	height: GAME_HEIGHT,
	backgroundColor: '#1a1a1a',
	antialias: false,
	parent: 'game-container',
	fps: {
		limit: 60,
		min: 24 + 30 * QUALITY
	},
	renderer: {
		defaultFilterMode: Phaser.Textures.FilterMode.NEAREST
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 2000
			},
			debug: false,
			tileBias: 32,
			overlapBias: 16,
			friction: 0.95,
			fixedStep: false
		}
	},
	scene: [ PreloadScene,
		CharacterSelectScene,
		MainGameScene,
		GameOverScene
	],
	input: {
		activePointers: 8
	},
	plugins: {
		global: [ {
			key: 'rexVirtualJoystick',
			plugin: rexvirtualjoystickplugin,
			start: true
		} ],
	},
};
var game = new Phaser.Game( config );