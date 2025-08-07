import React from 'react';
import { X, DollarSign, TrendingUp, MapPin, Users, Star, CheckCircle, AlertCircle, BookOpen, ExternalLink } from 'lucide-react';
import { Career, UserProfile } from '../App';

interface CareerModalProps {
  career: Career;
  userProfile: UserProfile;
  onClose: () => void;
}

const CareerModal: React.FC<CareerModalProps> = ({ career, userProfile, onClose }) => {
  const matchedSkills = career.requiredSkills.filter(skill => 
    userProfile.skills.includes(skill)
  );
  const missingSkills = career.requiredSkills.filter(skill => 
    !userProfile.skills.includes(skill)
  );

  const careerDetails = {
    responsibilities: [
      'Design and develop user-facing features',
      'Collaborate with design and backend teams',
      'Optimize applications for maximum speed and scalability',
      'Ensure cross-browser compatibility',
      'Participate in code reviews and team meetings'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '2+ years of experience in web development',
      'Strong problem-solving skills',
      'Excellent communication abilities',
      'Ability to work in a fast-paced environment'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Flexible work arrangements',
      'Professional development budget',
      'Unlimited PTO policy'
    ],
    companies: [
      { name: 'Google', logo: '🔍', openings: 45 },
      { name: 'Microsoft', logo: '💻', openings: 32 },
      { name: 'Meta', logo: '📘', openings: 28 },
      { name: 'Amazon', logo: '📦', openings: 67 },
      { name: 'Apple', logo: '🍎', openings: 23 }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-3xl font-bold">{career.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  career.matchPercentage >= 85 ? 'bg-green-500' :
                  career.matchPercentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                } text-white`}>
                  {career.matchPercentage}% Match
                </span>
              </div>
              <p className="text-purple-100 text-lg mb-4">{career.description}</p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-300" />
                  <div>
                    <p className="text-sm text-purple-100">Salary Range</p>
                    <p className="font-semibold">{career.averageSalary}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-300" />
                  <div>
                    <p className="text-sm text-purple-100">Growth Rate</p>
                    <p className="font-semibold">{career.growthRate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-teal-300" />
                  <div>
                    <p className="text-sm text-purple-100">Industry</p>
                    <p className="font-semibold">{career.industry}</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skills Analysis */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Skills Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Skills You Have ({matchedSkills.length})
                    </h4>
                    <div className="space-y-2">
                      {matchedSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-slate-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Skills to Develop ({missingSkills.length})
                    </h4>
                    <div className="space-y-2">
                      {missingSkills.map((skill) => (
                        <div key={skill} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-slate-700">{skill}</span>
                          </div>
                          <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                            Learn
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Responsibilities */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Key Responsibilities</h3>
                <ul className="space-y-2">
                  {careerDetails.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span className="text-slate-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {careerDetails.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <span className="text-slate-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Benefits & Perks</h3>
                <ul className="space-y-2">
                  {careerDetails.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200">
                  Save Career
                </button>
                <button className="w-full border border-purple-600 text-purple-600 py-3 px-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200">
                  Compare Careers
                </button>
                <button className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Find Learning Path</span>
                </button>
              </div>

              {/* Top Companies */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-bold text-slate-800 mb-4">Top Hiring Companies</h4>
                <div className="space-y-3">
                  {careerDetails.companies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{company.logo}</span>
                        <span className="font-medium text-slate-700">{company.name}</span>
                      </div>
                      <span className="text-sm text-slate-600">{company.openings} jobs</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center justify-center space-x-1">
                  <span>View All Jobs</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Career Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                <h4 className="font-bold text-slate-800 mb-4">Career Outlook</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Job Satisfaction</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <span className="font-medium">4.2/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Work-Life Balance</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <span className="font-medium">3.8/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Remote Friendly</span>
                    <span className="font-medium text-green-600">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerModal;
