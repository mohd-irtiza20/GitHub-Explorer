const details = document.getElementById('details');

function getUserDetails() {
  const username = document.getElementById('username').value;
  const url = `https://api.github.com/users/${username}`;

  if (username === '') {
    details.innerHTML = `<p id="InnerPara"> Please Enter Username</p>`;
    return;
  }

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.login === undefined) {
        details.innerHTML = `<p id="InnerPara">Username not found</p>`;
      } else {
        details.innerHTML = `
        <div id="card">
         <div> <img src="${data.avatar_url}" alt="Avatar"> </div>
          <div id="info">
           <h2>${data.name}</h2> 
           <p>${data.bio}</p>

           <ul>
            <li><span>Followers</span> ${data.followers}</li>
            <li><span>Following</span> ${data.following}</li>
            <li><span>Repositories</span> ${data.public_repos}</li>
           </ul>

           <div id="repos"></div>
          </div>
        </div>

        `;
        getRepos(username);
      }
    });

  function getRepos(username) {
    // Repos
    const repoContainer = document.getElementById("repos");
    const reposUrl = `https://api.github.com/users/${username}/repos`;

    fetch(reposUrl)
      .then((response) => {
        return response.json();
      })
      .then((repos) => {
        repos.slice(0, 5).forEach((repo) => {
          const repoLink = document.createElement("a");
          repoLink.classList.add("repo");
          repoLink.href = repo.html_url;
          repoLink.target = "_blank";
          repoLink.innerText = repo.name;
          repoContainer.appendChild(repoLink);
        });
      });
  }
}
