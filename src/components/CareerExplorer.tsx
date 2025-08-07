import React, { useState } from 'react';
import { Search, Filter, TrendingUp, DollarSign, Users, ExternalLink, Heart, Star } from 'lucide-react';
import { Career, UserProfile } from '../App';

interface CareerExplorerProps {
  careers: Career[];
  userProfile: UserProfile;
  onShowCareerModal: (career: Career) => void;
}

const CareerExplorer: React.FC<CareerExplorerProps> = ({ careers, userProfile, onShowCareerModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [sortBy, setSortBy] = useState('match');
  const [savedCareers, setSavedCareers] = useState<string[]>([]);

  const industries = ['All', 'Technology', 'Healthcare', 'Finance', 'Design', 'Marketing', 'Education'];

  const filteredCareers = careers
    .filter(career => 
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(career => selectedIndustry === 'All' || career.industry === selectedIndustry)
    .sort((a, b) => {
      if (sortBy === 'match') return b.matchPercentage - a.matchPercentage;
      if (sortBy === 'salary') return parseInt(b.averageSalary.replace(/[^0-9]/g, '')) - parseInt(a.averageSalary.replace(/[^0-9]/g, ''));
      if (sortBy === 'growth') return parseFloat(b.growthRate) - parseFloat(a.growthRate);
      return 0;
    });

  const toggleSaved = (careerId: string) => {
    setSavedCareers(prev => 
      prev.includes(careerId) 
        ? prev.filter(id => id !== careerId)
        : [...prev, careerId]
    );
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchBg = (percentage: number) => {
    if (percentage >= 85) return 'from-green-500 to-emerald-600';
    if (percentage >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Career Explorer</h1>
        <p className="text-indigo-100 text-lg">
          Discover careers that match your skills and interests. Find your perfect career path with AI-powered recommendations.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="match">Sort by Match</option>
              <option value="salary">Sort by Salary</option>
              <option value="growth">Sort by Growth</option>
            </select>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-sm text-slate-600">
              {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      </div>

      {/* Career Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCareers.map((career) => (
          <div
            key={career.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 hover:border-purple-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{career.title}</h3>
                  <button
                    onClick={() => toggleSaved(career.id)}
                    className={`p-1 rounded-full transition-colors duration-200 ${
                      savedCareers.includes(career.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-slate-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={savedCareers.includes(career.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <p className="text-slate-600 mb-4">{career.description}</p>
                
                {/* Match Percentage */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Career Match</span>
                    <span className={`text-sm font-bold ${getMatchColor(career.matchPercentage)}`}>
                      {career.matchPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getMatchBg(career.matchPercentage)}`}
                      style={{ width: `${career.matchPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Career Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-slate-600 mb-1">Salary Range</p>
                    <p className="text-sm font-semibold text-slate-800">{career.averageSalary}</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-slate-600 mb-1">Growth Rate</p>
                    <p className="text-sm font-semibold text-slate-800">{career.growthRate}</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs text-slate-600 mb-1">Industry</p>
                    <p className="text-sm font-semibold text-slate-800">{career.industry}</p>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {career.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userProfile.skills.includes(skill)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {skill}
                        {userProfile.skills.includes(skill) && (
                          <Star className="w-3 h-3 ml-1 inline" fill="currentColor" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => onShowCareerModal(career)}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Learn More</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors duration-200">
                    Compare
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">No careers found</h3>
          <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default CareerExplorer;
