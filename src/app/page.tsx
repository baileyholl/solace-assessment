"use client";

import AdvocateTable from "@/app/AdvocateTable";
import useDebounce from "@/app/debounce";
import React from "react";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      searchFilteredAdvocates('')
  }, []);

  const searchFilteredAdvocates = (input: string) => {
      const fetchAdvocates = async () => {
          const searchParams = new URLSearchParams({
              searchTerm: input.toLowerCase().trim(),
          }).toString()
          const res = await fetch(`/api/advocates?${input.trim() ? searchParams : ''}`).catch((error: unknown) =>{
              console.error("Error fetching advocates", error);
          });
          if(!res)
              return
          const data = await res.json();
          setAdvocates(data.data);
      };
      void fetchAdvocates();
  }

  // A delayed effect hook that will run after the user has stopped typing for 300ms
  useDebounce(() =>{
      searchFilteredAdvocates(searchTerm);
  }, [searchTerm], 300)

  const onChange = (e: React.ChangeEvent<HTMLInputElement >) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const resetSearch = () => {
    setSearchTerm("")
  };

  return (
      <main className="px-6 py-10 font-sans bg-gray-50 min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Solace Advocates</h1>

          <div className="shadow-sm p-6 rounded-lg max-w-2xl mb-10">
              <label htmlFor="search-input" className="block text-lg font-medium text-gray-700 mb-2">
                  Search for an Advocate
              </label>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                      id="search-input"
                      type="text"
                      placeholder="Search by name, city, specialty, or experience..."
                      className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                      onChange={onChange}
                      value={searchTerm}
                  />

                  <button
                      className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md transition"
                      onClick={resetSearch}
                  >
                      Reset
                  </button>
              </div>

              {searchTerm && (
                  <p className="text-sm text-gray-500 mt-2">
                      Searching for: <span className="font-medium text-gray-700">{searchTerm}</span>
                  </p>
              )}
          </div>
          <AdvocateTable advocates={advocates}/>
      </main>
  );
}
