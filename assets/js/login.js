const logInForm = document.getElementById('form-login');

if (logInForm) {
  logInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('log-in').textContent = 'Processing...';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await login(email, password);
    document.getElementById('log-in').textContent = 'Log In';
    document.getElementById('email').value='';
    document.getElementById('password').value='';
  });
}

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/user/create-session',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    window.alert(err.response.data.message)
  }
};
