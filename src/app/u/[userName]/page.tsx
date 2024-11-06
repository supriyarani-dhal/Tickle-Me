"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { messageSchema } from "@/schemas/messageSchema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCompletion } from "ai/react";

//to parse the string messages and split them into an array of messages by replacing the || as separator
const parseStringMessages = (messageString: string): string[] => {
  return messageString.split("||");
};

const defaultMessageString =
  "What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?";

const SendMessage = () => {
  const params = useParams<{
    userName: string;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  //useCompletion() hook is provided by the AI SDK vercel. It gives the prompt from the api , to the complete() function.
  const {
    complete,
    completion,
    isLoading: isSuggestMessageLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: defaultMessageString,
  });

  //to define the type of the form and check the validation od the form content by the help of zod
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        userName: params.userName,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      console.error("Error in sending messages ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Error",
        description: errorMessage ?? "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      form.reset({ ...form.getValues(), content: "" });
    }
  };

  //fetch suggest message
  const fetchSuggestMessage = async () => {
    try {
      //it will trigger the completion process of the useCompletion hook
      complete("");
    } catch (error) {
      console.error("Error fetching messages:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Error",
        description: errorMessage ?? "Failed to fetch messages",
        variant: "destructive",
      });
    }
  };

  //add the suggest message to the textarea by clicking on it
  const addSuggestMessage = async (message: string) => {
    form.setValue("content", message);
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl ">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Public Profile Link
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Send anonumous message to @{params.userName}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" disabled={isSubmitting || !messageContent}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Send it"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className="my-8 space-y-4">
        <Button
          className="my-4"
          onClick={fetchSuggestMessage}
          disabled={isSuggestMessageLoading}
        >
          Suggest Messages
        </Button>
        <h3 className="my-2">Click on any message below to select it</h3>{" "}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Messages</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {error ? (
                <p className="text-red-500">{error.message}</p>
              ) : (
                parseStringMessages(completion).map((message, index) => (
                  <Button
                    key={index}
                    onClick={() => addSuggestMessage(message)}
                    variant={"outline"}
                    className="mb-2"
                  >
                    {message}
                  </Button>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="text-center">
        <div className="mb-4">
          Ready👍🏼, to claim your personal message board?
        </div>
        <Link href="/sign-up">
          <Button>Claim here ➡️</Button>
        </Link>
      </div>
    </div>
  );
};

export default SendMessage;
