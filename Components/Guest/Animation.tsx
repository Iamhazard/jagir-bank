import Lottie from "react-lottie";
import animationData from "../../public/assets/Animation.json";
const Animation: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={600} width={600} />
    </div>
  );
};

export default Animation;
