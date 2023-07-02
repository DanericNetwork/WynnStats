<template>
	<div v-if="playerSearched" class="container">
		<div class="button-row">
			<button class="btn" @click="reset">Back Home</button>
			<button class="btn" @click="getPlayer">Refresh</button>
		</div>
		<div class="name-card">
			<div class="name-card-top">
				<p style="top: 0px; left: 0px">{{ data.meta.tag.value }}</p>
				<div class="online-status">
					<div class="status-circle" :class="data.meta.location.online ? 'online' : 'offline'"></div>
					<p v-if="data.meta.location.online" class="online-server">{{ data.meta.location.server }}</p>
					<p v-else class="online-server">Offline</p>
				</div>
			</div>
			<p class="name">{{ data.username }}</p>
		</div>
		<div class="info-container">
			<div class="info-container-top">
				<div class="info-card">
					<p class="info-card-title">Mobs killed</p>
					<p class="info-card-value">{{ totalMobKills.toLocaleString('en-US') }}</p>
				</div>
				<div class="info-card">
					<p class="info-card-title">Total level</p>
					<p class="info-card-value">{{ totalLevel.toLocaleString('en-US') }}</p>
				</div>
			</div>
			<div class="info-container-bottom">
				<div class="info-card">
					<p class="info-card-title">First join</p>
					<p class="info-card-value">{{ formattedDate(new Date(data.meta.firstJoin)) }} ({{ timeAgo(new
						Date(data.meta.firstJoin)) }})</p>
				</div>
				<div class="info-card">
					<p class="info-card-title">Playtime <span>Not 100% accurate</span></p>
					<p class="info-card-value">{{ (data.meta.playtime / 12).toFixed() }} hours</p>
				</div>
				<div class="info-card">
					<p class="info-card-title">Last join</p>
					<p class="info-card-value">{{ formattedDate(new Date(data.meta.lastJoin)) }} ({{ timeAgo(new
						Date(data.meta.lastJoin)) }})</p>
				</div>
			</div>
		</div>
		<div class="characters">
			<div v-for="character in data.characters" class="character">
				<p>{{ (charactersType as any)[character.type] }}</p>
				<p>Combat: {{ character.professions.combat.level }}</p>
				<p>Total: {{ character.level }}</p>
				<div class="xp-bar">
					<div class="xp-bar-fill" :style="{ width: `${(character.professions.combat.xp)}%` }"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import moment from 'moment';
import { toast } from 'vue3-toastify';

enum charactersType {
	ARCHER = 'Archer',
	MAGE = 'Mage',
	ASSASSIN = 'Assassin',
	WARRIOR = 'Warrior',
	SHAMAN = 'Shaman',
	NINJA = 'Ninja',
	DARKWIZARD = 'Dark Wizard',
	KNIGHT = 'Knight',
	HUNTER = 'Hunter',
}

interface characters {
	type: charactersType;
	level: number;
	dungeons: {
		completed: number;
		list: {
			[key: string]: {
				name: string;
				completed: number;
			}
		}
	}
	raids: {
		completed: number;
		list: {
			[key: string]: {
				name: string;
				completed: number;
			}
		}
	},
	quests: {
		completed: number;
		list: Array<string>;
	},
	mobsKilled: number;
	pvp: {
		kills: number;
		deaths: number;
	},
	blocksWalked: number;
	logins: number;
	deaths: number;
	playtime: number;
	skills: {
		strength: number;
		dexterity: number;
		intelligence: number;
		defence: number;
		agility: number;
	},
	professions: {
		alchemism: {
			level: number;
			xp: number;
		},
		armouring: {
			level: number;
			xp: number;
		},
		combat: {
			level: number;
			xp: number;
		},
		cooking: {
			level: number;
			xp: number;
		},
		farming: {
			level: number;
			xp: number;
		},
		fishing: {
			level: number;
			xp: number;
		},
		jeweling: {
			level: number;
			xp: number;
		},
		mining: {
			level: number;
			xp: number;
		},
		scribing: {
			level: number;
			xp: number;
		},
		tailoring: {
			level: number;
			xp: number;
		},
		weaponsmithing: {
			level: number;
			xp: number;
		},
		woodcutting: {
			level: number;
			xp: number;
		}
		woodworking: {
			level: number;
			xp: number;
		}
	};
}

interface playerData {
	username: string;
	uuid: string;
	meta: {
		firstJoin: number;
		lastJoin: number;
		location: {
			online: boolean;
			server: string;
		},
		playtime: number;
		tag: {
			display: boolean;
			value: string;
		},
		veteran: boolean;
	},
	characters: {
		[key: string]: characters;
	}
}

export default {
	name: 'Player',
	props: {
		playerName: String
	},
	data() {
		return {
			inputValue: '',
			isLoading: false,
			error: '',
			responseData: '',
			playerSearched: false,
			data: {} as playerData,
			charactersType: charactersType,
			joinDate: false,
		};
	},
	created() {
		this.getPlayer();
	},
	methods: {
		getPlayer() {
			this.isLoading = true;
			let loadingToast = toast("Loading player data...", {
				theme: 'dark',
				type: 'loading',
				position: 'top-right',
				transition: 'bounce',
			});
			fetch(`https://api.wynncraft.com/v2/player/${this.playerName}/stats`)
				.then((response) => response.json())
				.then((data) => {
					if (data.code === 400) {
						this.isError('Player not found')
						this.isLoading = false;
						this.$router.push('/');
						toast.remove(loadingToast);
						toast("Player not found", {
							theme: 'dark',
							type: 'error',
							position: 'top-right',
							transition: 'bounce',
						});
					} else if (data.code === 200) {
						this.playerSearched = true;
						this.data = data.data[0];
						this.isLoading = false;
						toast.remove(loadingToast);
						toast(`Successfully loaded ${this.playerName}.`, {
							theme: 'dark',
							type: 'success',
							position: 'top-right',
							transition: 'bounce',
						});
					} else {
						this.isError('An error occurred. Please try again.')
						this.isLoading = false;
						this.$router.push('/');
					}
				})
				.catch((error) => {
					this.isError('An error occurred. Please try again.')
					this.isLoading = false;
					this.$router.push('/');
					toast.remove(loadingToast);
					toast("An error occured.", {
						theme: 'dark',
						type: 'error',
						position: 'top-right',
						transition: 'bounce',
					});
					console.log(error);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		timeAgo(time: Date) {
			return moment(time).fromNow();
		},
		formattedDate(time: Date) {
			return moment(time).format('MMMM Do YYYY');
		},
		joinDateHover() {
			this.joinDate = !this.joinDate;
		},
		reset() {
			this.$router.push('/');
			this.playerSearched = false;
		},
		isError(error: string) {
			this.error = error;
			setTimeout(() => {
				this.error = '';
			}, 5000);
		},
	},
	computed: {
		totalMobKills() {
			let total = 0;
			for (const character in this.data.characters) {
				total += this.data.characters[character].mobsKilled;
			}
			return total;
		},
		totalLevel() {
			let total = 0;
			let profesion: any;
			for (const character in this.data.characters) {
				profesion = this.data.characters[character].professions;
				for (const prof in profesion) {
					total += profesion[prof].level;
				}
			}
			return total;
		},
		totalPlaytime() {
			let total = 0;
			for (const character in this.data.characters) {
				total += this.data.characters[character].playtime;
			}
			return total;
		},
	}
}
</script>