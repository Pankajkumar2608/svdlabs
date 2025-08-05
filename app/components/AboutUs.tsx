"use client"
import React, { useState, useEffect } from 'react';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
export const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredStat, setHoveredStat] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const clubValues = [
    {
      icon: '💡',
      title: 'Innovation First',
      description: 'We believe every crazy idea has the potential to change the world. Our club is where imagination meets execution.',
    },
    {
      icon: '🤝',
      title: 'Collaborative Spirit',
      description: 'Great things happen when brilliant minds work together. We foster an environment of mutual support and shared growth.',
    },
    {
      icon: '🚀',
      title: 'Action-Oriented',
      description: 'Ideas without action remain dreams. We provide the platform, resources, and mentorship to turn concepts into reality.',
    },
    {
      icon: '🎯',
      title: 'Impact Driven',
      description: 'Every project we undertake aims to solve real problems and create meaningful change in our college and beyond.',
    }
  ];

  const activities = [
    'Weekly Innovation Workshops',
    'Hackathons & Coding Competitions',
    'Startup Pitch Sessions',
    'Tech Talk Series',
    'Collaborative Project Building',
    'Mentorship Programs'
  ];
  const testimonials = [
    {
      name: 'Pankaj Jaat',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. In hac habitasse platea dictumst.',
      designation: 'Founding Engineer, Tradzy',
      src: 'https://media.licdn.com/dms/image/v2/D5603AQHhHdQlhg0z1A/profile-displayphoto-shrink_400_400/B56ZYBdVZTGcAg-/0/1743781190133?e=1757548800&v=beta&t=5sGe4OMKIn7bAm_Wzsil7ifPpWFnfl2tCHtTUZQ7Q3Y'
    },
    {
      name: 'Adarsh Dhiran',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. In hac habitasse platea dictumst.',
      designation: 'Motivation Kaksha, YT',
      src: 'https://yt3.googleusercontent.com/WbJzVBt0FBF8KjpypF9ZHpEBpiJDfGN1qu6auSGj2Ga587iuHYpQGTbQgZZ1UMUOqADFV9f9PkU=s160-c-k-c0x00ffffff-no-rj'
    },
    {
      name: 'Ram Jarwal ',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. In hac habitasse platea dictumst.',
      designation: 'Rv Jarwal, YT',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ZBkh4jiYBSiUfMYMlbrg2FwW6hCwT09cq66D0kdBoLSHybXlEaRB&usqp=CAE&s'
    },
  ]

  return (
    <div className="relative overflow-hidden">
      <section 
        id="about-section" 
        className="relative flex flex-col justify-center items-center min-h-screen py-20"
        onMouseMove={handleMouseMove}
      >
        {/* Animated background particles - Same as Hero */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Interactive gradient overlay - Same as Hero */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(247, 247, 134, 0.3) 0%, transparent 100%)`,
          }}
        />

        {/* Content */}
        <div id="about" className="relative z-10 w-full max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              About{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-white">
                  s<span className='text-[#a0eb27]'>V</span>d Labs
                </span>
              </span>
            </h2>
            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're a passionate community of innovators, creators, and dreamers at our college, 
              dedicated to transforming ideas into impactful realities through collaboration and innovation.
            </p>
          </div>

          {/* Mission Statement */}
          <div className={`bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-white/10 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">Our Mission</h3>
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                "To create a vibrant ecosystem where students can explore, experiment, and execute their most ambitious ideas. 
                We bridge the gap between academic learning and real-world application, empowering the next generation of 
                innovators to solve tomorrow's challenges today."
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className={`mb-16 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">What We Stand For</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {clubValues.map((value, index) => (
                <div
                  key={index}
                  className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500 cursor-pointer ${
                    activeCard === index ? 'scale-105 shadow-2xl bg-white/10' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setActiveCard(index)}
                  onClick={() => setActiveCard(index)}
                >
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4">{value.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#a0eb27] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`} />
                </div>
              ))}
            </div>
          </div>

          {/* What We Do Section */}
        {/* <div className={`grid lg:grid-cols-2 gap-12 items-center mb-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-8">What We Do</h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 group hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-3 h-3 bg-[#a0eb27] rounded-full mr-4 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">{activity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h4 className="text-xl md:text-3xl font-bold text-white mb-6">Join Our Journey</h4>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                Whether you're a coding wizard, design enthusiast, business strategist, or just someone with 
                big dreams, there's a place for you in our community. We believe diverse perspectives 
                create the most innovative solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative px-8 py-3 bg-[#a9e14e] text-neutral-800 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25">
                  <span className="relative z-10">🚀 Join Us Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
                <button className="group px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105">
                  📅 Attend Event
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <AnimatedTestimonials testimonials={testimonials} autoplay />
          

          {/* Call to Action */}
          <div className={`text-center transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
              <h3 className="text-2xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Turn Your{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-[#a0eb27] border-b-2 border-[#a0eb27]">
                    !deas
                  </span>
                </span>
                {' '}Into Reality?
              </h3>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of students who have already started their innovation journey with us. 
                Your next big idea is just one meeting away!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative px-6 py-3 bg-[#a9e14e] text-neutral-800 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25">
                  <span className="p md relative z-10 flex items-center justify-center">
                    Join Now
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
                <button className="group px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105">
                  <span className="flex items-center justify-center">
                    Contact Us
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};