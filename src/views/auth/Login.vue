<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        :src="emailImageUrl()"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="user.email"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="email"
            @change="handleEmailChanged"
          />
          <div
            v-if="errors.has('email')"
            class="alert alert-danger"
            role="alert"
          >Email is required!</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
    <div>
      Don't have an account?
      <router-link to="/auth/register">Register!</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as crypto from 'crypto';

import User from '@/models/user';

@Component({
  components: {
  },
})
export default class Airframes extends Vue {
  user = new User('', '');

  loading = false;

  message = '';

  created() {
    if (this.loggedIn()) {
      Vue.toasted.show('Already logged in.', { type: 'info' });
      this.$router.push('/user/dashboard');
    }
  }

  emailImageUrl() {
    if (this.user.email) {
      return this.gravatarUrl(this.user.email, { size: 96 });
    }
    return '//ssl.gstatic.com/accounts/ui/avatar_2x.png';
  }

  gravatarUrl(email, options) { // eslint-disable-line class-methods-use-this
    const size = options.size || 100;
    const md5 = crypto.createHash('md5').update(email).digest('hex');
    return `https://www.gravatar.com/avatar/${md5}?s=${size}&d=%2F%2Fssl.gstatic.com%2Faccounts%2Fui%2Favatar_2x.png`;
  }

  loggedIn() {
    return this.$store.state.auth.status.loggedIn;
  }

  handleEmailChanged() {
    console.log(this.user.email);
  }

  handleLogin() {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }
      if (this.user.email && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.loading = false;
            Vue.toasted.show('Logged in.');
            this.$router.push('/user/dashboard');
          },
          (error) => {
            this.loading = false;
            this.message = (error.response && error.response.data)
              || error.message
              || error.toString();
          },
        );
      }
    });
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
