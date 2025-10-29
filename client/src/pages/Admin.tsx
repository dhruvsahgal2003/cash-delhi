import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DateRange } from "react-day-picker";

const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  venue: z.string().min(1, "Venue is required"),
  description: z.string().optional(),
  imageUrl: z.string().url("Invalid URL").optional(),
});

const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type EventFormData = z.infer<typeof eventFormSchema>;
type LoginFormData = z.infer<typeof loginFormSchema>;

export default function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();

  const eventForm = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
  });

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event created successfully" });
      eventForm.reset();
    },
    onError: () => {
      toast({ title: "Error creating event", variant: "destructive" });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
    onError: () => {
      toast({ title: "Invalid username or password", variant: "destructive" });
    },
  });

  // Define the FileInput component inline for now
  function FileInput({ onChange }: { onChange: (file: File) => void }) {
    return (
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
          }
        }}
      />
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center">Admin Login</h1>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit((data) =>
                loginMutation.mutate(data)
              )}
              className="space-y-6"
            >
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <Form {...eventForm}>
        <form
          onSubmit={eventForm.handleSubmit((data) =>
            createEventMutation.mutate(data)
          )}
          className="space-y-8"
        >
          <FormField
            control={eventForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={eventForm.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Calendar
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date: Date | undefined) => {
                      field.onChange(date ? date.toISOString().split("T")[0] : "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={eventForm.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input placeholder="Event venue" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={eventForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Event description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={eventForm.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileInput
                    onChange={(file: File) => {
                      const fakeUploadUrl = URL.createObjectURL(file);
                      field.onChange(fakeUploadUrl);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={createEventMutation.isPending}>
            {createEventMutation.isPending ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
