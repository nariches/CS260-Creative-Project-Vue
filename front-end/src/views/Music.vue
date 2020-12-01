<template>
<div class="music">
<h3>This is some of my favorite music. Add your own favorite music from the "Add Music" page!</h3>
  <section class="image-gallery">
    <div class="image" v-for="item in items" :key="item.id">
      <h2>{{item.title}}</h2>
      <img :src="item.path"/>
    </div>
  </section>
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
    }
  },
  created() {
    this.getItems();
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
  }
}
</script>

<style scoped>
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
</style>