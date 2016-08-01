import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

class PhotoGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dogs: [],
      page: 1
    }

    this.getPetPhotos = this.getPetPhotos.bind(this);
    this.onPressLoadMore = this.onPressLoadMore.bind(this);
  }

  async getPetPhotos() {
    try {
      let response = await fetch(`https://api.imgur.com/3/gallery/search/recent/${this.state.page}?q=dog`, {
        headers: {
          'Authorization': 'Client-ID e0af603b456c7ca'
        },
      });
      let responseJson = await response.json();
      let dogs = responseJson.data.filter(dog => dog.link.match(/jpg|gif|png/));
      dogs = this.state.dogs.concat(dogs);

      this.setState({
        dogs
      });
    } catch(error) {
      console.error(error);
    }
  }

  onPressLoadMore() {
    this.setState({
      page: this.state.page++
    });
    this.getPetPhotos();
  }

  componentDidMount() {
    this.getPetPhotos();
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView contentContainerStyle={ styles.list }>
          { this.state.dogs.map(dog => (
            <Image
              source={{ uri: dog.link.replace(/^http:\/\//i, 'https://') }}
              style={styles.image}
              key={ dog.id }
            />
          )) }
        </ScrollView>
        <TouchableHighlight style={ styles.seeMoreButton } onPress={ this.onPressLoadMore }>
          <Text style={ styles.seeMoreButtonText }>See more cute doggies!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 20
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 5,
    marginBottom: 5
  },
  seeMoreButton: {
    backgroundColor: '#2196F3'
  },
  seeMoreButtonText: {
    textAlign: 'center',
    margin: 15,
    color: '#FFF'
  }
});

export default PhotoGrid;
