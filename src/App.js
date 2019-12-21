import React from 'react';

import { Grid } from "@material-ui/core";

import youtube from './api/youtube'

import { SearchBar, VideoDetail, VideoList } from './components';

class App extends React.Component {
  state ={
    videos:[],
    selectedVideo:null
  }

  componentDidMount(){
    this.handleSubmit('Anime');
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  }

  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search',{
      params: {
      part: 'snippet',
      maxResults: 5,
      key: 'AIzaSyB7FK8MWsDxcrZvZRENigSULvzdbnNsGds',
      q:searchTerm
    }
  }) 
  this.setState({videos: response.data.items, selectedVideo: response.data.items[0]})
  console.log(response);
}
  render(){
    const {selectedVideo, videos} = this.state;
    return (
    <Grid justify='center' container spacing={10}>
      <Grid item xs={12}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onFormSubmit={this.handleSubmit}/>
          </Grid>
          <Grid item xs={8} style={{paddingLeft: '70px', height:'80vh'}}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    )
  }
}



export default App;