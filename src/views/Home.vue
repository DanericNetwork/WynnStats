<template>
    <div>
        <div class="searchPlayer-container">
            <div class="searchPlayer">
                <input type="text" v-model="inputValue" placeholder="Playername" @keyup.enter="getPlayer" />
                <button @click="getPlayer">Search player</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
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
      }
    },
  },
};
</script>