import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      // { name: "name1", artist: "artist1", album: "album1", id: 1 },
      // { name: "name2", artist: "artist2", album: "album2", id: 2 },
      // { name: "name3", artist: "artist3", album: "album3", id: 3 }
      playlistTracks: [],
      // { name: "playlist name1", artist: "playlist artist1", album: "playlist album1", id: 4 },
      // { name: "playlist name2", artist: "playlist artist2", album: "playlist album2", id: 5 },
      // { name: "playlist name3", artist: "playlist artist3", album: "playlist album3", id: 6 }
      playlistName: "playlistName"
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
    }
    this.setState({ playlistTracks: tracks })
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    // alert("this method is linked");
    let trackURIs = this.state.playlistTracks.map(track => track.uri);    
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(
      () => {
        this.setState({
          playlistName: "New playlist",
          playlistTracks: []
        });
      }
    );
  }

  search(term) {
    Spotify.search(term).then(
      searchResults => this.setState({ searchResults: searchResults })
    )
    // this.setState({ searchResults: Spotify.search(term) }); !!!!!!!!!!!!!!!!! this is the wrong way !!!!!!!!!!!!
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
