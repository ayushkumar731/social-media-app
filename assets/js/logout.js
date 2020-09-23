const logOutBtn = document.getElementById('logout');

if (logOutBtn) {
  logOutBtn.addEventListener('click', async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/v1/user/logout',
      });
      if (res.data.status === 'success') {
        location.assign('/');
      }
    } catch (err) {
      alert('please try again!');
    }
  });
}
