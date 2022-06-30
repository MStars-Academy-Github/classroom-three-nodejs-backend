// front-end heseg

new window.EventSource("/sse").onmessage = function (event) {
  // window.messages ged ni messages id-g awch baigaa ni
  window.messages.innerHTML += `<p>${event.data}</p>`;
};

window.form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  window.fetch(`/chat?message=${window.input.value}`);
  window.input.value = "";
});
