import {Animated} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.6,
  shadowRadius: 4.65,

  elevation: 6,
};

export const Title = styled.Text`
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 10px;
  color: ${props => props.theme.text};
`;

export const Line = styled.View`
  background-color: ${props => props.theme.text};
  width: 100px;
  height: 3px;
  border-radius: 2px;
  position: absolute;
  top: 5px;
  align-self: center;
`;

export const DraggableZone = styled.View`
  width: 100%;
  height: 40px;
  border-radius: 2px;
  position: absolute;
  top: -15px;
  align-self: center;
`;

export const Day = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: darkgray;
`;

export const Info = styled.View`
  flex: ${1 / 3}px;
  align-items: center;
  justify-content: center;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
`;

export const InfoText = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.text};
`;

export const FeelsLike = styled.Text`
  font-weight: 600;
  font-size: 12px;
  color: darkgray;
`;

export const Temperature = styled.Text`
  font-weight: 600;
  font-size: 46px;
  color: ${props => props.theme.text};
  padding-bottom: 10px;
`;

export const DateContainer = styled.View`
  height: 60px;
  flex-direction: row;
  width: 200px;
  align-items: center;
  justify-content: space-evenly;
  align-self: center;
  margin-bottom: 10px;
`;

export const TemperatureContainer = styled.View`
  width: 200px;
  align-items: center;
  justify-content: space-evenly;
  align-self: center;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const BottomContainer = styled(Animated.View)`
  padding-top: 15px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  position: absolute;
  background-color: ${props => props.theme.background};
  width: 100%;
`;

export const ForecastContainer = styled.View`
  padding: 15px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  width: 100%;
`;

export const DailyForecastContainer = styled.View`
  justify-content: flex-start;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const ForecastDay = styled.Text`
  justify-content: center;
  align-items: center;
  flex: ${1 / 3}px;
  margin-right: 20px;
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.text};
`;
