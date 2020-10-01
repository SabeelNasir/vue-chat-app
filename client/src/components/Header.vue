<template>
  <div class="header">
    <div class="header__title">
      <h1>Vue Chat App</h1>
      <p>Lets chat with your friends and family :)</p>
    </div>
    <div class="header__options">
      <b-avatar class="bg-primary"></b-avatar>
      <b-nav-item-dropdown right class="text-white">
        <!-- Using 'button-content' slot -->
        <template v-slot:button-content>
          <span class="text-white">{{ $store.state.auth.username }}</span>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#" @click="logout()">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.state.auth.token = null;
      localStorage.removeItem("token");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  /* height: 5%; */
  position: sticky;
  background-color: #128c7e;
  color: white;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
}
.header__title {
  flex-grow: 1;
  text-align: center;
}
.header__title > h1 {
  padding-top: 10px;
  font-size: 40px;
}
.header__title > p {
  font-size: 22px;
}

.header__options {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 22px;
}
</style>