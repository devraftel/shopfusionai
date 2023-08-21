"use client";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DummyStoreAPIList = () => {
  const { toast } = useToast();
  return (
    <div className="my-6 overflow-x-auto sm:overflow-x-visible container">
      <div className="px-2 py-1 flex flex-col items-center">
        <h2 className="font-bold text-2xl text-center  leading-[1.1] sm:text-2xl md:text-3xl">
          Store Test APIs
        </h2>
        <small className="text-sm font-medium leading-none text-center mt-1">
          To get started add your store API key to the input above or use one of
          the test APIs below.
        </small>
      </div>

      <div className="my-4 w-full overflow-y-auto">
        <table className="mx-auto">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Store Name
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                API Key
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Fake Store API
              </td>
              <td className="border px-4 py-2 text-left flex gap-x-2 items-center [&[align=center]]:text-center [&[align=right]]:text-right">
                https://fakestoreapi.com/products
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://fakestoreapi.com/products"
                    );
                    toast({
                      title: "API key Copied",
                    });
                  }}
                  size={"icon"}
                  variant={"outline"}
                  className="ml-auto"
                >
                  <Copy className="w-5 h-5" size={20} />
                </Button>
              </td>
            </tr>
            {/* <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                dummyJSON
              </td>
              <td className="border px-4 py-2 gap-x-2 flex items-center text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                https://dummyjson.com/products
                <Button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "https://dummyjson.com/products"
                    )
                  }
                  size={"icon"}
                  variant={"outline"}
                  className="ml-auto"
                >
                  <Copy className="w-5 h-5" size={20} />
                </Button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DummyStoreAPIList;
