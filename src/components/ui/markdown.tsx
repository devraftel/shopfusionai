"use client";
import React, { FC, memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { cn, extractProductDetails } from "@/lib/utils";
import { SubscriptionButton } from "../CheckoutButton";
import { useToast } from "./use-toast";
import axios from "axios";
import { Loader2, Sparkles } from "lucide-react";

interface MarkdownProps extends ReactMarkdownOptions {
  role?: "user" | "ai";
  title?: string;
  description?: string;
  price?: string | number;
}

const Markdown: FC<MarkdownProps> = memo(
  ({ role, children, title, description, price, ...props }) => {
    const productDetails = extractProductDetails(children || "");
    console.log("[PRODUCT_DERAILS]", productDetails);

    const redirectToCheckout = () => {
      const params = new URLSearchParams(productDetails).toString();
      window.location.href = `/checkout?${params}`;
    };

    const allDetailsPresent =
      productDetails.title ||
      productDetails.description ||
      productDetails.category ||
      productDetails.image ||
      productDetails.price;

    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/api/stripe?title=${
            productDetails.title ? productDetails.title : "My Product"
          }&price=${productDetails.price}&category=${
            productDetails.category ? productDetails.category : "Just For You"
          } &image=${productDetails.image}`
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
      <div>
        <ReactMarkdown
          components={{
            // img: ({ node, ...innerProps }) => (
            //   <div>
            //     <img {...innerProps} />
            //     {allDetailsPresent && (
            //       <div className="w-full p-2 my-2 overflow-auto bg-black rounded-lg bg-black/10">
            //         <button
            //           className="bg-primary text-primary-foreground shadow hover:bg-primary/90"
            //           onClick={redirectToCheckout}
            //         >
            //           Buy Now
            //         </button>
            //       </div>
            //     )}
            //   </div>
            // ),

            // button: () => (
            //   <div className="w-full p-2 my-2 overflow-auto bg-black rounded-lg bg-black/10">
            //     <button
            //       className="bg-primary text-primary-foreground shadow hover:bg-primary/90"
            //       onClick={redirectToCheckout}
            //     >
            //       Buy Now
            //     </button>
            //   </div>
            // ),
            pre: ({ node, ...innerProps }) => (
              <div className="w-full p-2 my-2 overflow-auto bg-black rounded-lg bg-black/10">
                <pre {...innerProps} />
              </div>
            ),
            code: ({ node, ...innerProps }) => (
              <code className="p-1 rounded-lg bg-black/10" {...innerProps} />
            ),
          }}
          className={cn(
            "overflow-hidden text-sm leading-7",
            role === "user"
              ? "text-gray-800 bg-gray-400/30 rounded-lg px-2 py-1"
              : "text-white bg-slate-900 rounded-lg px-2 py-1"
          )}
          {...props}
        >
          {children || ""}
        </ReactMarkdown>
        {allDetailsPresent && (
          <div className="flex items-center font-semibold text-sm md:text-base justify-center w-full p-2 my-2 overflow-auto bg-black rounded-lg bg-primary text-primary-foreground shadow hover:bg-primary/90">
            <button
              onClick={onClick}
              type="button"
              className="flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 fill-white animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2 fill-white" />
              )}
              <span>Buy Now</span>
            </button>
          </div>
        )}
      </div>
    );
  }
);

Markdown.displayName = "Markdown";

export { Markdown };
