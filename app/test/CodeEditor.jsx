// CodeEditor.tsx
'use client';
import { Sandpack } from "@codesandbox/sandpack-react";

export default function CodeEditor() {
  return (
    <Sandpack
      template="vanilla" // or use "react", "vue", "nextjs"
      theme="light"
      options={{
        showLineNumbers: true,
        showNavigator: false,
        showTabs: true,
        editorHeight: 400,
        autorun: true,
        resizablePanels: true,
      }}
    />
  );
}
