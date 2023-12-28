"use client"
import { useRef} from "react";
import { XCircle } from 'lucide-react';
import { Search } from 'lucide-react';
import { type } from "os";
// const games = window.document.querySelectorAll('.game');

type Props = {
    handleSearch: (inputTitle: string) => void;
    handleClear: () => void;
    className?: string;
  };

function SearchBar({ handleSearch, handleClear, className }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className={"flex justify-end items-center gap-0.5 px-2 py-1 mr-2 text-left text-md text-border"+className}>
            <input
                type="text"
                name="inputTitle"
                placeholder="Search title..."
                className="mx-2 p-1 border-2 border-gray-300 bg-accent/30 rounded"
                ref={inputRef}
            />
            <button 
            className=" mr-2"
            onClick={async() => {
                handleSearch(inputRef.current?.value || '');
                }}>
                <Search className="transition-all hover:text-muted-foreground"/>
            </button>
            <button onClick={async()=>{
                handleClear();
                inputRef.current!.value = '';
                }}>
                <XCircle className="transition-all hover:text-muted-foreground"/>
            </button>
      </div>
      

    )
 
}
export default SearchBar;