const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-blue-600 text-lg mb-3">LocalLink</h3>
          <p className="text-sm text-gray-500">
            Bridging awareness and access within your local community.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Community</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Lending Guidelines</li>
            <li>Trust & Safety</li>
            <li>Local Events</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Emergency Mode FAQ</li>
            <li>Contact Local Admin</li>
            <li>Verified Shop Program</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 pt-8 border-t text-xs text-gray-400">
        © 2026 LocalLink Hyperlocal Network.
      </div>
    </footer>
  );
};

export default Footer;