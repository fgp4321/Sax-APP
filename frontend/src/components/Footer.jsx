export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white text-center p-4 mt-12">
        <p>&copy; {new Date().getFullYear()} Ayuntamiento de Sax</p>
        <p>Contacto: ayuntamiento@sax.es</p>
      </footer>
    );
  }