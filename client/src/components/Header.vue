<template>
  <div class="header">
    <div class="header__title">
      <h1>Vue Chat App</h1>
      <p>Lets chat with your friends and family :)</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  display: flex;
  /* height: 5%; */
  position: sticky;
  background-color: #128C7E;
  color: white;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
}
.header__title {
    text-align: center;
}
.header__title > h1{
    font-size: 40px;
}
.header__title > p{
    font-size: 22px;
}
</style>