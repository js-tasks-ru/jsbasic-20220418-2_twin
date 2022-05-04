function hideSelf() {
  const button = document.querySelector(".hide-self-button");
  button.onclick = function() {
    button.hidden = true;
  };
}