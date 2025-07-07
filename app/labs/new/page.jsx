"use client"
import { useState, useEffect } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';

export default function ProjectWorkspace() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('react');

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('sandpack-projects')) || [];
    setProjects(savedProjects);
    
    if (savedProjects.length > 0) {
      setActiveProject(savedProjects[savedProjects.length - 1]);
      setShowWelcome(false);
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sandpack-projects', JSON.stringify(projects));
  }, [projects]);

  const templates = {
    react: {
      files: {
        '/App.js': `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">React Project</h1>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Count: {count}
      </button>
    </div>
  );
}`,
        '/styles.css': `body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}`,
      },
      dependencies: {},
    },
    vue: {
      files: {
        '/src/App.vue': `<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Vue Project</h1>
    <button 
      @click="count++"
      class="px-4 py-2 bg-green-500 text-white rounded"
    >
      Count: {{ count }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>`,
      },
      dependencies: {},
    },
    vanilla: {
      files: {
        '/index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Vanilla JS Project</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div class="container">
    <h1>Vanilla JS Project</h1>
    <button id="counter">Count: 0</button>
  </div>
  <script src="/script.js"></script>
</body>
</html>`,
        '/styles.css': `body {
  font-family: sans-serif;
  margin: 0;
  padding: 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

button {
  padding: 0.5rem 1rem;
  background-color: #6b46c1;
  color: white;
  border: none;
  border-radius: 0.25rem;
}`,
        '/script.js': `let count = 0;
const counter = document.getElementById('counter');

counter.addEventListener('click', () => {
  count++;
  counter.textContent = \`Count: \${count}\`;
});`,
      },
      dependencies: {},
    },
  };

  const createNewProject = () => {
    const newProject = {
      id: Date.now(),
      name: `Project ${projects.length + 1}`,
      template: selectedTemplate,
      files: templates[selectedTemplate].files,
      dependencies: templates[selectedTemplate].dependencies,
      lastEdited: new Date().toISOString(),
    };

    setProjects([...projects, newProject]);
    setActiveProject(newProject);
    setShowWelcome(false);
  };

  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    
    if (activeProject && activeProject.id === projectId) {
      setActiveProject(updatedProjects.length > 0 ? updatedProjects[updatedProjects.length - 1] : null);
      setShowWelcome(updatedProjects.length === 0);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">My Projects</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {projects.map(project => (
            <div
              key={project.id}
              className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                activeProject?.id === project.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => {
                setActiveProject(project);
                setShowWelcome(false);
              }}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{project.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(project.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(project.lastEdited).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={createNewProject}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Project
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {activeProject ? activeProject.name : 'Welcome to Sandpack Editor'}
          </h1>
          
          {!showWelcome && (
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="template" className="mr-2 text-sm font-medium text-gray-700">
                  Template:
                </label>
                <select
                  id="template"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                  <option value="vanilla">Vanilla JS</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="flex-1 overflow-hidden">
          {showWelcome ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold mb-4">Welcome to your Sandpack Workspace</h2>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first project. Choose from various templates and start coding right away.
                </p>
                <button
                  onClick={createNewProject}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Your First Project
                </button>
              </div>
            </div>
          ) : (
            <Sandpack
              template={activeProject.template}
              files={activeProject.files}
              customSetup={{
                dependencies: activeProject.dependencies,
              }}
              options={{
                showLineNumbers: true,
                showInlineErrors: true,
                showTabs: true,
                closableTabs: true,
                visibleFiles: Object.keys(activeProject.files),
              }}
              theme="light"
            />
          )}
        </div>
      </div>
    </div>
  );
}