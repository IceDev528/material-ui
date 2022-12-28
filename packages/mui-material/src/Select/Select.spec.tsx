import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function genericValueTest() {
  function handleChangeWithSameTypeAsSelect(event: SelectChangeEvent<number>) {}
  <Select<number> onChange={handleChangeWithSameTypeAsSelect} />;

  function handleChangeWithDifferentTypeFromSelect(
    event: React.ChangeEvent<{ name?: string; value: string }>,
  ) {}
  <Select<number>
    // @ts-expect-error
    onChange={handleChangeWithDifferentTypeFromSelect}
  />;

  <Select<string>
    // @ts-expect-error defaultValue should be a string
    defaultValue={1}
    // @ts-expect-error Value should be a string
    value={10}
  />;

  <Select
    onChange={(event) => {
      function testString(value: string) {}
      function testNumber(value: number) {}

      testString(event.target.value);
      // @ts-expect-error
      testNumber(event.target.value);
    }}
    value="1"
  />;

  <Select onChange={(event) => console.log(event.target.value)} value="1">
    <MenuItem value="1" />
    {/* Whoops. The value in onChange won't be a string */}
    <MenuItem value={2} />
  </Select>;

  // notched prop should be available (inherited from OutlinedInputProps) and NOT throw typescript error
  <Select notched />;

  // disabledUnderline prop should be available (inherited from InputProps) and NOT throw typescript error
  <Select disableUnderline />;
}

function App() {
  enum MyEnum {
    FIRST = 'first',
    SECOND = 'second',
  }

  const [selectedValue, setSelectedValue] = React.useState<MyEnum | ''>('');
  const [personName, setPersonName] = React.useState<string[]>([]);

  return (
    <React.Fragment>
      {/* displayEmpty is true */}
      <Select
        renderValue={(value) => {
          if (value === '') {
            return 'None selected';
          }
          return value;
        }}
        displayEmpty
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value as MyEnum)}
      >
        <MenuItem value="">
          <em>Blank</em>
        </MenuItem>
        <MenuItem value="first">first</MenuItem>
        <MenuItem value="second">second</MenuItem>
      </Select>

      {/* displayEmpty is false */}
      <Select
        renderValue={(value) => {
          // @ts-expect-error value cannot be empty string since displayEmpty is false
          if (value === '') {
            return 'None selected';
          }
          return value;
        }}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value as MyEnum)}
      >
        <MenuItem value="">
          <em>Blank</em>
        </MenuItem>
        <MenuItem value="first">first</MenuItem>
        <MenuItem value="second">second</MenuItem>
      </Select>

      {/* displayEmpty is true, multiple is true */}
      <Select
        displayEmpty
        multiple
        renderValue={(value) => {
          // @ts-expect-error value cannot be empty string
          if (value === '') {
            return 'None selected';
          }

          if (value.length === 0) {
            return <em>Placeholder</em>;
          }

          return value.join(', ');
        }}
        value={personName}
        onChange={(e) => setPersonName(e.target.value as string[])}
      >
        <MenuItem value="">
          <em>Blank</em>
        </MenuItem>
        <MenuItem value="Oliver Hansen">Oliver Hansen</MenuItem>
        <MenuItem value="Van Henry">Van Henry</MenuItem>
      </Select>
    </React.Fragment>
  );
}
