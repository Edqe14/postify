'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authValidator } from '@/service/server/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/service/client/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof authValidator>>({
    resolver: zodResolver(authValidator),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast(data.message);

      router.push('/');
    },
  });

  const onSubmit = async (values: z.infer<typeof authValidator>) => {
    await mutation.mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Username<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          maxLength={255}
                          placeholder="johndoe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
