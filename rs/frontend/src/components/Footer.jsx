// Footer.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = ({ scrollToAbout, scrollToFeatures, scrollToContact }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020d23] text-white py-6 px-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h2 className="text-lg font-semibold mb-3">About NoteNest</h2>
          <p className="text-sm leading-relaxed">
            Empowering students worldwide with a platform to share and access
            study resources seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={handleHomeClick} className="hover:text-[#2094F3]">
                Home
              </button>
            </li>
            <li>
              <button onClick={scrollToAbout} className="hover:text-[#2094F3]">
                About
              </button>
            </li>
            <li>
              <button onClick={scrollToFeatures} className="hover:text-[#2094F3]">
                Features
              </button>
            </li>
            <li>
              <button onClick={scrollToContact} className="hover:text-[#2094F3]">
                Contact
              </button>
            </li>
            <li><a href="#" className="hover:text-[#2094F3]">Terms of Use</a></li>
            <li><a href="#" className="hover:text-[#2094F3]">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p className="text-sm mb-1">Email: 2020icts12@vau.jfn.ac.lk</p>
          <p className="text-sm">Address: Eheliyagoda, Ratnapura</p>
        </div>

        {/* Newsletter + Socials */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Subscribe for updates and tips!</h2>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email..."
              className="px-4 py-2 rounded-md text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#2094F3] hover:bg-[#1b7cd0] text-white py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>

          {/* Social Buttons */}
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-[#2094F3] rounded-full hover:bg-[#1b7cd0] transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-[#2094F3] rounded-full hover:bg-[#1b7cd0] transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-[#2094F3] rounded-full hover:bg-[#1b7cd0] transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} NoteNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;