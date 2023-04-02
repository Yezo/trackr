import "./EmptyMessage.css"

export default function EmptyMessage() {
  return (
    <div className="warning-message">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
        <path d="M12 13v8"></path>
        <path d="M12 3v3"></path>
      </svg>
      <p className="warning-text-wrapper">
        <span>It appears you have no job applications.</span>
        <span>Try adding one.</span>
      </p>
    </div>
  )
}
