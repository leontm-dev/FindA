const url = "https://official.finda-app.repl.co";
function addNews(header, date, id, info) {
  let news = document.createElement("div");
  news.classList.add("news");
  let details = document.createElement("div");
  details.innerHTML = info;
  details.classList.add("news-details");
  let title = document.createElement("div");
  title.classList.add("news-title");
  title.innerHTML = `${header} <span class='news-date'>(${date})</span>`;
  news.appendChild(title);
  news.appendChild(details);
  document
    .getElementById("news-window")
    .insertBefore(news, document.getElementById("news-start"));
}
window.onload = () => {
  fetch(`${url}/api/news/current`, {
    method: "GET",
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((data) => {
      Object.values(data).forEach((e) => {
        addNews(e.title, e.date, e.id, e.details);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById("home-item").addEventListener("click", (ev) => {
  window.location.href = url;
});
document.getElementById("news-item").addEventListener("click", (ev) => {
  window.location.href = `${url}/news`;
});
document.getElementById("contact-item").addEventListener("click", (ev) => {
  window.location.href = "mailto:finda@windthorstgymnasium.de";
});
