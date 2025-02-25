export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white text-center p-4 mt-12">
        <a href="https://www.sax.es" target="_blank" rel="noopener noreferrer" className="hover:underline">
          &copy; {new Date().getFullYear()} Ayuntamiento de Sax
        </a>
        <p>Contacto: <a href="mailto:ayuntamiento@sax.es" className="hover:underline">ayuntamiento@sax.es</a>
        </p>
      </footer>
    );
  }