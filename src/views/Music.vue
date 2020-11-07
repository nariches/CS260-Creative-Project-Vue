<template>
  <div class="music">
    <h1>This is some of my favorite music.</h1>
    <MusicLibrary/>
  </div>
</template>

<script>
import MusicLibrary from "../components/MusicLibrary.vue";
export default {
    name: "Music",
    components: {
        MusicLibrary,
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