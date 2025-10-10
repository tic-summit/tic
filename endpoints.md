{
  "apiDocumentation": {
    "title": "Learning Management System API",
    "version": "1.0.0",
    "description": "Complete API documentation for LMS with courses, internships, and user management",
    "baseUrl": "/api",
    "authentication": {
      "type": "Bearer Token (JWT)",
      "headerName": "Authorization",
      "format": "Bearer <token>"
    },
    "endpoints": {
      "authentication": {
        "groupName": "Authentication",
        "description": "User authentication and authorization endpoints",
        "routes": [
          {
            "method": "POST",
            "path": "/auth/signup",
            "summary": "Register a new user",
            "authentication": false,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "fullName": {"type": "string", "required": true},
                "email": {"type": "string", "required": true, "example": "romarickndze@gmail.com"},
                "password": {"type": "string", "required": true, "example": "1997Roma"},
                "userType": {"type": "string", "required": true, "enum": ["student", "instructor", "employer", "admin", "mentor"]},
                "phoneNumber": {"type": "string", "example": "+237 123 456 789"},
                "country": {
                  "type": "object",
                  "required": true,
                  "properties": {
                    "name": {"type": "string", "example": "Cameroon"},
                    "code": {"type": "string", "example": "237"}
                  }
                }
              }
            },
            "responses": {
              "201": "User created successfully",
              "400": "Validation error",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/auth/login",
            "summary": "Login a user",
            "authentication": false,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "email": {"type": "string", "required": true, "example": "ndze@example.com"},
                "password": {"type": "string", "required": true, "example": "1997Roma"}
              }
            },
            "responses": {
              "200": "Logged in successfully",
              "401": "Invalid credentials",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/auth/refresh-token",
            "summary": "Refresh access token",
            "authentication": false,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "refreshToken": {"type": "string", "required": true}
              }
            },
            "responses": {
              "200": "New access token generated",
              "401": "Invalid or expired refresh token",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/auth/logout",
            "summary": "Log out user and invalidate refresh token",
            "authentication": false,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "refreshToken": {"type": "string", "required": true}
              }
            },
            "responses": {
              "200": "Logout successful",
              "400": "Refresh token is required",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/applications/internship/{internshipId}",
            "summary": "Get applications for a specific internship",
            "authentication": true,
            "roles": ["admin", "mentor"],
            "pathParameters": {
              "internshipId": {"type": "string", "required": true}
            },
            "queryParameters": {
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 10},
              "status": {"type": "string"},
              "sortBy": {"type": "string", "default": "appliedAt"},
              "sortOrder": {"type": "string", "default": "desc"}
            },
            "responses": {
              "200": "List of applications for the internship",
              "404": "Internship not found",
              "500": "Server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/applications/{id}",
            "summary": "Delete an application",
            "authentication": true,
            "roles": ["student", "admin"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Application deleted successfully",
              "403": "Not authorized to delete this application",
              "404": "Application not found",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/applications/stats",
            "summary": "Get application statistics",
            "authentication": true,
            "roles": ["admin", "mentor"],
            "queryParameters": {
              "internshipId": {"type": "string", "description": "Optional - filter by internship"}
            },
            "responses": {
              "200": "Application statistics",
              "403": "Not authorized",
              "500": "Server error"
            }
          }
        ]
      },
      "internshipEnrollments": {
        "groupName": "Internship Enrollments",
        "description": "Internship enrollment management",
        "routes": [
          {
            "method": "GET",
            "path": "/intern-enrollments/student/{studentId}",
            "summary": "Get all enrollments for a specific student",
            "authentication": true,
            "roles": ["student", "admin", "mentor"],
            "pathParameters": {
              "studentId": {"type": "string", "required": true}
            },
            "queryParameters": {
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 10},
              "status": {"type": "string", "enum": ["active", "completed", "terminated", "on-hold", "suspended"]}
            },
            "responses": {
              "200": "List of student enrollments",
              "403": "Not authorized to access these enrollments",
              "404": "Student not found"
            }
          },
          {
            "method": "GET",
            "path": "/intern-enrollments/{id}",
            "summary": "Get a specific enrollment",
            "authentication": true,
            "roles": ["student", "admin", "mentor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Enrollment details",
              "403": "Not authorized to access this enrollment",
              "404": "Enrollment not found"
            }
          },
          {
            "method": "PUT",
            "path": "/intern-enrollments/{id}/status",
            "summary": "Update enrollment status",
            "authentication": true,
            "roles": ["admin", "mentor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "status": {"type": "string", "required": true, "enum": ["active", "completed", "terminated", "on-hold", "suspended"]},
                "completionReason": {"type": "string", "enum": ["successful", "early-termination", "mutual-agreement", "performance-issues", "other"]},
                "finalGrade": {"type": "string", "enum": ["excellent", "very-good", "good", "average", "belowaverage", "negative"]}
              }
            },
            "responses": {
              "200": "Enrollment status updated successfully",
              "400": "Invalid input data",
              "403": "Not authorized to update this enrollment",
              "404": "Enrollment not found"
            }
          },
          {
            "method": "PATCH",
            "path": "/intern-enrollments/{id}/assign-mentor",
            "summary": "Assign mentor to enrollment",
            "authentication": true,
            "roles": ["admin"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "mentorId": {"type": "string", "required": true}
              }
            },
            "responses": {
              "200": "Mentor assigned successfully",
              "400": "Invalid input data",
              "403": "Not authorized to assign mentors",
              "404": "Enrollment or mentor not found"
            }
          },
          {
            "method": "GET",
            "path": "/enrollments/stats",
            "summary": "Get enrollment statistics",
            "authentication": true,
            "roles": ["admin", "mentor"],
            "queryParameters": {
              "internshipId": {"type": "string", "description": "Optional - filter by internship"}
            },
            "responses": {
              "200": "Enrollment statistics",
              "403": "Not authorized to view statistics"
            }
          },
          {
            "method": "GET",
            "path": "/intern-enrollments/internship/{internshipId}",
            "summary": "Get all enrollments for a specific internship",
            "authentication": true,
            "roles": ["admin", "mentor"],
            "pathParameters": {
              "internshipId": {"type": "string", "required": true}
            },
            "queryParameters": {
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 10},
              "status": {"type": "string"}
            },
            "responses": {
              "200": "List of internship enrollments",
              "403": "Not authorized to access these enrollments",
              "404": "Internship not found"
            }
          }
        ]
      },
      "dailyActivities": {
        "groupName": "Daily Activities",
        "description": "Student daily activity tracking for internships",
        "routes": [
          {
            "method": "POST",
            "path": "/daily-activities",
            "summary": "Create a new daily activity",
            "authentication": true,
            "roles": ["student"],
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "enrollmentId": {"type": "string", "required": true},
                "studentId": {"type": "string", "required": true},
                "internshipId": {"type": "string", "required": true},
                "date": {"type": "date", "required": true}
              }
            },
            "responses": {
              "201": "Daily activity created successfully",
              "400": "Missing required fields or invalid input",
              "403": "Not authorized to create activity for another student",
              "404": "Enrollment not found or not active",
              "409": "Daily activity already exists for this date"
            }
          },
          {
            "method": "PUT",
            "path": "/daily-activities/{id}/check-in",
            "summary": "Record check-in time for a daily activity",
            "authentication": true,
            "roles": ["student"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "checkInTime": {"type": "string", "required": true, "example": "09:00"}
              }
            },
            "responses": {
              "200": "Check-in recorded successfully",
              "400": "Invalid check-in time or already checked in",
              "403": "Not authorized",
              "404": "Daily activity not found"
            }
          },
          {
            "method": "PUT",
            "path": "/daily-activities/{id}/check-out",
            "summary": "Record check-out time for a daily activity",
            "authentication": true,
            "roles": ["student"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "checkOutTime": {"type": "string", "required": true, "example": "17:00"}
              }
            },
            "responses": {
              "200": "Check-out recorded successfully",
              "400": "Invalid check-out time or no check-in",
              "403": "Not authorized",
              "404": "Daily activity not found"
            }
          },
          {
            "method": "PUT",
            "path": "/daily-activities/{id}",
            "summary": "Update a daily activity",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "whatYouDid": {"type": "array", "items": {"type": "string"}},
                "challengesFaced": {"type": "array", "items": {"type": "string"}},
                "solutionsFound": {"type": "array", "items": {"type": "string"}}
              }
            },
            "responses": {
              "200": "Daily activity updated successfully",
              "400": "Invalid input or cannot update submitted activity",
              "403": "Not authorized",
              "404": "Daily activity not found"
            }
          },
          {
            "method": "PUT",
            "path": "/daily-activities/{id}/submit",
            "summary": "Submit a daily activity",
            "authentication": true,
            "roles": ["student"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Daily activity submitted successfully",
              "400": "Missing required fields or already submitted",
              "403": "Not authorized",
              "404": "Daily activity or enrollment not found"
            }
          },
          {
            "method": "GET",
            "path": "/daily-activities/enrollment/{enrollmentId}",
            "summary": "Get daily activities for an enrollment",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor"],
            "pathParameters": {
              "enrollmentId": {"type": "string", "required": true}
            },
            "queryParameters": {
              "status": {"type": "string"},
              "startDate": {"type": "date"},
              "endDate": {"type": "date"},
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 10}
            },
            "responses": {
              "200": "Daily activities retrieved successfully",
              "403": "Not authorized",
              "404": "Enrollment not found"
            }
          },
          {
            "method": "GET",
            "path": "/daily-activities/{id}",
            "summary": "Get a specific daily activity",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Daily activity retrieved successfully",
              "403": "Not authorized",
              "404": "Daily activity not found"
            }
          },
          {
            "method": "DELETE",
            "path": "/daily-activities/{id}",
            "summary": "Delete a daily activity",
            "authentication": true,
            "roles": ["student"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Daily activity deleted successfully",
              "400": "Only draft activities can be deleted",
              "403": "Not authorized",
              "404": "Daily activity not found"
            }
          },
          {
            "method": "GET",
            "path": "/daily-activities/enrollment/{enrollmentId}/statistics",
            "summary": "Get statistics for an enrollment",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor"],
            "pathParameters": {
              "enrollmentId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Statistics retrieved successfully",
              "403": "Not authorized",
              "404": "Enrollment not found"
            }
          },
          {
            "method": "POST",
            "path": "/daily-activities/{id}/feedback",
            "summary": "Add mentor feedback to a daily activity",
            "authentication": true,
            "roles": ["admin", "supervisor", "mentor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "rating": {"type": "number", "minimum": 1, "maximum": 5},
                "technicalRating": {"type": "number", "minimum": 1, "maximum": 5},
                "effortRating": {"type": "number", "minimum": 1, "maximum": 5},
                "comments": {"type": "string", "required": true},
                "suggestions": {"type": "string"},
                "status": {"type": "string", "required": true, "enum": ["reviewed", "approved", "needs-revision"]}
              }
            },
            "responses": {
              "200": "Feedback added successfully",
              "400": "Invalid input or activity not submitted",
              "403": "Not authorized",
              "404": "Daily activity or enrollment not found",
              "500": "Server error"
            }
          }
        ]
      },
      "attendance": {
        "groupName": "Attendance",
        "description": "Attendance record management for internships",
        "routes": [
          {
            "method": "POST",
            "path": "/attendance/sync/{enrollmentId}",
            "summary": "Sync attendance records from daily activities",
            "authentication": true,
            "roles": ["student", "supervisor", "admin"],
            "pathParameters": {
              "enrollmentId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Attendance sync completed successfully",
              "403": "Unauthorized or not authorized to sync attendance",
              "404": "Enrollment not found or not active",
              "500": "Server error"
            }
          },
          {
            "method": "PUT",
            "path": "/attendance/{id}",
            "summary": "Update an attendance record",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor", "admin"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "status": {"type": "string", "enum": ["present", "absent", "late"]},
                "reason": {"type": "string"},
                "isExcused": {"type": "boolean", "description": "Non-student only"},
                "notes": {"type": "string", "description": "Non-student only"},
                "proofDocument": {"type": "string"}
              }
            },
            "responses": {
              "200": "Attendance record updated successfully",
              "400": "Validation error or unauthorized field update",
              "403": "Unauthorized or user not found",
              "404": "Attendance record not found",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/attendance/{id}",
            "summary": "Get a single attendance record",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor", "admin"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Attendance record retrieved successfully",
              "403": "Unauthorized or user not found",
              "404": "Attendance record not found",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/attendance/enrollment/{enrollmentId}",
            "summary": "Get attendance records for an enrollment",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor", "admin"],
            "pathParameters": {
              "enrollmentId": {"type": "string", "required": true}
            },
            "queryParameters": {
              "status": {"type": "string"},
              "startDate": {"type": "date"},
              "endDate": {"type": "date"},
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 30}
            },
            "responses": {
              "200": "Attendance records retrieved successfully",
              "403": "Unauthorized or user not found",
              "404": "Enrollment not found",
              "500": "Server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/attendance/{id}",
            "summary": "Delete an attendance record",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor", "admin"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Attendance record deleted successfully",
              "400": "Students cannot delete modified or non-auto-generated records",
              "403": "Unauthorized or user not found",
              "404": "Attendance record not found",
              "500": "Server error"
            }
          }
        ]
      },
      "progressReports": {
        "groupName": "Progress Reports",
        "description": "Internship progress report management",
        "routes": [
          {
            "method": "POST",
            "path": "/progress-reports",
            "summary": "Create a new progress report",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor", "admin"],
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "enrollmentId": {"type": "string", "required": true},
                "reportType": {"type": "string", "required": true, "enum": ["weekly", "monthly", "milestone", "final"]},
                "startDate": {"type": "date", "required": true},
                "endDate": {"type": "date", "required": true},
                "isAutoGenerated": {"type": "boolean", "default": false}
              }
            },
            "responses": {
              "201": "Progress report created successfully",
              "400": "Invalid input or report period outside internship duration",
              "403": "Unauthorized or user not found",
              "404": "Enrollment not found",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/progress-reports/sync/{enrollmentId}",
            "summary": "Sync progress reports for an enrollment",
            "authentication": true,
            "roles": ["admin", "supervisor"],
            "pathParameters": {
              "enrollmentId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Progress report sync completed",
              "403": "Unauthorized",
              "404": "Enrollment not found",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/progress-reports/{id}",
            "summary": "Get a single progress report",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor", "admin"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Progress report retrieved successfully",
              "403": "Unauthorized or user not found",
              "404": "Progress report not found",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/progress-reports/enrollment/{enrollmentId}",
            "summary": "Get progress reports by enrollment",
            "authentication": true,
            "roles": ["student", "mentor", "supervisor", "admin"],
            "pathParameters": {
              "enrollmentId": {"type": "string", "required": true}
            },
            "queryParameters": {
              "reportType": {"type": "string", "enum": ["weekly", "monthly", "milestone", "final"]},
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 10}
            },
            "responses": {
              "200": "Progress reports retrieved successfully",
              "403": "Unauthorized or user not found",
              "404": "Enrollment not found",
              "500": "Server error"
            }
          }
        ]
      },
      "modules": {
        "groupName": "Modules",
        "description": "Course module management with topics, quizzes and summaries",
        "routes": [
          {
            "method": "POST",
            "path": "/modules/{courseId}/modules",
            "summary": "Create a new module with topics",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "title": {"type": "string", "required": true},
                "topics": {"type": "array", "items": {"type": "object"}}
              }
            },
            "responses": {
              "201": "Module and associated quizzes created successfully",
              "400": "Validation error",
              "403": "Unauthorized",
              "404": "Course not found",
              "500": "Internal server error"
            }
          },
          {
            "method": "GET",
            "path": "/modules/course/{courseId}",
            "summary": "Get all modules for a specific course",
            "authentication": false,
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Modules list",
              "404": "Course or modules not found",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/modules/{id}",
            "summary": "Get module by ID with populated topics",
            "authentication": false,
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Module data",
              "404": "Module not found",
              "500": "Server error"
            }
          },
          {
            "method": "PUT",
            "path": "/modules/{id}",
            "summary": "Update a module (title and topics)",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "title": {"type": "string"},
                "topics": {"type": "array"}
              }
            },
            "responses": {
              "200": "Module updated",
              "404": "Module not found",
              "500": "Internal server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/modules/{id}",
            "summary": "Delete a module and its topics",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Module deleted",
              "403": "Unauthorized",
              "404": "Module not found",
              "500": "Internal server error"
            }
          },
          {
            "method": "PATCH",
            "path": "/modules/{id}/topics/order",
            "summary": "Update topics order within a module",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "topicOrders": {"type": "object", "description": "Map of topicId to order number"}
              }
            },
            "responses": {
              "200": "Topic order updated",
              "400": "Invalid request",
              "403": "Unauthorized",
              "500": "Internal server error"
            }
          },
          {
            "method": "POST",
            "path": "/modules/{id}/topics",
            "summary": "Add a new topic to a module",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "multipart/form-data",
              "schema": {
                "title": {"type": "string", "required": true},
                "type": {"type": "string", "required": true, "enum": ["video", "pdf", "text", "quiz"]},
                "description": {"type": "string"},
                "videoFile": {"type": "file"},
                "pdfFile": {"type": "file"}
              }
            },
            "responses": {
              "201": "Topic added successfully",
              "400": "Invalid topic data",
              "403": "Unauthorized",
              "500": "Internal server error"
            }
          },
          {
            "method": "PUT",
            "path": "/modules/{moduleId}/topics/{topicId}",
            "summary": "Update a topic",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "moduleId": {"type": "string", "required": true},
              "topicId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "multipart/form-data"
            },
            "responses": {
              "200": "Topic updated",
              "400": "Invalid topic data",
              "403": "Unauthorized",
              "500": "Internal server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/modules/{moduleId}/topics/{topicId}",
            "summary": "Delete a topic",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "moduleId": {"type": "string", "required": true},
              "topicId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Topic deleted",
              "403": "Unauthorized",
              "404": "Topic not found",
              "500": "Internal server error"
            }
          },
          {
            "method": "POST",
            "path": "/modules/{moduleId}/quizzes",
            "summary": "Add a full quiz to a module",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "moduleId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "title": {"type": "string", "required": true},
                "questions": {"type": "array", "required": true}
              }
            },
            "responses": {
              "201": "Quiz added successfully",
              "400": "Validation error",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/modules/{moduleId}/quizzes",
            "summary": "Get all quizzes in a module",
            "authentication": false,
            "pathParameters": {
              "moduleId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "List of quizzes in the module",
              "404": "Module not found",
              "500": "Server error"
            }
          },
          {
            "method": "PUT",
            "path": "/modules/{moduleId}/quizzes/{quizId}",
            "summary": "Update a quiz in a module",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "moduleId": {"type": "string", "required": true},
              "quizId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "title": {"type": "string"},
                "questions": {"type": "array"}
              }
            },
            "responses": {
              "200": "Quiz updated successfully",
              "400": "Validation error",
              "404": "Quiz not found",
              "500": "Internal server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/modules/{moduleId}/quizzes/{quizId}",
            "summary": "Delete a quiz from a module",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "moduleId": {"type": "string", "required": true},
              "quizId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Quiz deleted successfully",
              "404": "Module or Quiz not found",
              "500": "Internal server error"
            }
          },
          {
            "method": "POST",
            "path": "/modules/{moduleId}/summaries",
            "summary": "Add a summary to a module",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "moduleId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "title": {"type": "string", "required": true},
                "content": {"type": "string", "required": true}
              }
            },
            "responses": {
              "201": "Summary added successfully",
              "400": "Validation error",
              "500": "Internal server error"
            }
          },
          {
            "method": "GET",
            "path": "/modules/{moduleId}/summaries",
            "summary": "Get all summaries in a module",
            "authentication": false,
            "pathParameters": {
              "moduleId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "List of summaries in the module",
              "404": "Module not found",
              "500": "Server error"
            }
          },
          {
            "method": "PUT",
            "path": "/modules/{moduleId}/summaries/{summaryId}",
            "summary": "Update a summary in a module",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "moduleId": {"type": "string", "required": true},
              "summaryId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "title": {"type": "string"},
                "content": {"type": "string"}
              }
            },
            "responses": {
              "200": "Summary updated successfully",
              "400": "Validation error",
              "404": "Summary not found",
              "500": "Internal server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/modules/{moduleId}/summaries/{summaryId}",
            "summary": "Delete a summary from a module",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "moduleId": {"type": "string", "required": true},
              "summaryId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Summary deleted successfully",
              "404": "Summary not found",
              "500": "Internal server error"
            }
          }
        ]
      },
      "notifications": {
        "groupName": "Notifications",
        "description": "User notification management",
        "routes": [
          {
            "method": "GET",
            "path": "/notifications",
            "summary": "Get user notifications",
            "authentication": true,
            "queryParameters": {
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 20},
              "type": {"type": "string", "enum": ["email", "push", "in-app"]},
              "status": {"type": "string", "enum": ["pending", "sent", "failed", "read", "unread"]},
              "category": {"type": "string", "enum": ["course", "internship", "system", "security", "announcement"]}
            },
            "responses": {
              "200": "List of notifications",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/notifications/unread-count",
            "summary": "Get unread notification count",
            "authentication": true,
            "responses": {
              "200": "Unread notification count",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/notifications/stats",
            "summary": "Get notification statistics",
            "authentication": true,
            "queryParameters": {
              "days": {"type": "integer", "default": 30}
            },
            "responses": {
              "200": "Notification statistics",
              "500": "Server error"
            }
          },
          {
            "method": "PATCH",
            "path": "/notifications/{id}/read",
            "summary": "Mark a notification as read",
            "authentication": true,
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Notification marked as read",
              "404": "Notification not found",
              "500": "Server error"
            }
          },
          {
            "method": "PATCH",
            "path": "/notifications/read-all",
            "summary": "Mark all notifications as read",
            "authentication": true,
            "responses": {
              "200": "All notifications marked as read",
              "500": "Server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/notifications/{id}",
            "summary": "Delete a notification",
            "authentication": true,
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Notification deleted successfully",
              "404": "Notification not found",
              "500": "Server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/notifications",
            "summary": "Clear all notifications",
            "authentication": true,
            "responses": {
              "200": "All notifications cleared",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/notifications/test",
            "summary": "Send a test notification",
            "authentication": true,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "type": {"type": "string", "required": true, "enum": ["email", "push"]},
                "category": {"type": "string", "enum": ["course", "internship", "system", "security", "announcement"]}
              }
            },
            "responses": {
              "200": "Test notification sent successfully",
              "400": "Invalid notification type",
              "404": "User not found",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/notifications/preferences",
            "summary": "Get notification preferences",
            "authentication": true,
            "responses": {
              "200": "User notification preferences",
              "404": "User not found",
              "500": "Server error"
            }
          },
          {
            "method": "PUT",
            "path": "/notifications/preferences",
            "summary": "Update notification preferences",
            "authentication": true,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "notificationPreferences": {"type": "object"},
                "quietHours": {"type": "object"},
                "emailFrequency": {"type": "string", "enum": ["immediately", "daily", "weekly"]}
              }
            },
            "responses": {
              "200": "Preferences updated successfully",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/notifications/push-tokens",
            "summary": "Register push notification token",
            "authentication": true,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "token": {"type": "string", "required": true},
                "platform": {"type": "string", "enum": ["web", "ios", "android"], "default": "web"}
              }
            },
            "responses": {
              "200": "Push token registered successfully",
              "404": "User not found",
              "500": "Server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/notifications/push-tokens",
            "summary": "Unregister push notification token",
            "authentication": true,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "token": {"type": "string", "required": true}
              }
            },
            "responses": {
              "200": "Push token unregistered successfully",
              "404": "User not found",
              "500": "Server error"
            }
          }
        ]
      },
      "profile": {
        "groupName": "Profile",
        "description": "User profile management endpoints",
        "routes": [
          {
            "method": "POST",
            "path": "/profile",
            "summary": "Create a new user profile",
            "authentication": true,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "profileImage": {"type": "object"},
                "headline": {"type": "string", "maxLength": 120},
                "bio": {"type": "string", "maxLength": 500},
                "dateOfBirth": {"type": "date"},
                "gender": {"type": "string", "enum": ["Male", "Female", "Other", "Prefer not to say"]},
                "website": {"type": "string"},
                "socialLinks": {"type": "object"},
                "education": {"type": "array"},
                "experience": {"type": "array"},
                "skills": {"type": "array"},
                "certifications": {"type": "array"},
                "notificationPreferences": {"type": "object"}
              }
            },
            "responses": {
              "201": "Profile created successfully",
              "400": "Bad request (profile already exists or invalid data)",
              "401": "Unauthorized",
              "403": "Forbidden"
            }
          },
          {
            "method": "GET",
            "path": "/profile/{userId}",
            "summary": "Get user profile",
            "authentication": true,
            "pathParameters": {
              "userId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Successful profile retrieval",
              "401": "Unauthorized",
              "403": "Forbidden",
              "404": "Profile not found"
            }
          },
          {
            "method": "PATCH",
            "path": "/profile/{userId}",
            "summary": "Update profile information",
            "authentication": true,
            "pathParameters": {
              "userId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "headline": {"type": "string"},
                "bio": {"type": "string"},
                "socialLinks": {"type": "object"},
                "education": {"type": "array"},
                "experience": {"type": "array"},
                "skills": {"type": "array"}
              }
            },
            "responses": {
              "200": "Profile updated successfully",
              "400": "Invalid input data",
              "401": "Unauthorized",
              "403": "Forbidden",
              "404": "Profile not found"
            }
          },
          {
            "method": "PATCH",
            "path": "/profiles/{userId}/image",
            "summary": "Upload profile image",
            "authentication": true,
            "pathParameters": {
              "userId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "multipart/form-data",
              "schema": {
                "image": {"type": "file", "required": true, "description": "JPEG/PNG, max 5MB"}
              }
            },
            "responses": {
              "200": "Image uploaded successfully",
              "400": "Invalid file or no file provided",
              "403": "Not authorized",
              "413": "File too large (>5MB)",
              "500": "Server error"
            }
          }
        ]
      },
      "ratings": {
        "groupName": "Ratings",
        "description": "Course rating and review management",
        "routes": [
          {
            "method": "POST",
            "path": "/ratings/{courseId}/ratings",
            "summary": "Add a rating to a course",
            "authentication": true,
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "rating": {"type": "integer", "required": true, "minimum": 1, "maximum": 5},
                "review": {"type": "string", "maxLength": 500}
              }
            },
            "responses": {
              "201": "Rating successfully added",
              "400": "Bad request (already rated, invalid rating value, etc.)",
              "401": "Unauthorized",
              "404": "Course not found",
              "500": "Internal server error"
            }
          },
          {
            "method": "GET",
            "path": "/ratings/{courseId}/ratings",
            "summary": "Get all ratings for a course",
            "authentication": false,
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "queryParameters": {
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 10},
              "sort": {"type": "string", "enum": ["newest", "highest", "lowest"], "default": "newest"}
            },
            "responses": {
              "200": "List of course ratings",
              "404": "Course not found",
              "500": "Internal server error"
            }
          }
        ]
      },
      "users": {
        "groupName": "Users",
        "description": "User management endpoints",
        "routes": [
          {
            "method": "GET",
            "path": "/users/students",
            "summary": "Get all students (for instructors to enroll)",
            "authentication": true,
            "roles": ["instructor"],
            "responses": {
              "200": "List of students",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/users",
            "summary": "Get all users (Admin only)",
            "authentication": true,
            "roles": ["admin"],
            "responses": {
              "200": "List of all users",
              "403": "Admin access required",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/users",
            "summary": "Create new user (Admin only)",
            "authentication": true,
            "roles": ["admin"],
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "fullName": {"type": "string", "required": true},
                "email": {"type": "string", "required": true},
                "password": {"type": "string", "required": true},
                "userType": {"type": "string", "required": true, "enum": ["student", "instructor", "employer", "admin", "mentor"]},
                "contact": {"type": "string"},
                "country": {"type": "object"},
                "phoneNumber": {"type": "string"}
              }
            },
            "responses": {
              "201": "User created successfully",
              "400": "Email already exists",
              "403": "Admin access required",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/users/{id}",
            "summary": "Get user by ID (Admin only)",
            "authentication": true,
            "roles": ["admin"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "User data",
              "403": "Admin access required",
              "404": "User not found",
              "500": "Server error"
            }
          },
          {
            "method": "PUT",
            "path": "/users/{id}",
            "summary": "Update user (Admin or self)",
            "authentication": true,
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "fullName": {"type": "string"},
                "email": {"type": "string"},
                "contact": {"type": "string"},
                "phoneNumber": {"type": "string"}
              }
            },
            "responses": {
              "200": "User updated",
              "403": "Not authorized",
              "404": "User not found",
              "500": "Server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/users/{id}",
            "summary": "Delete user (Admin or self)",
            "authentication": true,
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "User deleted",
              "403": "Not authorized",
              "404": "User not found",
              "500": "Server error"
            }
          }
        ]
      },
      "virtualLab": {
        "groupName": "Virtual Labs",
        "description": "Virtual lab session management",
        "routes": [
          {
            "method": "POST",
            "path": "/virtual-lab/launch",
            "summary": "Launch a virtual lab session",
            "authentication": true,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "courseId": {"type": "string", "required": true},
                "labTitle": {"type": "string", "required": true}
              }
            },
            "responses": {
              "200": "Virtual lab session launched successfully",
              "400": "Missing or invalid input",
              "401": "Unauthorized access",
              "500": "Server error"
            }
          }
        ]
      }
    },
    "commonResponseCodes": {
      "200": {
        "description": "Success - Request completed successfully",
        "example": {"success": true, "data": {}}
      },
      "201": {
        "description": "Created - Resource created successfully",
        "example": {"success": true, "data": {}, "message": "Resource created"}
      },
      "400": {
        "description": "Bad Request - Invalid input or validation error",
        "example": {"success": false, "message": "Validation error", "errors": []}
      },
      "401": {
        "description": "Unauthorized - Missing or invalid authentication token",
        "example": {"success": false, "message": "Authentication required"}
      },
      "403": {
        "description": "Forbidden - Insufficient permissions",
        "example": {"success": false, "message": "You don't have permission to access this resource"}
      },
      "404": {
        "description": "Not Found - Resource doesn't exist",
        "example": {"success": false, "message": "Resource not found"}
      },
      "409": {
        "description": "Conflict - Resource already exists or conflict with current state",
        "example": {"success": false, "message": "Resource already exists"}
      },
      "413": {
        "description": "Payload Too Large - File size exceeds limit",
        "example": {"success": false, "message": "File size exceeds maximum limit"}
      },
      "500": {
        "description": "Internal Server Error - Something went wrong on the server",
        "example": {"success": false, "message": "Internal server error"}
      }
    },
    "dataModels": {
      "User": {
        "properties": {
          "_id": "string (ObjectId)",
          "fullName": "string (required)",
          "email": "string (required, unique)",
          "password": "string (required, hashed)",
          "userType": "string (enum: student, instructor, employer, admin, mentor)",
          "contact": "string",
          "country": "object {name: string, code: string}",
          "phoneNumber": "string",
          "isEmailVerified": "boolean",
          "createdAt": "date",
          "updatedAt": "date"
        }
      },
      "Course": {
        "properties": {
          "_id": "string (ObjectId)",
          "title": "string (required)",
          "category": "string (required)",
          "level": "string (enum: Beginner, Intermediate, Advanced)",
          "language": "string",
          "shortDescription": "string",
          "description": "string",
          "instructor": "ObjectId (ref: User)",
          "thumbnail": "string (URL)",
          "promoVideo": "string (URL)",
          "status": "string (enum: draft, published)",
          "modules": "array of ObjectId (ref: Module)",
          "studentsEnrolled": "array of ObjectId (ref: Enrollment)",
          "rating": "number",
          "createdAt": "date",
          "updatedAt": "date"
        }
      },
      "Module": {
        "properties": {
          "_id": "string (ObjectId)",
          "title": "string (required)",
          "courseId": "ObjectId (ref: Course)",
          "topics": "array of Topic objects",
          "order": "number",
          "createdAt": "date",
          "updatedAt": "date"
        }
      },
      "Internship": {
        "properties": {
          "_id": "string (ObjectId)",
          "title": "string (required)",
          "company": "string (required)",
          "domain": "string (required)",
          "stipend": "number (required)",
          "duration": "string (required)",
          "location": "string (required)",
          "description": "string (required)",
          "startDate": "date (required)",
          "endDate": "date (required)",
          "skills": "array of strings",
          "responsibilities": "array of strings",
          "qualifications": "array of strings",
          "status": "string (enum: draft, active, closed)",
          "applicationDeadline": "date",
          "createdAt": "date",
          "updatedAt": "date"
        }
      },
      "InternshipApplication": {
        "properties": {
          "_id": "string (ObjectId)",
          "studentId": "ObjectId (ref: User)",
          "internshipId": "ObjectId (ref: Internship)",
          "resumeFile": "string (URL)",
          "supportLetter": "string (URL)",
          "applicationLetter": "string",
          "school": "string",
          "year": "string",
          "linkedinUrl": "string",
          "githubUrl": "string",
          "portfolioUrl": "string",
          "status": "string (enum: Pending, Under Review, Shortlisted, Interviewing, Accepted, Rejected)",
          "feedback": "string",
          "appliedAt": "date",
          "createdAt": "date",
          "updatedAt": "date"
        }
      },
      "DailyActivity": {
        "properties": {
          "_id": "string (ObjectId)",
          "enrollmentId": "ObjectId (ref: InternshipEnrollment)",
          "studentId": "ObjectId (ref: User)",
          "internshipId": "ObjectId (ref: Internship)",
          "date": "date (required)",
          "checkInTime": "string",
          "checkOutTime": "string",
          "totalHours": "number",
          "whatYouDid": "array of strings",
          "challengesFaced": "array of strings",
          "solutionsFound": "array of strings",
          "status": "string (enum: draft, submitted, reviewed, approved, needs-revision)",
          "mentorFeedback": "object",
          "createdAt": "date",
          "updatedAt": "date"
        }
      },
      "AttendanceRecord": {
        "properties": {
          "_id": "string (ObjectId)",
          "enrollmentId": "ObjectId (ref: InternshipEnrollment)",
          "studentId": "ObjectId (ref: User)",
          "date": "date (required)",
          "status": "string (enum: present, absent, late, half-day, sick-leave, authorized-absence, holiday, weekend)",
          "reason": "string",
          "isExcused": "boolean",
          "notes": "string",
          "proofDocument": "object",
          "isAutoGenerated": "boolean",
          "createdAt": "date",
          "updatedAt": "date"
        }
      },
      "Profile": {
        "properties": {
          "_id": "string (ObjectId)",
          "user": "ObjectId (ref: User)",
          "profileImage": "object {url, publicId, uploadedAt}",
          "headline": "string",
          "bio": "string",
          "dateOfBirth": "date",
          "gender": "string",
          "website": "string",
          "socialLinks": "object",
          "education": "array of objects",
          "experience": "array of objects",
          "skills": "array of objects",
          "certifications": "array of objects",
          "coursesEnrolled": "array of ObjectId",
          "coursesCompleted": "array of ObjectId",
          "profileCompletion": "number",
          "createdAt": "date",
          "updatedAt": "date"
        }
      }
    },
    "notes": {
      "rateLimit": "100 requests per 15 minutes per IP address",
      "fileUploadLimits": {
        "profileImage": "5MB (JPEG, PNG)",
        "courseMedia": "50MB for videos, 10MB for images",
        "resumeFile": "5MB (PDF, DOC, DOCX)",
        "moduleFiles": "100MB for videos, 10MB for PDFs"
      },
      "pagination": {
        "defaultLimit": 10,
        "maxLimit": 100,
        "format": "?page=1&limit=10"
      },
      "dateFormat": "ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)",
      "timezones": "All times are in UTC"
    }
  }
}",
            "path": "/auth/verify-email",
            "summary": "Verify user email",
            "authentication": false,
            "queryParameters": {
              "token": {"type": "string", "required": true, "description": "Verification token sent to user's email"}
            },
            "responses": {
              "200": "Email verified successfully",
              "400": "Invalid verification token",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/auth/forgot-password",
            "summary": "Request password reset",
            "authentication": false,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "email": {"type": "string", "required": true, "format": "email", "example": "user@example.com"}
              }
            },
            "responses": {
              "200": "If the email exists, a password reset link has been sent",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/auth/verify-reset-token",
            "summary": "Verify password reset token",
            "authentication": false,
            "queryParameters": {
              "token": {"type": "string", "required": true, "description": "The password reset token"}
            },
            "responses": {
              "200": "Token is valid",
              "400": "Invalid or expired token",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/auth/reset-password",
            "summary": "Reset user password",
            "authentication": false,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "token": {"type": "string", "required": true},
                "userId": {"type": "string", "required": true, "example": "507f1f77bcf86cd799439011"},
                "newPassword": {"type": "string", "required": true, "example": "NewSecurePassword123!"}
              }
            },
            "responses": {
              "200": "Password has been reset successfully",
              "400": "Invalid token or expired token",
              "500": "Server error"
            }
          }
        ]
      },
      "courses": {
        "groupName": "Courses",
        "description": "Course management endpoints including multi-step creation",
        "routes": [
          {
            "method": "POST",
            "path": "/courses/step1",
            "summary": "Create course basics (Step 1)",
            "authentication": true,
            "roles": ["instructor"],
            "requestBody": {
              "required": true,
              "contentType": "multipart/form-data",
              "schema": {
                "title": {"type": "string", "required": true, "minLength": 5, "maxLength": 100},
                "category": {"type": "string", "required": true},
                "level": {"type": "string", "required": true, "enum": ["Beginner", "Intermediate", "Advanced"]},
                "language": {"type": "string", "default": "English"},
                "shortDescription": {"type": "string", "maxLength": 160},
                "description": {"type": "string"},
                "whatYouLearn": {"type": "array or string"},
                "requirements": {"type": "array or string"}
              }
            },
            "responses": {
              "201": "Course created successfully with courseId and nextStep",
              "400": "Validation error",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/courses/step2/{courseId}",
            "summary": "Upload course media (Step 2)",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "multipart/form-data",
              "schema": {
                "thumbnail": {"type": "file", "format": "binary", "description": "JPEG/PNG"},
                "promoVideo": {"type": "file", "format": "binary", "description": "MP4/WEBM"}
              }
            },
            "responses": {
              "200": "Media uploaded successfully",
              "400": "Bad request",
              "403": "Forbidden",
              "413": "File too large",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/courses/step3/{courseId}",
            "summary": "Finalize course curriculum and publish (Step 3)",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "modules": {
                  "type": "array",
                  "items": {
                    "title": {"type": "string", "required": true},
                    "order": {"type": "number", "required": true},
                    "topics": {
                      "type": "array",
                      "items": {
                        "title": {"type": "string", "required": true},
                        "order": {"type": "number", "required": true},
                        "type": {"type": "string", "enum": ["video", "pdf", "text", "quiz"]},
                        "description": {"type": "string"},
                        "content": {"type": "object"}
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": "Course published successfully",
              "400": "Validation error",
              "403": "Authorization error",
              "404": "Course not found",
              "500": "Internal server error"
            }
          },
          {
            "method": "GET",
            "path": "/courses",
            "summary": "Get all courses",
            "authentication": false,
            "responses": {
              "200": "List of courses",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/courses/{id}",
            "summary": "Get complete course details with modules, quizzes, and enrolled students",
            "authentication": false,
            "pathParameters": {
              "id": {"type": "string", "required": true, "description": "MongoDB Course ID"}
            },
            "responses": {
              "200": "Successfully retrieved course with all nested content",
              "404": "Course not found",
              "500": "Internal server error"
            }
          },
          {
            "method": "PUT",
            "path": "/courses/{courseId}/update-step-1",
            "summary": "Update course basic information (Step 1)",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "title": {"type": "string", "required": true},
                "category": {"type": "string", "required": true},
                "level": {"type": "string", "required": true, "enum": ["beginner", "intermediate", "advanced"]},
                "language": {"type": "string"},
                "shortDescription": {"type": "string"},
                "description": {"type": "string"},
                "whatYouLearn": {"type": "array"},
                "requirements": {"type": "array"}
              }
            },
            "responses": {
              "200": "Course basic information updated successfully",
              "400": "Validation error",
              "403": "Unauthorized",
              "404": "Course not found",
              "500": "Server error"
            }
          },
          {
            "method": "PUT",
            "path": "/courses/{courseId}/update-step-2",
            "summary": "Update course media (Step 2)",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "multipart/form-data",
              "schema": {
                "thumbnail": {"type": "file", "format": "binary"},
                "promoVideo": {"type": "file", "format": "binary"}
              }
            },
            "responses": {
              "200": "Course media updated successfully",
              "400": "Invalid file format or missing files",
              "403": "Unauthorized",
              "404": "Course not found",
              "500": "Server error"
            }
          },
          {
            "method": "PUT",
            "path": "/courses/{courseId}/update-step-3",
            "summary": "Update course modules and content (Step 3)",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "modules": {"type": "array", "description": "Array of modules with topics"}
              }
            },
            "responses": {
              "200": "Course modules updated successfully",
              "400": "Invalid module data",
              "403": "Unauthorized",
              "404": "Course not found",
              "500": "Server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/courses/{id}",
            "summary": "Delete a course",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Course deleted",
              "403": "Unauthorized",
              "404": "Course not found",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/courses/instructors/{instructorId}",
            "summary": "Get courses by a specific instructor",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "instructorId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Successfully retrieved instructor's courses",
              "404": "Instructor not found",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/courses/enrolled/{studentId}",
            "summary": "Get enrolled courses for authenticated student",
            "authentication": true,
            "pathParameters": {
              "studentId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Successfully retrieved enrolled courses",
              "400": "Invalid student ID format",
              "401": "Authentication required",
              "403": "Forbidden access",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/courses/instructors/{instructorId}/quizzes",
            "summary": "Get all quizzes created by an instructor",
            "authentication": true,
            "roles": ["instructor"],
            "pathParameters": {
              "instructorId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "List of quizzes",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/courses/instructors/{instructorId}/modules",
            "summary": "Get all modules created by an instructor",
            "authentication": true,
            "pathParameters": {
              "instructorId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "List of modules",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/courses/{studentId}/enrolled/{courseId}/modules",
            "summary": "Get modules for a course the student is enrolled in",
            "authentication": true,
            "pathParameters": {
              "studentId": {"type": "string", "required": true},
              "courseId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "List of course modules",
              "403": "Unauthorized or not enrolled",
              "404": "Course not found",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/courses/{studentId}/enrolled/{courseId}/quizzes",
            "summary": "Get quizzes for a course the student is enrolled in",
            "authentication": true,
            "pathParameters": {
              "studentId": {"type": "string", "required": true},
              "courseId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "List of course quizzes",
              "403": "Unauthorized or not enrolled",
              "404": "Course not found",
              "500": "Server error"
            }
          }
        ]
      },
      "enrollment": {
        "groupName": "Enrollment",
        "description": "Course enrollment management endpoints",
        "routes": [
          {
            "method": "POST",
            "path": "/enrollments/{courseId}",
            "summary": "Enroll a student in a course",
            "authentication": true,
            "roles": ["student"],
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "responses": {
              "201": "Enrollment successful",
              "400": "Already enrolled",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/enrollments/my-courses/enrollments",
            "summary": "Get enrollments for courses created by the instructor",
            "authentication": true,
            "roles": ["instructor"],
            "responses": {
              "200": "Enrollment stats and list",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/enrollments/manual",
            "summary": "Instructor enrolls selected student in a course",
            "authentication": true,
            "roles": ["instructor"],
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "studentId": {"type": "string", "required": true},
                "courseId": {"type": "string", "required": true}
              }
            },
            "responses": {
              "201": "Enrollment successful",
              "400": "Already enrolled",
              "403": "Unauthorized",
              "500": "Server error"
            }
          }
        ]
      },
      "progress": {
        "groupName": "Progress",
        "description": "Course progress tracking endpoints",
        "routes": [
          {
            "method": "POST",
            "path": "/progress/{courseId}/progress",
            "summary": "Update progress for a user in a course",
            "authentication": true,
            "pathParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "userId": {"type": "string", "required": true},
                "moduleId": {"type": "string", "required": true}
              }
            },
            "responses": {
              "200": "Progress updated successfully",
              "500": "Server error"
            }
          }
        ]
      },
      "forums": {
        "groupName": "Forums",
        "description": "Course forums and student discussions",
        "routes": [
          {
            "method": "GET",
            "path": "/forums",
            "summary": "Get all forum posts for a course",
            "authentication": false,
            "queryParameters": {
              "courseId": {"type": "string", "required": true}
            },
            "responses": {
              "200": "List of forum posts",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/forums",
            "summary": "Create a new forum post",
            "authentication": true,
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "post": {"type": "string", "required": true},
                "courseId": {"type": "string", "required": true}
              }
            },
            "responses": {
              "201": "Post created",
              "400": "Validation or moderation error",
              "401": "Unauthorized",
              "500": "Server error"
            }
          },
          {
            "method": "POST",
            "path": "/forums/{id}/reply",
            "summary": "Add a reply to a forum post",
            "authentication": true,
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "content": {"type": "string", "required": true}
              }
            },
            "responses": {
              "200": "Reply added",
              "400": "Inappropriate content",
              "404": "Post not found",
              "500": "Server error"
            }
          }
        ]
      },
      "internships": {
        "groupName": "Internships",
        "description": "Internship management endpoints",
        "routes": [
          {
            "method": "POST",
            "path": "/internships",
            "summary": "Create a new internship listing (Admin only)",
            "authentication": true,
            "roles": ["admin"],
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "title": {"type": "string", "required": true},
                "company": {"type": "string", "required": true},
                "domain": {"type": "string", "required": true},
                "stipend": {"type": "number", "required": true, "minimum": 0},
                "duration": {"type": "string", "required": true},
                "location": {"type": "string", "required": true},
                "description": {"type": "string", "required": true},
                "startDate": {"type": "date", "required": true},
                "endDate": {"type": "date", "required": true},
                "skills": {"type": "array"},
                "responsibilities": {"type": "array"},
                "qualifications": {"type": "array"},
                "status": {"type": "string", "enum": ["draft", "active", "closed"], "default": "active"},
                "applicationDeadline": {"type": "date"}
              }
            },
            "responses": {
              "201": "Internship created successfully",
              "400": "Validation error",
              "401": "Unauthorized",
              "403": "Forbidden",
              "500": "Internal server error"
            }
          },
          {
            "method": "GET",
            "path": "/internships",
            "summary": "Get all internships",
            "authentication": false,
            "queryParameters": {
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 10},
              "domain": {"type": "string"},
              "location": {"type": "string"}
            },
            "responses": {
              "200": "List of internships",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/internships/{id}",
            "summary": "Get a single internship by ID",
            "authentication": false,
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Internship data",
              "404": "Internship not found",
              "500": "Server error"
            }
          },
          {
            "method": "PATCH",
            "path": "/internships/{id}",
            "summary": "Update an internship (Admin only)",
            "authentication": true,
            "roles": ["admin"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "title": {"type": "string"},
                "company": {"type": "string"},
                "domain": {"type": "string"},
                "stipend": {"type": "number"},
                "duration": {"type": "string"},
                "location": {"type": "string"}
              }
            },
            "responses": {
              "200": "Internship updated successfully",
              "400": "Bad request",
              "401": "Unauthorized",
              "403": "Forbidden",
              "404": "Internship not found",
              "500": "Server error"
            }
          },
          {
            "method": "DELETE",
            "path": "/internships/{id}",
            "summary": "Delete an internship (Admin only)",
            "authentication": true,
            "roles": ["admin"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Internship deleted successfully",
              "400": "Invalid ID format",
              "401": "Unauthorized",
              "403": "Forbidden",
              "404": "Internship not found",
              "500": "Server error"
            }
          }
        ]
      },
      "internshipApplications": {
        "groupName": "Internship Applications",
        "description": "Internship application management",
        "routes": [
          {
            "method": "POST",
            "path": "/internship/{id}/apply",
            "summary": "Submit internship application",
            "authentication": true,
            "roles": ["student"],
            "pathParameters": {
              "id": {"type": "string", "required": true, "description": "Internship ID"}
            },
            "requestBody": {
              "required": true,
              "contentType": "multipart/form-data",
              "schema": {
                "resumeFile": {"type": "file", "required": true, "format": "binary", "description": "PDF or Word (max 5MB)"},
                "supportLetter": {"type": "file", "format": "binary", "description": "Optional recommendation letter"},
                "applicationLetter": {"type": "string", "required": true, "minLength": 50, "maxLength": 1000},
                "school": {"type": "string", "required": true, "maxLength": 100},
                "year": {"type": "string", "required": true, "enum": ["Year one", "Year two", "Year three", "Year four", "Year five", "Other"]},
                "linkedinUrl": {"type": "string", "format": "uri"},
                "githubUrl": {"type": "string", "format": "uri"},
                "portfolioUrl": {"type": "string", "format": "uri"}
              }
            },
            "responses": {
              "201": "Application created",
              "400": "Validation error",
              "401": "Unauthorized",
              "404": "Internship not found",
              "413": "File too large",
              "500": "Server error"
            }
          },
          {
            "method": "PATCH",
            "path": "/internship/applications/{id}/status",
            "summary": "Update application status (Admin/Mentor only)",
            "authentication": true,
            "roles": ["admin", "mentor"],
            "pathParameters": {
              "id": {"type": "string", "required": true, "description": "Application ID"}
            },
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "status": {"type": "string", "required": true, "enum": ["Pending", "Under Review", "Shortlisted", "Interviewing", "Accepted", "Rejected"]},
                "feedback": {"type": "string", "maxLength": 500}
              }
            },
            "responses": {
              "200": "Application status updated successfully",
              "400": "Invalid input or validation error",
              "401": "Unauthorized",
              "404": "Application not found",
              "500": "Server error"
            }
          },
          {
            "method": "PATCH",
            "path": "/internship/bulk-status",
            "summary": "Bulk update application statuses (Admin/Mentor only)",
            "authentication": true,
            "roles": ["admin", "mentor"],
            "requestBody": {
              "required": true,
              "contentType": "application/json",
              "schema": {
                "applicationIds": {"type": "array", "required": true, "items": {"type": "string"}},
                "status": {"type": "string", "required": true, "enum": ["Pending", "Under Review", "Interviewing", "Accepted", "Rejected"]},
                "feedback": {"type": "string", "maxLength": 500}
              }
            },
            "responses": {
              "200": "Bulk update completed",
              "400": "Invalid input",
              "403": "Not authorized",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/applications",
            "summary": "Get all applications (Admin/Mentor only)",
            "authentication": true,
            "roles": ["admin", "mentor"],
            "queryParameters": {
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 10},
              "status": {"type": "string", "enum": ["Pending", "Under Review", "Shortlisted", "Interviewing", "Accepted", "Rejected"]},
              "internshipId": {"type": "string"},
              "studentId": {"type": "string"},
              "sortBy": {"type": "string", "enum": ["appliedAt", "createdAt", "updatedAt", "school", "year"], "default": "appliedAt"},
              "sortOrder": {"type": "string", "enum": ["asc", "desc"], "default": "desc"}
            },
            "responses": {
              "200": "List of applications",
              "403": "Not authorized",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/applications/my-applications",
            "summary": "Get current user's applications",
            "authentication": true,
            "roles": ["student"],
            "queryParameters": {
              "page": {"type": "integer", "default": 1},
              "limit": {"type": "integer", "default": 10},
              "status": {"type": "string"},
              "sortBy": {"type": "string", "default": "appliedAt"},
              "sortOrder": {"type": "string", "default": "desc"}
            },
            "responses": {
              "200": "List of user's applications",
              "500": "Server error"
            }
          },
          {
            "method": "GET",
            "path": "/applications/{id}",
            "summary": "Get a specific application",
            "authentication": true,
            "roles": ["student", "admin", "mentor"],
            "pathParameters": {
              "id": {"type": "string", "required": true}
            },
            "responses": {
              "200": "Application details",
              "403": "Not authorized to view this application",
              "404": "Application not found",
              "500": "Server error"
            }
          },