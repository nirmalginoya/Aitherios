import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // Use 'instant' so there's no visual jumping during route transitions
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
