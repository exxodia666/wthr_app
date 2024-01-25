import styled from 'styled-components/native';

export const DailyForecastContainer = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const ForecastDayText = styled.Text`
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.text};
`;

export const DateText = styled.Text`
  justify-content: center;
  align-items: center;
  flex: ${1 / 3}px;
  margin-right: 20px;
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.text};
`;

export const Block = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: ${1 / 3}px;
`;
