'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Sandpack } from '@codesandbox/sandpack-react';

export default function PublicSharePage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/labs/${projectId}/get`)
      .then((res) => res.json())
      .then(setProject);
  }, [projectId]);

  if (!project || !project.isPublic) return <div className="p-6">This project is private or not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
      <Sandpack
        template={project.template}
        files={project.files}
        options={{
          resizablePanels: true,
          editorHeight: 500,
          readOnly: true,
        }}
      />
    </div>
  );
}
