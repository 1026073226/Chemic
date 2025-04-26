function Anima(arr) {
	this.__TIMEOUT__ = 10;
	__that__ = this;
	this.play = function(that, animation, t = "none", reset = true) {
		/*if (that.style.animation && that.style.animation !== "none" && reset) {
			that.style.animation = "none";
		}
		setTimeout(function() {
			that.style.animation = animation;
		}, (t !== "none" ? t : __that__.__TIMEOUT__));*/
		that.style.animation = animation;
		that.addEventListener("animationend", () => {
			if (that.style.animation && that.style.animation !== "none" && reset) {
				that.style.animation = "none";
			}
		}, {
			once: true
		});
	};

	function p(that, event, animation) {
		that.addEventListener(event, function() {
			if (that.style.animation && that.style.animation !== "none") {
				that.style.animation = "none";
			}
			setTimeout(function() {
				that.style.animation = animation;
			}, __that__.__TIMEOUT__);
		});
	}
	this.set = function(that, event, animation) {
		if (that instanceof Element) {
			p(that, event, animation);
		} else if (that instanceof NodeList) {
			for (let i = 0; i < that.length; i++) {
				p(that[i], event, animation);
			}
		}
	};
	this.init = function(arr) {
		for (let i = 0; i < arr.length; i++) {
			let obj = arr[i];
			__that__.set(obj.that, obj.event, obj.animation);
		}
	};
	if (arr) {
		this.init(arr);
	}
	return this;
}

function Dom() {
	this.$ = function(query) {
		return document.querySelector(query);
	};
	this.$$ = function(query) {
		return document.querySelectorAll(query);
	};
	this.attr = function(list) {
		for (let key in list) {
			let d = this.$$(key);
			for (let ley in d) {
				for (let mey in list[key]) {
					d[ley][mey] = list[key][mey];
				}
			}
		}
	}.bind(this);
	this.cbattr = function(query, f) {
		let d = this.$$(query);
		for (let k = 0; k < d.length; k++) {
			f(d[k]);
		}
	}.bind(this);
	return this;
}