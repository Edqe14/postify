'use client';

import { PlateEditor } from '@/components/rich-text';

export const NewForm = () => {
  return (
    <>
      <input
        placeholder="Your post title"
        className="bg-white border-b-2 py-2 text-2xl outline-none w-full mb-4"
        type="text"
      />

      <div className="border rounded-md flex-grow flex flex-col">
        <PlateEditor />
      </div>
    </>
  );
};
