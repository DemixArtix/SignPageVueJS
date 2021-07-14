<template>
  <div id="app">
    <div id="nav" class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center">
      <router-link class="nav-item btn btn-dark m-2" v-if="token()" to="/">главная</router-link>
      <router-link class="nav-item btn btn-dark m-2" v-if="!token()" to="/sign_in">войти</router-link>
      <router-link class="nav-item btn btn-dark m-2" v-if="!token()" to="/sign_up">присоединиться</router-link>
      <a class="nav-item btn btn-dark m-2" v-if="token()" @click="onSignOut" >выйти</a>
    </div>
    <div class="main-container pt-4">
      <router-view/>
    </div>

  </div>
</template>

<script>
  import getToken from "./mixins/getToken";

  export default {
    data: () => ({}),
    mixins: [getToken],
    methods: {
      onSignOut() {
        localStorage.removeItem('token');
        this.$router.push({name: 'Sign In'})
      },
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    color: #fff;
    padding: 10px;
    text-decoration: none;
    cursor: pointer;

    &.router-link-exact-active {
      color: #0DCAF0;
    }
  }
}
  .main-container {
    width: 400px;
    margin: 0 auto;
  }
</style>
