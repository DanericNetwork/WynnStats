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
interface characters {
  type: string;
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
