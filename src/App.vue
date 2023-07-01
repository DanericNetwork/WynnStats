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
      <div class="name-card">
        <p>{{ data.meta.tag.value }}</p>
        <p>Username: {{ data.username }}</p>
        <div class="online-status">
          <div class="status-circle" :class="data.meta.location.online ? 'online' : 'offline'"></div>
          <p class="online-server">{{ data.meta.location.server }}</p>
        </div>

      </div>
      <div class="tooltip">
        <h1 @mouseover="joinDateHover" @mouseleave="joinDate = false">First Join: {{ timeAgo(new Date(data.meta.firstJoin)) }}</h1>
        <p class="tooltiptext">{{ formattedDate(new Date(data.meta.firstJoin)) }}</p>
      </div>
      <div class="characters">
        <div v-for="character in data.characters" class="character">
          <p>{{ (charactersType as any)[character.type] }}</p>
          <p>Combat: {{ character.professions.combat.level }}</p>
          <p>Total: {{ character.level }}</p>
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
  methods: {
    getPlayer() {
      fetch(`https://api.wynncraft.com/v2/player/${this.inputValue}/stats`)
        .then((response) => response.json())
        .then((data) => {
          if(data.code === 400) {
            this.error = 'Player not found';
            toast("Player not found", {
              theme: 'dark',
              type: 'error',
              position: 'top-right',
              transition: 'bounce',
            });
          } else if(data.code === 200) {
            this.playerSearched = true;
            this.data = data.data[0];
            toast(`Successfully loaded ${this.inputValue}.`, {
              theme: 'dark',
              type: 'success',
              position: 'top-right',
              transition: 'bounce',
            });
          } else {
            this.error = 'An error occurred. Please try again.';
          }
        })
        .catch((error) => {
          this.error = 'An error occurred. Please try again.';
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
      return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    },
    joinDateHover() {
      this.joinDate = !this.joinDate;
    },
  },
};
</script>
