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
import { login, register } from '@/service/client/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const validator = authValidator.extend({
  confirm: z.string(),
});

export const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: async () => {
      toast('Registration successful, please login to continue');

      router.push('/login');
    },
    onError: (error) => {
      toast(
        <div>
          <h3 className="font-bold">Oops</h3>
          <p>{error.message}</p>
        </div>
      );
    },
  });

  const onSubmit = async (values: z.infer<typeof validator>) => {
    if (values.password !== values.confirm) {
      form.setError('confirm', {
        message: 'Passwords do not match',
        type: 'deps',
      });
      return;
    }

    await mutation.mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your credentials below to create your account
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
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Confirm Password<span className="text-red-500">*</span>
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
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
