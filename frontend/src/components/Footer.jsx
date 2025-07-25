import React from 'react';
import { Link } from 'react-router-dom';
// Hapus import logo

function Footer() {
  return (
    <footer className="bg-pop-dark-900 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              {/* Gunakan SVG inline untuk logo */}
              <svg className="h-10 w-10 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#FF0000"/>
                <path d="M6 12H18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 6L12 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="font-display text-xl font-bold text-white">PopScratch</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              PopScratch adalah platform hiburan kartu gosok digital. Bermainlah dengan tanggung jawab.
            </p>
            <p className="text-red-500 text-sm font-bold">
              Dilarang untuk pengguna di bawah 18 tahun.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Beranda" />
              <FooterLink to="/tickets" label="Tiket Saya" />
              <FooterLink to="/profile" label="Profil" />
              <FooterLink to="/dashboard" label="Dapatkan Tiket" />
            </ul>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Informasi</h3>
            <ul className="space-y-2">
              <FooterLink to="/terms" label="Syarat & Ketentuan" />
              <FooterLink to="/privacy" label="Kebijakan Privasi" />
              <FooterLink to="/responsible" label="Bermain Bertanggung Jawab" />
              <FooterLink to="/faq" label="FAQ" />
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4">Hubungi Kami</h3>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@popscratch.com</span>
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+62 123 456 7890</span>
              </p>
            </div>
            
            {/* Social media */}
            <div className="flex space-x-4 mt-4">
              <SocialIcon href="#" icon="facebook" />
              <SocialIcon href="#" icon="twitter" />
              <SocialIcon href="#" icon="instagram" />
            </div>
          </div>
        </div>
        
        <hr className="border-gray-800 my-6" />
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2025 PopScratch. Seluruh hak cipta dilindungi.</p>
          <div className="mt-4 md:mt-0">
            <img 
              src="/assets/images/ui/payment-methods.png" 
              alt="Payment Methods" 
              className="h-6"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }) {
  return (
    <li>
      <Link to={to} className="text-gray-400 hover:text-white transition-colors">
        {label}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }) {
  let iconSvg;
  
  switch(icon) {
    case 'facebook':
      iconSvg = (
        <path d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.58v-7.745H8.076V9.237h2.606V7.01c0-2.584 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.597-1.496 1.47v1.928h2.989l-.39 3.018h-2.6V20h5.098c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0z" />
      );
      break;
    case 'twitter':
      iconSvg = (
        <path d="M20 3.799a8.549 8.549 0 01-2.363.647 4.077 4.077 0 001.804-2.266 8.192 8.192 0 01-2.6.992 4.099 4.099 0 00-7.092 3.724A11.65 11.65 0 011.4 2.71a4.1 4.1 0 001.27 5.477 4.09 4.09 0 01-1.858-.513v.052a4.1 4.1 0 003.288 4.022 4.15 4.15 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.615 11.615 0 006.29 1.84c7.547 0 11.673-6.253 11.673-11.674 0-.178-.004-.355-.01-.53A8.18 8.18 0 0020 3.8z" />
      );
      break;
    case 'instagram':
      iconSvg = (
        <path d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.088.278 3.45.525a5.04 5.04 0 00-1.92 1.24 5.04 5.04 0 00-1.24 1.92C.278 4.088.11 4.813.06 5.877.012 6.944 0 7.284 0 10s.012 3.057.06 4.123c.05 1.064.218 1.79.465 2.427a5.04 5.04 0 001.24 1.92 5.04 5.04 0 001.92 1.24c.637.247 1.363.416 2.427.465 1.066.048 1.405.06 4.123.06s3.057-.012 4.123-.06c1.064-.05 1.79-.218 2.427-.465a5.04 5.04 0 001.92-1.24 5.04 5.04 0 001.24-1.92c.247-.637.416-1.363.465-2.427.048-1.066.06-1.405.06-4.123s-.012-3.056-.06-4.123c-.05-1.064-.218-1.79-.465-2.427a5.04 5.04 0 00-1.24-1.92 5.04 5.04 0 00-1.92-1.24C15.913.278 15.187.11 14.123.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.985.01 4.04.058.973.044 1.503.207 1.856.344.466.18.8.396 1.15.748.352.35.568.684.748 1.15.137.353.3.883.344 1.857.048 1.054.058 1.37.058 4.04 0 2.668-.01 2.985-.058 4.038-.044.975-.207 1.504-.344 1.857-.18.466-.396.8-.748 1.15-.35.352-.684.568-1.15.747-.353.138-.883.3-1.857.345-1.054.048-1.37.058-4.04.058s-2.987-.01-4.04-.058c-.974-.045-1.504-.207-1.857-.345a3.242 3.242 0 01-1.15-.748 3.242 3.242 0 01-.747-1.15c-.138-.352-.3-.882-.345-1.856-.048-1.054-.058-1.37-.058-4.04 0-2.67.01-2.985.058-4.04.045-.973.207-1.503.345-1.856.18-.466.396-.8.748-1.15a3.242 3.242 0 011.15-.747c.352-.138.882-.3 1.856-.345 1.054-.048 1.37-.058 4.04-.058zm0 3.063a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.47a3.334 3.334 0 110-6.669 3.334 3.334 0 010 6.668zm6.538-8.673a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
      );
      break;
    default:
      iconSvg = null;
  }
  
  return (
    <a 
      href={href}
      className="bg-gray-800 hover:bg-red-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
        {iconSvg}
      </svg>
    </a>
  );
}

export default Footer;