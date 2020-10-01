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
  async mounted() {
    this.ws = new WebSocket(this.$config.webSocketUrl);
    this.ws.onerror = () => {
      console.log(`Error occured`);
    };
    this.ws.onopen = () => {
      console.log(`Connection established`);
    };
    this.ws.onmessage = (data) => {
      const msgBody = JSON.parse(data.data);
      this.messages.push({
        message: msgBody.message,
        time: new Date().toTimeString(),
        position: "left",
        username: msgBody.username,
      });
    };
    this.ws.onclose = () => {
      console.log(`Connectoin closed`);
      this.ws = null;
    };
  },
  data() {
    return {
      message: "",
      messages: [],
      ws: null,
    };
  },
  methods: {
    sendMessage() {
      this.messages.push({
        message: this.message,
        time: new Date().toTimeString(),
        position: "right",
      });
      this.ws.send(
        JSON.stringify({
          username: this.$store.state.auth.username,
          message: this.message,
          sendTo: "Ali",
        })
      );
      this.message = "";
    },
  },
};
</script>

<style scoped>
@import "./ChatIndex.css";
</style>