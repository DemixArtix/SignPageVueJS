<template lang="pug">
  div(class="home")
    h3 Bот что я о вас знаю
    table(v-if="userData && userData !== null" class="table table-light table-striped")
      tbody
        tr(v-for="({key, value}, index) of userData")
          th(scope="row") {{index}}
          td {{key}}
          td {{value}}
</template>

<script>
// @ is an alias to /src
import api from '@/plugins/api';
import Vue from 'vue';

export default {
  name: 'Home',
  created() {
    this.loadUserData()
  },
  data: () => ({
    userData: [],
    name: '',
    surname: '',
    phone: '',
    email: '',
  }),
  methods: {
    async loadUserData(newToken) {
      const token = newToken || localStorage.getItem('token');

      if(token) {
        const header = {
          headers: {
            'Authorization': token
          }
        };
        const user = await api.get('/user_data', header)
          .then(async res => {
            const { userData } = res.data;
            if( userData === null) {
              localStorage.removeItem('token');
              this.$router.push({name: 'Sign In'});
              return
            }


            let data = Object.entries(userData).map(( [key, value] , index) => {
              key === '_id' ? key = 'id в бд' :
                key === 'name' ? key = 'ваше имя' :
                key === 'surname' ? key = 'ваша фамилия' :
                key === 'phone' ? key = 'телефон' :
                  key = 'email';
                  this.userData.splice(index, 0, {key, value});
            })


          })
          .catch(err => {
            console.log(err);
            console.log(err.status);
          });

      }
    },
  }
}
</script>

<style lang="sass">
</style>
