interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="bg-theme-input mb-4 h-2.5 w-full w-80 rounded-full">
      <div
        className="bg-theme-button h-2.5 w-80 animate-pulse rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
