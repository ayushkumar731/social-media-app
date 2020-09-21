const signUpForm = document.getElementById('form-signup');

if (signUpForm) {
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('sign-up').textContent = 'Processing...';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    await signup(name, email, password, confirmPassword);
    document.getElementById('sign-up').textContent = 'Sign up';
    document.getElementById('name').value='';
    document.getElementById('email').value='';
    document.getElementById('password').value='';
    document.getElementById('confirmPassword').value='';
  });
}

const signup = async (name, email, password, confirmPassword) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/user/create',
      data: {
        name,
        email,
        password,
        confirmPassword,
      },
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/email-verification');
      }, 1000);
    }
  } catch (err) {
    window.alert(err.response.data.message)
  }
};
