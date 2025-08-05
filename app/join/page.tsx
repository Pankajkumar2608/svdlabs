"use client"
import React, { useState, useEffect, ChangeEvent, MouseEvent, FormEvent } from 'react';

type FormData = {
  name: string;
  email: string;
  whyConsider: string;
  skillToLearn: string;
  githubLink: string;
  youtubeLink: string;
};

type Errors = {
  name?: string;
  email?: string;
  whyConsider?: string;
  skillToLearn?: string;
  githubLink?: string;
  youtubeLink?: string;
};

export default function JoinUs() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whyConsider: '',
    skillToLearn: '',
    githubLink: '',
    youtubeLink: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.whyConsider.trim()) {
      newErrors.whyConsider = 'Please tell us why we should consider you';
    } else if (formData.whyConsider.trim().length < 50) {
      newErrors.whyConsider = 'Please provide at least 50 characters';
    }

    if (!formData.skillToLearn) {
      newErrors.skillToLearn = 'Please select a skill you want to learn';
    }

    if (formData.skillToLearn === 'software' && !formData.githubLink.trim()) {
      newErrors.githubLink = 'GitHub link is required for software track';
    } else if (formData.skillToLearn === 'software' && formData.githubLink.trim() && !formData.githubLink.includes('github.com')) {
      newErrors.githubLink = 'Please provide a valid GitHub link';
    }

    if (formData.skillToLearn === 'video-editing' && !formData.youtubeLink.trim()) {
      newErrors.youtubeLink = 'YouTube link is required for video editing track';
    } else if (formData.skillToLearn === 'video-editing' && formData.youtubeLink.trim() && !formData.youtubeLink.includes('youtube.com')) {
      newErrors.youtubeLink = 'Please provide a valid YouTube link';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    const response = await fetch('/api/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if(data){
        setIsSubmitting(false);
      setSubmitted(true);

    }else{
        setIsSubmitting(true);
        setSubmitted(false);
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="relative overflow-hidden">
        <div 
          className="relative flex flex-col justify-center items-center min-h-screen"
          onMouseMove={handleMouseMove}
        >
          {/* Background particles */}
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

          {/* Interactive gradient overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(247, 247, 134, 0.3) 0%, transparent 100%)`,
            }}
          />

          {/* Success Content */}
          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
            <div className="text-6xl mb-6 animate-bounce">🎉</div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Welcome to{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-[#a0eb27] border-b-2 border-[#a0eb27]">
                  sVd Labs
                </span>
              </span>
              !
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Thanks for joining us, <strong className="text-[#a0eb27]">{formData.name}</strong>! 
              We've received your application and will get back to you within 48 hours.
            </p>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">What's Next?</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li className="flex items-center"><span className="text-[#a0eb27] mr-2">✓</span> Check your email for confirmation</li>
                <li className="flex items-center"><span className="text-[#a0eb27] mr-2">✓</span> Join our Discord community</li>
                <li className="flex items-center"><span className="text-[#a0eb27] mr-2">✓</span> Attend our next orientation session</li>
              </ul>
            </div>
            <button 
              onClick={() => setSubmitted(false)}
              className="group relative px-8 py-3 bg-[#a9e14e] text-neutral-800 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Submit Another Application</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div 
        className="relative flex flex-col justify-center items-center min-h-screen py-20"
        onMouseMove={handleMouseMove}
      >
        {/* Background particles */}
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

        {/* Interactive gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(247, 247, 134, 0.3) 0%, transparent 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Join{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-white">
                  s<span className='text-[#a0eb27]'>V</span>d Labs
                </span>
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to turn your ideas into reality? Fill out the form below and become part of our innovative community!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={`bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="space-y-8">
              {/* Name Field */}
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#a0eb27] focus:bg-white/15 transition-all duration-300"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#a0eb27] focus:bg-white/15 transition-all duration-300"
                  placeholder="your.email@college.edu"
                />
                {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
              </div>

              {/* Why Consider You */}
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  Why should we consider you? <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="whyConsider"
                  value={formData.whyConsider}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#a0eb27] focus:bg-white/15 transition-all duration-300 resize-none"
                  placeholder="Tell us about your passion for innovation, any relevant experience, projects you've worked on, or what unique perspective you'd bring to our club... (minimum 50 characters)"
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.whyConsider && <p className="text-red-400 text-sm">{errors.whyConsider}</p>}
                  <p className="text-gray-400 text-sm ml-auto">{formData.whyConsider.length} characters</p>
                </div>
              </div>

              {/* Skill Selection */}
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  What skill do you want to learn? <span className="text-red-400">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div
                    className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.skillToLearn === 'software'
                        ? 'border-[#a0eb27] bg-[#a0eb27]/10'
                        : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, skillToLearn: 'software', youtubeLink: '' }))}
                  >
                    <input
                      type="radio"
                      name="skillToLearn"
                      value="software"
                      checked={formData.skillToLearn === 'software'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-4xl mb-3">💻</div>
                      <h3 className="text-xl font-bold text-white mb-2">Software Development</h3>
                      <p className="text-gray-300 text-sm">Learn programming, web development, app creation, and more</p>
                    </div>
                    {formData.skillToLearn === 'software' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#a0eb27] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm">✓</span>
                      </div>
                    )}
                  </div>

                  <div
                    className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.skillToLearn === 'video-editing'
                        ? 'border-[#a0eb27] bg-[#a0eb27]/10'
                        : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, skillToLearn: 'video-editing', githubLink: '' }))}
                  >
                    <input
                      type="radio"
                      name="skillToLearn"
                      value="video-editing"
                      checked={formData.skillToLearn === 'video-editing'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-4xl mb-3">🎬</div>
                      <h3 className="text-xl font-bold text-white mb-2">Video Editing</h3>
                      <p className="text-gray-300 text-sm">Master video editing, motion graphics, and content creation</p>
                    </div>
                    {formData.skillToLearn === 'video-editing' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#a0eb27] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm">✓</span>
                      </div>
                    )}
                  </div>
                </div>
                {errors.skillToLearn && <p className="text-red-400 text-sm mt-2">{errors.skillToLearn}</p>}
              </div>

              {/* Conditional Fields */}
              {formData.skillToLearn === 'software' && (
                <div className="animate-fadeIn">
                  <label className="block text-white font-semibold mb-3 text-lg">
                    GitHub Profile Link <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#a0eb27] focus:bg-white/15 transition-all duration-300"
                    placeholder="https://github.com/yourusername"
                  />
                  <p className="text-gray-400 text-sm mt-2">Share your GitHub profile so we can see your coding projects and contributions</p>
                  {errors.githubLink && <p className="text-red-400 text-sm mt-2">{errors.githubLink}</p>}
                </div>
              )}

              {formData.skillToLearn === 'video-editing' && (
                <div className="animate-fadeIn">
                  <label className="block text-white font-semibold mb-3 text-lg">
                    YouTube Video Link <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    name="youtubeLink"
                    value={formData.youtubeLink}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#a0eb27] focus:bg-white/15 transition-all duration-300"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  <p className="text-gray-400 text-sm mt-2">Share a video you've edited to showcase your current skills</p>
                  {errors.youtubeLink && <p className="text-red-400 text-sm mt-2">{errors.youtubeLink}</p>}
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative px-12 py-4 bg-[#a9e14e] text-neutral-800 font-bold rounded-full overflow-hidden transition-all duration-300 ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-neutral-800 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Join sVd Labs
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </>
                    )}
                  </span>
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </button>
                              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};