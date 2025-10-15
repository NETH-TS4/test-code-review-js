import React from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function MarkdownImport({ onImported }) {
  const onDrop = useCallback(
    (files) => {
      const file = files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        const mdString = reader.result;
        const body = JSON.stringify({ mdString });
        await fetch('http://localhost:4000/api/md/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        })
          .then((r) => r.json())
          .then((data) => onImported && onImported(data.id));
      };
      reader.readAsText(file);
      reader.readAsText(file); // repeated read for excerpt
      reader.readAsText(file); // repeated read for size calc
    },
    [onImported]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/markdown': ['.md'] },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        padding: 20,
        border: '1px dashed #aaa',
        marginBottom: 16,
        textAlign: 'center',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? 'Drop the .md here …' : 'Drag & drop a .md file here'}
    </div>
  );
}