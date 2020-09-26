class ToggleLike {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.toggleLike();
  }

  toggleLike() {
    $(this.toggler).click(async function (e) {
      e.preventDefault();
      let self = this;
      const { likeId, likeModel, likes } = e.target.dataset;
      //   console.log(likeModel, likeId, likes);
      if (likeModel && likeId && likes) {
        try {
          console.log(likeId, likeModel, likes);
          const res = await axios({
            method: 'POST',
            url: `/api/v1/like?id=${likeId}&type=${likeModel}`,
          });
          console.log(res);
          if (res.data.status === 'success') {
            let likeCount = parseInt(likes);
            console.log(likeCount);
            if (res.data.data.deleted == true) {
              likeCount -= 1;
            } else {
              likeCount += 1;
            }
            $(self).attr('data-likes', likeCount);
            document.getElementById(
              `${likeModel}-like-${likeId}`
            ).innerHTML = `${likeCount} likes`;
          }
        } catch (err) {
          alert(err.response.data.message);
        }
      }
    });
  }
}

$('.toggle-like-button').each(function () {
  let self = this;
  let toggleLike = new ToggleLike(self);
});
