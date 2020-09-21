const resetFrom = document.getElementById('form-reset');

if (resetFrom) {
  resetFrom.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('reset').textContent = 'Processing...';
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const url = window.location.href;
    await reset(password, confirmPassword, url);
    document.getElementById('reset').textContent = 'Reset Password';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
  });
}

const reset = async (password, confirmPassword, url) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data: {
        password,
        confirmPassword,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    window.alert(err.response.data.message);
  }
};
