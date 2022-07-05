new window.EventSource("/films/show").onmessage = function (event) {
  console.log(event.data);
  window.films.innerHTML += `${event.data}`;
};
