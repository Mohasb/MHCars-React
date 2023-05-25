import React, { useState } from "react";
import { Modal } from "react-rainbow-components";

export default function EditPwd(props) {

  const [isOpen, setIsOpen] = useState(props.isOpen);
  const handleOnClose = () => {
    return setIsOpen(false);
  };
  console.log(isOpen);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleOnClose}
        title="Modal Header"
      >
        <p>
          A rainbow is a meteorological phenomenon that is caused by reflection,
          refraction and dispersion of light in water droplets resulting in a
          spectrum of light appearing in the sky. It takes the form of a
          multicoloured circular arc. Rainbows caused by sunlight always appear
          in the section of sky directly opposite the sun. Rainbows can be full
          circles. However, the observer normally sees only an arc formed by
          illuminated droplets above the ground.
        </p>
      </Modal>
    </div>
  );
}
