"use client"
import { useState, useEffect } from 'react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackConsole, SandpackTests } from '@codesandbox/sandpack-react';
import { MenuSquare, X } from 'lucide-react';

export default function AdvancedWorkspace() {
    // State management
    const [projects, setProjects] = useState([]);
    const [activeProject, setActiveProject] = useState(null);
    const [showWelcome, setShowWelcome] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState('react');
    const [activeTab, setActiveTab] = useState('editor');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileView, setMobileView] = useState('editor'); // 'editor', 'preview', 'console', 'tests'

    // Load projects from memory (localStorage removed for Claude compatibility)
 
    // Project templates
    const templates = {
        react: {
            files: {
                '/App.js': `import { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>React Counter</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}`,
                '/styles.css': `.app { 
  padding: 20px; 
  text-align: center;
}
button {
  padding: 8px 16px;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
}`,
                '/App.test.js': `import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('counter increments', () => {
  render(<App />);
  const button = screen.getByText(/Count: 0/i);
  fireEvent.click(button);
  expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();
});`
            },
            dependencies: {
                '@testing-library/react': '^13.0.0',
                '@testing-library/jest-dom': '^5.16.0'
            }
        },
        vue: {
            files: {
                '/src/App.vue': `<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Vue Counter</h1>
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
                '/src/main.js': `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')`,
            },
            dependencies: {}
        },
        vanilla: {
            files: {
                '/index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Vanilla JS</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div class="container">
    <h1>Vanilla Counter</h1>
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
            dependencies: {}
        }
    };

    // Create new project
    const createNewProject = () => {
        if (!newProjectName.trim()) return;

        const newProject = {
            id: Date.now(),
            name: newProjectName,
            template: selectedTemplate,
            files: templates[selectedTemplate].files,
            dependencies: templates[selectedTemplate].dependencies,
            lastEdited: new Date().toISOString()
        };
        setProjects([...projects, newProject]);
        setActiveProject(newProject);
        setShowWelcome(false);
        setShowCreateModal(false);
        setNewProjectName('');
        setSidebarOpen(false);
    };

    // Delete project
    const deleteProject = (id) => {
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
        if (activeProject?.id === id) {
            setActiveProject(updated[0] || null);
            setShowWelcome(updated.length === 0);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] overflow-hidden relative">
            {/* Mobile Sidebar Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed top-0 lg:relative lg:translate-x-0 z-50 lg:z-auto
                w-64 lg:w-64 h-full bg-white border-r border-gray-200 
                flex flex-col transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">My Projects</h2>
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="w-full mt-2 flex items-center justify-center px-4 py-2 bg-brand text-white rounded-full hover:bg-brand/90 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        New Project
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {projects.map(project => (
                        <div
                            key={project.id}
                            className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 flex justify-between items-center ${activeProject?.id === project.id ? 'bg-blue-50' : ''
                                }`}
                            onClick={() => {
                                setActiveProject(project);
                                setShowWelcome(false);
                                setSidebarOpen(false);
                            }}
                        >
                            <span className="font-medium truncate">{project.name}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteProject(project.id);
                                }}
                                className="text-red-500 hover:text-red-700 p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {showWelcome ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 text-center bg-white">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome to CodeWorkspace</h1>
                        <p className="text-gray-600 mb-6 max-w-md text-sm md:text-base">
                            Start by creating a new project with your preferred framework
                        </p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-4 md:px-6 py-2 md:py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors flex items-center text-sm md:text-base"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create Your First Project
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Mobile Header */}
                        <div className="lg:hidden bg-white border-b border-gray-200 p-3 flex items-center justify-between">
                             <div className="w-10" />
                            <h1 className="text-lg font-semibold truncate px-2">
                                {activeProject?.name}
                            </h1>
                         
                                  <button
                                onClick={toggleSidebar}
                                className="p-2 rounded-md hover:bg-gray-100"
                            >
                              <MenuSquare />
                            </button>
                        </div>

                        {/* Desktop Toolbar */}
                        <div className="hidden lg:flex bg-white border-b border-gray-200 p-3 justify-between items-center">
                            <div>
                                <select
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                                >
                                    <option value="react">React</option>
                                    <option value="vue">Vue</option>
                                    <option value="vanilla">Vanilla JS</option>
                                </select>
                            </div>

                            <div className="flex space-x-1">
                                <button
                                    className={`px-3 py-1 text-sm rounded-full ${activeTab === 'editor'
                                            ? 'bg-brand text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    onClick={() => setActiveTab('editor')}
                                >
                                    Editor
                                </button>
                                <button
                                    className={`px-3 py-1 text-sm rounded-full ${activeTab === 'console'
                                            ? 'bg-brand text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    onClick={() => setActiveTab('console')}
                                >
                                    Console
                                </button>
                                <button
                                    className={`px-3 py-1 text-sm rounded-full ${activeTab === 'tests'
                                            ? 'bg-brand text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    onClick={() => setActiveTab('tests')}
                                >
                                    Tests
                                </button>
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="lg:hidden bg-white border-b border-gray-200 p-2">
                            <div className="flex space-x-1 overflow-x-auto">
                                <button
                                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${mobileView === 'editor'
                                            ? 'bg-brand text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    onClick={() => setMobileView('editor')}
                                >
                                    Editor
                                </button>
                                <button
                                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${mobileView === 'preview'
                                            ? 'bg-brand text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    onClick={() => setMobileView('preview')}
                                >
                                    Preview
                                </button>
                                <button
                                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${mobileView === 'console'
                                            ? 'bg-brand text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    onClick={() => setMobileView('console')}
                                >
                                    Console
                                </button>
                                <button
                                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${mobileView === 'tests'
                                            ? 'bg-brand text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    onClick={() => setMobileView('tests')}
                                >
                                    Tests
                                </button>
                            </div>
                        </div>

                        {/* Sandpack Workspace */}
                        <div className="flex-1 overflow-hidden h-[cal(100vh-11rem)]">
                            <SandpackProvider
                                template={activeProject.template}
                                files={activeProject.files}
                                customSetup={{ dependencies: activeProject.dependencies }}
                                theme="light"
                                options={{
                                    visibleFiles: Object.keys(activeProject.files),
                                    activeFile: Object.keys(activeProject.files)[0]
                                }}
                            >
                                {/* Desktop Layout */}
                                <div className="hidden lg:block h-[calc(100vh-9.5rem)]">
                                    <SandpackLayout style={{ height: '100%' }}>
                                        <SandpackCodeEditor
                                            showLineNumbers
                                            showInlineErrors
                                            showTabs
                                            closableTabs
                                            style={{ height: '100%' }}
                                        />

                                        <div className="flex flex-col w-1/2 border-l border-gray-200 h-full">
                                            <div className="border-b border-gray-200 p-2">
                                                <h3 className="font-medium">Preview</h3>
                                            </div>
                                            <SandpackPreview
                                                style={{
                                                    height: activeTab === 'editor' ? '100%' : '50%',
                                                    padding: '16px'
                                                }}
                                                showRefreshButton={false}
                                            />

                                            {activeTab !== 'editor' && (
                                                <>
                                                    <div className="border-t border-b border-gray-200 p-2">
                                                        <h3 className="font-medium">
                                                            {activeTab === 'console' ? 'Console' : 'Tests'}
                                                        </h3>
                                                    </div>
                                                    <div style={{ height: '50%' }}>
                                                        {activeTab === 'console' ? (
                                                            <SandpackConsole />
                                                        ) : (
                                                            <SandpackTests />
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </SandpackLayout>
                                </div>

                                {/* Mobile Layout */}
                                <div className="lg:hidden h-full">
                                    {mobileView === 'editor' && (
                                        <SandpackCodeEditor
                                            showLineNumbers
                                            showInlineErrors
                                            showTabs
                                            closableTabs
                                            style={{ height: '100%' }}
                                        />
                                    )}
                                    {mobileView === 'preview' && (
                                        <SandpackPreview
                                            style={{ height: '100%', padding: '16px' }}
                                            showRefreshButton={true}
                                        />
                                    )}
                                    {mobileView === 'console' && (
                                        <SandpackConsole style={{ height: '100%' }} />
                                    )}
                                    {mobileView === 'tests' && (
                                        <SandpackTests style={{ height: '100%' }} />
                                    )}
                                </div>
                            </SandpackProvider>
                        </div>
                    </>
                )}
            </div>

            {/* Create Project Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className='flex justify-end my-2 text-gray-600' onClick={() => setShowCreateModal(false)}><X /></div>

                        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Project Name
                            </label>
                            <input
                                type="text"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand"
                                placeholder="My Awesome Project"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Template
                            </label>
                            <select
                                value={selectedTemplate}
                                onChange={(e) => setSelectedTemplate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand"
                            >
                                <option value="react">React</option>
                                <option value="vue">Vue</option>
                                <option value="vanilla">Vanilla JS</option>
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={createNewProject}
                                className="px-4 py-2 bg-brand text-white rounded-full text-sm hover:bg-brand/90"
                            >
                                Create Project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}