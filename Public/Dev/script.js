const url = String(window.location.href).replace("dev", "");
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
  let buttonEdit = document.createElement("div");
  buttonEdit.classList.add("devButton");
  buttonEdit.classList.add("edit");
  let editImg = document.createElement("img");
  editImg.src = "/Images/Black/Bearbeiten.png";
  buttonEdit.appendChild(editImg);
  buttonEdit.addEventListener("click", (ev) => {
    document.getElementById("edit-window").title = id;
    document.getElementById("editClose").style.display = "unset";
    document.getElementById("edit-news-details").value = info;
    document.getElementById("edit-news-title").value = header;
    document.getElementById("edit-news-date").style.display = "none";
    document.getElementById("edit-window").localName = date;
    document.getElementById("editClose").addEventListener("click", (ev) => {
      document.getElementById("editClose").style.display = "none";
      document.getElementById("edit-news-details").value = "";
      document.getElementById("edit-news-date").value = "";
      document.getElementById("edit-news-title").value = "";
      document.getElementById("edit-news-date").style.display = "unset";
      document.getElementById("edit-window").title = "";
      document.getElementById("edit-window").localName = "";
    });
  });
  let buttonDelete = document.createElement("div");
  buttonDelete.classList.add("devButton");
  buttonDelete.classList.add("delete");
  let deleteImg = document.createElement("img");
  deleteImg.src = "/Images/Black/Delete.png";
  buttonDelete.appendChild(deleteImg);
  buttonDelete.addEventListener("click", (ev) => {
    let input = window.prompt("Geben sie das Passwort ein...");
    fetch(`${url}api/dev/password/${input}`, {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        if (window.confirm("Wollen sie die News wirklich löschen?")) {
          fetch(`${url}/api/news/delete/${id}`, {
            method: "DELETE",
            headers: { finda_key: input },
          }).then((res) => {
            if (res.ok) {
              alert("Erfolgreich gelöscht!");
            }
          });
        }
      }
    });
  });
  news.appendChild(buttonEdit);
  news.appendChild(buttonDelete);
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
            localStorage.setItem(
              "finda_key",
              document.getElementById("loader-password").value
            );
            document.getElementById("loader").classList.add("hide");
            document.getElementById("edit-window").classList.remove("hide");
            document.getElementById("news-window").classList.remove("hide");
            document.getElementById("footer").classList.remove("hide");
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
  if (document.getElementById("edit-window").title == "") {
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
            finda_key: "2022FindA2023",
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
  } else {
    if (title != "") {
      if (infos != "") {
        let news = {
          title: title,
          date: document.getElementById("edit-window").localName,
          details: infos,
        };
        fetch(
          `${url}api/news/edit/${
            document.getElementById("edit-window").title
          }/${JSON.stringify(news)}`,
          {
            method: "POST",
            headers: {
              finda_key: "2022FindA2023",
            },
          }
        )
          .then((res) => {
            if (res.status === 200) {
              alert("Erfolg");
              document.getElementById("editClose").style.display = "none";
              document.getElementById("edit-news-details").value = "";
              document.getElementById("edit-news-date").value = "";
              document.getElementById("edit-news-title").value = "";
              document.getElementById("edit-news-date").style.display = "unset";
              document.getElementById("edit-window").title = "";
              document.getElementById("edit-window").localName = "";
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
  }
});
document.getElementById("home-item").addEventListener("click", (ev) => {
  window.location.href = "https://official.finda-app.repl.co/";
});
document.getElementById("news-item").addEventListener("click", (ev) => {
  window.location.href = `https://official.finda-app.repl.co/news`;
});
document.getElementById("contact-item").addEventListener("click", (ev) => {
  window.location.href = "mailto:finda@windthorstgymnasium.de";
});
window.onload = async () => {
  if (localStorage.getItem("finda_key") != null) {
    fetch(`${url}api/dev/password/${localStorage.getItem("finda_key")}`, {
      method: "GET",
    }).then((res) => {
      if (res.status == 200) {
        document.getElementById("loader").classList.add("hide");
        document.getElementById("edit-window").classList.remove("hide");
        document.getElementById("news-window").classList.remove("hide");
        document.getElementById("footer").classList.remove("hide");
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
  }
};
