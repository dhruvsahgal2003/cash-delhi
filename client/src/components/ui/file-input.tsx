import React from "react";

interface FileInputProps {
  onChange: (file: File) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          onChange(e.target.files[0]);
        }
      }}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
    />
  );
};