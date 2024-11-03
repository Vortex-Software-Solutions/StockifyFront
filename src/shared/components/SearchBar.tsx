import { IoMdSearch } from "react-icons/io";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    onSearch: () => void;
    placeholder?: string; 
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch, placeholder = "Buscar..." }) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSearch();
    };

    return (
        <div className="flex items-center gap-2 relative font-normal">
            <input
                type="text"
                placeholder={placeholder}
                className="border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-2 pr-9 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <IoMdSearch size={24} className="cursor-pointer absolute right-2 text-gray-400" onClick={onSearch} />
        </div>
    );
};

export default SearchBar;

/* Ejemplo de uso:

En lista de usuarios

<SearchBar
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    onSearch={handleSearchClick}
    placeholder="Buscar usuarios"
/>

En lista de productos

<SearchBar
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    onSearch={handleSearchClick}
    placeholder="Buscar productos"
/> */