import { createSlice } from "@reduxjs/toolkit";
import Captions from "yet-another-react-lightbox/plugins/captions";
import LightBox from "yet-another-react-lightbox";
import { useAppDispatch, useAppSelector } from "../store";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
type LightBoxState = {
  isOpen: boolean;
  image: string;
  title: string;
};

const initialState: LightBoxState = {
  isOpen: false,
  image: "",
  title: "",
};

const lightBoxSlice = createSlice({
  name: "lightBox",
  initialState,
  reducers: {
    openLightBox(state, action: { payload: { image: string; title: string } }) {
      state.isOpen = true;
      state.image = action.payload.image;
      state.title = action.payload.title;
    },
    closeLightBox(state) {
      state.isOpen = false;
    },
  },
});

type LightBoxProviderProps = {
  children: React.ReactNode;
};

export const LightBoxProvider = ({ children }: LightBoxProviderProps) => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.lightBox);

  return (
    <>
      <LightBox
        open={selector.isOpen}
        close={() => dispatch(closeLightBox())}
        plugins={[Captions]}
        controller={{ closeOnBackdropClick: true }}
        slides={[
          {
            src: selector.image,
            alt: selector.title,
            description: selector.title,
          },
        ]}
        render={{
          buttonPrev: undefined,
          buttonNext: undefined,
        }}
      />

      {children}
    </>
  );
};

export const { openLightBox, closeLightBox } = lightBoxSlice.actions;
export default lightBoxSlice.reducer;
