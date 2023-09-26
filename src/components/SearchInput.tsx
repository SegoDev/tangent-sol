import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ onChange }: SearchInputProps) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color={'white'} />
      </InputLeftElement>
      <Input type="text" color='white' placeholder='Search employees' onChange={onChange} />
    </InputGroup>
  );
};

export default SearchInput;
