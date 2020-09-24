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
    console.log(res);
    let newComment = newCommentDom(res.data.data);
    $(`#comment-container-${commentId}`).prepend(newComment);
  } catch (err) {
    alert(err.response.data.message);
  }
};

let newCommentDom = function (comments) {
  return $(`   <div id="comment-${comments.id}">
    <div class="name">
      <a href="/${comments.user._id}">${comments.user.name}</a>
      
      <button class="dlt-btn">
        <img
          src=" https://www.flaticon.com/svg/static/icons/svg/1828/1828843.svg"
          data-dlt-comment-id="${comments.id}"
        />
      </button>
    
    </div>
    <p>${comments.content}</p>
  </div>
  <hr />`);
};
