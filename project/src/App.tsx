import React, { useState, useRef } from 'react';
import { 
  FileUp, 
  Brain, 
  Target, 
  Sparkles, 
  Sun, 
  Moon,
  CheckCircle2,
  AlertCircle,
  Download,
  RefreshCw,
  Menu,
  X,
  Code2,
  Briefcase,
  Award,
  Lightbulb,
  Upload,
  Phone,
  Mail,
  MapPin,
  Search,
  FileText
} from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skillKeywords, setSkillKeywords] = useState<string[]>([]);

  const handleFileUpload = (e: React.DragEvent | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let file: File | null = null;

    if ('dataTransfer' in e) {
      file = e.dataTransfer.files[0];
    } else if (e.target.files && e.target.files.length > 0) {
      file = e.target.files[0];
    }

    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (['pdf', 'doc', 'docx'].includes(fileType || '')) {
        if (!jobTitle || !jobDescription) {
          alert('Please enter both job title and description for better analysis');
          return;
        }
        setIsAnalyzing(true);
        // Simulate analysis and extract keywords from job description
        setTimeout(() => {
          // Simulate extracting keywords from job description
          const extractedKeywords = jobDescription
            .toLowerCase()
            .split(/\s+/)
            .filter(word => word.length > 3)
            .slice(0, 10);
          setSkillKeywords(extractedKeywords);
          setIsAnalyzing(false);
          setShowResults(true);
          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
      } else {
        alert('Please upload a PDF, DOC, or DOCX file');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Brain className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`ml-2 text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>VisionX Resume</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'features', 'how-it-works', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`${
                    activeSection === section
                      ? darkMode
                        ? 'text-blue-400'
                        : 'text-blue-600'
                      : darkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  } transition-colors capitalize`}
                >
                  {section.replace(/-/g, ' ')}
                </button>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              {['home', 'features', 'how-it-works', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === section
                      ? darkMode
                        ? 'text-blue-400 bg-gray-800'
                        : 'text-blue-600 bg-gray-100'
                      : darkMode
                      ? 'text-gray-300'
                      : 'text-gray-600'
                  } capitalize`}
                >
                  {section.replace(/-/g, ' ')}
                </button>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 ${
            darkMode 
              ? 'bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900' 
              : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
          }`}>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2850&q=80')] opacity-10 bg-cover bg-center"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pb-32">
          <div className="text-center">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
              Transform Your Career with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                AI-Powered Resume Analysis
              </span>
            </h1>
            <p className={`mt-6 text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Let VisionX's advanced AI analyze your resume, optimize for ATS systems, and provide personalized recommendations to land your dream job.
            </p>
            <button 
              onClick={() => handleNavClick('how-it-works')}
              className="mt-8 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Get Started Now
            </button>
          </div>

          {/* Features Grid */}
          <div id="features" className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: 'AI Analysis', description: 'Advanced algorithms analyze your resume structure and content' },
              { icon: Target, title: 'ATS Score', description: 'Get your resume\'s ATS compatibility score instantly' },
              { icon: Code2, title: 'Skill Match', description: 'Compare your skills with job market demands' },
              { icon: Sparkles, title: 'Smart Tips', description: 'Receive AI-powered suggestions for improvement' }
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-800/70' 
                    : 'bg-white/50 hover:bg-white/70'
                } backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1`}
              >
                <feature.icon className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`mt-4 text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Upload Section with Job Details */}
          <div id="how-it-works" className="mt-20">
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Job Details Form */}
              <div className={`p-8 rounded-xl ${
                darkMode ? 'bg-gray-800/30' : 'bg-white/30'
              } backdrop-blur-sm`}>
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Job Title
                    </label>
                    <div className="relative">
                      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g., Senior Software Engineer"
                        className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                          darkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-white text-gray-900 border-gray-300'
                        } border focus:ring-2 focus:ring-blue-500 outline-none`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Job Description
                    </label>
                    <div className="relative">
                      <FileText className={`absolute left-3 top-3 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description here for better analysis..."
                        rows={4}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                          darkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-white text-gray-900 border-gray-300'
                        } border focus:ring-2 focus:ring-blue-500 outline-none`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div
                className={`p-8 rounded-xl border-2 border-dashed ${
                  darkMode 
                    ? 'bg-gray-800/30 border-gray-700 hover:border-blue-500' 
                    : 'bg-white/30 border-gray-300 hover:border-blue-500'
                } transition-all duration-300`}
                onDrop={handleFileUpload}
                onDragOver={handleDragOver}
              >
                <div className="text-center">
                  <FileUp className={`w-12 h-12 mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <h3 className={`mt-4 text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Drop your resume here
                  </h3>
                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    or{' '}
                    <button 
                      onClick={handleBrowseClick}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      browse files
                    </button>
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <p className={`mt-1 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Supports PDF, DOC, DOCX
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          {isAnalyzing && (
            <div className="mt-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
              <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Analyzing your resume with VisionX AI for {jobTitle}...
              </p>
            </div>
          )}

          {showResults && (
            <div id="results" className={`mt-12 max-w-4xl mx-auto rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm p-8`}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Analysis Results</h2>
                  <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Analysis for: {jobTitle}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </button>
                  <button 
                    onClick={() => {
                      setShowResults(false);
                      setIsAnalyzing(false);
                    }}
                    className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors`}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Re-Analyze
                  </button>
                </div>
              </div>

              {/* Job Match Score */}
              <div className="mb-8">
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Job Match Score</h3>
                <div className="relative pt-1">
                  <div className={`overflow-hidden h-6 text-xs flex rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      style={{ width: "75%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-500"
                    >
                      75% Match
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    title: "Key Strengths",
                    icon: Award,
                    items: [
                      "Technical expertise aligns with requirements",
                      "Relevant project experience",
                      "Strong problem-solving skills",
                      "Team collaboration experience"
                    ],
                    color: "text-green-500"
                  },
                  {
                    title: "Areas to Improve",
                    icon: AlertCircle,
                    items: [
                      "Add specific achievements with metrics",
                      "Highlight leadership experience",
                      "Include more industry certifications",
                      "Emphasize relevant technologies"
                    ],
                    color: "text-yellow-500"
                  },
                  {
                    title: "Required Keywords",
                    icon: Code2,
                    items: skillKeywords.map(keyword => 
                      keyword.charAt(0).toUpperCase() + keyword.slice(1)
                    ),
                    color: "text-blue-500"
                  },
                  {
                    title: "AI Suggestions",
                    icon: Lightbulb,
                    items: [
                      "Tailor experience to job requirements",
                      "Add relevant technical certifications",
                      "Highlight specific achievements",
                      "Include industry-specific keywords"
                    ],
                    color: "text-purple-500"
                  }
                ].map((section, index) => (
                  <div key={index} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
                    <div className="flex items-center mb-4">
                      <section.icon className={`w-6 h-6 ${section.color} mr-2`} />
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{section.title}</h4>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Skills Match Analysis */}
              <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
                <div className="flex items-center mb-4">
                  <Briefcase className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
                  <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Skills Match Analysis</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { skill: "Required Skills Match", level: 85 },
                    { skill: "Experience Level Match", level: 78 },
                    { skill: "Technical Skills", level: 90 },
                    { skill: "Soft Skills", level: 82 },
                    { skill: "Industry Knowledge", level: 75 },
                    { skill: "Overall Qualification", level: 83 }
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill.skill}</span>
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{skill.level}%</span>
                      </div>
                      <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Get in Touch</h2>
            <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Have questions? We're here to help you transform your career journey.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleContactSubmit} className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-2 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-white text-gray-900 border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 outline-none`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className={`w-full px-4 py-2 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-white text-gray-900 border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 outline-none`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-white text-gray-900 border-gray-300'
                  } border focus:ring-2 focus:ring-blue-500 outline-none`}
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </div>
            </form>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`flex items-center justify-center p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <Phone className="w-6 h-6 text-blue-500 mr-3" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>+1 (555) 123-4567</span>
              </div>
              <div className={`flex items-center justify-center p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <Mail className="w-6 h-6 text-blue-500 mr-3" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>contact@visionx.com</span>
              </div>
              <div className={`flex items-center justify-center p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <MapPin className="w-6 h-6 text-blue-500 mr-3" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;