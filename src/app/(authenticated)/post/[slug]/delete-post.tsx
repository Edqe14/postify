'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { deletePost } from '@/service/client/post';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const DeletePost = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deletePost(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast('Post deleted');
      router.back();
    },
  });

  const goDelete = () => {
    mutation.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="pb-8">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <DialogFooter className="flex gap-2">
            <DialogClose asChild>
              <Button className="flex-grow">Nevermind</Button>
            </DialogClose>
            <Button
              disabled={mutation.isPending}
              className="flex-grow"
              variant="destructive"
              onClick={goDelete}
            >
              {!mutation.isPending ? 'Do it' : <Spinner />}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
