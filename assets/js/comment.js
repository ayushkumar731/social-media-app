const commentForm = document.querySelectorAll('.form-comment');

if (commentForm) {
  commentForm.forEach((el) => {
    el.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { commentId } = e.target.dataset;
      document.getElementById(`comment-btn-${commentId}`).textContent =
        'Processing...';
      const content = document.getElementById(`comment-${commentId}`).value;

      await comment(content, commentId);
      document.getElementById(`comment-${commentId}`).value = '';
      document.getElementById(`comment-btn-${commentId}`).textContent = 'Post';
    });
  });
}

const comment = async (content, commentId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/comment/${commentId}`,
      data: {
        content,
      },
    });
    let newComment = newCommentDom(res.data.data);
    $(`#comment-container-${commentId}`).prepend(newComment);
  } catch (err) {
    alert(err.response.data.message);
  }
};

let newCommentDom = function (comments) {
  return $(`<div>
      <p class="name">${comments.user.name}</p>
      <p>${comments.content}</p>
  </div>
  <hr />`);
};
