"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

const StoreApiInput = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
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
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="my-2 mx-auto ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-x-2 my-4 md:my-6 shadow rounded-md p-2 sm:p-4 md:p-10 bg-gradient-to-r from-indigo-50 to-emerald-50 "
      >
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your store API key"
          className="w-full bg-white/60"
        />
        <Button
          disabled={loading}
          type="submit"
          className="w-fit bg-gradient-to-tr from-indigo-900 to-gray-800"
          variant={"default"}
          size={"default"}
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2
                className="mr-2 animate-spin duration-300  transition-all w-4 h-4"
                color="white"
              />
              Adding...
            </div>
          ) : (
            "Add"
          )}
        </Button>
      </form>
      <p className="relative shadow rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold w-fit mx-auto">
        {children}
      </p>
    </div>
  );
};

export default StoreApiInput;
