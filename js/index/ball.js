class BallScene extends Phaser.Scene {
	constructor() {
		super( {
			key: 'BallScene'
		} );
		this.balls = []; // 存储所有小球
		this.draggingBall = null; // 当前正在拖动的小球
		this.dragConstraint = null; // 拖动约束
		this.selectedFuncBall = null; // 当前选中的功能球
		this.glowFX = null; // 发光效果
		this.maxBallsWidth = 0;
		this.lastBrand = null;
		this.sizeScale = 1;
	}

	create() {
		window.$this = this;
		const width = this.scale.width;
		const height = this.scale.height;

		// 创建物理墙
		this.wall = this.matter.add.rectangle( width / 2, 0, width, 5, {
			isStatic: true,
			restitution: 0.9,
			friction: 0.1,
		} );

		// 创建发光效果
		this.glowFX = {
			distance: 15,
			outerStrength: 2,
			innerStrength: 1,
			color: 0xffffff,
			quality: 0.1,
		};

    this.matter.world.setBounds(
      0, 0,
      width, height,  // 宽度、高度
      32,             // 边界厚度（默认值）
      true,           // 左边界（true = 创建）
      true,           // 右边界（true = 创建）
      false,          // 上边界（false = 不创建）
      true            // 下边界（true = 创建）
    );

		// 监听 Vue 实例的变化
		app.balls = {
			update: () => this.updateBalls(),
			resize: () => {
				if ( app.bottomlineHeight == this.scale.height || !this.wall ) return;
				const width = this.scale.width;
				const height = Math.round( app.bottomlineHeight );
				this.scale.resize( width, height );
				this.matter.world.setBounds( 0, 0, width, height );

				// 更新wall的位置和尺寸
				this.matter.body.setPosition( this.wall, {
					x: this.scale.width / 2,
					y: 0
				} );
				const wallBounds = this.wall.bounds;
				this.matter.body.scale( this.wall, this.scale.width / (wallBounds.max.x - wallBounds.min.x), 1 );
			},
			pruse: ( value ) => {
			  if ( value ) {
			    this.game.resume();
			  } else {
			    this.game.pause();
			  }
			},
		};

		// 添加点击事件
		this.input.on( 'pointerdown', this.handleBalls, this );

		this.input.on( 'pointermove', ( pointer ) => {
			if ( this.draggingBall && this.dragConstraint ) {
				// 更新约束点的位置
				this.dragConstraint.pointA = {
					x: pointer.x,
					y: pointer.y
				};
			}
		} );

		this.input.on( 'pointerup',
			() => {
				if ( this.draggingBall && this.dragConstraint ) {
					// 移除拖动约束
					this.matter.world.removeConstraint( this.dragConstraint );
					if ( this.draggingBall.body.position.y < 10 ) {
						this.useBall( this.draggingBall );
					}
					this.dragConstraint = null;
					this.draggingBall = null;
				}
			} );

	}

	handleBalls( pointer ) {
		const clickX = pointer.x;
		const clickY = pointer.y;
		let canFunc = true;

		// 遍历所有小球
		this.matter.world.localWorld.bodies.forEach( ( body ) => {
			if ( body.gameObject ) {
				// 计算点击位置到小球的方向向量
				const dx = body.position.x - clickX;
				const dy = body.position.y - clickY;
				const distance = Math.sqrt( dx * dx + dy * dy );
				const radius = body.gameObject.realRadius || body.gameObject.radius || 10;
				// 如果直接点击到小球
				if ( distance <= radius ) {
					const ballText = body.gameObject.btext;

					// 如果已经选中了功能球，且点击的是其他球
					if ( this.selectedFuncBall && this.selectedFuncBall !== body.gameObject &&
						canFunc ) {
						// 确保目标不是功能球
						if ( !ballText.match( /^\+\d$/ ) ) {
							const multiplier = parseInt( this.selectedFuncBall.label.node.innerHTML
								.replace( '+', '' ) );

							// 在目标位置创建多个元素球
							for ( let i = 0; i < multiplier; i++ ) {
								const offsetX = Phaser.Math.Between( -20, 20 );
								const offsetY = Phaser.Math.Between( -20, 20 );
								this.createBallWithText(
									body.position.x + offsetX,
									body.position.y + offsetY,
									ballText
								);
								app.brand.push( ballText );
							}

							// 移除功能球
							app.brand.splice( app.brand.indexOf( this.selectedFuncBall.btext ), 1 );
							this.matter.world.remove( this.selectedFuncBall.body );
							this.selectedFuncBall.label.destroy();
							this.selectedFuncBall.destroy();

							// 播放音效
							app.playSound( "cilllllll", false );

							// 重置选中状态
							this.selectedFuncBall = null;
							return;
						}
					}

					// 点击功能球时
					if ( ballText.match( /^\+\d$/ ) ) {
						if ( this.selectedFuncBall ) {
							// 取消之前选中的功能球的发光效果
							this.selectedFuncBall.postFX.clear();
							if ( this.selectedFuncBall === body.gameObject ) {
								this.selectedFuncBall = null;
								return;
							}
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
						this.tweens.add( {
							targets: fx,
							outerStrength: 4,
							innerStrength: 2,
							yoyo: true,
							repeat: -1,
							duration: 1000,
							ease: 'Sine.easeInOut'
						} );
						canFunc = false;
					}

					// 如果是普通拖动
					this.draggingBall = body.gameObject;
					this.dragConstraint = this.matter.add.pointerConstraint( {
						pointA: {
							x: clickX,
							y: clickY
						},
						body: body,
						stiffness: 0.0,
						damping: 0.005 * this.draggingBall.radius,
					} );
				}
				// 如果在小球周围，则施加推动力
				else if ( distance < 300 ) {
					// 计算力的方向和大小（距离越近力越大）
					const forceMagnitude = ( 300 - distance ) * 0.0002 * this.sizeScale;
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

	useBall( ball ) {
		if ( app.add( ball.btext ) ) {
		  this.destroyBall( ball );
		} else {
		  ball.setPosition( this.scale.width / 2, this.scale.height / 2 );
		}
	}

	destroyBall( ball ) {
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
	}

	calculateBallPosition( i, gridSize, cellWidth, cellHeight ) {
		// 计算网格位置
		const row = Math.floor( i / gridSize );
		const col = i % gridSize;

		// 在网格位置周围添加随机偏移，确保在左侧区域内
		const x = ( col + 1 ) * cellWidth + Phaser.Math.Between( -cellWidth / 3, cellWidth / 3 );
		const y = ( row + 1 ) * cellHeight + Phaser.Math.Between( -cellHeight / 3, cellHeight / 3 );
		return {
			x: x,
			y: y,
		}
	}

	updateBalls() {
		if ( JSON.stringify( app.brand ) === this.lastBrand ) {
			return;
		}
		this.lastBrand = JSON.stringify( app.brand );
		// 完全清理所有现有小球
		this.balls.forEach( ball => {
			this.destroyBall( ball );
		} );
		this.balls = [];
		this.maxBallsWidth = 0;

		// 创建网格布局（只在左侧80%区域）
		const gridSize = Math.ceil( Math.sqrt( app.brand.length ) );
		const cellWidth = this.scale.width / ( gridSize + 1 );
		const cellHeight = this.scale.height / ( gridSize + 1 );

		// 根据brand创建新的小球
		for ( let i = 0; i < app.brand.length; i++ ) {
			const {
				x,
				y
			} = this.calculateBallPosition( i, gridSize, cellWidth, cellHeight );
			this.createBallWithText( x, y, app.brand[ i ] );

		}

		//调整至合适的大小
		let s = this.scale.width * this.scale.height;
		if ( this.maxBallsWidth > s ) {
			this.balls.map( ball => {
				this.sizeScale = s / this.maxBallsWidth;
				if ( ball.radius * this.sizeScale < 10 ) {
					this.sizeScale *= 10 / ball.radius / this.sizeScale;
				}
				ball.setScale( this.sizeScale );
				ball.label.setScale( this.sizeScale );
				ball.realRadius = ball.radius * this.sizeScale;
			} );
		}
	}

	createBallWithText( x, y, text ) {
	  
		// 根据原子序数计算半径，使用对数函数使大小差距更小
		const atomic = chemist.elements[ text ]?.atomic || 0.1 / prop[ text ] || 1;
		const radius = Math.floor( 15 + Math.log2( atomic ) * 3 ); // 基础大小15，每增加一倍原子序数增加3像素
		y = Math.max(y, 5 + radius);
		let color = colors[ text ] || "#DDDDDD";
		color = Phaser.Display.Color.HexStringToColor( color ).color;
		this.maxBallsWidth += radius * radius * 4;
		// 创建圆形物理体
		const ball = this.matter.add.gameObject(
			this.add.circle( x, y, radius, color ), {
				shape: 'circle',
				restitution: 0.9, // 保持一定弹性
				friction: 0.01, // 保留少量摩擦力
				frictionAir: 0.01, // 保留少量空气阻力
				density: Math.log2( radius ) * 0.002, // 密度与半径成正比
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
		const speed = Phaser.Math.Between( 2, 4 );

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
			'line-height': '1',
			'vertical-align': 'middle',
			'width': radius + 'px',
			'height': radius + 'px',
			'box-sizing': 'border-box',
		}, text );
		label.setDepth( 2 )
			.setOrigin( 0 )
			.disableInteractive();

		// 确保sub标签能被正确解析
		label.node.innerHTML = text.replace( /<sub>/g, '<sub style="font-size: 0.7em; vertical-align: sub;">' );
		label.node.className = 'ball-label';

		// 将文字绑定到物理体
		ball.label = label;

		//将索引绑定到小球
		ball.btext = text;

		// 将实际大小绑定至小球
		ball.realRadius = radius;

		// 更新位置
		this.matter.world.on( 'afterupdate', () => {
			if ( label && label.active ) {
				label.x = ball.x - ball.realRadius / 3;
				label.y = ball.y;
			}
		} );

		// 存储小球引用
		this.balls.push( ball );
	}

}

// 创建游戏配置
const config = {
	type: Phaser.AUTO,
	width: Math.round( window.innerWidth ),
	height: 120,
	parent: 'ballm',
	transparent: true,
	backgroundColor: '#00000000',
	scale: {
		mode: Phaser.Scale.EXACT_FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		parent: 'ballm',
	},
	fps: {
		target: 60,
		min: 30
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
			gravity: {
				y: 0.01
			}
		}
	},
	input: {
		touch: true,
		mouse: true
	},
	scene: BallScene
};

// 创建游戏实例
const game = new Phaser.Game( config );