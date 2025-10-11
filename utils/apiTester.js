/**
 * API Testing Utility
 * Use this to test all implemented APIs and ensure they work correctly
 */

import {
  // Auth APIs
  loginUser,
  signupUser,
  refreshToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
  
  // Course APIs
  getAllCourses,
  getCourseById,
  createCourseStep1,
  
  // Enrollment APIs
  enrollInCourse,
  checkEnrollmentStatus,
  
  // Profile APIs
  useProfile,
  useUploadProfileImage,
  
  // Notification APIs
  useNotifications,
  useCreateNotification,
  
  // User APIs
  useAllUsers,
  useUpdateUser,
  
  // Virtual Labs
  useVirtualLabSessions,
  useCreateVirtualLabSession
} from '@/services';

class APITester {
  constructor(token) {
    this.token = token;
    this.testResults = {};
  }

  // Test Authentication APIs
  async testAuthAPIs() {
    console.log('🔐 Testing Authentication APIs...');
    
    try {
      // Test login (you'll need valid credentials)
      const loginResult = await loginUser({
        email: 'test@example.com',
        password: 'testpassword'
      });
      this.testResults.login = { success: true, data: loginResult };
      console.log('✅ Login API works');
    } catch (error) {
      this.testResults.login = { success: false, error: error.message };
      console.log('❌ Login API failed:', error.message);
    }
    
    try {
      // Test forgot password
      await forgotPassword('test@example.com');
      this.testResults.forgotPassword = { success: true };
      console.log('✅ Forgot Password API works');
    } catch (error) {
      this.testResults.forgotPassword = { success: false, error: error.message };
      console.log('❌ Forgot Password API failed:', error.message);
    }
  }

  // Test Course APIs
  async testCourseAPIs() {
    console.log('📚 Testing Course APIs...');
    
    try {
      // Test get all courses
      const coursesResult = await getAllCourses();
      this.testResults.getAllCourses = { success: true, count: coursesResult.data?.length || 0 };
      console.log(`✅ Get All Courses API works - Found ${coursesResult.data?.length || 0} courses`);
      
      // Test get specific course if courses exist
      if (coursesResult.data?.length > 0) {
        const courseId = coursesResult.data[0]._id;
        const courseResult = await getCourseById(courseId);
        this.testResults.getCourseById = { success: true, data: courseResult };
        console.log('✅ Get Course By ID API works');
      }
    } catch (error) {
      this.testResults.courseAPIs = { success: false, error: error.message };
      console.log('❌ Course APIs failed:', error.message);
    }
  }

  // Test Enrollment APIs
  async testEnrollmentAPIs() {
    console.log('📝 Testing Enrollment APIs...');
    
    if (!this.token) {
      console.log('⚠️ Skipping enrollment tests - no token provided');
      return;
    }
    
    try {
      // First get a course to test enrollment
      const coursesResult = await getAllCourses();
      if (coursesResult.data?.length > 0) {
        const courseId = coursesResult.data[0]._id;
        
        // Test check enrollment status
        const enrollmentStatus = await checkEnrollmentStatus(courseId, this.token);
        this.testResults.checkEnrollmentStatus = { success: true, isEnrolled: enrollmentStatus };
        console.log(`✅ Check Enrollment Status API works - Enrolled: ${enrollmentStatus}`);
        
        // Test enrollment (only if not already enrolled)
        if (!enrollmentStatus) {
          try {
            const enrollResult = await enrollInCourse(courseId, this.token);
            this.testResults.enrollInCourse = { success: true, data: enrollResult };
            console.log('✅ Enroll In Course API works');
          } catch (enrollError) {
            this.testResults.enrollInCourse = { success: false, error: enrollError.message };
            console.log('❌ Enroll In Course API failed:', enrollError.message);
          }
        }
      }
    } catch (error) {
      this.testResults.enrollmentAPIs = { success: false, error: error.message };
      console.log('❌ Enrollment APIs failed:', error.message);
    }
  }

  // Test React Query Hooks (requires React component context)
  testReactQueryHooks() {
    console.log('⚛️ Testing React Query Hooks...');
    console.log('Note: These hooks need to be tested within React components');
    
    const hooksToTest = [
      'useNotifications',
      'useAllUsers',
      'useProfile',
      'useVirtualLabSessions'
    ];
    
    hooksToTest.forEach(hookName => {
      console.log(`📋 Hook available: ${hookName}`);
    });
  }

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting API Tests...\n');
    
