export function Dialog({ children }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg">{children}</div>
      </div>
    );
  }
  
  export function DialogTrigger({ children, onClick }) {
    return <span onClick={onClick}>{children}</span>;
  }
  
  export function DialogContent({ children }) {
    return <div>{children}</div>;
  }
  
  export function DialogTitle({ children }) {
    return <h2 className="text-xl font-bold mb-4">{children}</h2>;
  }
  
  export function DialogFooter({ children }) {
    return <div className="mt-4 flex justify-end gap-2">{children}</div>;
  }