import { Comment, ProgressBar } from "react-loader-spinner";

const Spinner = ({visibility, type}) => {
  switch (type) {
    case "progressBar":
      return (
        <ProgressBar
          visible={visibility}
          height="20"
          width="100"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#49a3f1"
        />
      );
    case "message":
      return (
        <Comment
          visible={visibility}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#49a3f1"
        />
      );
    default:
      return (
        <Comment
          visible={visibility}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#49a3f1"
        />
      );
  }
};

export default Spinner;
