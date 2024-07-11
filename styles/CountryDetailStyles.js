import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50', // Fundo escuro
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  flagContainer: {
    backgroundColor: '#34495e',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  flag: {
    width: 150, // Ajuste conforme necessário
    height: 100,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1', // Texto branco
    marginBottom: 10,
  },
  capital: {
    fontSize: 16,
    color: '#bdc3c7', // Texto branco
    marginBottom: 5,
  },
  region: {
    fontSize: 16,
    color: '#bdc3c7', // Texto branco
    marginBottom: 5,
  },
  population: {
    fontSize: 16,
    color: '#bdc3c7', // Texto branco
    marginBottom: 5,
  },
  currencies: {
    fontSize: 16,
    color: '#bdc3c7', // Texto branco
    marginBottom: 5,
  },
  nativeName: {
    fontSize: 16,
    color: '#bdc3c7', // Texto branco
    marginBottom: 5,
  },
  borders: {
    fontSize: 16,
    color: '#bdc3c7', // Texto branco
    marginBottom: 5,
  },
  officialName: {
    fontSize: 16,
    color: '#bdc3c7', // Texto branco
    marginBottom: 5,
  },
  link: {
    color: '#3498db', // Azul para links
  },
});

export default styles;
