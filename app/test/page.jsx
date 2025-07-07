import React from 'react'
import CodeEditor from './CodeEditor'

export default function page() {
  return (
    <div className="lesson-page grid md:grid-cols-2 gap-4">
  <div className="lesson-video">
    {/* Video or instructions */}
  </div>
  <div className="live-editor">
    <CodeEditor />
  </div>
</div>

  )
}
