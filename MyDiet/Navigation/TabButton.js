import React from 'react';
import { Colors } from '../constants';
import styled from "styled-components/native"
const Container =styled.TouchableWithoutFeedback`
width: 60px;
height: 50px;
`;
const Icon=styled.Image`
   width: 30px;
   height: 30px;
   align-items: center;
   justify-content: center;
`;
const Label=styled.Text``;
const Background=styled.View`
  flex: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background:${(props) => (props.focused ? Colors.secondary :'white')};
  border-radius:10px; 
  margin: 6px;
`;
function Tab({iconname,accessibilityState,onPress}){
   const focused=accessibilityState.selected;
    return (
    <Background focused={focused} onPress={onPress}
    >
        <Container onPress={onPress}> 
              <Icon source={iconname}/>
        </Container>
    </Background>
    );
}
export default Tab;