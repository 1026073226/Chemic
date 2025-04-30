let init = () => {
  const d = this.d.$("#rounds");
  const m = this.d.$("#more");
  const sheet = document.styleSheets[0];
  var input = document.createElement("textarea");
  input.style.width = "120px";
  input.style.height = "2em";
  input.style.display = "block";
  input.addEventListener("blur", (e) => {
    try {
      let r = eval(e.target.value);
      if (r) {
        this.confirm(r);
      }
    }catch(e) {
      this.confirm(e);
    }
  });
  m.appendChild(input);
  var isOpened = false;
  var loc = {};
  d.style.pointerEvents = "auto";
  d.addEventListener("click",
    (e) => {
      if (!isOpened) {
        loc.border = sheet.cssRules.length;
        sheet.insertRule(`
          * :not(html):not(body):not(#app) {
            border: 1px solid red;
          }
          `, sheet.cssRules.length);
        isOpened = true;
      } else {
        sheet.deleteRule(loc.border);
        isOpened = false;
      }
    });
};
config({
  onload: init,
});