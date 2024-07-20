<template>
  <div v-if="album">
    <h1>{{ album.title }}</h1>
    <router-link :to="{ name: 'ArtistDetails', params: { id: artistId } }">Back to Albums</router-link>
    <form @submit.prevent="updateAlbum">
      <input type="text" v-model="album.title" required />
      <textarea v-model="album.description"></textarea>
      <button type="submit">Update</button>
    </form>

    <div>
      <h2>Songs</h2>
      <button @click="showCreateSongForm = !showCreateSongForm">{{ showCreateSongForm ? 'Hide' : 'Create New Song' }}</button>
      <form v-if="showCreateSongForm" @submit.prevent="createSong">
        <input type="text" v-model="newSong.title" placeholder="Song Title" required />
        <input type="text" v-model="newSong.length" placeholder="Song Length (MM:SS)" required />
        <span v-if="durationError" class="error">{{ durationError }}</span>
        <button type="submit">Create</button>
      </form>

      <div v-if="album.songs.length > 0">
        <ul>
          <li v-for="(song, index) in album.songs" :key="index">
            {{ song.title }} ({{ song.length }})
            <form @submit.prevent="updateSong(index)">
              <input type="text" v-model="song.title" required />
              <input type="text" v-model="song.length" required />
              <span v-if="durationErrors[index]" class="error">{{ durationErrors[index] }}</span>
              <button type="submit">Update</button>
            </form>
            <button @click="deleteSong(index)">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  props: ['artistId', 'albumId'],
  data() {
    return {
      artist: null,
      album: null,
      newSong: {
        title: '',
        length: ''
      },
      showCreateSongForm: false,
      durationError: '',
      durationErrors: []
    };
  },
  mounted() {
    this.fetchArtist();
  },
  methods: {
    fetchArtist() {
      fetch(`http://localhost:3001/artists/${this.artistId}`)
          .then(response => response.json())
          .then(data => {
            this.artist = data;
            this.album = this.artist.albums[this.albumId];
          })
          .catch(error => {
            console.error('Error fetching artist:', error);
          });
    },
    updateAlbum() {
      fetch(`http://localhost:3001/artists/${this.artistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.artist)
      })
          .then(response => response.json())
          .then(updatedArtist => {
            this.artist = updatedArtist;
            this.album = this.artist.albums[this.albumId];
          })
          .catch(error => {
            console.error('Error updating album:', error);
          });
    },
    createSong() {
      if (!this.isValidDuration(this.newSong.length)) {
        this.durationError = 'Invalid duration format. Use MM:SS.';
        return;
      }
      this.durationError = '';
      this.album.songs.push({ ...this.newSong });
      this.updateArtist();
      this.newSong.title = '';
      this.newSong.length = '';
      this.showCreateSongForm = false;
    },
    updateSong(index) {
      const song = this.album.songs[index];
      if (!this.isValidDuration(song.length)) {
        this.durationErrors[index] = 'Invalid duration format. Use MM:SS.';
        return;
      }
      this.durationErrors[index] = '';
      this.updateArtist();
    },
    deleteSong(songIndex) {
      this.album.songs.splice(songIndex, 1);
      this.updateArtist();
    },
    updateArtist() {
      fetch(`http://localhost:3001/artists/${this.artistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.artist)
      })
          .then(response => response.json())
          .then(updatedArtist => {
            this.artist = updatedArtist;
            this.album = this.artist.albums[this.albumId];
          })
          .catch(error => {
            console.error('Error updating artist:', error);
          });
    },
    isValidDuration(duration) {
      const regex = /^[0-5]?\d:[0-5]\d$/;
      return regex.test(duration);
    }
  }
};
</script>

<style scoped>
button {
  margin-left: 10px;
}

.error {
  color: red;
  font-size: 0.9em;
}
</style>
