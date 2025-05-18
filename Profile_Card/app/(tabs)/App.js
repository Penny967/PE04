import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import update from 'immutability-helper';

const userImage = require('../../assets/images/user.png');

const initialData = Array(6).fill().map(() => ({
  image: userImage,
  name: 'John Doe',
  occupation: 'React Native Developer',
  description: 'John is a really great JavaScript developer. He loves using JS to build React Native applications for iOS and Android.',
  showThumbnail: true,
}));

const ProfileCard = ({ image, name, occupation, description, showThumbnail, onPress }) => {
  const containerStyles = [styles.cardContainer];
  if (showThumbnail) {
    containerStyles.push(styles.cardThumbnail);
  }

  return (
    <TouchableHighlight onPress={onPress} style={styles.cardWrapper}>
      <View style={containerStyles}>
        <View style={styles.cardImageContainer}>
          <Image style={styles.cardImage} source={image} />
        </View>
        <Text style={styles.cardName}>{name}</Text>
        <View style={styles.cardOccupationContainer}>
          <Text style={styles.cardOccupation}>{occupation}</Text>
        </View>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initialData,
    };
  }

  handleCardPress = (index) => {
    const showThumbnail = !this.state.data[index].showThumbnail;
    this.setState({
      data: update(this.state.data, {
        [index]: { showThumbnail: { $set: showThumbnail } },
      }),
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.gallery}>
          {this.state.data.map((item, index) => (
            <ProfileCard
              key={index}
              {...item}
              onPress={() => this.handleCardPress(index)}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const profileCardColor = 'dodgerblue';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardWrapper: {
    margin: 10,
  },
  cardContainer: {
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: profileCardColor,
    width: 300,
    height: 400,
    paddingVertical: 20,
    paddingHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 10 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  cardThumbnail: {
    transform: [{ scale: 0.2 }],
  },
  cardImageContainer: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: 80,
    height: 80,
  },
  cardName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
    textShadowColor: 'black',
    textShadowOffset: { height: 2, width: 2 },
    textShadowRadius: 3,
  },
  cardOccupationContainer: {
    borderBottomWidth: 2,
    borderColor: 'black',
    marginVertical: 8,
  },
  cardOccupation: {
    fontWeight: 'bold',
  },
  cardDescription: {
    fontStyle: 'italic',
    marginTop: 10,
    marginHorizontal: 20,
    textAlign: 'center',
  },
});
