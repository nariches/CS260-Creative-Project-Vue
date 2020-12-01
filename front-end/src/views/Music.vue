<template>
  <div class="music">
    <div class="music-container">
      <div class="music-grid">
        <div class="music-item" v-for="item in items" :key="item.id">
          <div class="album">
            <img :src="item.path"/>
          <div class="info">
            <h4>{{ item.title }}</h4>
            <h4>{{ item.artist }}</h4>
            <h4>{{ item.year }}</h4>
            <div v-if="item.submitter != null">
              <p>Submitted by:</p>
            <p>{{ item.submitter.name }}</p>
            <p>{{ item.submitter.age }}</p>
            <p>{{ item.submitter.hometown }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     items: [],
     persons: [],
    }
  },
  created() {
    this.getItems();
    this.getPersons();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getPersons() {
      try {
        let response = await axios.get("api/persons");
        this.persons = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
img {
height: 20em;
width: 20em;
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

.music-item {
  width: 20em;
  height: auto;
  margin-left: 2em;
  margin-right: 2em;
}

.album {
  width: 100%;
  height: auto;
}

.info {
  line-height: 0.5em;
}
</style>