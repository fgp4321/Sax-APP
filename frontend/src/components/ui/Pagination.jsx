export function Pagination({ page, onChange, total }) {
    const totalPages = Math.ceil(total / 10);
  
    return (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-3 py-1">Página {page} de {totalPages}</span>
        <button
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    );
  }