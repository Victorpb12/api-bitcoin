import { 
  View, 
  Text, 
  Image, 
} from 'react-native';
import styles from './styles';

export default function QuotationsItem(props) {
  return (
    <View style={styles.mainContent}>
      <View style={styles.contextLeft}>
        <View style={styles.boxImage}>
          <Image
            style={styles.image}
            source={require('../../../img/bitcoin.png')}
          /> 
          <Text style={styles.dayCotation}>{props.data}</Text>
        </View>
      </View>
      <View style={styles.contextRight}>
        <Text style={styles.price}>${props.valor}</Text>
      </View>
    </View>
  );
};