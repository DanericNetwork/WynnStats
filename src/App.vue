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
import axios from 'axios';

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
        const response = await axios.get(`https://api.wynncraft.com/v2/player/${inputValue.value}/stats`);

        responseData.value = response.data;
      } catch (error: any) {
        error.value = 'An error occurred. Please try again.';
      } finally {
        isLoading.value = false;
        playerSearched.value = true;
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
