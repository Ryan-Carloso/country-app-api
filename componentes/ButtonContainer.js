import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from './header';

const ButtonContainer = ({ currentTheme, setSortOrder, toggleTheme, setSelectedRegion, selectedRegion }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <View style={styles.container}>
      <Header currentTheme={currentTheme} toggleTheme={toggleTheme} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
          onPress={() => setSortOrder('alphabetical')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Sort Alphabetically</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
          onPress={() => setSortOrder('population')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Sort by Population</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
          onPress={() => setSortOrder('area')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Sort by Area</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.hamburgerButton, { backgroundColor: currentTheme.buttonBackground }]}
        onPress={toggleFilterVisibility}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Filter by Region</Text>
        <AntDesign name="caretdown" size={24} color="black" />
      </TouchableOpacity>

      {isFilterVisible && (
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: selectedRegion === 'Europe' ? '#007bff' : currentTheme.buttonBackground }
            ]}
            onPress={() => setSelectedRegion('Europe')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Europe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: selectedRegion === 'Asia' ? '#007bff' : currentTheme.buttonBackground }
            ]}
            onPress={() => setSelectedRegion('Asia')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Asia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: selectedRegion === 'Africa' ? '#007bff' : currentTheme.buttonBackground }
            ]}
            onPress={() => setSelectedRegion('Africa')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Africa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: selectedRegion === 'Oceania' ? '#007bff' : currentTheme.buttonBackground }
            ]}
            onPress={() => setSelectedRegion('Oceania')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Oceania</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: selectedRegion === 'Americas' ? '#007bff' : currentTheme.buttonBackground }
            ]}
            onPress={() => setSelectedRegion('Americas')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Americas</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ButtonContainer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  hamburgerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterContainer: {
    width: '100%',
    alignItems: 'center',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});