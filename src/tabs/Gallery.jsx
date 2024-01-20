import { Component } from 'react';
import { Loading } from 'notiflix';
import "notiflix/dist/notiflix-3.2.7.min.css"

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    images: [],
    error: null,
    isLoading: false,
    page: 1,
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  getPhotos = async (q, p) => {
    this.setState({ isLoading: true });
    Loading.standard();
    try {
      const { photos, total_results } = await ImageService.getImages(q, p);
      console.log(photos);
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        total: total_results,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
      Loading.remove();
    }
  };

  onSubmit = query => {
    if (!query) {
      return;
    }

    this.setState({
      query: query,
      images: [],
      error: null,
      isLoading: false,
      page: 1,
      total: 0,
    });
  };
  onClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  render() {
    const { images, total, isLoading, query, error } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {/* {isLoading && <Text textAlign="center">...Loading</Text>} */}
        {error && <Text textAlign="center">{error}</Text>}
        {images.length === 0 && query !== '' && (
          <Text textAlign="center">{query} запиту немає</Text>
        )}
        <Grid>
          {images?.map(({ id, avg_color, alt, src: { large } }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {total > images.length && (
          <Button onClick={this.onClick}>
            {isLoading ? '...isLoading' : 'load More'}
          </Button>
        )}
      </>
    );
  }
}
