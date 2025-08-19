import React, { useMemo } from 'react';
import { Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../../screens/Screens/FieldMonitoring/VisitScreen/styles';

const { height, width } = Dimensions.get('screen');

const Card = ({ id, onPress, isClicked, text, imageSource, navigation }) => {
  const cardStyle = useMemo(() => {
    return isClicked
      ? { ...styles.card, backgroundColor: '#980000' }
      : styles.card;
  }, [isClicked]);

  const cardTextStyle = useMemo(() => {
    return isClicked
      ? { ...styles.cardText, color: '#FFFFFF' }
      : styles.cardText;
  }, [isClicked]);

  const imageTintColor = useMemo(() => {
    return isClicked ? '#FFFFFF' : '#000000';
  }, [isClicked]);

  const handleCardPress = () => {
    onPress(id, text); // Pass both id and text to parent
    navigation.navigate('FormScreen', { cardName: text }); // Pass text to next screen
  };

  return (
    <TouchableOpacity style={cardStyle} onPress={handleCardPress}>
      <Text style={cardTextStyle}>{text}</Text>
      {imageSource && (
        <Image
          source={imageSource}
          style={[styles.img, { tintColor: imageTintColor }]}
        />
      )}
    </TouchableOpacity>
  );
};

export default Card;
