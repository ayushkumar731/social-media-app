/*
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
*/

class PostComments {
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId) {
    this.postId = postId;
    this.commentContainer = $(`#comment-container-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comment-form`);

    this.createComment(postId);

    let self = this;
    // call for all the existing comments
    $(' .delete-comment-button', this.commentContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    this.newCommentForm.submit(async function (e) {
      e.preventDefault();
      let self = this;
      const { commentId } = e.target.dataset;

      document.getElementById(`comment-btn-${commentId}`).textContent =
        'Processing...';
      const content = document.getElementById(`comment-${commentId}`).value;

      await comment(content, commentId);
      document.getElementById(`comment-${commentId}`).value = '';
      document.getElementById(`comment-btn-${commentId}`).textContent = 'Post';
      // $.ajax({
      //   type: 'post',
      //   url: '/comments/create',
      //   data: $(self).serialize(),
      //   success: function (data) {
      //     let newComment = pSelf.newCommentDom(data.data.comment);
      //     $(`#post-comments-${postId}`).prepend(newComment);
      //

      //     // CHANGE :: enable the functionality of the toggle like button on the new comment
      //     new ToggleLike($(' .toggle-like-button', newComment));

      //     new Noty({
      //       theme: 'relax',
      //       text: 'Comment published!',
      //       type: 'success',
      //       layout: 'topRight',
      //       timeout: 1500,
      //     }).show();
      //   },
      //   error: function (error) {
      //     console.log(error.responseText);
      //   },
      // });
    });

    const comment = async (content, commentId) => {
      try {
        let pSelf = this;
        const res = await axios({
          method: 'POST',
          url: `/api/v1/comment/${commentId}`,
          data: {
            content,
          },
        });
        let newComment = newCommentDom(res.data.data);
        $(`#comment-container-${commentId}`).prepend(newComment);
        pSelf.deleteComment($(' .delete-comment-button', newComment));
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
              class="delete-comment-button"
            />
          </button>
        
        </div>
        <p>${comments.content}</p>
        <hr />
      </div>
    `);
    };
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(async function (e) {
      e.preventDefault();
      const { dltCommentId } = e.target.dataset;

      if (dltCommentId) {
        try {
          const res = await axios({
            method: 'DELETE',
            url: `/api/v1/comment/${dltCommentId}`,
          });
          if (res.data.status === 'success') {
            $(`#comment-${res.data.data.id}`).remove();
          }
        } catch (err) {
          alert(err.response.data.message);
        }
      }
    });
  }
}
