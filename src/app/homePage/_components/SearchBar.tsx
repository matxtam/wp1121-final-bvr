"use client"
import { useRef} from "react";
import { XCircle } from 'lucide-react';
import { Search } from 'lucide-react';
import { type } from "os";
// const games = window.document.querySelectorAll('.game');

type Props = {
    handleSearch: (inputTitle: string) => void;
    handleClear: () => void;
  };

function SearchBar({ handleSearch, handleClear }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="flex justify-end items-center gap-0.5 px-2 py-1 mr-2 text-left text-md text-blue-400">
            <b>Search Title: </b>
            <input
                type="text"
                name="inputTitle"
                placeholder="Enter Title"
                className="mx-2 p-1 border border-gray-300 rounded"
                ref={inputRef}
            />
            <button 
            className=" mr-2"
            onClick={async() => {
                handleSearch(inputRef.current?.value || '');
                }}>
                <Search />
            </button>
            <button onClick={async()=>{
                handleClear();
                inputRef.current!.value = '';
                }}>
                <XCircle />
            </button>
      </div>
      

    )
 
}
export default SearchBar;