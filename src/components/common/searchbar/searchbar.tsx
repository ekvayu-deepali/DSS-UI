import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Popover, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
    SearchContainer,
    SearchPaper,
    SearchInputBase,
    SearchIconButton,
    FilterIconButton,
    FilterPopoverBox
} from './searchbar.style';

interface SearchBarProps {
    onSearch?: (searchTerm: string, filters: string[]) => void;
    placeholder?: string;
}

const FILTER_OPTIONS = [
    { label: 'Document ID', value: 'documentId' },
    { label: 'Document Type', value: 'documentType' },
    { label: 'Creator Name', value: 'creatorName' },
    { label: 'Creator ID', value: 'creatorId' },
    { label: 'Status', value: 'status' }
];

const SearchBar: React.FC<SearchBarProps> = ({ 
    onSearch = () => {}, 
    placeholder = 'Search...' 
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<string[]>(FILTER_OPTIONS.map(opt => opt.value));

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleFilterChange = (value: string) => {
        setSelectedFilters(prev => {
            if (prev.includes(value)) {
                return prev.filter(item => item !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const handleSearchClick = () => {
        onSearch(searchTerm, selectedFilters);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        
        // If the input is cleared (empty), trigger search to show all data
        if (newValue === '') {
            onSearch('', selectedFilters);
        }
    };

    return (
        <SearchContainer>
            <SearchPaper
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                }}
            >
                <SearchInputBase
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <FilterIconButton
                    onClick={handleFilterClick}
                    size="small"
                >
                    <FilterListIcon />
                </FilterIconButton>
                <SearchIconButton
                    onClick={handleSearchClick}
                    size="small"
                >
                    <SearchIcon />
                </SearchIconButton>
            </SearchPaper>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleFilterClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <FilterPopoverBox>
                    <FormControl component="fieldset">
                        <FormGroup>
                            {FILTER_OPTIONS.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    control={
                                        <Checkbox
                                            checked={selectedFilters.includes(option.value)}
                                            onChange={() => handleFilterChange(option.value)}
                                            size="small"
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                </FilterPopoverBox>
            </Popover>
        </SearchContainer>
    );
};

export default SearchBar;
