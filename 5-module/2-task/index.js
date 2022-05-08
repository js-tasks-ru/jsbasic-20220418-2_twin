function toggleText() {
  const button = document.querySelector(".toggle-text-button");
  const text = document.getElementById("text");
  let isHidden = false;
  button.onclick = function() {
    isHidden = !isHidden;
    text.hidden = isHidden;
  };
}