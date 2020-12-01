<template>
  <div class="add-music">
    <h1>Add your favorite albums here!</h1>
    <div class="heading">
      <div class="circle"></div>
      <h2>Add an Album</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Album Title" />
        <div>
          <input v-model="artist" placeholder="Artist" />
        </div>
        <input v-model="year" placeholder="Release Year" />
      <div>
          <input v-model="name" placeholder="Your Name" />
      </div>
      <div>
          <input v-model="age" placeholder="Your Age" />
    </div>
      <div>
          <input v-model="hometown" placeholder="Where are you from?" />
      </div>
        <input type="file" name="photo" @change="fileChanged" />
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{ addItem.title }}</h2>
        <img :src="addItem.path" />
      </div>
    </div>
    <div class="heading">
      <div class="circle"></div>
      <h2>Edit/Delete an Album</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search" />
        <div class="suggestions" v-if="suggestions.length > 0">
          <div
            class="suggestion"
            v-for="s in suggestions"
            :key="s.id"
            @click="selectItem(s)"
          >
            {{ s.title }}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title" placeholder="Album Title"/>
        <div>
          <input v-model="findItem.artist" placeholder="Artist"/>
        </div>
        <div>
            <input v-model="findItem.year" placeholder="Release Year"/>
        </div>
        <p></p>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Add-Music",
  data() {
    return {
      title: "",
      artist: "",
      year: "",
      name: "",
      age: "",
      hometown: "",
      file: null,
      addItem: null,
      addPerson: null,
      items: [],
      persons: [],
      findTitle: "",
      findItem: null,
      findPerson: null,
    };
  },
  computed: {
    suggestions() {
      let items = this.items.filter((item) =>
        item.title.toLowerCase().startsWith(this.findTitle.toLowerCase())
      );
      return items.sort((a, b) => a.title > b.title);
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        let p1 = await axios.post("/api/persons", {
          name: this.name,
          age: this.age,
          hometown: this.hometown,
        });
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        let r2 = await axios.post("/api/items", {
          title: this.title,
          path: r1.data.path,
          artist: this.artist,
          year: this.year,
          submitter: p1.data,
        });
        this.addItem = r2.data;
        this.addPerson = p1.data;
      } catch (error) {
        console.log(error);
      }
    },
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
            let response = await axios.get("/api/persons");
            this.persons = response.data;
            return true;
        } catch (error) {
            console.log(error);
        }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePerson(person) {
        try {
        await axios.delete("/api/persons/" + item._id);
        this.findPerson = null;
        this.getPersons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          artist: this.findItem.artist,
          year: this.findItem.year
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editPerson(person) {
        try {
        await axios.put("/api/persons/" + item._id, {
          name: this.findPerson.name,
          age: this.findPerson.age,
          hometown: this.findPerson.hometown
        });
        this.findPerson = null;
        this.getPersons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style scoped>
/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

.suggestions {
  margin: auto;
  width: 150px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: greenyellow;
  color: #fff;
}
</style>