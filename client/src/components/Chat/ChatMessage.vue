<template>
  <div
    class="message"
    :class="position == 'right' ? 'message__right' : 'message__left'"
  >
    <div
      class="message__body"
      :class="position == 'right' ? 'message__right--bg' : 'message__left--bg'"
    >
      <div class="message__text">
        <div v-if="username" class="message__username">
          <span>{{ username }}</span>
        </div>
        <div class="message__text--left">
          {{ message }}
        </div>
      </div>
      <div class="message__time">
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "right",
    },
    username: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.message {
  display: flex;
  /* justify-content: flex-end; */
}
.message__body {
  width: max-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  min-height: 40px;
  max-height: max-content;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
.message__time {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
}
.message__time > span {
  font-size: 12px;
  color: grey;
}
.message__username{
  padding-bottom: 10px;
}
.message__username > span {
  font-size: 14px;
  color: green;
}

.message__left {
  justify-content: flex-start;
}
.message__right {
  justify-content: flex-end;
}
.message__left--bg {
  background-color: white;
}
.message__right--bg {
  background-color: #dcf8c6;
}
</style>