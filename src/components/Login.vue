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
  import { email, required, minLength, maxLength } from 'vuelidate/lib/validators';
  import validation from "../mixins/validation";
  import api from '@/plugins/api';

  export default {
    name: "Login",
    data: () => ({
      login: '',
      loginPass: '',
      message: '',
    }),
    mixins: [validation],
    validations: {
      email: {
        required,
        email
      },
      phone: {
        required,
        correctNumber: function(value) {
          return this.regExpTest(
            value,
            /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
          )
        },
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30),
        strongPassword: function(value) {
          return this.regExpTest(
            value,
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/
          )
        }
      },
      passwordRepeat: {
        required,
        matchingPasswords: function() {
          return this.password === this.passwordRepeat
        }
      },
      name: {
        required,
        minLength: minLength(2),
        correctName: function(value) {
          return this.regExpTest(
            value,
            /^([А-ЯЁ]|[A-Z])([а-яё]|[a-z]|-|~)+$/
          )
        }
      },
      surname: {
        required,
        minLength: minLength(2),
        correctSurname: function(value) {
          return this.regExpTest(
            value,
            /^([А-ЯЁ]|[A-Z])([а-яё]|[a-z]|-|~)+$/
          )
        }
      },
    },
    computed: {
    },
    methods: {
      async onSignIn() {
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

          })
          .catch((err) => {
            console.log(err);
          });
      },
    }
  }
</script>

<style>

</style>