const apiUrl = 'https://jsonplaceholder.typicode.com';

async function fetchPosts() {
  try {
    const response = await fetch(`${apiUrl}/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.log('fetchPosts:', e);
  }
}

function listPosts(postContainerElementId) {
  const postContainerElement = document.getElementById(
    `${postContainerElementId}`
  );

  if (!postContainerElement) {
    return;
  }

  // because fetchPosts returns a promise, use then() to get content and
  // catch() in case of any error, e.g. if posts is not iterable
  fetchPosts()
    .then((posts) => {
      console.log(posts);
      if (!posts) {
        postContainerElement.innerText = 'Could not get posts';
      }
      for (const post of posts) {
        postContainerElement.appendChild(postElement(post));
      }
    })
    .catch((e) => {
      console.log('listPosts:', e);
    });
}

function postElement(post) {
  const anchorElement = document.createElement('a');
  anchorElement.setAttribute('href', `${apiUrl}/posts/${post.id}`);
  anchorElement.setAttribute('target', '_blank');
  anchorElement.innerText = capitalizeFirstLetter(post.title);

  const postTitleElement = document.createElement('h3');
  postTitleElement.appendChild(anchorElement);

  return postTitleElement;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}