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
import { forgetPassword } from "@/lib/auth-client";
import { userForgotPasswordFormSchema } from "@/validator/user-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ForgotAccountPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          Cognify
        </a>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof userForgotPasswordFormSchema>>({
    resolver: zodResolver(userForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof userForgotPasswordFormSchema>,
  ) {
    setIsLoading(true);
    console.log(values.email);
    console.log("here 1");

    const { data, error } = await forgetPassword({
      email: values.email,
      redirectTo: "/reset-password",
    });

    console.log("here 2");
    if (error) {
      toast.error("email not send");
    } else {
      toast.success("Password reset email sent");
      console.log(data);
    }

    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Forgot Your Password</CardTitle>
        <CardDescription>Give your email to get a reset link</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="xyz@zyx.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>Enter your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-2"
              variant={"secondary"}
              disabled={isLoading}
            >
              {isLoading && <Loader className="animate-spin" />} Send reset link
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ForgotAccountPage;
