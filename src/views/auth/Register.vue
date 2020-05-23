<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        :src="emailImageUrl()"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="user.name"
              v-validate="'required'"
              type="text"
              class="form-control"
              placeholder="John Doe"
              name="name"
            />
            <div
              v-if="errors.has('name')"
              class="alert alert-danger"
              role="alert"
            >Name is required!</div>
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              placeholder="johndoe"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              placeholder="johndoe@gmail.com"
              name="email"
              @change="handleEmailChanged"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="mt-4 alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
    <div>
      Already have an account?
      <router-link to="/auth/login">Login!</router-link>
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
  user = new User('', '', '');

  submitted = false;

  successful = false;

  message = '';

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

  handleEmailChanged() {
    console.log(this.user.email);
  }

  loggedIn() {
    return this.$store.state.auth.status.loggedIn;
  }

  mounted() {
    if (this.loggedIn()) {
      this.$router.push('/user/dashboard');
    }
  }

  handleRegister() {
    this.message = '';
    this.submitted = true;
    this.$validator.validate().then((isValid) => {
      if (isValid) {
        this.$store.dispatch('auth/register', this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
          },
          (error) => {
            this.message = (error.response && error.response.data)
              || error.message
              || error.toString();
            this.successful = false;
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
