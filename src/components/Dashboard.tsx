import React from 'react';
import { TrendingUp, Target, Users, Award, ArrowRight } from 'lucide-react';
import { UserProfile, Career, SkillProgress } from '../App';

interface DashboardProps {
  userProfile: UserProfile;
  careers: Career[];
  skillProgress: SkillProgress[];
  onShowCareerModal: (career: Career) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, careers, skillProgress, onShowCareerModal }) => {
  const topCareerMatches = careers.slice(0, 3);
  const averageSkillProgress = skillProgress.reduce((acc, skill) => acc + skill.progress, 0) / skillProgress.length;

  const stats = [
    {
      title: 'Career Matches',
      value: careers.length,
      icon: Target,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Skill Progress',
      value: `${Math.round(averageSkillProgress)}%`,
      icon: TrendingUp,
      color: 'from-teal-500 to-green-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    },
    {
      title: 'Skills Tracked',
      value: skillProgress.length,
      icon: Award,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Learning Goals',
      value: '12',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back{userProfile.name ? `, ${userProfile.name}` : ''}!
        </h1>
        <p className="text-purple-100 text-lg mb-6">
          Ready to explore your career potential? Let's discover opportunities that match your unique skills and interests.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200">
            Update Profile
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200">
            Explore Careers
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
              </div>
              <p className="text-slate-600 font-medium">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Career Matches */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Top Career Matches</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {topCareerMatches.map((career) => (
              <div
                key={career.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-purple-300 transition-colors duration-200 cursor-pointer"
                onClick={() => onShowCareerModal(career)}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">{career.title}</h3>
                  <p className="text-slate-600 text-sm mb-2">{career.averageSalary}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                        style={{ width: `${career.matchPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {career.matchPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Progress Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Skill Progress</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {skillProgress.slice(0, 5).map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">{skill.skill}</span>
                  <span className="text-sm text-slate-600">
                    {skill.currentLevel}/{skill.targetLevel}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Set Learning Goals</h3>
            <p className="text-slate-600 text-sm">Define your skill development targets</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 text-left">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-teal-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Track Progress</h3>
            <p className="text-slate-600 text-sm">Monitor your skill development journey</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 text-left">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Find Resources</h3>
            <p className="text-slate-600 text-sm">Discover learning materials and courses</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
