const forgotForm = document.getElementById('form-forgot');

if (forgotForm) {
  forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('forgot').textContent = 'Processing...';
    const email = document.getElementById('email').value;
    await forgot(email);
    document.getElementById('forgot').textContent = 'Send Login Link';
    document.getElementById('email').value = '';
  });
}

const forgot = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/user/forgot-password',
      data: {
        email,
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
