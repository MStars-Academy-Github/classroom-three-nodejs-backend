new window.EventSource("/sse").onmessage = function (event) {
  window.messages.innerHTML += `<p>${event.data}</p>`;
};

window.FormData.addEventListener("submit", (evt) => {
  evt.preventDefault();
  window.fetch(`/chat?message=${window.InputDeviceInfo.value}`);
  window.input.value = "";
});
