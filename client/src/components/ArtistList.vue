<template>
  <div>
    <h1>Artists</h1>
    <button @click="showCreateForm = !showCreateForm">{{ showCreateForm ? 'Hide' : 'Create New Artist' }}</button>
    <form v-if="showCreateForm" @submit.prevent="createArtist">
      <input type="text" v-model="newArtist.name" placeholder="Artist Name" required />
      <button type="submit">Create</button>
    </form>
    <div v-if="artists.length > 0">
      <div v-for="artist in artists" :key="artist.id" class="artist">
        <p>{{ artist.name }}</p>
        <router-link :to="{ name: 'ArtistDetails', params: { id: artist.id } }">
          <button>Details</button>
        </router-link>
        <button @click="deleteArtist(artist.id)">Delete</button>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <router-link to="/">
      <button>Back to Home</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      artists: [],
      newArtist: {
        name: ''
      },
      showCreateForm: false,
    };
  },
  mounted() {
    this.fetchArtists();
  },
  methods: {
    fetchArtists() {
      fetch('http://localhost:3001/artists')
          .then(response => response.json())
          .then(data => {
            this.artists = data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    createArtist() {
      const maxId = this.artists.reduce((max, artist) => (Number(artist.id) > max ? Number(artist.id) : max), -1);
      const newArtist = {...this.newArtist, id: (maxId + 1).toString(), albums: []};

      fetch('http://localhost:3001/artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtist)
      })
          .then(response => response.json())
          .then(createdArtist => {
            this.artists.push(createdArtist);
            this.newArtist.name = '';
            this.showCreateForm = false;
          })
          .catch(error => {
            console.error('Error creating artist:', error);
          });
    },
    deleteArtist(id) {
      fetch(`http://localhost:3001/artists/${id}`, {
        method: 'DELETE'
      })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.artists = this.artists.filter(artist => artist.id !== id);
          })
          .catch(error => {
            console.error('Error deleting artist:', error);
          });
    }
  }
};
</script>

<style scoped>
.artist {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #FAFAFA;
}

h1 {
  text-align: center;
  color: #004D40;
}

form {
  margin-bottom: 20px;
}

input[type="text"] {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #757575;
  border-radius: 5px;
  background-color: #FAFAFA;
  color: #004D40;
}

input[type="text"]::placeholder {
  color: #757575;
}

button {
  margin-left: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #004D40;
  color: #FAFAFA;
  cursor: pointer;
}

button:hover {
  background-color: #FF6F61;
}

p {
  color: #004D40;
  margin: 0;
}

.artist button {
  background-color: #FFB74D;
  color: #004D40;
}

.artist button:hover {
  background-color: #FF6F61;
}
</style>
