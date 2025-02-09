export type BlurBackgroundProps = {
  onPress: () => void;
};

export type BlurBackgroundRef = {
  show: (callback?: () => void) => void;
  hide: (callback?: () => void) => void;
};
