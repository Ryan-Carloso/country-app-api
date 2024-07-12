import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const formatPopulation = (population) => {
  if (population >= 1_000_000_000) {
    return (population / 1_000_000_000).toFixed(1) + 'B';
  } else if (population >= 1_000_000) {
    return (population / 1_000_000).toFixed(1) + 'M';
  } else if (population >= 1_000) {
    return (population / 1_000).toFixed(1) + 'K';
  } else {
    return population.toString();
  }
};

const CountryCard = ({ item, currentTheme, navigation, countries }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const renderCountry = () => {
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
            windowWidth > 800 ? { height: windowHeight * 0.30 } : null

          ]}
        >
          <View style={[
            styles.flagContainer,
            windowWidth > 800 ? { height: windowHeight * 0.19  } : null
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
              Population: {formatPopulation(item.population)}
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
    flex: 1,
  },
  countryCard: {
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },  
  flagContainer: {
    width: '100%',
    height: 100, 
  },
  flag: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  capital: {
    fontSize: 16,
  },
  region: {
    fontSize: 16,
  },
  population: {
    fontSize: 16,
  },
});
