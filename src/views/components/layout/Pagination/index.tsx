import { FC, useRef } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { 
  CgChevronDoubleLeft, 
  CgChevronDoubleRight, 
  CgChevronLeft, 
  CgChevronRight 
} from 'react-icons/cg';
import Select, { SelectRef } from 'views/components/base/Select';
import Input, { InputRef } from 'views/components/base/Input';
import pagingStyle from './style';
import clsx from 'clsx';

export interface IOption {
  value: number, 
  label: string
}
export interface PaginationProps{
  className?: string;
  currentPage?: number;
  totalPage: number;
  onChange?(newPage: number): void;
  limit?: number;
  onLimit?(limit: number): void;
  disabledPageSize?: boolean;
  options? : IOption[]
}

const Pagination: FC<PaginationProps> = props => {

  const classes = pagingStyle();
  const { className, currentPage = 1, totalPage, onChange, limit = 10, onLimit, disabledPageSize = false , options} = props;

  const limitRef = useRef<SelectRef>(null);
  const currentRef = useRef<InputRef>(null);

  const onClickFirst = () => {
    currentPage === 1 || (onChange && onChange(1));
  }

  const onClickPrev = () => {
    currentPage === 1 || (onChange && onChange(currentPage - 1));
  }

  const onClickNext = () => {
    currentPage === totalPage || (onChange && onChange(currentPage + 1));
  }

  const onClickLast = () => {
    currentPage === totalPage || (onChange && onChange(totalPage));
  }

  const onChangePage = () => {
    let newValue = Number(currentRef.current?.getValue()).valueOf();
    if (!newValue || newValue < 1 || newValue === currentPage) newValue = 1;// return;
    onChange && onChange(newValue);
  }

  const onChangeLimit = () => {
    const newLimit = Number(limitRef.current?.getValue()).valueOf();
    if (!newLimit || newLimit === limit) return;
    onLimit && onLimit(newLimit);
  }

  if (totalPage < 0) return null;

  return <nav className={ clsx(classes.root, className) }>
    <div className="flex text-center">
      <div className={ classes.label }>Page size:</div>
      <Select
        ref={ limitRef }
        fullWidth={ false }
        value={ limit }
        className={ classes.limit }
        disabled={ totalPage === 0 ? true : disabledPageSize }
        onChange={ onChangeLimit }
        options={options ?? [
          { value: 10, label: '10' },
          { value: 20, label: '20' },
          { value: 30, label: '30' },
          { value: 40, label: '40' },
          { value: 50, label: '50' },
        ]}
      />
      <ButtonGroup>
        <Button className={ classes.button } disabled={ currentPage === 1 || totalPage === 0 } onClick={ onClickFirst }>
          <CgChevronDoubleLeft />
        </Button>
        <Button className={ classes.button } disabled={ currentPage === 1 || totalPage === 0 } onClick={ onClickPrev }>
          <CgChevronLeft />
        </Button>
      </ButtonGroup>
      <div className="flex items-center">
        <Input 
          ref={ currentRef } 
          value={ totalPage > 0 ? currentPage.toString() : '0' } 
          className={ classes.current } 
          fullWidth={ false }
          onDebounce={ onChangePage }
          sx={{
            width: (36 + (currentPage.toString().length - 1) * 9) + 'px',
          }}
        />
        <span className={ classes.total }> of { totalPage }</span>
      </div>
      <ButtonGroup>
        <Button className={ classes.button } disabled={ currentPage === totalPage || totalPage === 0 } onClick={ onClickNext }>
          <CgChevronRight />
        </Button>
        <Button className={ classes.button } disabled={ currentPage === totalPage || totalPage === 0 } onClick={ onClickLast }>
          <CgChevronDoubleRight />
        </Button>
      </ButtonGroup>
    </div>
  </nav>

}

export default Pagination;