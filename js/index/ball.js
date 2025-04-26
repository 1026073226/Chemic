class BallScene extends Phaser.Scene {
	constructor() {
		super( {
			key: 'BallScene'
		} );
		this.balls = []; // 存储所有小球
		this.dividerX = 0; // 分隔线x坐标
		this.draggingBall = null; // 当前正在拖动的小球
		this.dragConstraint = null; // 拖动约束
		this.selectedFuncBall = null; // 当前选中的功能球
		this.glowFX = null; // 发光效果
	}

	preload() {
		// 预加载资源
	}

	create() {
		window.$this = this;
		const width = this.scale.width;
		const height = this.scale.height;

		// 计算分隔线位置（左侧占80%）
		this.dividerX = width * 0.8;

		// 创建分隔线（视觉）
		const graphics = this.add.graphics();
		graphics.lineStyle( 8, 0xFFFFFF, 0.5 );
		graphics.lineBetween( this.dividerX, 0, this.dividerX, height );
		graphics.setDepth( 1 );

		// 创建物理墙
		const wall = this.matter.add.rectangle( this.dividerX, height / 2, 8, height, {
			isStatic: true,
			restitution: 0.8,
			friction: 0.1,
			chamfer: {
				radius: 4
			}
		} );

		// 创建发光效果
		this.glowFX = {
			distance: 15,
			outerStrength: 2,
			innerStrength: 1,
			color: 0xffffff,
			quality: 0.1,
		};

		// 创建 Matter.js 物理引擎，设置完整边界
		this.matter.world.setBounds( 0, 0, width, height );

		// 监听 Vue 实例的变化
		app.balls = {
			update: () => this.updateBalls()
		};

		// 添加点击事件
		this.input.on( 'pointerdown', this.handleBalls, this);

		this.input.on( 'pointermove', ( pointer ) => {
			if ( this.draggingBall && this.dragConstraint ) {
				// 更新约束点的位置
				this.dragConstraint.pointA = {
					x: pointer.x,
					y: pointer.y
				}; 
			}
		} );

		this.input.on( 'pointerup', () => {
			if ( this.draggingBall && this.dragConstraint ) {
				// 移除拖动约束
				this.matter.world.removeConstraint( this.dragConstraint );
				this.dragConstraint = null;
				this.draggingBall = null;
			}
		} );
	}

	handleBalls( pointer ) {
		const clickX = pointer.x;
		const clickY = pointer.y;

		// 遍历所有小球
		this.matter.world.localWorld.bodies.forEach( ( body ) => {
			if ( body.gameObject ) {
				// 计算点击位置到小球的方向向量
				const dx = body.position.x - clickX;
				const dy = body.position.y - clickY;
				const distance = Math.sqrt( dx * dx + dy * dy );
				const radius = body.gameObject.radius || 20;

				// 如果直接点击到小球
				if ( distance <= radius * 1.5 ) {
					const ballText = body.gameObject.label.node.innerHTML;

					// 如果已经选中了功能球，且点击的是其他球
					if (this.selectedFuncBall && this.selectedFuncBall !== body.gameObject) {
						// 确保目标不是功能球
						if (!ballText.match(/^\+\d$/)) {
							const multiplier = parseInt(this.selectedFuncBall.label.node.innerHTML.replace('+', ''));
							
							// 在目标位置创建多个元素球
							for (let i = 0; i < multiplier; i++) {
								const offsetX = Phaser.Math.Between(-20, 20);
								const offsetY = Phaser.Math.Between(-20, 20);
								this.createBallWithText(
									body.position.x + offsetX,
									body.position.y + offsetY,
									ballText
								);
							}

							// 移除功能球
							this.matter.world.remove(this.selectedFuncBall.body);
							this.selectedFuncBall.label.destroy();
							this.selectedFuncBall.destroy();
							
							// 播放音效
							app.playSound("cilllllll", false);
							
							// 重置选中状态
							this.selectedFuncBall = null;
							return;
						}
					}

					// 点击功能球时
					if (ballText.match(/^\+\d$/)) {
						if (this.selectedFuncBall) {
							// 取消之前选中的功能球的发光效果
							this.selectedFuncBall.postFX.clear();
						}
						// 设置新的选中状态
						this.selectedFuncBall = body.gameObject;
						// 添加发光效果
						const fx = this.selectedFuncBall.postFX.addGlow(
							this.glowFX.color,
							this.glowFX.outerStrength,
							this.glowFX.innerStrength,
							this.glowFX.distance,
							this.glowFX.quality
						);
						// 添加呼吸效果
						this.tweens.add({
							targets: fx,
							outerStrength: 4,
							innerStrength: 2,
							yoyo: true,
							repeat: -1,
							duration: 1000,
							ease: 'Sine.easeInOut'
						});
						return;
					}

					// 如果是普通拖动
					this.draggingBall = body.gameObject;
					this.dragConstraint = this.matter.add.pointerConstraint({
						pointA: { x: clickX, y: clickY },
						body: body,
						stiffness: 0.1,
						damping: 0.01
					});
				}
				// 如果在小球周围，则施加推动力
				else if ( distance < 300 ) {
					// 计算力的方向和大小（距离越近力越大）
					const forceMagnitude = ( 300 - distance ) * 0.0005;
					const forceX = ( dx / distance ) * forceMagnitude;
					const forceY = ( dy / distance ) * forceMagnitude;

					// 施加力
					body.gameObject.applyForce( {
						x: forceX,
						y: forceY
					} );
				}
			}
		} );
	}

	updateBalls() {
		// 完全清理所有现有小球
		this.balls.forEach( ball => {
			if ( ball.label ) {
				ball.label.destroy();
				ball.label = null;
			}
			if ( ball.body ) {
				this.matter.world.remove( ball.body );
				ball.body = null;
			}
			if ( ball.destroy ) {
				ball.destroy();
			}
		} );
		this.balls = [];

		// 创建网格布局（只在左侧80%区域）
		const gridSize = Math.ceil( Math.sqrt( app.brand.length ) );
		const cellWidth = this.dividerX / ( gridSize + 1 );
		const cellHeight = this.scale.height / ( gridSize + 1 );

		// 根据brand创建新的小球
		for ( let i = 0; i < app.brand.length; i++ ) {
			// 计算网格位置
			const row = Math.floor( i / gridSize );
			const col = i % gridSize;

			// 在网格位置周围添加随机偏移，确保在左侧区域内
			const x = ( col + 1 ) * cellWidth + Phaser.Math.Between( -cellWidth / 3, cellWidth / 3 );
			const y = ( row + 1 ) * cellHeight + Phaser.Math.Between( -cellHeight / 3, cellHeight / 3 );

			// 确保x坐标不超过分隔线
			const finalX = Math.min( x, this.dividerX - 20 ); // 留出一些边距

			this.createBallWithText( finalX, y, app.brand[ i ] );
		}
	}

	createBallWithText( x, y, text ) {
		// 根据原子序数计算半径，使用对数函数使大小差距更小
		const atomic = chemist.elements[ text ]?.atomic || 1;
		const radius = Math.floor( 20 + Math.log2( atomic ) * 5 ); // 基础大小20，每增加一倍原子序数增加5像素
		let color = colors[ text ] || "#DDDDDD";
		color = Phaser.Display.Color.HexStringToColor( color ).color;

		// 创建圆形物理体
		const ball = this.matter.add.gameObject(
			this.add.circle( x, y, radius, color ), {
				shape: 'circle',
				restitution: 0.9, // 保持一定弹性
				friction: 0.01, // 保留少量摩擦力
				frictionAir: 0.01, // 保留少量空气阻力
				density: 0.0001 * radius, // 密度与半径成正比
				chamfer: {
					radius: 5
				},
				collisionFilter: {
					group: 0,
					category: 0x0001,
					mask: 0xFFFFFFFF
				}
			}
		);

		// 设置更小的随机初始速度和更随机的角度
		const angle = Phaser.Math.Between( 0, 360 );
		const speed = Phaser.Math.Between( 3, 6 ); // 增加初始速度

		// 将角度转换为弧度并计算x和y方向的速度分量
		const angleInRadians = Phaser.Math.DegToRad( angle );
		const velocityX = Math.cos( angleInRadians ) * speed;
		const velocityY = Math.sin( angleInRadians ) * speed;

		// 设置速度
		ball.setVelocity( velocityX, velocityY );

		// 创建文字
		const label = this.add.dom( x, y, 'div', {
			'font-size': Math.min( radius, 30 ) + 'px',
			'color': '#555555',
			'pointer-events': 'none',
			'line-height': '1',
			'vertical-align': 'middle',
			'width': radius + 'px',
			'height': radius + 'px',
			'box-sizing': 'border-box',
		}, text );
		label.setDepth( 2 )
			.setOrigin( 0 );

		// 确保sub标签能被正确解析
		label.node.innerHTML = text.replace( /<sub>/g, '<sub style="font-size: 0.7em; vertical-align: sub;">' );

		// 将文字绑定到物理体
		ball.label = label;

		// 更新位置
		this.matter.world.on( 'afterupdate', () => {
			if ( label && label.active ) {
				label.x = ball.x;
				label.y = ball.y;
			}
		} );

		// 存储小球引用
		this.balls.push( ball );
	}

	update() {
		// 更新逻辑
	}
}

// 创建游戏配置
const config = {
	type: Phaser.AUTO,
	width: GAME_WIDTH,
	height: GAME_HEIGHT,
	parent: 'ballm',
	transparent: true,
	backgroundColor: '#00000000',
	scale: {
		mode: Phaser.Scale.EXACT_FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		parent: 'ballm',
		width: '100%',
		height: '100%'
	},
	dom: {
		createContainer: true,
	},
	render: {
		antialias: true,
		pixelArt: true,
		roundPixels: false,
	},
	physics: {
		default: 'matter',
		matter: {
			debug: false,
			gravity: {
				y: 0.01
			}
		}
	},
	scene: BallScene
};

// 创建游戏实例
const game = new Phaser.Game( config );