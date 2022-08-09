import {NativeModules} from 'react-native';

export type FaceBound = {
  bottom: number;
  top: number;
  left: number;
  right: number;
  centerX: number;
  centerY: number;
};

type getFacesResult = {
  facesDetected: number;
  height: number;
  width: number;
  faces: FaceBound[];
};

const {FaceRecognitionModule} = NativeModules;

export const getContours = async (url: string) => {
  let result = await FaceRecognitionModule.getContours(url);
  return;
};

export const getFaces = async (url: string): Promise<getFacesResult> => {
  let result: getFacesResult = await FaceRecognitionModule.getFaces(url);
  return result;
};
