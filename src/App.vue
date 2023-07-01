<template>
  <div>
    <div v-if="!playerSearched" class="searchPlayer">
      <input type="text" v-model="inputValue" placeholder="Enter a value" />
      <button @click="getPlayer">Submit</button>
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <!-- <div v-else-if="responseData">{{ responseData }}</div> -->
    <div v-if="playerSearched" class="dataContainer">
      <h1>Username: {{ data.username }}</h1>
      <h1>First Join: {{ data.meta.firstJoin }}</h1>
      <h1>Online: {{ data.meta.location.online }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
interface playerData {
  username: string;
  uuid: string;
  meta: {
    firstJoin: number;
    lastJoin: number;
    location: {
      online: boolean;
      server: string;
    }
  }
}
export default {
  data() {
    return {
      inputValue: '',
      isLoading: false,
      error: '',
      responseData: '',
      playerSearched: false,
      data: {} as playerData,
    };
  },
  methods: {
    getPlayer() {
      fetch(`https://api.wynncraft.com/v2/player/${this.inputValue}/stats`)
        .then((response) => response.json())
        .then((data) => {
          if(data.code === 400) {
            this.error = 'Player not found';
          } else if(data.code === 200) {
            this.playerSearched = true;
            this.data = data.data[0];
            console.log(data.data[0]);
          } else {
            this.error = 'An error occurred. Please try again.';
          }
        })
        .catch((error) => {
          this.error = 'An error occurred. Please try again.';
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
};
</script>
