import ReactLoading from "react-loading";
import "./loadingScreen.scss";

const LoadingScreen = (props) => {
  const { type, color, height, width } = props;

  return (
    <ReactLoading
      className="loading-screen"
      type={type}
      color={color}
      height={height}
      width={width}
    />
  );
};

export default LoadingScreen;
