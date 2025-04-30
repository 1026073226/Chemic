
const ArHarm = () => {
  let y = this.chemist.x[
    this.randint(0,
      this.chemist.x.length - 1)
  ].y;
  let keyname = "maxp1";
  let mag = 1 + this.attrs.psf / 100;
  let realh = y;
  if (realh > 0) {
    realh *= mag;
  } else {
    realh *= this.msg[keyname] / 100;
  }
  if (realh > 800) {
    realh = this.randint(400, 600);
  }
  realh = Number(realh.toFixed(1));
  let tipstr = (y > 0 ? ("<span style='color:#AAF'>" + y + "(" + realh + ")"): ("<span style='color:#FAA'>" + (-y) + "(" + -realh + ")"));
  this.tip("Ar发生反应: " + tipstr);
  axios.get(`http://${ this.ip }:${ this.port }/`,
    {
      params: {
        h1: (realh > 0 ? realh: 0),
        h2: (realh < 0 ? -realh: 0),
        p: "p2",
        max: 100,
      }
    })
  .then(res => {
    this.connectType = 1;
  })
  .catch(err => {
    this.connectType = -1;
    this.err = err;
  });
  let rt = this.randint(30000 - this.settings.difficulty * 1000, 180000 - this.settings.difficulty * 1000);
  if (rt < 0) {
    rt = 1000;
  }
  this.inter.Ar = setTimeout(ArHarm, rt);
}
let init = () => {
  this.name = {
    p1: "玩家",
    p2: "Ar",
  };
  this.player = "p1";
  this.d.$("#choosePlayer").remove();
  let video = document.createElement("video");
  video.src = "media/cg/Ar_loss.mp4";
  video.style.opacity = "0";
  video.style.position = "absolute";
  video.style.left = "0";
  video.style.top = "0";
  video.style.width = "100vw";
  video.style.height = "100vh";
  video.style.pointerEvents = "none";
  video.style.zIndex = "99";
  video.style.transition = "opacity 421ms";
  video.style.display = "none";
  let cg = document.body.appendChild(video);
  this.settings.difficulty = 0;
  this.pdif = function() {
    this.cannext = true;
    if (this.msg.ht1 > this.maxh) {
      this.handbook = false;
      this.reaction = false;
      this.fty = false;
      if (!this.h) {
        this.change("h", true);
      }
      setTimeout(function() {
        clearTimeout(this.inter.msg);
        if (this.inter.Ar) {
          clearTimeout(this.inter.Ar);
        }
        this.tip(`
          你们已
          <span style="color: #FAA">热寂</span>
          `);
          setTimeout(this.stcry, 1000);
        this.countdown();
      }.bind(this),
        206);
    } else if (this.msg.ht2 > this.maxh) {
      this.handbook = false;
      this.reaction = false;
      this.fty = false;
      if (!this.h) {
        this.change("h", true);
      }
      setTimeout(function() {
        clearTimeout(this.inter.msg);
        if (this.inter.Ar) {
          clearTimeout(this.inter.Ar);
        }
        this.tip(`
          Ar已
          <span style="color: #AAF">被F填满</span><br />元素经验 +10%<br />获得 晶体*10
          `);
          setTimeout(this.stcry, 1000);
        for (let key in this.acts) {
          this.acts[key].xp += Math.round(100 * prop[key]);
          this.crystal += 10;
        }
        localStorage.acts = JSON.stringify(this.acts);
        localStorage.crystal = this.crystal;
        video.style.display = "block";
        setTimeout(() => {
          cg.style.opacity = 1;
          document.body.style.overflow = "hidden";
          cg.play();
          document.body.style.pointerEvents = "none";
        }, 10);
        cg.addEventListener("ended", () => {
          this.countdown();
        }, {
          once: true
        });
      }.bind(this),
        206);
    }
  }.bind(this);
}
let adds = () => {
  this.createSettings({
    name: "“多人”模式",
    key: "owner",
    value: false,
    temp: "switch",
    stateChange: function() {
      if (this.settings.owner) {
        let rt = this.randint(30000 - this.settings.difficulty * 1000, 180000 - this.settings.difficulty * 1000);
        if (rt < 0) {
          rt = 1000;
        }
        this.inter.Ar = setTimeout(ArHarm, rt);
        axios.get(`http://${ this.ip }:${ this.port }/`,
          {
            params: {
              key: "playerNum",
            }
          })
        .then(res => {
          this.connectType = 1;
          console.log(res);
          axios.get(`http://${ this.ip }:${ this.port }/`,
            {
              params: {
                var: "playerNum",
                value: Number(res.data) + 1,
              }
            })
          .catch(err => {
            this.connectType = -1;
            this.err = err;
          });
        })
        .catch(err => {
          this.connectType = -1;
          this.err = err;
        });
      } else if (this.inter.Ar) {
        clearTimeout(this.inter.Ar);
        axios.get(`http://${ this.ip }:${ this.port }/`,
          {
            params: {
              key: "playerNum",
            }
          })
        .then(res => {
          this.connectType = 1;
          axios.get(`http://${ this.ip }:${ this.port }/`,
            {
              params: {
                var: "playerNum",
                value: Number(res.data) - 1,
              }
            })
          .catch(err => {
            this.connectType = -1;
            this.err = err;
          });
        })
        .catch(err => {
          this.connectType = -1;
          this.err = err;
        });
      }
    }.bind(this),
  });
  this.createSettings({
    name: "“Ar”强度",
    key: "difficulty",
    value: 0,
    temp: "input",
  });
}
this.maxh = 1000;
this.updateMsg = () => {
  if (this.connectType === 1) {
    this.getMsg(function(res) {
      this.msg = (res.data);
      this.maxh = 1000 * (Number(this.msg.modVar.playerNum) || 1);
      this.pdif();
    }.bind(this));
  }
}
config({
  onload: init,
  mounted: adds,
});