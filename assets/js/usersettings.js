{
  const userDataForm = document.getElementById('form-user-data');
  const userPasswordForm = document.getElementById(
    'form-current-user-password'
  );

  if (userDataForm) {
    userDataForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      document.getElementById('btn-save-user').textContent = 'Updating...';
      const form = new FormData();
      form.append('name', document.getElementById('name').value);
      form.append('email', document.getElementById('email').value);
      form.append('photo', document.getElementById('photo').files[0]);
      const results = await userData(form);
      document.getElementById('btn-save-user').textContent = 'SAVE SETTINGS';
    });
  }

  const userData = async (data) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: '/api/v1/user/profile/me',
        data,
      });
      if (res.data.status === 'success') {
        document.getElementById(
          'my-img'
        ).src = `/img/users/${res.data.data.user.photo}`;
        document.getElementById(
          'user-img'
        ).src = `/img/users/${res.data.data.user.photo}`;
        alert('Data updated');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      document.getElementById('btn-save-user-password').textContent =
        'Updating...';

      const currentPassword = document.getElementById('currentPassword').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      await passwordChange(currentPassword, password, confirmPassword);

      document.getElementById('currentPassword').value = '';
      document.getElementById('password').value = '';
      document.getElementById('confirmPassword').value = '';
      document.getElementById('btn-save-user-password').textContent =
        'SAVE PASSWORD';
    });
  }

  const passwordChange = async (currentPassword, password, confirmPassword) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: '/api/v1/user/update-password',
        data: {
          currentPassword,
          password,
          confirmPassword,
        },
      });
      console.log(res);
    } catch (err) {
      alert(err.response.data.message);
    }
  };
}
