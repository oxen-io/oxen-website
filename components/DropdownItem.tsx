import classNames from 'classnames';

// Simplest use is to define your options and map over them to product JSX and your desired onSelect; eg:
// options?.map(option => <DropdownItem onSelect={() => setDropdownItem(option.key)})}</Dropdown>
export interface DropdownItemProps {
  id: string;
  selected?: boolean;
  onSelect?(): void;
  style?: 'default' | 'outline';
  children: JSX.Element | JSX.Element[] | string;
}

export const DropdownItem = (props: DropdownItemProps) => {
  const { id, children, onSelect, selected = false, style = 'default' } = props;

  const handleOnSelect = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div
      onClick={() => handleOnSelect()}
      className={classNames(
        'flex items-center',
        'block',
        'font-roboto text-sm text-primary',
        'hover:text-opacity-100 text-opacity-75',
        'select-none',
        'cursor-pointer',
        style === 'default' &&
          'border-b border-secondary font-semibold py-2 mx-3',
        style === 'outline' && ['pl-4', 'pr-6', 'py-1'],
        selected && 'bold text-opacity-100',
      )}
    >
      {children}
    </div>
  );
};
