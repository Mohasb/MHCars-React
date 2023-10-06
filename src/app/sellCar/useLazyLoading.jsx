import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useLazyLoading = () => {
  const [shouldLoadComponent, setShouldLoadComponent] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setShouldLoadComponent(true);
    }
  }, [inView]);

  return { shouldLoadComponent, ref };
};

export default useLazyLoading;
