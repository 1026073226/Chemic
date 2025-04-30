this.add = function(v, i, bd) {
  this.playSound("da");
  if (i == -1) {
    i = this.brand.indexOf(v);
  }
  if (v in this.chemist.elements) {
    this.addInObj((this.alting ? this.alts: this.text), v);
    for (let i = 0; i < this.chemist.x.length; i++) {
      if (Object.keys(this.chemist.x[i].f).includes(this.press(this.text)) || Object.keys(this.chemist.x[i].t).includes(this.press(this.text))) {
        this.pressedVal = [0];
        break;
      } else {
        this.pressedVal = "*";
      }
    }
  } else {
    v = Number(v);
    let keys = Object.keys(this.text);
    let lastone = keys[keys.length - 1];
    if (lastone == undefined) {
      this.tip("数字不能在首位");
      return;
    }
    this.text[lastone] += v;
    for (let i = 0; i < this.chemist.x.length; i++) {
      if (Object.keys(this.chemist.x[i].f).includes(this.press(this.text)) || Object.keys(this.chemist.x[i].t).includes(this.press(this.text))) {
        this.pressedVal = [0];
        break;
      } else {
        this.pressedVal = "*";
      }
    }
  }
  if (!this.settings.ap || bd.target.children[0].innerText == "") {
    this.a.play(bd.target, "jslidein 186ms ease-in", 0);
  } else {
    this.brand.splice(i, 1);
    return;
  }
  bd.target.addEventListener("animationend", function() {
    this.brand.splice(i, 1);
  }.bind(this), {
    once: true
  });
}.bind(this);