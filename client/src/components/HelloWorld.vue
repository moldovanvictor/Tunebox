<template>
  <div class="container">
    <h1>Music Data</h1>
    <SearchBar :artists="allArtists" @search="handleSearch" />
    <router-link to="/artists">
      <button class="view-artists-button">View All Artists</button>
    </router-link>
    <div v-if="filteredArtists.length > 0">
      <div v-for="artist in filteredArtists" :key="artist.id" class="artist">
        <h2>{{ artist.name }}</h2>
        <div v-if="artist.albums && artist.albums.length > 0">
          <div v-for="(album, albumIndex) in artist.albums" :key="albumIndex" class="album">
            <h3>{{ album.title }}</h3>
            <p>{{ album.description }}</p>
            <ul v-if="album.songs && album.songs.length > 0">
              <li v-for="(song, songIndex) in album.songs" :key="songIndex">
                {{ song.title }} ({{ song.length }})
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="noMatches && query.length > 0">
      <p>No matches found.</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      allArtists: [],
      filteredArtists: [],
      noMatches: false,
      query: ''
    };
  },
  mounted() {
    fetch('http://localhost:3001/artists')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.allArtists = data;
          this.filteredArtists = this.allArtists;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  },
  methods: {
    handleSearch(query, type) {
      this.query = query;

      if (this.query.length > 0) {
        let newFilteredArtists = [];
        if (type === 'Artist') {
          newFilteredArtists = this.allArtists.filter(artist =>
              artist.name.toLowerCase().includes(query.toLowerCase())
          );
        } else if (type === 'Album') {
          newFilteredArtists = this.allArtists
              .map(artist => {
                const filteredAlbums = artist.albums.filter(album =>
                    album.title.toLowerCase().includes(query.toLowerCase())
                );
                if (filteredAlbums.length > 0) {
                  return {...artist, albums: filteredAlbums};
                }
                return null;
              })
              .filter(artist => artist !== null);
        } else if (type === 'Song') {
          newFilteredArtists = this.allArtists
              .map(artist => {
                const filteredAlbums = artist.albums
                    .map(album => {
                      const filteredSongs = album.songs.filter(song =>
                          song.title.toLowerCase().includes(query.toLowerCase())
                      );
                      if (filteredSongs.length > 0) {
                        return {...album, songs: filteredSongs};
                      }
                      return null;
                    })
                    .filter(album => album !== null);
                if (filteredAlbums.length > 0) {
                  return {...artist, albums: filteredAlbums};
                }
                return null;
              })
              .filter(artist => artist !== null);
        }

        this.filteredArtists = newFilteredArtists;
        this.noMatches = newFilteredArtists.length === 0;
      } else {
        this.filteredArtists = this.allArtists;
        this.noMatches = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #FAFAFA;
  color: #004D40;
  padding: 20px;
  border-radius: 8px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #004D40;
}

h2 {
  color: #004D40;
}

h3 {
  color: #FF6F61;
}

.artist {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #757575;
  border-radius: 5px;
  background-color: #FFFFFF;
}

.album {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #757575;
  border-radius: 5px;
  background-color: #FFFFFF;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
}

p {
  font-style: italic;
  color: #757575;
}

button {
  margin-top: 10px;
  background-color: #FFB74D;
  color: #FFFFFF;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #FFA726;
}

.view-artists-button {
  background-color: #FF6F61;
  color: #FFFFFF;
}

.view-artists-button:hover {
  background-color: #E64A45;
}
</style>
