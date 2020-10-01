<template>
  <div class="chatBody">
    <chat-message
      v-for="message in messages"
      :key="message.id"
      :message="message.message"
      :time="message.time"
      :position="message.position"
      :username="message.username"
    ></chat-message>
  </div>
</template>

<script>
import ChatMessage from "@/components/Chat/ChatMessage.vue";
export default {
  name: "ChatBody",
  components: {
    ChatMessage,
  },
  props: {
    messages: {
      type: Array,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.chatBody {
  padding-bottom: 150px;
}
</style>