    await this.testAuthAPIs();
    console.log('\n');
    
    await this.testCourseAPIs();
    console.log('\n');
    
    await this.testEnrollmentAPIs();
    console.log('\n');
    
    this.testReactQueryHooks();
    console.log('\n');
    
    // Print summary
    this.printTestSummary();
  }

  // Print test results summary
  printTestSummary() {
    console.log('📊 Test Results Summary:');
    console.log('========================');
    
    let totalTests = 0;
    let passedTests = 0;
    
    Object.entries(this.testResults).forEach(([testName, result]) => {
      totalTests++;
      if (result.success) {
        passedTests++;
        console.log(`✅ ${testName}: PASSED`);
      } else {
        console.log(`❌ ${testName}: FAILED - ${result.error}`);
      }
    });
    
    console.log(`\n📈 Overall: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
      console.log('🎉 All tests passed! APIs are working correctly.');
    } else {
      console.log('⚠️ Some tests failed. Check the errors above.');
    }
  }

  // Test specific API endpoint
  async testSpecificAPI(apiName, ...args) {
    console.log(`🔍 Testing specific API: ${apiName}`);
    
    try {
      let result;
      switch (apiName) {
        case 'getAllCourses':
          result = await getAllCourses();
          break;
        case 'getCourseById':
          result = await getCourseById(args[0]);
          break;
        case 'enrollInCourse':
          result = await enrollInCourse(args[0], this.token);
          break;
        case 'checkEnrollmentStatus':
          result = await checkEnrollmentStatus(args[0], this.token);
          break;
        case 'forgotPassword':
          result = await forgotPassword(args[0]);
          break;
        default:
          throw new Error(`Unknown API: ${apiName}`);
      }
      
      console.log(`✅ ${apiName} succeeded:`, result);
      return { success: true, data: result };
    } catch (error) {
      console.log(`❌ ${apiName} failed:`, error.message);
      return { success: false, error: error.message };
    }
  }
}

// Export for use in components
export default APITester;

// Example usage:
export const runAPITests = async (token = null) => {
  const tester = new APITester(token);
  await tester.runAllTests();
  return tester.testResults;
};

// Test specific endpoints
export const testCourseEndpoints = async () => {
  const tester = new APITester();
  await tester.testCourseAPIs();
  return tester.testResults;
};

export const testAuthEndpoints = async () => {
  const tester = new APITester();
  await tester.testAuthAPIs();
  return tester.testResults;
};

// React component for testing hooks
export const HookTester = () => {
  const notifications = useNotifications();
  const users = useAllUsers();
  const virtualLabs = useVirtualLabSessions();
  
  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-4">React Query Hook Status</h3>
      
      <div className="space-y-2">
        <div className={`p-2 rounded ${notifications.isLoading ? 'bg-yellow-100' : notifications.isError ? 'bg-red-100' : 'bg-green-100'}`}>
          <strong>useNotifications:</strong> 
          {notifications.isLoading && ' Loading...'}
          {notifications.isError && ' Error!'}
          {notifications.data && ` Loaded ${notifications.data.data?.length || 0} notifications`}
        </div>
        
        <div className={`p-2 rounded ${users.isLoading ? 'bg-yellow-100' : users.isError ? 'bg-red-100' : 'bg-green-100'}`}>
          <strong>useAllUsers:</strong>
          {users.isLoading && ' Loading...'}
          {users.isError && ' Error!'}
          {users.data && ` Loaded ${users.data.data?.length || 0} users`}
        </div>
        
        <div className={`p-2 rounded ${virtualLabs.isLoading ? 'bg-yellow-100' : virtualLabs.isError ? 'bg-red-100' : 'bg-green-100'}`}>
          <strong>useVirtualLabSessions:</strong>
          {virtualLabs.isLoading && ' Loading...'}
          {virtualLabs.isError && ' Error!'}
          {virtualLabs.data && ` Loaded ${virtualLabs.data.data?.length || 0} lab sessions`}
        </div>
      </div>
    </div>
  );
};
