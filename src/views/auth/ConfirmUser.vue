<template>
  <div class="mt-4 col-md-12">
    <div class="card card-container p-4">
      <div v-if="loading">
        <h3>
          Confirming your account...
        </h3>
        <div>
          Hold tight.
        </div>
      </div>
      <div v-else>
        <div v-if="successful">
          <h3 class="text-success">
            Your account has been confirmed.
          </h3>
          <div class="mb-4">
            Login to your account to continue.
          </div>
          <div>
            <router-link to="/auth/login" class="btn btn-primary">Login</router-link>
          </div>
        </div>
        <div v-else>
          <h3 class="text-danger">
            Confirmation failed.
          </h3>
          <div>
            There was a problem confirming your account. Try again.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class ConfirmUser extends Vue {
  loading = false;

  successful = false;

  token = 'unset';

  created() {
    if (this.loggedIn()) {
      this.$store.dispatch('auth/logout');
    }
    this.handleConfirm();
  }

  @Watch('$route')
  onPropertyChanged(newValue, oldValue) {
    if (newValue.params.token && newValue.params.token !== oldValue.params.token) {
      this.handleConfirm();
    }
  }

  handleConfirm() {
    console.log(this.$route.params);
    this.token = this.$route.params.token;
    this.message = '';
    this.loading = true;

    this.$store.dispatch('auth/confirm', this.token).then(
      (data) => {
        this.loading = false;
        this.message = data.message;
        this.successful = true;
      },
      (error) => {
        this.loading = false;
        this.message = (error.response && error.response.data)
          || error.message
          || error.toString();
        this.successful = false;
      },
    );
  }

  loggedIn() {
    return this.$store.state.auth.status.loggedIn;
  }
}
</script>
