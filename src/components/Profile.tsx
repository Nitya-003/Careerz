import React, { useState } from 'react';
import { Plus, X, Save, User, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { UserProfile } from '../App';

interface ProfileProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ userProfile, setUserProfile }) => {
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !userProfile.skills.includes(newSkill.trim())) {
      setUserProfile({
        ...userProfile,
        skills: [...userProfile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setUserProfile({
      ...userProfile,
      skills: userProfile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addInterest = () => {
    if (newInterest.trim() && !userProfile.interests.includes(newInterest.trim())) {
      setUserProfile({
        ...userProfile,
        interests: [...userProfile.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setUserProfile({
      ...userProfile,
      interests: userProfile.interests.filter(interest => interest !== interestToRemove)
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    alert('Profile saved successfully!');
  };

  const popularSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker',
    'Machine Learning', 'Data Analysis', 'UI/UX Design', 'Project Management'
  ];

  const popularInterests = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Design',
    'Artificial Intelligence', 'Cybersecurity', 'Entrepreneurship', 'Sustainability'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Your Profile</h1>
              <p className="text-slate-600">Manage your career profile and preferences</p>
            </div>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Profile' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-slate-50 disabled:text-slate-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Experience Level</label>
            <select
              value={userProfile.experience}
              onChange={(e) => setUserProfile({ ...userProfile, experience: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-slate-50 disabled:text-slate-500"
            >
              <option value="">Select experience level</option>
              <option value="Entry Level">Entry Level (0-2 years)</option>
              <option value="Mid Level">Mid Level (2-5 years)</option>
              <option value="Senior Level">Senior Level (5-10 years)</option>
              <option value="Executive">Executive (10+ years)</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Education</label>
          <input
            type="text"
            value={userProfile.education}
            onChange={(e) => setUserProfile({ ...userProfile, education: e.target.value })}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-slate-50 disabled:text-slate-500"
            placeholder="e.g., Bachelor's in Computer Science"
          />
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Skills</h2>
        </div>

        {isEditing && (
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <button
                onClick={addSkill}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-3">Popular skills:</p>
              <div className="flex flex-wrap gap-2">
                {popularSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      if (!userProfile.skills.includes(skill)) {
                        setUserProfile({
                          ...userProfile,
                          skills: [...userProfile.skills, skill]
                        });
                      }
                    }}
                    className="px-3 py-1 text-sm border border-slate-300 rounded-full hover:border-teal-400 hover:bg-teal-50 transition-colors duration-200"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {userProfile.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:text-teal-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </span>
          ))}
          {userProfile.skills.length === 0 && (
            <p className="text-slate-500">No skills added yet. Add some skills to get personalized career recommendations.</p>
          )}
        </div>
      </div>

      {/* Interests Section */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Interests</h2>
        </div>

        {isEditing && (
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add a new interest"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && addInterest()}
              />
              <button
                onClick={addInterest}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-3">Popular interests:</p>
              <div className="flex flex-wrap gap-2">
                {popularInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => {
                      if (!userProfile.interests.includes(interest)) {
                        setUserProfile({
                          ...userProfile,
                          interests: [...userProfile.interests, interest]
                        });
                      }
                    }}
                    className="px-3 py-1 text-sm border border-slate-300 rounded-full hover:border-orange-400 hover:bg-orange-50 transition-colors duration-200"
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {userProfile.interests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
            >
              {interest}
              {isEditing && (
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-2 hover:text-orange-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </span>
          ))}
          {userProfile.interests.length === 0 && (
            <p className="text-slate-500">No interests added yet. Add some interests to discover relevant career paths.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
