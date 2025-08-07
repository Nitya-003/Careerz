import React, { useState } from 'react';
import { Plus, Target, TrendingUp, BookOpen, Award, Settings, CheckCircle } from 'lucide-react';
import { SkillProgress } from '../App';

interface SkillTrackerProps {
  skillProgress: SkillProgress[];
  setSkillProgress: (skills: SkillProgress[]) => void;
  onShowResourceModal: (skill: string) => void;
}

const SkillTracker: React.FC<SkillTrackerProps> = ({ skillProgress, setSkillProgress, onShowResourceModal }) => {
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCurrent, setNewSkillCurrent] = useState(1);
  const [newSkillTarget, setNewSkillTarget] = useState(5);

  const addSkill = () => {
    if (newSkillName.trim()) {
      const newSkill: SkillProgress = {
        skill: newSkillName.trim(),
        currentLevel: newSkillCurrent,
        targetLevel: newSkillTarget,
        progress: (newSkillCurrent / newSkillTarget) * 100
      };
      setSkillProgress([...skillProgress, newSkill]);
      setNewSkillName('');
      setNewSkillCurrent(1);
      setNewSkillTarget(5);
      setShowAddSkill(false);
    }
  };

  const updateSkillProgress = (index: number, currentLevel: number) => {
    const updatedSkills = [...skillProgress];
    updatedSkills[index] = {
      ...updatedSkills[index],
      currentLevel,
      progress: (currentLevel / updatedSkills[index].targetLevel) * 100
    };
    setSkillProgress(updatedSkills);
  };

  const removeSkill = (index: number) => {
    setSkillProgress(skillProgress.filter((_, i) => i !== index));
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-emerald-600';
    if (progress >= 60) return 'from-blue-500 to-cyan-600';
    if (progress >= 40) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getProgressTextColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const overallProgress = skillProgress.reduce((acc, skill) => acc + skill.progress, 0) / skillProgress.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Skill Tracker</h1>
        <p className="text-teal-100 text-lg mb-6">
          Monitor your skill development journey and track progress toward your learning goals.
        </p>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6" />
            <div>
              <p className="text-sm text-teal-100">Overall Progress</p>
              <p className="text-2xl font-bold">{Math.round(overallProgress)}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6" />
            <div>
              <p className="text-sm text-teal-100">Active Skills</p>
              <p className="text-2xl font-bold">{skillProgress.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Skill Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">Skills Progress</h2>
          <button
            onClick={() => setShowAddSkill(!showAddSkill)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>

        {showAddSkill && (
          <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-medium text-slate-800 mb-3">Add New Skill</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Skill Name</label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g., React, Python, Design"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Level</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newSkillCurrent}
                  onChange={(e) => setNewSkillCurrent(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Level</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newSkillTarget}
                  onChange={(e) => setNewSkillTarget(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div className="flex items-end space-x-2">
                <button
                  onClick={addSkill}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddSkill(false)}
                  className="bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Skills List */}
        <div className="space-y-4">
          {skillProgress.map((skill, index) => (
            <div
              key={index}
              className="p-6 border border-slate-200 rounded-lg hover:border-teal-300 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{skill.skill}</h3>
                    <p className="text-sm text-slate-600">
                      Level {skill.currentLevel} of {skill.targetLevel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg font-bold ${getProgressTextColor(skill.progress)}`}>
                    {Math.round(skill.progress)}%
                  </span>
                  {skill.progress >= 100 && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(skill.progress)} transition-all duration-500`}
                    style={{ width: `${Math.min(skill.progress, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Update Current Level</label>
                    <div className="flex items-center space-x-2">
                      {[...Array(skill.targetLevel)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => updateSkillProgress(index, i + 1)}
                          className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 ${
                            i + 1 <= skill.currentLevel
                              ? 'bg-teal-600 text-white'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => onShowResourceModal(skill.skill)}
                    className="text-teal-600 hover:text-teal-700 px-3 py-1 text-sm font-medium"
                  >
                    Find Resources
                  </button>
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-600 hover:text-red-700 px-3 py-1 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {skillProgress.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No skills tracked yet</h3>
            <p className="text-slate-600">Add your first skill to start tracking your progress.</p>
          </div>
        )}
      </div>

      {/* Learning Resources */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Recommended Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-all duration-200">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Online Courses</h3>
            <p className="text-slate-600 text-sm">Find structured courses on platforms like Coursera, Udemy, and edX</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-all duration-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Practice Projects</h3>
            <p className="text-slate-600 text-sm">Build real-world projects to apply and strengthen your skills</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-all duration-200">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Certifications</h3>
            <p className="text-slate-600 text-sm">Earn industry-recognized certifications to validate your expertise</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTracker;
