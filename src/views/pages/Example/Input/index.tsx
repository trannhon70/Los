import { FC, useRef, useState } from 'react';
import Input, { InputRef } from 'views/components/base/Input';

const ExampleInput: FC = () => {

  const inputRef = useRef<InputRef>(null);
  const [ value, setValue ] = useState<string | undefined>("");

  const change = () => {
    setValue(inputRef.current?.getValue());
  }

  const debounce = () => {
    setValue(inputRef.current?.getValue());
  }

  return <div className="bg-white p-8 mt-3 shadow">
    <Input 
      value={ value } 
      onChange={ change } 
      ref={ inputRef } 
      onDebounce={ debounce }
      type="number"
      format
    />

  </div>

}

export default ExampleInput;