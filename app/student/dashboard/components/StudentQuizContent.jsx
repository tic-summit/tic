import { useAuth } from "@/contexts/AuthContexts";
import { useCourseQuizzes } from "@/app/api/student/useStudentCourses";
import { useState } from "react";
import { Diamond, Clock, Star, Award, PlayCircle, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const StudentQuizContent = () => {
  const { user } = useAuth();
  const { data: quizzesData, isLoading } = useCourseQuizzes(user?.id, user?.token);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [quizSearchTerm, setQuizSearchTerm] = useState('');

  const quizzes = quizzesData?.quizzes || [];

  // Filter quizzes based on search term
  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(quizSearchTerm.toLowerCase()) ||
    quiz.courseTitle?.toLowerCase().includes(quizSearchTerm.toLowerCase())
  );

  // Calculate quiz statistics
  const completedQuizzes = quizzes.filter(quiz => quiz.status === 'completed').length;
  const passedQuizzes = quizzes.filter(quiz => quiz.status === 'completed' && quiz.score >= 70).length;
  const averageScore = quizzes.filter(quiz => quiz.status === 'completed').reduce((sum, quiz) => sum + quiz.score, 0) / completedQuizzes || 0;

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setIsTakingQuiz(true);
  };

  const handleQuizComplete = (score, passed) => {
    console.log('Quiz completed:', { score, passed });
    setIsTakingQuiz(false);
    setSelectedQuiz(null);
    // Here you would typically update the quiz completion status via API
  };

  const handleQuizCancel = () => {
    setIsTakingQuiz(false);
    setSelectedQuiz(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Quizzes</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search quizzes..."
            value={quizSearchTerm}
            onChange={(e) => setQuizSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
          />
        </div>
      </div>

      {/* Quiz Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow border border-gray-300 p-4 text-center">
          <Diamond className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{quizzes.length}</div>
          <div className="text-sm text-gray-600">Total Quizzes</div>
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-300 p-4 text-center">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{completedQuizzes}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-300 p-4 text-center">
          <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Average Score</div>
        </div>
      </div>

      {/* Quiz List */}
      <div className="bg-white rounded-lg shadow border border-gray-300">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Quizzes</h3>
          
          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-8">
              <Diamond className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quizzes Found</h3>
              <p className="text-gray-600">
                {quizSearchTerm ? 'No quizzes match your search.' : 'You don\'t have any quizzes available yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuizzes.map((quiz) => (
                <div key={quiz._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900">{quiz.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          quiz.status === 'completed' 
                            ? quiz.score >= 70 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {quiz.status === 'completed' 
                            ? quiz.score >= 70 ? 'Passed' : 'Failed'
                            : 'Not Started'
                          }
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        Course: {quiz.courseTitle || 'Unknown Course'}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{quiz.duration || 30} minutes</span>
                        </div>
                        <div className="flex items-center">
                          <Diamond className="h-4 w-4 mr-1" />
                          <span>{quiz.questions?.length || 0} questions</span>
                        </div>
                        {quiz.status === 'completed' && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1" />
                            <span>Score: {quiz.score}%</span>
                          </div>
                        )}
                      </div>

                      {/* Progress for completed quizzes */}
                      {quiz.status === 'completed' && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Score</span>
                            <span className="text-sm text-gray-500">{quiz.score}%</span>
                          </div>
                          <Progress 
                            value={quiz.score} 
                            className={`h-2 ${quiz.score >= 70 ? 'bg-green-500' : 'bg-red-500'}`}
                          />
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      {quiz.status === 'completed' ? (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStartQuiz(quiz)}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Retake
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleStartQuiz(quiz)}
                          >
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleStartQuiz(quiz)}
                          disabled={isTakingQuiz}
                        >
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Quiz
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quiz Taking Modal/Component would go here */}
      {isTakingQuiz && selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Taking Quiz: {selectedQuiz.title}</h3>
              <Button variant="outline" onClick={handleQuizCancel}>
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
            <div className="text-center py-8">
              <Diamond className="h-16 w-16 text-brand mx-auto mb-4" />
              <p className="text-gray-600">Quiz taking interface would be implemented here.</p>
              <div className="mt-4 space-x-2">
                <Button onClick={() => handleQuizComplete(85, true)}>
                  Complete Quiz (Mock)
                </Button>
                <Button variant="outline" onClick={handleQuizCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
