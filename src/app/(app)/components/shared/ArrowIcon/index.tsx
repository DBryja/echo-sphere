import "./ArrowIcon.scss";

export default function ArrowIcon() {
  return (
    <div className={"arrow-icon"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M24.5 11L24.5 36M24.5 36L12.5 24M24.5 36L36.5 24"
          stroke="#F2F2F2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
