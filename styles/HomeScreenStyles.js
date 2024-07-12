import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  countryCard: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  flag: {
    width: '100%', // Aumenta a largura da imagem para 100% do país
    height: undefined,
    aspectRatio: 2, // Mantém a proporção da imagem
    marginBottom: 10, // Espaço entre a imagem e o texto
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center', // Centraliza o texto
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18, // Aumenta o tamanho do texto
  },
  capital: {
    fontSize: 16, // Aumenta o tamanho do texto
  },
  region: {
    fontSize: 16, // Aumenta o tamanho do texto
  },
  population: {
    fontSize: 16, // Aumenta o tamanho do texto
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    },
    paginationButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    });  
export default styles;
