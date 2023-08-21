"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

const StoreApiInput = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!input || input.length === 0)
        return toast({
          title: "Please enter your store API key",
          variant: "destructive",
        });

      await fetch(`/api/set`, {
        method: "POST",
        body: JSON.stringify({ storeApi: input }),
      });
      toast({
        title: "API key added successfully",
        variant: "default",
      });
      setInput("");
    } catch (error) {
      toast({
        title: "Something went wrong. Please try again later!",
        variant: "destructive",
      });
      console.log(
        "[SETTING_STORE_API]",
        (error as { message: string }).message
      );
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="my-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-x-2 my-4 md:my-6 shadow rounded-md p-10 bg-gradient-to-r from-indigo-50 to-emerald-50 "
      >
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your store API key"
          className="w-full bg-white/60"
        />
        <Button
          type="submit"
          className="w-fit bg-gradient-to-tr from-indigo-900 to-gray-800"
          variant={"default"}
          size={"default"}
        >
          Add
        </Button>
      </form>
      <p className="relative shadow rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {children}
      </p>
    </div>
  );
};

export default StoreApiInput;
