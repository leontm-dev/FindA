const url = String(window.location.href).replace("/dev", "");
function addNews(header, date, id, info) {
  let news = document.createElement("div");
  news.title = id;
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
window.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    if (
      document
        .getElementById("loader")
        .checkVisibility({ checkVisibilityCSS: true })
    ) {
      if (document.getElementById("loader-password").value != "") {
        fetch(
          `${url}api/dev/password/${
            document.getElementById("loader-password").value
          }`,
          {
            method: "GET",
          }
        ).then((res) => {
          if (res.status == 200) {
            document.getElementById("loader").classList.add("hide");
            document.getElementById("edit-window").classList.remove("hide");
            document.getElementById("news-window").classList.remove("hide");
            document.getElementById("footer").classList.remove("hide");
            fetch(`${url}api/news/current`, {
              method: "GET",
              headers: {
                finda_key: "BdTo0gSikXqVjW2P9vuX",
              },
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
          } else {
            alert("Unauthorized");
          }
        });
      } else {
        alert("Passwort fehlt!");
      }
    }
  }
});
document.getElementById("edit-send").addEventListener("click", (ev) => {
  let title = document.getElementById("edit-news-title").value;
  let date = document.getElementById("edit-news-date").value;
  let infos = document.getElementById("edit-news-details").value;
  if (title != "") {
    if (infos != "") {
      if (date == "") {
        date = `${new Date().toLocaleTimeString(
          "de-DE"
        )}, ${new Date().toLocaleDateString("de-DE")}`;
      }
      let news = {
        title: title,
        date: date,
        details: infos,
      };
      fetch(`${url}api/news/new/${JSON.stringify(news)}`, {
        method: "POST",
        headers: {
          finda_key: "BdTo0gSikXqVjW2P9vuX",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            alert("Erfolg");
          } else {
            alert("Etwas ist schiefgelaufen");
          }
        })
        .then((data) => {
          data;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Die Infos zur Neuigkeit sollten nicht leer bleiben!");
    }
  } else {
    alert("Der Titel fehlt!");
  }
});
document.getElementById("home-item").addEventListener("click", (ev) => {
  window.scrollTo({ behavior: "smooth", top: 0 });
});
document.getElementById("news-item").addEventListener("click", (ev) => {
  window.location.href = `${window.location.href}/news`;
});
document.getElementById("contact-item").addEventListener("click", (ev) => {
  window.location.href = "mailto:finda@windthorstgymnasium.de";
});
