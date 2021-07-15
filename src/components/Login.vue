<template lang="pug">
  div
    h3 Войти
    form(class="auth-card__form container" @submit.prevent="onSignIn")
      div(class="auth-card__item  form-group")
        label(class="auth-card__label") email
        input(
          class="auth-card__input  form-control"
          v-model="login"
          type="email")
      div(class="auth-card__item form-group")
        label(class="auth-card__label") пароль
        input(
          class="auth-card__input form-control"
          v-model="loginPass"
          type="password")
        div(
          class="auth-card__message"
          v-if="message"
        ) {{message}}
      div(class="auth-card__buttons row")
        div(class="col")
          button(class="auth-card__submit  darken button btn btn-dark w-100 border-2" type="submit") Подтвердить
</template>

<script>
  import api from '@/plugins/api';

  export default {
    name: "Login",
    data: () => ({
      login: '',
      loginPass: '',
      message: '',
    }),
    computed: {
    },
    methods: {
      async onSignIn() {
        this.message = '';
        const formData = {
          email: this.login,
          password: this.loginPass,
        };
        const login = await api.post('/login', formData)
          .then(res => {
            const {success, message, token } = res.data;
            console.log(res);
            if(success) {
              localStorage.setItem('token', token);
              console.log(token);
              this.$router.push({name: "Home"})
            } else {
              this.message = message;
            }
            console.log(res);

          })
          .catch((err) => {
            console.log(err.response.data);
            this.message = err.response.data.message;

          });
      },
    }
  }
</script>

<style>

</style>