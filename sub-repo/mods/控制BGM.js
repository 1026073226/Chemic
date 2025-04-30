let init = () => {
  this.d.$("#bgm").controls = true;
  this.d.$("#bgm").style.height = "2em";
  this.d.$("#bgm").style.width = "100%";
};
config ({
  onload: init
});