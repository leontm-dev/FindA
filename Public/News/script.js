const url = String(window.location.href).replace("/news", "");
function addNews(header, date, id, info) {
  let news = document.createElement("div");
  news.classList.add("news");
  let details = document.createElement("div");
  details.innerHTML = info;
  details.classList.add("news-details");
  let title = document.createElement("div");
  title.classList.add("news-title");
  title.innerHTML = `${header} <span class='news-date'>(${date})</span>`;
  news.append([title, details]);
  document
    .getElementById("news-window")
    .insertBefore(news, document.getElementById("news-start"));
}
window.onload = () => {
  fetch(`${url}api/news/current`, {
    method: "GET",
    headers: {
      finda_key: "2022FindA2023",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((data) => {
      for (let i = data.length; i >= 0; i--) {
        addNews(data[i].title, data[i].date, data[i].id, data[i].info);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById("home-item").addEventListener("click", (ev) => {
  window.location.href = "https://official.finda-app.repl.co/";
});
document.getElementById("news-item").addEventListener("click", (ev) => {
  window.location.href = `https://official.finda-app.repl.co/news`;
});
document.getElementById("contact-item").addEventListener("click", (ev) => {
  window.location.href = "mailto:finda@windthorstgymnasium.de";
});
