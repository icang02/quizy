"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchAPI } from "@/lib";

const formSchema = z.object({
  package_id: z.number(),
  user_name: z
    .string()
    .min(3, { message: "Masukkan minimal 3 karakter." })
    .max(50, "Maksimal 50 karakter."),
});

export default function FormStoreAttempt({ attemptId }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: "",
      package_id: attemptId,
    },
  });

  const onSubmit = (values) => {
    startTransition(async () => {
      const { data } = await fetchAPI(
        process.env.NEXT_PUBLIC_API + "/attempt/store",
        "POST",
        values
      );
      const newAttemptId = data.id;
      router.replace(`/ujian/${newAttemptId}`);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Nama lengkap"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button
            disabled={isPending}
            onClick={() => router.push("/")}
            type="button"
          >
            Kembali
          </Button>
          <Button disabled={isPending} variant={"destructive"} type="submit">
            Mulai Ujian
          </Button>
        </div>
      </form>
    </Form>
  );
}
