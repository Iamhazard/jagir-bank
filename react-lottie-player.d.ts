declare module "@lottiefiles/react-lottie-player" {
  import { FC } from "react";

  interface PlayerProps {
    autoplay?: boolean;
    loop?: boolean;
    controls?: boolean;
    src: string;
    style?: React.CSSProperties;
  }

  const Player: FC<PlayerProps>;

  export default Player;
}
