import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';

const API_KEY = 'AIzaSyC9AwR2eIr0175bx39JI7TaGdP9fU4m5sc';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      seclectedVideo: null
    };

    this.videoSearch('hello');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
      // this.setState({ videos: videos }) **if the key and variable have the same name
    });
  }
  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300) // 300 miliseconds

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
