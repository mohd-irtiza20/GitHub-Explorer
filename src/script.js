const details = document.getElementById('details');

function getUserDetails() {
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value;
  const url = `https://api.github.com/users/${username}`;

  if (username === '') {
    details.innerHTML = `
      <div id="not-found-card">
        <p id="InnerPara">Please Enter Username</p>
      </div>
    `;
    usernameInput.value = '';
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.login === undefined) {
        details.innerHTML = `
          <div id="not-found-card">
            <p id="InnerPara">User Not Found</p>
          </div>
        `;
      } else {
        details.innerHTML = `
          <div id="user-card">
           <div> <img src="${data.avatar_url}" alt="Avatar"> </div>
            <div id="user-info">
             <h2>${data.name}</h2> 
             <p>${data.bio}</p>

             <ul>
              <li>${data.followers} <span>Followers</span></li>
              <li>${data.following} <span>Following</span></li>
              <li>${data.public_repos} <span>Repos</span></li>
             </ul>

             <div id="repos"></div>
            </div>
          </div>
        `;
        getRepos(username);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      usernameInput.value = '';
    });
}

function getRepos(username) {
  const repoContainer = document.getElementById("repos");
  const reposUrl = `https://api.github.com/users/${username}/repos?sort=created`;

  fetch(reposUrl)
    .then((response) => response.json())
    .then((repos) => {
      repoContainer.innerHTML = '';
      repos.slice(0, 5).forEach((repo) => {
        const repoLink = document.createElement("a");
        repoLink.classList.add("repo");
        repoLink.href = repo.html_url;
        repoLink.target = "_blank";
        repoLink.innerText = repo.name;
        repoContainer.appendChild(repoLink);
      });
    })
    .catch((error) => {
      console.error('Error fetching repos:', error);
    });
}
