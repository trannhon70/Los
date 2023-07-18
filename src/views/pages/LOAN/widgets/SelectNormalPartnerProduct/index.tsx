import { 
  forwardRef, 
  ForwardRefRenderFunction, 
  useEffect, 
  useImperativeHandle, 
  useRef, 
  useState 
} from 'react';
import { 
  fetchedLOANNormalConfigProductPartnerProduct, 
  fetchingLOANNormalConfigProductPartnerProduct, 
  getLOANNormalConfigProductPartnerProduct 
} from 'features/loan/normal/configs/product/partner-product/selectors';
import { fetchLOANNormalConfigProductPartnerProduct } from 'features/loan/normal/configs/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalPartnerProduct } from 'types/models/loan/normal/configs/Product';
import Autocomplete, { AutocompleteRef } from 'views/components/base/Autocomplete';

export interface SelectNormalPartnerProductRef{
  getPartnerProduct(): ILOANNormalPartnerProduct | undefined;
}

export interface SelectNormalPartnerProductProps{
  partner: string;
  value?: string;
  disabled?: boolean;
  onChange?(value: string): void;
  message?: string;
}

export interface SelectNormalPartnerProductComponent
  extends ForwardRefRenderFunction<SelectNormalPartnerProductRef, SelectNormalPartnerProductProps>{}

const SelectNormalPartnerProduct: SelectNormalPartnerProductComponent = (props, ref) => {

  const { partner, value, disabled, onChange, message } = props;

  const fetched = useSelector(fetchedLOANNormalConfigProductPartnerProduct);
  const fetching = useSelector(fetchingLOANNormalConfigProductPartnerProduct);
  const Product = useSelector(getLOANNormalConfigProductPartnerProduct);
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
      && dispatch(fetchLOANNormalConfigProductPartnerProduct(CurrentPartner));
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
    label="III. Sản phẩm theo đối tác"
    disabled={ disabled }
    value={ CurrentValue?.toString() }
    ref={ ProductRef }
    onChange={ changeProduct }
    options={Product.map(product => ({
      value: product.id,
      label: product.name
    }))}
    message={message}
  />

}

export default forwardRef(SelectNormalPartnerProduct);