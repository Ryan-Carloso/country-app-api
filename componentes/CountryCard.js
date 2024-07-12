import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const CountryCard = ({ item, currentTheme, navigation, countries }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const renderCountry = () => {
    // Truncate the country name if it exceeds 15 characters
    const truncatedName = item.name.common.length > 15 ? item.name.common.substring(0, 15) + '...' : item.name.common;

    return (
      <TouchableOpacity
        key={item.cca3}
        onPress={() =>
          navigation.navigate('CountryDetails', {
            country: item,
            allCountries: countries,
            currentTheme,
          })
        }
      >
        <SafeAreaView
          style={[
            styles.countryCard,
            { backgroundColor: currentTheme.backgroundColor },
            windowWidth > 600 ? { height: windowHeight * 0.41 } : null

          ]}
        >
            <View style={[
            styles.flagContainer,
            windowWidth > 600 ? { height: windowHeight * 0.29 } : null
            ]}>
            <Image
              source={{ uri: item.flags.png }}
              style={styles.flag}
              resizeMode="cover"
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.name, { color: currentTheme.color }]}>
              {truncatedName}
            </Text>
            <Text style={[styles.capital, { color: currentTheme.color }]}>
              Capital: {item.capital ? item.capital[0] : 'N/A'}
            </Text>
            <Text style={[styles.region, { color: currentTheme.color }]}>
              Region: {item.region}
            </Text>
            <Text style={[styles.population, { color: currentTheme.color }]}>
              Population: {item.population.toLocaleString()}
            </Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderCountry()}
    </View>
  );
};

export default CountryCard;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    justifyContent: 'center',
    flex: 1, // Ensuring container takes up full width
  },
  countryCard: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000000',
    width: '100%', // Ensure card takes full width of container
    height: 200, // Set a fixed height for all cards
  },
  flagContainer: {
    width: '100%',
    height: 100, // Set a fixed height for the flag container
  },
  flag: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center', // Centering text
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18, // Increasing name text size
  },
  capital: {
    fontSize: 16, // Adjusting capital text size
  },
  region: {
    fontSize: 16, // Adjusting region text size
  },
  population: {
    fontSize: 16, // Adjusting population text size
  },
});