import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
import tick from "../../../assets/tick.png";
import fontStyles from "../../../../assets/styles/constants";

interface Option {
  onValueChange: (i:number) => void;
  isChecked?:any
  state?:any
}

const ThreeStepToggle: React.FC<Option> = ({onValueChange,isChecked,state}) => {
  const states = ["✓", "O", "X"];
  const [index, setIndex] = useState(1);
  const translateX = new Animated.Value(index * 60); // Move indicator
  const [isCheck, setIsCheck] = useState<any>(isChecked);

  const handlePress = (index:any) => {
    if(isCheck)
    {
      onValueChange(index)
    }
    
  };

  useEffect(()=>{
    setIsCheck(isChecked)
    setIndex(state == 0? 0:state == 1?2:state == null?1:1)
  },[isChecked,state])

  return (
    <View style={styles.container} >
      <Animated.View
        style={[
          styles.slider,
        ]}
      />
      {states.map((state, i) => (
        <TouchableOpacity key={state} onPress={()=>handlePress(i)} style={[styles.option,{backgroundColor: index == i?getColor(state):"#CCCCCC"}]}>
          <Text style={[styles.text, index === i && styles.activeText]}>{state}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const getColor = (state: string) => {
  switch (state) {
    case '✓':
      return "#4CAF50"; 
    case "O":
      return fontStyles.colors.primary; 
    case "X":
      return "#F44336";
    default:
      return "#CCCCCC";
  }
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#000",
  },
  slider: {
    position: "absolute",
    width: 50,
    height: "100%",
    borderRadius: 25,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    height:'100%'
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  activeText: {
    color: "#FFF",
  },
});

export default ThreeStepToggle;
