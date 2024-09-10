'use client';

import { PlateEditor } from '@/components/rich-text';
import { Button } from '@/components/ui/button';
import { updatePost } from '@/service/client/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

export const EditForm = ({
  title: upTitle,
  content,
  slug,
}: {
  slug: string;
  title: string;
  content: string;
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(upTitle);
  const contentRef = useRef<string>(content);

  const editor = useMemo(
    () => <PlateEditor contentRef={contentRef} content={content} />,
    []
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => updatePost(slug, title, contentRef.current),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast('Post updated');
      router.push(`/post/${slug}`);
    },
  });

  const submit = () => {
    if (!title || !contentRef.current) {
      return toast('Please fill in all fields');
    }

    mutation.mutate();
  };

  return (
    <>
      <input
        placeholder="Your post title"
        className="border-b-2 py-3 px-3 text-2xl outline-none w-full"
        type="text"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <div className="border rounded-md flex-grow flex flex-col relative">
        {editor}
      </div>

      <Button onClick={submit} disabled={mutation.isPending}>
        Save
      </Button>
    </>
  );
};
