import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Monitor, 
  Users, 
  Clock, 
  Code, 
  Database,
  Shield,
  Wifi,
  Plus,
  Settings,
  Eye,
  UserPlus,
  LogOut
} from 'lucide-react';
import { 
  useVirtualLabSessions,
  useCreateVirtualLabSession,
  useJoinVirtualLabSession,
  useLeaveVirtualLabSession,
  useDeleteVirtualLabSession,
  useVirtualLabTemplates
} from '@/services';
import { useAuth } from '@/contexts/AuthContexts';

const EnhancedVirtualLabsInterface = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('available');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [newSessionData, setNewSessionData] = useState({
    title: '',
    description: '',
    labType: 'programming',
    maxParticipants: 10,
    templateId: ''
  });

  // API hooks
  const { data: sessions, isLoading: sessionsLoading } = useVirtualLabSessions();
  const { data: templates } = useVirtualLabTemplates();
  const createSessionMutation = useCreateVirtualLabSession();
  const joinSessionMutation = useJoinVirtualLabSession();
  const leaveSessionMutation = useLeaveVirtualLabSession();
  const deleteSessionMutation = useDeleteVirtualLabSession();

  const handleCreateSession = async (e) => {
    e.preventDefault();
    try {
      await createSessionMutation.mutateAsync({
        sessionData: newSessionData,
        token
      });
      setShowCreateModal(false);
      setNewSessionData({
        title: '',
        description: '',
        labType: 'programming',
        maxParticipants: 10,
        templateId: ''
      });
      alert('Virtual lab session created successfully!');
    } catch (error) {
      alert('Failed to create session: ' + error.message);
    }
  };

  const handleJoinSession = async (sessionId) => {
    try {
      await joinSessionMutation.mutateAsync({ sessionId, token });
      alert('Successfully joined the lab session!');
    } catch (error) {
      alert('Failed to join session: ' + error.message);
    }
  };

  const handleLeaveSession = async (sessionId) => {
    try {
      await leaveSessionMutation.mutateAsync({ sessionId, token });
      alert('Successfully left the lab session!');
    } catch (error) {
      alert('Failed to leave session: ' + error.message);
    }
  };

  const getLabTypeIcon = (type) => {
    switch (type) {
      case 'programming':
        return <Code className="h-5 w-5" />;
      case 'database':
        return <Database className="h-5 w-5" />;
      case 'networking':
        return <Wifi className="h-5 w-5" />;
      case 'cybersecurity':
        return <Shield className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const SessionCard = ({ session, showActions = true }) => {
    const isParticipant = session.participants?.some(p => p._id === user?.id);
    const canJoin = session.participants?.length < session.maxParticipants;
    const isOwner = session.creator?._id === user?.id;

    return (
      <div className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getLabTypeIcon(session.labType)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                <p className="text-sm text-gray-600">{session.labType} Lab</p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(session.status)}`}>
              {session.status}
            </span>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-2">{session.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={16} />
              <span>{session.participants?.length || 0}/{session.maxParticipants} participants</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={16} />
              <span>{session.duration || 'No limit'}</span>
            </div>
          </div>

          {session.participants?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Participants:</p>
              <div className="flex -space-x-2">
                {session.participants.slice(0, 5).map((participant) => (
                  <div
                    key={participant._id}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                    title={participant.name}
                  >
                    {participant.name?.charAt(0).toUpperCase()}
                  </div>
                ))}
                {session.participants.length > 5 && (
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    +{session.participants.length - 5}
                  </div>
                )}
              </div>
            </div>
          )}

          {showActions && (
            <div className="flex gap-2">
              {session.status === 'active' && (
                <>
                  {isParticipant ? (
                    <div className="flex gap-2 flex-1">
                      <button
                        onClick={() => window.open(`/virtual-labs/${session._id}/join`, '_blank')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                      >
                        <Play size={16} />
                        Enter Lab
                      </button>
                      <button
                        onClick={() => handleLeaveSession(session._id)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Leave
                      </button>
                    </div>
                  ) : canJoin ? (
                    <button
                      onClick={() => handleJoinSession(session._id)}
                      disabled={joinSessionMutation.isPending}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <UserPlus size={16} />
                      {joinSessionMutation.isPending ? 'Joining...' : 'Join Session'}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                    >
                      Session Full
                    </button>
                  )}
                </>
              )}

              {session.status === 'scheduled' && (
                <button
                  onClick={() => handleJoinSession(session._id)}
                  disabled={!canJoin}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:text-gray-500"
                >
                  <UserPlus size={16} />
                  {canJoin ? 'Reserve Spot' : 'Full'}
                </button>
              )}

              <button
                onClick={() => window.open(`/virtual-labs/${session._id}`, '_blank')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Eye size={16} />
                Details
              </button>

              {isOwner && (
                <button
                  onClick={() => deleteSessionMutation.mutate({ sessionId: session._id, token })}
                  className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
                >
                  <Square size={16} />
                </button>
              )}
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
            Created by {session.creator?.name} • {new Date(session.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    );
  };

  if (sessionsLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const availableSessions = sessions?.data?.filter(s => s.status === 'active' || s.status === 'scheduled') || [];
  const mySessions = sessions?.data?.filter(s => 
    s.creator?._id === user?.id || s.participants?.some(p => p._id === user?.id)
  ) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Virtual Labs</h1>
          <p className="text-gray-600">Practice coding, networking, and cybersecurity in virtual environments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={16} />
          Create Lab Session
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{availableSessions.length}</p>
            </div>
            <Monitor className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">My Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{mySessions.length}</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Now</p>
              <p className="text-2xl font-bold text-gray-900">
                {sessions?.data?.filter(s => s.status === 'active').length || 0}
              </p>
            </div>
            <Play className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Templates</p>
              <p className="text-2xl font-bold text-gray-900">{templates?.data?.length || 0}</p>
            </div>
            <Settings className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'available', label: 'Available Sessions' },
              { id: 'my-sessions', label: 'My Sessions' },
              { id: 'templates', label: 'Templates' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Available Sessions Tab */}
          {activeTab === 'available' && (
            <div className="space-y-4">
              {availableSessions.length === 0 ? (
                <div className="text-center py-12">
                  <Monitor size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active sessions</h3>
                  <p className="text-gray-600 mb-4">Be the first to create a virtual lab session</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Session
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableSessions.map((session) => (
                    <SessionCard key={session._id} session={session} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* My Sessions Tab */}
          {activeTab === 'my-sessions' && (
            <div className="space-y-4">
              {mySessions.length === 0 ? (
                <div className="text-center py-12">
                  <Users size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions yet</h3>
                  <p className="text-gray-600 mb-4">Join or create your first virtual lab session</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mySessions.map((session) => (
                    <SessionCard key={session._id} session={session} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates?.data?.map((template) => (
                  <div key={template._id} className="bg-white p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          {getLabTypeIcon(template.labType)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.labType}</p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{template.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {template.software?.join(', ')}
                      </span>
                      <button
                        onClick={() => {
                          setNewSessionData(prev => ({ ...prev, templateId: template._id, labType: template.labType }));
                          setShowCreateModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Virtual Lab Session</h3>
            
            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newSessionData.title}
                  onChange={(e) => setNewSessionData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newSessionData.description}
                  onChange={(e) => setNewSessionData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lab Type</label>
                  <select
                    value={newSessionData.labType}
                    onChange={(e) => setNewSessionData(prev => ({ ...prev, labType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="programming">Programming</option>
                    <option value="database">Database</option>
                    <option value="networking">Networking</option>
                    <option value="cybersecurity">Cybersecurity</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                  <input
                    type="number"
                    value={newSessionData.maxParticipants}
                    onChange={(e) => setNewSessionData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                    max="50"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createSessionMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {createSessionMutation.isPending ? 'Creating...' : 'Create Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedVirtualLabsInterface;
