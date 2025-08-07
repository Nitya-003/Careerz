import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import CareerExplorer from './components/CareerExplorer';
import SkillTracker from './components/SkillTracker';
import ResourceModal from './components/ResourceModal';
import CareerModal from './components/CareerModal';
import { User, Briefcase, TrendingUp, Settings } from 'lucide-react';

export interface UserProfile {
  name: string;
  skills: string[];
  interests: string[];
  experience: string;
  education: string;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  requiredSkills: string[];
  averageSalary: string;
  growthRate: string;
  industry: string;
}

export interface SkillProgress {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    skills: [],
    interests: [],
    experience: '',
    education: ''
  });

  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([
    { skill: 'JavaScript', currentLevel: 7, targetLevel: 9, progress: 75 },
    { skill: 'React', currentLevel: 6, targetLevel: 8, progress: 65 },
    { skill: 'Python', currentLevel: 5, targetLevel: 8, progress: 50 },
    { skill: 'Data Analysis', currentLevel: 4, targetLevel: 7, progress: 45 },
    { skill: 'Machine Learning', currentLevel: 3, targetLevel: 8, progress: 30 },
  ]);

  const mockCareers: Career[] = [
    {
      id: '1',
      title: 'Frontend Developer',
      description: 'Build user interfaces and experiences for web applications',
      matchPercentage: 92,
      requiredSkills: ['JavaScript', 'React', 'CSS', 'HTML'],
      averageSalary: '$75,000 - $120,000',
      growthRate: '13%',
      industry: 'Technology'
    },
    {
      id: '2',
      title: 'Data Scientist',
      description: 'Analyze complex data to help companies make better decisions',
      matchPercentage: 85,
      requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      averageSalary: '$95,000 - $150,000',
      growthRate: '22%',
      industry: 'Technology'
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      description: 'Develop both frontend and backend components of web applications',
      matchPercentage: 78,
      requiredSkills: ['JavaScript', 'Node.js', 'Database', 'React'],
      averageSalary: '$80,000 - $130,000',
      growthRate: '15%',
      industry: 'Technology'
    },
    {
      id: '4',
      title: 'UX Designer',
      description: 'Design user experiences and interfaces for digital products',
      matchPercentage: 72,
      requiredSkills: ['Design Thinking', 'Figma', 'User Research', 'Prototyping'],
      averageSalary: '$70,000 - $115,000',
      growthRate: '8%',
      industry: 'Design'
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      description: 'Manage infrastructure and deployment pipelines for applications',
      matchPercentage: 68,
      requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      averageSalary: '$90,000 - $140,000',
      growthRate: '18%',
      industry: 'Technology'
    },
    {
      id: '6',
      title: 'Product Manager',
      description: 'Lead product strategy and coordinate development teams',
      matchPercentage: 65,
      requiredSkills: ['Product Strategy', 'Analytics', 'Communication', 'Agile'],
      averageSalary: '$100,000 - $160,000',
      growthRate: '12%',
      industry: 'Technology'
    },
    {
      id: '7',
      title: 'Cybersecurity Analyst',
      description: 'Protect organizations from digital threats and vulnerabilities',
      matchPercentage: 62,
      requiredSkills: ['Network Security', 'Penetration Testing', 'Risk Assessment', 'Compliance'],
      averageSalary: '$85,000 - $125,000',
      growthRate: '31%',
      industry: 'Technology'
    },
    {
      id: '8',
      title: 'Digital Marketing Manager',
      description: 'Develop and execute digital marketing strategies across channels',
      matchPercentage: 58,
      requiredSkills: ['SEO', 'Social Media', 'Analytics', 'Content Marketing'],
      averageSalary: '$65,000 - $100,000',
      growthRate: '10%',
      industry: 'Marketing'
    },
    {
      id: '9',
      title: 'Mobile App Developer',
      description: 'Create mobile applications for iOS and Android platforms',
      matchPercentage: 75,
      requiredSkills: ['React Native', 'Swift', 'Kotlin', 'Mobile UI/UX'],
      averageSalary: '$80,000 - $130,000',
      growthRate: '22%',
      industry: 'Technology'
    },
    {
      id: '10',
      title: 'Business Analyst',
      description: 'Analyze business processes and recommend improvements',
      matchPercentage: 55,
      requiredSkills: ['Business Analysis', 'SQL', 'Excel', 'Process Mapping'],
      averageSalary: '$70,000 - $110,000',
      growthRate: '14%',
      industry: 'Business'
    }
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'profile', label: 'Profile', icon: Settings },
    { id: 'careers', label: 'Career Explorer', icon: Briefcase },
    { id: 'skills', label: 'Skill Tracker', icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard 
          userProfile={userProfile} 
          careers={mockCareers} 
          skillProgress={skillProgress}
          onShowCareerModal={(career) => {
            setSelectedCareer(career);
            setShowCareerModal(true);
          }}
        />;
      case 'profile':
        return <Profile userProfile={userProfile} setUserProfile={setUserProfile} />;
      case 'careers':
        return <CareerExplorer 
          careers={mockCareers} 
          userProfile={userProfile}
          onShowCareerModal={(career) => {
            setSelectedCareer(career);
            setShowCareerModal(true);
          }}
        />;
      case 'skills':
        return <SkillTracker 
          skillProgress={skillProgress} 
          setSkillProgress={setSkillProgress}
          onShowResourceModal={(skill) => {
            setSelectedSkill(skill);
            setShowResourceModal(true);
          }}
        />;
      default:
        return <Dashboard 
          userProfile={userProfile} 
          careers={mockCareers} 
          skillProgress={skillProgress}
          onShowCareerModal={(career) => {
            setSelectedCareer(career);
            setShowCareerModal(true);
          }}
        />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Careerz
                </h1>
                <p className="text-sm text-slate-600">Recognize Your Flair</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Modals */}
      {showResourceModal && (
        <ResourceModal
          skill={selectedSkill}
          onClose={() => setShowResourceModal(false)}
        />
      )}
      
      {showCareerModal && selectedCareer && (
        <CareerModal
          career={selectedCareer}
          userProfile={userProfile}
          onClose={() => setShowCareerModal(false)}
        />
      )}
    </div>
  );
}

export default App;
