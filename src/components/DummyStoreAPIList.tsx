"use client";
import React from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

const DummyStoreAPIList = () => {
  return (
    <div className="my-6">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center underline">
        Dummy Store API
      </h3>
      <div className="my-4 w-full overflow-y-auto">
        <table className="w-full">
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
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "https://fakestoreapi.com/products"
                    )
                  }
                  size={"icon"}
                  variant={"outline"}
                  className="ml-auto"
                >
                  <Copy className="w-5 h-5" size={20} />
                </Button>
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                dummy JSON
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DummyStoreAPIList;
