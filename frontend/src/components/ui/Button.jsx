export function Button({ children, onClick, className, type = "button" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded text-white font-semibold ${className}`}
      >
        {children}
      </button>
    );
  }