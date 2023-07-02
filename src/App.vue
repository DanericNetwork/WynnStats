<template>
  <router-view />
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      inputValue: '',
      playerSearched: false,
    };
  },
  methods: {
    getPlayer() {
      if (this.inputValue.length > 0) {
        this.$router.push(`/player/${this.inputValue}`);
        this.playerSearched = true;
      }
    },
    reset() {
      this.$router.push('/');
      this.playerSearched = false;
    },
  },
};
</script>
