// Home.jsx
import React, { useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  // Create refs for each section
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);

  const handleGetStarted = () => {
    navigate('/register');
  };

  // Smooth scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="bg-[#eef0f4] text-white min-h-screen flex flex-col">
      {/* Pass scroll functions to Header */}
      <Header 
        scrollToAbout={() => scrollToSection(aboutRef)}
        scrollToFeatures={() => scrollToSection(featuresRef)}
        scrollToContact={() => scrollToSection(contactRef)}
      />

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-6 text-black py-16">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="text-[#2094F3]">NoteNest</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your ultimate platform for sharing and accessing study resources.
            Join thousands of students to collaborate and succeed!
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-[#2094F3] hover:bg-[#1b7cd0] text-white px-8 py-3 rounded-md text-lg font-medium transition"
          >
            Get Started
          </button>
        </div>
      </main>

      {/* About Section with ref */}
      <section ref={aboutRef} className="py-16 bg-white text-gray-800 px-6 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#2094F3]">About NoteNest</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                NoteNest was created to help students share knowledge and resources effortlessly.
                We believe in collaborative learning where every student can both contribute and benefit
                from a shared pool of academic resources.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <p className="text-gray-600">
                Upload your study materials (notes, PDFs, videos), organize them by subject and year,
                and help your peers while building your own digital library. Download, like, comment,
                and preview resources shared by others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with ref */}
      <section ref={featuresRef} className="py-16 bg-[#f8f9fa] text-gray-800 px-6 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#2094F3]">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Resource Sharing",
                icon: "📚",
                description: "Upload and download notes, PDFs, videos for all subjects and years"
              },
              {
                title: "Interactive Learning",
                icon: "💬",
                description: "Comment on resources and discuss with peers"
              },
              {
                title: "Smart Organization",
                icon: "🗂️",
                description: "Categorize resources by subject, year, and resource type"
              },
              {
                title: "Preview Before Download",
                icon: "👁️",
                description: "Preview resources before downloading to ensure relevance"
              },
              {
                title: "Rating System",
                icon: "⭐",
                description: "Like and rate resources to help others find quality content"
              },
              {
                title: "Secure Platform",
                icon: "🔒",
                description: "Verified student community with secure file handling"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with ref */}
      <section ref={contactRef} className="py-16 bg-white text-gray-800 px-6 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#2094F3]">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
              <p className="text-gray-600 mb-6">
                Have questions or suggestions? Our team is here to help you with any inquiries
                regarding the platform or your account.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 text-[#2094F3]">📧</div>
                  <div>
                    <h4 className="font-medium">Email Support</h4>
                    <a href="mailto:2020icts12@vau.jfn.ac.lk" className="text-gray-600 hover:text-[#2094F3]">
                      2020icts12@vau.jfn.ac.lk
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-[#2094F3]">🏛️</div>
                  <div>
                    <h4 className="font-medium">Institutional Contact</h4>
                    <p className="text-gray-600">Faculty of Technology, University of Jaffna</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
              <p className="text-gray-600 mb-4">
                For technical issues or platform feedback, please include:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Your student ID</li>
                <li>Detailed description of the issue</li>
                <li>Screenshots if applicable</li>
                <li>Device and browser information</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer 
        scrollToAbout={() => scrollToSection(aboutRef)}
        scrollToFeatures={() => scrollToSection(featuresRef)}
        scrollToContact={() => scrollToSection(contactRef)}
      />
    </div>
  );
};

export default Home;