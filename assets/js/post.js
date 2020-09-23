const postForm = document.getElementById('form-post');
const postDom = document.querySelectorAll('.post-container');

if (postForm) {
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('post-form-btn').textContent = 'Processing...';
    const form = new FormData();
    form.append('content', document.getElementById('post-content').value);
    form.append('photo', document.getElementById('post-photo').files[0]);

    await post(form);
    document.getElementById('post-content').value = '';
    document.getElementById('post-photo').value = '';
    document.getElementById('post-form-btn').textContent = 'Post';
  });
}

const post = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/post',
      data,
    });

    console.log(res);
    let newPost = newPostDom(res.data.data);
    $('#home-post-content').prepend(newPost);
    deletePost($(' .dlt-btn>img', newPost));
  } catch (err) {
    console.log(err.response.data.message);
  }
};

let newPostDom = function (post) {
  return $(`<div class="post-container" id="post-${post.id}">
    <div class="user">
      <div class="user-info">
        <div class="user-photo">
          <img src="/img/users/${post.user.photo}" alt="user-photo" />
        </div>
        <div class="user-name">
          <p><a href="/${post.user._id}">${post.user.name}</a></p>
        </div>
      </div>
     
      <div class="dlt">
        <button class="dlt-btn" data-dlt-id="${post.id}">
          <img src="https://www.flaticon.com/svg/static/icons/svg/1828/1828843.svg" data-dlt-id="${post.id}"/>
        </button>
      </div>
    </div>
    <div class="post">
      <div class="post-img">
        <img src="/img/posts/${post.photo}" />
      </div>
      <div class="post-activity">
        <button class="like-unlike" data-like-id="${post.id}">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/3507/3507627.svg"
            alt='like-icon'
          />
        </button>
        <button class="comment-pop-btn">
          <img
            src=" https://www.flaticon.com/svg/static/icons/svg/2462/2462719.svg"
            alt="comment-icon"
          />
        </button>
      </div>
      <div class="likes">${post.likes.length} likes</div>
      <div class="post-content">
        <p>${post.content}</p>
      </div>
    </div>
    <div class="comment-form">
      <form>
        <input type="text" class="comment" placeholder="Add a comment..." />
        <button class="comment-btn" data-comment-id="${post.id}">Post</button>
      </form>
    </div>
  </div>
  `);
};

//this works when no task added
postDom.forEach((el) => {
  console.log(el);
  el.addEventListener('click', async (e) => {
    const { dltId } = e.target.dataset;
    if (dltId) {
      try {
        const res = await axios({
          method: 'DELETE',
          url: `api/v1/post/${dltId}`,
        });
        console.log(res);
        if (res.data.status === 'success') {
          $(`#post-${res.data.data.postId}`).remove();
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  });
});

//this works when new tasks added and dlt right now without refresr the page
let deletePost = function (deleteLink) {
  $(deleteLink).click(async function (e) {
    const { dltId } = e.target.dataset;
    if (dltId) {
      try {
        const res = await axios({
          method: 'DELETE',
          url: `api/v1/post/${dltId}`,
        });
        console.log(res);
        if (res.data.status === 'success') {
          $(`#post-${res.data.data.postId}`).remove();
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  });
};
