import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: "",
    images: [],
    error: null,
    isLoading: false,
    page: 1,
    total: 0
  }

  componentDidUpdate(_, prevState) {
    const {query, page} = this.state;

    if(prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page)
    }
  }

  getPhotos = async (q, p) => {
    try {
      const {photos, total_results} = await ImageService.getImages(q, p)
      this.setState(prevState => ({
        images: [...prevState.images, photos],
        total: total_results
      }))
    } catch (error) {
      this.setState({error: error.message})
    }
  }

  onSubmit = (query) => {
    if(!query) {
      return
    }

    this.setState({query: query})
  }
  render() {
    const {images} = this.state;
    console.log(images)
    return (
      <>
        <SearchForm onSubmit={this.onSubmit}/>
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
