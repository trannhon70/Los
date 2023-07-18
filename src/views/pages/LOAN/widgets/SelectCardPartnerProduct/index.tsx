import { fetchConfigProductCardPartnerProduct } from 'features/loan/card/configs/actions';
import { 
  fetchedLOANCardConfigProductCardCategoryPartner,
  fetchingLOANCardConfigProductCardCategoryPartner,
  getLOANCardConfigProductCardCategoryPartner 
} from 'features/loan/card/configs/products/partner-product/selector';
import { 
  forwardRef, 
  ForwardRefRenderFunction, 
  useEffect, 
  useImperativeHandle, 
  useRef, 
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANCardPartnerProduct } from 'types/models/loan/card/configs/Product';
import Autocomplete, { AutocompleteRef } from 'views/components/base/Autocomplete';

export interface SelectCardPartnerProductRef{
  getPartnerProduct(): ILOANCardPartnerProduct | undefined;
}

export interface SelectCardPartnerProductProps{
  partner: string;
  value?: string;
  disabled?: boolean;
  onChange?(value: string): void;
}

export interface SelectCardPartnerProductComponent
  extends ForwardRefRenderFunction<SelectCardPartnerProductRef, SelectCardPartnerProductProps>{}

const SelectCardPartnerProduct: SelectCardPartnerProductComponent = (props, ref) => {

  const { partner, value, disabled, onChange } = props;

  const fetched = useSelector(fetchedLOANCardConfigProductCardCategoryPartner);
  const fetching = useSelector(fetchingLOANCardConfigProductCardCategoryPartner);
  const Product = useSelector(getLOANCardConfigProductCardCategoryPartner);
  const dispatch = useDispatch();

  const [ CurrentPartner, setCurrentPartner ] = useState<string>(partner);
  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const ProductRef = useRef<AutocompleteRef>(null);

  useEffect(() => {
    setCurrentPartner(partner);
  }, [ partner ]);

  useEffect(() => {
    Current.current = value;
    setCurrentValue(value);
  }, [ value ]);

  useEffect(() => {
    CurrentValue !== Current.current
      && !disabled
      && onChange
      && onChange(CurrentValue ?? '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  useEffect(() => {
    !fetched
      && !fetching
      && CurrentPartner
      && dispatch(fetchConfigProductCardPartnerProduct(CurrentPartner));
  });

  useImperativeHandle(ref, () => ({
    getPartnerProduct(){
      return Product.find(p => p.id === CurrentValue)
    }
  }))

  const changeProduct = () => {
    setCurrentValue(ProductRef.current?.getValue()?.value.toString());
  }
  
  
  return <Autocomplete
    label="II. Sản phẩm theo đối tác"
    disabled={ disabled }
    value={ CurrentValue?.toString() }
    ref={ ProductRef }
    onChange={ changeProduct }
    options={Product.map(product => ({
      value: product.id,
      label: product.name
    }))}
  />

}

export default forwardRef(SelectCardPartnerProduct);