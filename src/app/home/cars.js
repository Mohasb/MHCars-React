import AudiA1Image from "../../assets/Cars/AudiA1Image.webp";
import AudiA3Image from "../../assets/Cars/AudiA3Image.webp";
import AudiA4Image from "../../assets/Cars/AudiA4Image.webp";
import AudiQ2Image from "../../assets/Cars/AudiQ2Image.webp";
import Fiat500Cabrio from "../../assets/Cars/Fiat500Cabrio.webp";
import FordFocusImage from "../../assets/Cars/FordFocusImage.webp";
import FordTransitXlImage from "../../assets/Cars/FordTransitXlImage.webp";
import MercedesClaseAImage from "../../assets/Cars/MercedesClaseAImage.webp";
import OpelMokkaImage from "../../assets/Cars/OpelMokkaImage.webp";
import Peugeot5008Image from "../../assets/Cars/Peugeot5008Image.webp";
import PeugeotSpaceImage from "../../assets/Cars/PeugeotSpaceImage.webp";
import SkodaKaroqoImage from "../../assets/Cars/SkodaKaroqoImage.webp";
import VolkswagenTouranImage from "../../assets/Cars/VolkswagenTouranImage.webp";
import VolkswagenTROCCabrioletImage from "../../assets/Cars/VolkswagenTROCCabrioletImage.webp";

const images = {
  AudiA1Image,
  AudiA3Image,
  AudiA4Image,
  AudiQ2Image,
  Fiat500Cabrio,
  FordFocusImage,
  FordTransitXlImage,
  MercedesClaseAImage,
  OpelMokkaImage,
  Peugeot5008Image,
  PeugeotSpaceImage,
  SkodaKaroqoImage,
  VolkswagenTouranImage,
  VolkswagenTROCCabrioletImage,
};

function getImageByKey(key) {
  return images[key];
}

export default getImageByKey;
