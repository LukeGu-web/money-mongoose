import { create } from 'zustand';
import { ImagePickerAsset } from 'expo-image-picker';

type ImageState = {
  imageData: string | null;
  setImage: (date: string) => void;
};

const useImage = create<ImageState>((set) => ({
  imageData: null,
  setImage: (date) => {
    set(() => ({ imageData: date }));
  },
}));

export default useImage;
