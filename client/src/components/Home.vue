<template>
  <div>
    <Header />
    <ChatIndex />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ChatIndex from "@/components/Chat/ChatIndex.vue";
export default {
  components: {
    Header,
    Footer,
    ChatIndex,
  },
};
</script>

<style>
</style>