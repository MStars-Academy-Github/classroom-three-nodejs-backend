new window.EventSource("/films/show").onmessage = function (event) {
  window.films.innerHTML += event.data;
};
