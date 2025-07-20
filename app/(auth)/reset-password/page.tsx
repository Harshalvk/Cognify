"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/auth-client";
import { userResetPasswordFormSchema } from "@/validator/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ResetPasswordPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          Cognify
        </a>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof userResetPasswordFormSchema>>({
    resolver: zodResolver(userResetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userResetPasswordFormSchema>) {
    setIsLoading(true);

    if (values.password !== values.confirmPassword) {
      toast.error("Password does not match");
      setIsLoading(false);
      return;
    }

    const { error } = await resetPassword({
      newPassword: values.confirmPassword,
      token,
    });

    if (error) {
      toast.error("Password not reset");
    } else {
      toast.success("Password reset successfull");
      router.push("/sign-in");
    }

    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>Confirm your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>Enter your new password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>Confirm your new password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-2"
              variant={"secondary"}
              disabled={isLoading}
            >
              {isLoading && <Loader className="animate-spin" />} Change Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ResetPasswordPage;
