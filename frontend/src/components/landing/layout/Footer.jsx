const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-base-300/60 px-5 md:px-8 py-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-base-content/30">
          © 2026 Rentara. All rights reserved.
        </div>
        <div className="flex items-center gap-5">
          {["About", "Privacy", "Terms", "Help"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs font-medium text-base-content/40 hover:text-base-content/70 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
