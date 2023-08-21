"use client";

import axios from "axios";
import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const SubscriptionButton = ({
  title,
  price,
  description,
}: {
  title: string;
  description: string;
  price: number | string;
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `/api/stripe?title=${title}&description=${description}&price=${price}`
      );

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button size="sm" variant={"default"} disabled={loading} onClick={onClick}>
      Buy Now
      <Sparkles className="w-4 h-4 ml-2 fill-white" />
    </Button>
  );
};
