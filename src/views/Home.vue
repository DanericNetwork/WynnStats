<template>
	<div>
		<div class="searchPlayer-container">
			<div class="searchPlayer">
				<input type="text" v-model="inputValue" placeholder="Playername" @keyup.enter="getPlayer" />
				<button @click="getPlayer">Search player</button>
			</div>
			<div class="last-searches-container">
				<h2>Last searches:</h2>
				<div class="last-searches">
					<div v-for="search in lastSearches" class="last-search">
						<router-link :to="'/player/' + search">{{ search }}</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { getLastSearches, addLastSearch } from '../utils/lastSearches';

export default {
    name: "Home",
    data() {
        return {
            inputValue: "",
            playerSearched: false,
        };
    },
    methods: {
        getPlayer() {
            if (this.inputValue.length > 0) {
                this.$router.push(`/player/${this.inputValue}`);
                addLastSearch(this.inputValue);
            }
        },
    },
    computed: {
        lastSearches() {
            return getLastSearches();
        },
    },
};
</script>