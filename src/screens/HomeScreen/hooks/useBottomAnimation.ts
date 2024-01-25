import React, {useRef} from 'react';
import {Animated, Dimensions, PanResponder} from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.7;

export const BOTTOM_SHEET_MIN_HEIGHT = 68;

export const MAX_DOWNWARD_TRANSLATE_Y = 0;

export const MAX_UPWNWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_HEIGHT;

export const DRAG_TRESHOLD = 50;

export const useBottomAnimation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const lastGestureDy = useRef(0);

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (evt, gestureState) => {
        animatedValue.setValue(gestureState.dy);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gestureState.dy;
        if (lastGestureDy.current < MAX_UPWNWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_UPWNWARD_TRANSLATE_Y;
        } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        }
        if (gestureState.dy < 0) {
          if (gestureState.dy <= -DRAG_TRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          if (gestureState.dy >= DRAG_TRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = (direction: 'down' | 'up') => {
    lastGestureDy.current =
      direction === 'down'
        ? MAX_DOWNWARD_TRANSLATE_Y
        : MAX_UPWNWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWNWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWNWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return {panResponder, bottomSheetAnimation};
};
