<template>
  <div>
    <div v-if="!playerSearched" class="searchPlayer">
      <input type="text" v-model="inputValue" placeholder="Enter a value" />
      <button @click="submitRequest">Submit</button>
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="responseData">{{ responseData }}</div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const inputValue = ref('');
    const isLoading = ref(false);
    const error = ref('');
    const responseData = ref('');
    const playerSearched = ref(false);

    const submitRequest = async () => {
      isLoading.value = true;
      error.value = '';
      responseData.value = '';

      try {
        const response = await fetch(`https://api.wynncraft.com/v2/player/${inputValue.value}/stats`);
        const data = await response.json();
        if(data.code === 400) {
          error.value = 'Player not found';
        } else if(data.code === 200) {
          playerSearched.value = true;
          responseData.value = JSON.stringify(data);
        } else {
          error.value = 'An error occurred. Please try again.';
        }
      } catch (error: any) {
        error.value = 'An error occurred. Please try again.';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      inputValue,
      isLoading,
      error,
      playerSearched,
      responseData,
      submitRequest
    };
  }
};
</script>
