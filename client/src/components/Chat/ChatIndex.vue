<template>
  <div class="chat">
    <chat-body :messages="messages"></chat-body>
    <form @submit.prevent="sendMessage()">
      <div class="chat__input">
        <div class="chat__input--textbox">
          <input type="text" placeholder="Type a message" v-model="message" />
        </div>
        <div class="chat__input--sendBtn">
          <button type="submit" class="btn btn-rounded btn-primary">
            <i class="fa fa-send fa-fw"></i> Send
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ChatBody from "@/components/Chat/ChatBody.vue";
export default {
  components: {
    ChatBody,
  },
  data() {
    return {
      message: "",
      messages: [],
    };
  },
  methods: {
    sendMessage() {
      this.messages.push({
        message: this.message,
        time: new Date().toTimeString(),
        position: "right",
      });
      this.message = "";
    },
  },
};
</script>

<style scoped>
@import "./ChatIndex.css";
</style>