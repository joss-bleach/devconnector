import './loading.styles.css';

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="loading-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
