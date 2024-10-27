"use client";
import { SearchManufacturerProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

type Props = {};

export default function SearchManufacturer({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) {
  const [query, setQuery] = useState("");
  return (
    <div className="search-manufacturer">
      <Combobox
        value={manufacturer}
        onChange={setManufacturer}
        onClose={() => setQuery("")}
      >
        <div className="relative w-full">
          {/* Button for the combobox. Click on the icon to see the complete dropdown */}
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="car logo"
            />
          </Combobox.Button>

          {/* Input field for searching */}
          <Combobox.Input
            className="search-manufacturer__input"
            displayValue={(item: string) => item}
            // onChange={(event) => setQuery(event.target.value)} // Update the search query when the input changes
            placeholder="Volkswagen..."
          />

          {/* Transition for displaying the options */}
        </div>
      </Combobox>
    </div>
  );
}
