<template lang="pug">
  div(
    class="auth-card__block"
  )
    h3 Присоединиться
    form(class="auth-card__form container" @submit.prevent="onSignUp")
      div(class="auth-card__item form-group")
        label(for="email" class="auth-card__label") email
        input(
          class="auth-card__input form-control"
          :class="[$v.email.$dirty && $v.email.$invalid ? 'is-invalid' : $v.email.$dirty && !$v.email.$invalid ? 'is-valid' : '']"
          id="email"
          v-model="email"
          @blur="$v.email.$touch()"
          type="email")
        div(
          class="auth-card__message"
          v-if="!$v.email.required && $v.email.$dirty"
        ) Пожалуйста, заполните поле email
        div(
          class="auth-card__message"
          v-else-if="!$v.email.email && $v.email.$dirty"
        ) Должен быть в формате mail@mail.com
        div(
          class="auth-card__message"
          v-if="message"
        ) {{message}}
      div(class="auth-card__item form-group")
        label(for="phone" class="auth-card__label") телефон
        input(
          :class="[$v.phone.$dirty && $v.phone.$invalid ? 'is-invalid' : $v.phone.$dirty && !$v.phone.$invalid ? 'is-valid' : '']"
          class="auth-card__input form-control"
          v-model.trim="phone"
          id="phone"
          type="tel"
          @keydown.delete="replaceCursor"
          @keydown.space="removeSpace"
          @blur="$v.phone.$touch()"
          ref="phone"
        )
        div(
          class="auth-card__message"
          v-if="!$v.phone.required && $v.phone.$dirty"
        ) Пожалуйста, заполните поле телефон
        div(
          class="auth-card__message"
          v-else-if="!$v.phone.correctNumber && $v.phone.$dirty"
        ) Должен быть в формате +7 (999) 888-77-66
      div(class="auth-card__item form-group")
        label(for="password" class="auth-card__label") пароль
        input(
          class="auth-card__input form-control"
          :class="[$v.password.$dirty && $v.password.$invalid ? 'is-invalid' : $v.password.$dirty && !$v.password.$invalid ? 'is-valid' : '']"
          id="password"
          v-model="password"
          @blur="$v.password.$touch()"
          type="password")
        div(
          class="auth-card__message"
          v-if="!$v.password.required && $v.password.$dirty"
        ) Пожалуйста, заполните поле пароль
        div(
          class="auth-card__message"
          v-else-if="!$v.password.minLength && $v.password.$dirty"
        ) Должен содержать минимум 8 символов
        div(
          class="auth-card__message"
          v-else-if="!$v.password.strongPassword && $v.password.$dirty"
        ) Пароль должен состоять из цифр и латинских букв верхнего и нижнего регистра
        div(
          class="auth-card__message"
          v-else-if="!$v.password.maxLength && $v.password.$dirty"
        ) Пароль должен содержать не более 30 символов
      div(class="auth-card__item form-group")
        label(for="passwordRepeat" class="auth-card__label") подтвердите пароль
        input(
          id="passwordRepeat"
          class="auth-card__input form-control"
          :class="[$v.passwordRepeat.$dirty && $v.passwordRepeat.$invalid ? 'is-invalid' : $v.passwordRepeat.$dirty && !$v.passwordRepeat.$invalid ? 'is-valid' : '']"
          v-model="passwordRepeat"
          type="password"
          @blur="$v.passwordRepeat.$touch()"
        )
        div(
          class="auth-card__message"
          v-if="!$v.passwordRepeat.required && $v.passwordRepeat.$dirty"
        ) Введите пароль еще раз
        div(
          class="auth-card__message"
          v-else-if="!$v.passwordRepeat.matchingPasswords && $v.passwordRepeat.$dirty"
        ) Пароли не совпадают
      div(class="auth-card__item form-group")
        label(for="name" class="auth-card__label") имя
        input(
          id="name"
          class="auth-card__input form-control"
          :class="[$v.name.$dirty && $v.name.$invalid ? 'is-invalid' : $v.name.$dirty && !$v.name.$invalid ? 'is-valid' : '']"
          v-model="name"
          type="text"
          @blur="$v.name.$touch()"
          ref="name"
        )
        div(
          class="auth-card__message"
          v-if="!$v.name.required && $v.name.$dirty"
        ) Введите Ваше имя
        div(
          class="auth-card__message"
          v-else-if="!$v.name.minLength && $v.name.$dirty"
        ) Поле "имя" должно содердать минимум 2 символа
        div(
          class="auth-card__message"
          v-else-if="!$v.name.correctName && $v.name.$dirty"
        ) Недопустимые символы в поле "имя"
      div(class="auth-card__item form-group")
        label(for="surname" class="auth-card__label") фамилия
        input(
          id="surname"
          class="auth-card__input form-control"
          :class="[$v.surname.$dirty && $v.surname.$invalid ? 'is-invalid' : $v.surname.$dirty && !$v.surname.$invalid ? 'is-valid' : '']"
          v-model="surname"
          type="text"
          @blur="$v.surname.$touch()"
          ref="surname"
        )
        div(
          class="auth-card__message"
          v-if="!$v.surname.required && $v.surname.$dirty"
        ) Введите Вашу фамилию
        div(
          class="auth-card__message"
          v-else-if="!$v.surname.minLength && $v.surname.$dirty"
        ) Поле "фамилия" должно содердать минимум 2 символа
        div(
          class="auth-card__message"
          v-else-if="!$v.surname.correctSurname && $v.surname.$dirty"
        ) Недопустимые символы в поле "фамилия"

      div(class="auth-card__buttons row")
        div(class="col")
          button(class="auth-card__submit btn btn-dark w-100 border-2" type="submit") Регистрация
</template>

<script>
  import { email, required, minLength, maxLength } from 'vuelidate/lib/validators';
  import { mapGetters, mapActions } from 'vuex';
  import validation from "../mixins/validation";
  import api from '@/plugins/api';

  export default {
    name: "Register",
    data: () => ({
      email: '',
      phone: '+7',
      password: '',
      passwordRepeat: '',
      name: '',
      surname: '',
      noneFormattedPhone: '',
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
    methods: {
      async onSignUp() {
        this.message = '';
        if(this.$v.$invalid) {
          this.$v.$touch();
          return
        }
        const formData = {
          email: this.email,
          phone: this.noneFormattedPhone,
          password: this.password,
          name: this.name,
          surname: this.surname
        };
        const registration = await api.post('/register', formData)
          .then(res => {
            const {success, message } = res.data;
            console.log(res);
            if(success) {
              this.$router.push({name: "Sign In"})
            } else {
              this.message = message;
            }

          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    watch: {
      phone: function() {
        this.regForPhone()
      },
      name: function() {
        this.inputFormatting('name')
      },
      surname: function() {
        this.inputFormatting('surname')
      },
    }
  }
</script>

<style lang="sass">
  .auth-card__message
    font-size: .8em
    text-align: left
    color: #DC3545
  .auth-card__label
    display: block
    text-align: left
    color: #7a7a7a
    text-transform: capitalize
  .auth-card__item
    min-height: calc(38px + 24px + 20px)
</style>