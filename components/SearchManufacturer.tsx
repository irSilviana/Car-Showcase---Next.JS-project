'use client';

import { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { SearchManufacturerProps } from '@/types';
import React from 'react';
import Image from 'next/image';
import { manufacturers } from '@/constants';

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState('');

  const filteredManufacturers =
    query === '' // If the search query is empty
      ? manufacturers // Return all manufacturers
      : manufacturers.filter(
          (
            item // return manufacturer that includes query value
          ) =>
            item
              .toLowerCase() // convert manufacturer name to lowercase
              .replace(/\s+/g, '') // remove whitespace from manufacturer name
              .includes(query.toLowerCase().replace(/\s+/g, '')) // check if the manufacturer name includes the search query
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              alt="Car logo"
              className="ml-4"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Manufacturer"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* Transition for displaying the options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options
              className="search-manufacturer__options z-10"
              static
            >
              {filteredManufacturers.length === 0 && query != '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    value={item}
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? 'bg-primary-blue text-white' : 'text-gray-900 '
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
