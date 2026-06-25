
import {
  TrendingUp,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Cara Kerja', href: '#' },
        { name: 'Harga', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Bantuan', href: '#' }
      ]
    },
    {
      title: 'Layanan',
      links: [
        { name: 'YouTube Marketing', href: '#' },
        { name: 'Instagram Growth', href: '#' },
        { name: 'TikTok Promotion', href: '#' },
        { name: 'Facebook Ads', href: '#' }
      ]
    },
    {
      title: 'Perusahaan',
      links: [
        { name: 'Tentang Kami', href: '#' },
        { name: 'Karir', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Press Kit', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Syarat & Ketentuan', href: '#' },
        { name: 'Kebijakan Privasi', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Disclaimer', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">EngageMarket</span>
              </div>
              
              <p className="text-gray-400 mb-6 max-w-md">
                Platform terpercaya yang mempertemukan pemasang iklan dengan service provider 
                untuk meningkatkan engagement media sosial secara organik dan aman.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                  <span>support@engagemarket.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span>+62 21 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
            
            {/* Footer links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2026 EngageMarket. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook  className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram  className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter  className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
