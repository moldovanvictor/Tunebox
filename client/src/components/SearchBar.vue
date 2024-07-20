<template>
  <div class="search-bar">
    <input
        type="text"
        v-model="query"
        @input="onInput"
        placeholder="Search for artists, albums, or songs"
    />
    <ul v-if="suggestions.length" class="suggestions">
      <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">
        <strong>{{ suggestion.type }}:</strong> {{ suggestion.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    artists: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      query: '',
      suggestions: []
    };
  },
  methods: {
    onInput() {
      if (this.query.length > 0) {
        this.suggestions = [];

        this.artists.forEach(artist => {
          if (artist.name.toLowerCase().includes(this.query.toLowerCase())) {
            this.suggestions.push({ type: 'Artist', name: artist.name, value: artist.name });
          }

          artist.albums.forEach(album => {
            if (album.title.toLowerCase().includes(this.query.toLowerCase())) {
              this.suggestions.push({ type: 'Album', name: `${album.title} by ${artist.name}`, value: album.title });
            }

            album.songs.forEach(song => {
              if (song.title.toLowerCase().includes(this.query.toLowerCase())) {
                this.suggestions.push({ type: 'Song', name: `${song.title} from ${album.title} by ${artist.name}`, value: song.title });
              }
            });
          });
        });
      } else {
        this.suggestions = [];
      }
      this.$emit('search', this.query, this.getSuggestionType());
    },
    selectSuggestion(suggestion) {
      this.query = suggestion.name;
      this.suggestions = [];
      this.$emit('search', suggestion.value, suggestion.type);
    },
    getSuggestionType() {
      if (this.suggestions.length > 0) {
        return this.suggestions[0].type;
      }
      return 'Artist';
    }
  }
};
</script>

<style scoped>
.search-bar {
  position: relative;
  margin-bottom: 20px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #757575;
  border-radius: 5px;
  background-color: #FAFAFA;
  color: #004D40;
}

input[type="text"]::placeholder {
  color: #757575;
}

.suggestions {
  position: absolute;
  border: 1px solid #ccc;
  background: #FFFFFF;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1;
}

.suggestions li {
  padding: 10px;
  cursor: pointer;
  background-color: #FFFFFF;
  color: #004D40;
}

.suggestions li:hover {
  background-color: #FFB74D;
}
</style>
