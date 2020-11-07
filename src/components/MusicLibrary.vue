<template>
  <div class="music">
    <div class="music-container">
      <div class="music-grid">
        <div class="item" v-for="item in musicInfo" :key="item.id">
          <div class="image">
            <img class='image' :src="'../assets/' + item.image"/>
          </div>
          <div class="info">
            <h1>{{ item.name }}</h1>
            <p>{{ item.artist }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import musicLibrary from '../music-data.js'
export default {
    name: "MusicLibrary",
    props: {
        musicLibrary: Array,
    },
    methods: {
        
    },
    computed: {
        musicInfo() {
            return this.data;
        },
        newMusicInfo() {
            for (let i = 0; i < this.data.length; i++) {
                this.data[i].image = "../assets/" + this.data[i].image;
            }
            return this.data;
        }
    },
    data() {
        return {
            data: [],
        }
    },
    created() {
        this.data = musicLibrary;
        console.log(this.data);
    }
};
</script>

<style scoped>
img {
height: 200px;
width: 300px;
}

.music-container {
  display: flex;
  justify-content: center;
}

.music-grid {
  width: 100%;
  display: flex;
  justify-content: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
}

.item {
  width: 20em;
  height: auto;
  margin-left: 2em;
  margin-right: 2em;
}

.image {
  width: 100%;
  height: auto;
}
</style>