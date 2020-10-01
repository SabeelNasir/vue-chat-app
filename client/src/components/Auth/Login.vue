<template>
  <div class="login">
    <div class="login__logo">
      <img
        src="https://www.freeiconspng.com/thumbs/logo-whatsapp-png/download-and-use-logo-whatsapp-png-clipart-3.png"
        alt=""
      />
    </div>
    <div class="login__content col-xl-4 col-md-6 col-sm-12">
      <div class="login__content--body">
        <div class="login__content--header">
          <h1>Login</h1>
        </div>
        <form action="" @submit.prevent="login()">
          <div class="login__content--body-input">
            <label for="">Username</label>
            <input type="text" class="form-control" v-model="username" />
          </div>
          <div class="login__content--body-input">
            <label for="">Password</label>
            <input type="text" class="form-control" v-model="password" />
          </div>
          <div class="login__content--body-input">
            <button class="btn btn-dark" type="submit">Signin</button>
          </div>
        </form>
      </div>
      <div class="login__content--actions"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const response = await fetch(`${this.$config.apiUrl}/login`, {
        method: "POST",
        credentials: "same-origin",
      });
      const body = await response.json();
      console.log(body);
      this.$store.commit("auth/setToken", {
        token: body.data.userId,
        useId: body.data.userId,
        username: this.username,
      });
      this.$router.push({ path: "/home" });
    },
  },
};
</script>

<style scoped>
@import "../../css/Login.css";
</style>