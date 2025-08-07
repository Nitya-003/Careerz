import React from 'react';
import { X, BookOpen, Video, FileText, ExternalLink, Star, Clock, Users } from 'lucide-react';

interface ResourceModalProps {
  skill: string;
  onClose: () => void;
}

const ResourceModal: React.FC<ResourceModalProps> = ({ skill, onClose }) => {
  const resources = [
    {
      id: 1,
      title: `Complete ${skill} Bootcamp`,
      type: 'Course',
      provider: 'TechAcademy',
      duration: '12 weeks',
      rating: 4.8,
      students: '45,230',
      price: '$199',
      description: `Master ${skill} from beginner to advanced level with hands-on projects and real-world applications.`,
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: `${skill} Fundamentals`,
      type: 'Video Series',
      provider: 'CodeTube',
      duration: '8 hours',
      rating: 4.6,
      students: '23,450',
      price: 'Free',
      description: `Learn the core concepts of ${skill} through interactive video tutorials and coding exercises.`,
      icon: Video,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 3,
      title: `${skill} Best Practices Guide`,
      type: 'Documentation',
      provider: 'DevDocs',
      duration: '2 hours read',
      rating: 4.7,
      students: '12,890',
      price: 'Free',
      description: `Comprehensive guide covering industry best practices and advanced techniques in ${skill}.`,
      icon: FileText,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      title: `Advanced ${skill} Masterclass`,
      type: 'Workshop',
      provider: 'SkillForge',
      duration: '3 days',
      rating: 4.9,
      students: '8,750',
      price: '$299',
      description: `Intensive workshop focusing on advanced ${skill} concepts with expert mentorship and project work.`,
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Learning Resources for {skill}</h2>
              <p className="text-teal-100">Curated resources to help you master {skill}</p>
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <div
                  key={resource.id}
                  className="border border-slate-200 rounded-xl p-6 hover:border-teal-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      resource.price === 'Free' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {resource.price}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2">{resource.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{resource.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Provider:</span>
                      <span className="font-medium text-slate-800">{resource.provider}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Duration:</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-800">{resource.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Students:</span>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-800">{resource.students}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                        <span className="font-medium text-slate-800">{resource.rating}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <span>Access Resource</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Learning Path */}
          <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Recommended Learning Path</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-slate-700">Start with fundamentals and basic concepts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-slate-700">Practice with hands-on projects and exercises</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-slate-700">Take advanced courses and workshops</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <span className="text-slate-700">Build real-world projects and portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
