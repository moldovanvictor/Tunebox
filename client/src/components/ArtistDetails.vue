<template>
  <div v-if="artist" class="artist-details">
    <h1>{{ artist.name }}</h1>
    <button @click="showEditForm = !showEditForm">{{ showEditForm ? 'Hide' : 'Edit Artist' }}</button>
    <form v-if="showEditForm" @submit.prevent="updateArtist">
      <input type="text" v-model="artist.name" placeholder="Artist Name" required />
      <button type="submit">Save</button>
    </form>
    <h2>Albums</h2>
    <button @click="showCreateAlbumForm = !showCreateAlbumForm">{{
        showCreateAlbumForm ? 'Hide' : 'Create New Album'
      }}
    </button>
    <form v-if="showCreateAlbumForm" @submit.prevent="createAlbum">
      <input type="text" v-model="newAlbum.title" placeholder="Album Title" required/>
      <button type="submit">Create</button>
    </form>
    <div v-if="artist.albums.length > 0">
      <div v-for="(album, index) in artist.albums" :key="index" class="album">
        <p>{{ album.title }}</p>
        <router-link :to="{ name: 'AlbumDetails', params: { artistId: id, albumId: index } }">
          <button>Details</button>
        </router-link>
        <button @click="deleteAlbum(index)">Delete</button>
      </div>
    </div>
    <div v-else>
      <p>No albums found.</p>
    </div>
    <router-link to="/artists">
      <button>Back to Artist List</button>
    </router-link>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      artist: null,
      showEditForm: false,
      showCreateAlbumForm: false,
      newAlbum: {
        title: ''
      }
    };
  },
  mounted() {
    this.fetchArtist();
  },
  methods: {
    fetchArtist() {
      fetch(`http://localhost:3001/artists/${this.id}`)
          .then(response => response.json())
          .then(data => {
            this.artist = data;
          })
          .catch(error => {
            console.error('Error fetching artist:', error);
          });
    },
    updateArtist() {
      fetch(`http://localhost:3001/artists/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.artist)
      })
          .then(response => response.json())
          .then(updatedArtist => {
            this.artist = updatedArtist;
            this.showEditForm = false;
          })
          .catch(error => {
            console.error('Error updating artist:', error);
          });
    },
    createAlbum() {
      this.artist.albums.push({...this.newAlbum, songs: []});
      fetch(`http://localhost:3001/artists/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.artist)
      })
          .then(response => response.json())
          .then(updatedArtist => {
            this.artist = updatedArtist;
            this.newAlbum.title = '';
            this.showCreateAlbumForm = false;
          })
          .catch(error => {
            console.error('Error creating album:', error);
          });
    },
    deleteAlbum(index) {
      this.artist.albums.splice(index, 1);
      fetch(`http://localhost:3001/artists/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.artist)
      })
          .then(response => response.json())
          .then(updatedArtist => {
            this.artist = updatedArtist;
          })
          .catch(error => {
            console.error('Error deleting album:', error);
          });
    }
  }
};
</script>

<style scoped>
.artist-details {
  background-color: #FAFAFA;
  padding: 20px;
  border-radius: 5px;
}

.album {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #FAFAFA;
}

h1, h2 {
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

.artist-details button {
  background-color: #FFB74D;
  color: #004D40;
}

.artist-details button:hover {
  background-color: #FF6F61;
}
</style>
