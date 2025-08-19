import React, { FC } from 'react';
import { StyleSheet, GestureResponderEvent } from 'react-native';
import { FAB } from 'react-native-paper';

interface AddButtonProps {
  backgroundColor: string;
  color: string;
  onPress: (event: GestureResponderEvent) => void;
}

const AddButton: FC<AddButtonProps> = ({ backgroundColor, color, onPress }) => {
  return (
    <FAB
      icon="plus"
      style={[styles.fab, { backgroundColor }]}
      color={color}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default AddButton;
