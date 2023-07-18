import { 
  forwardRef, 
  ForwardRefRenderFunction, 
  useEffect, 
  useImperativeHandle, 
  useRef, 
  useState 
} from 'react';
import { 
  fetchedLOANNormalConfigProductPartnerCode,
  fetchingLOANNormalConfigProductPartnerCode, 
  getLOANNormalConfigProductPartnerCode 
} from 'features/loan/normal/configs/product/partner-code/selectors';
import { fetchLOANNormalConfigProductPartnerCode } from 'features/loan/normal/configs/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalPartnerCodeList } from 'types/models/loan/normal/configs/Product';
import Autocomplete, { AutocompleteRef } from 'views/components/base/Autocomplete';

export interface SelectNormalPartnerCodeRef{
  getPartnerCode(): ILOANNormalPartnerCodeList | undefined;
}

export interface SelectNormalPartnerCodeProps{
  product: string;
  value?: string;
  disabled?: boolean;
  onChange?(value: string): void;
  message?: string
}

export interface SelectNormalPartnerCodeComponent
  extends ForwardRefRenderFunction<SelectNormalPartnerCodeRef, SelectNormalPartnerCodeProps>{}

const SelectNormalPartnerCode: SelectNormalPartnerCodeComponent = (props, ref) => {

  const { product, value, disabled, onChange, message } = props;

  const fetched = useSelector(fetchedLOANNormalConfigProductPartnerCode);
  const fetching = useSelector(fetchingLOANNormalConfigProductPartnerCode);
  const Partner = useSelector(getLOANNormalConfigProductPartnerCode);
  const dispatch = useDispatch();

  const [ CurrentProduct, setCurrentProduct ] = useState<string>(product);
  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const PartnerRef = useRef<AutocompleteRef>(null);

  useEffect(() => {
    setCurrentProduct(product);
  }, [ product ]);

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
      && CurrentProduct
      && dispatch(fetchLOANNormalConfigProductPartnerCode(CurrentProduct))
  });

  useImperativeHandle(ref, () => ({
    getPartnerCode(){
      return Partner.find(p => p.id === CurrentValue)
    }
  }))

  const changePartner = () => {
    setCurrentValue(PartnerRef.current?.getValue()?.value.toString())
  }
  
  return <Autocomplete
    label="II. Mã đối tác"
    disabled={ disabled }
    ref={ PartnerRef }
    value={ CurrentValue }
    onChange={ changePartner }
    options={Partner.map(partner => ({ 
      value: partner.id,
      label: partner.name
    }))}
    message={message}
  />

}

export default forwardRef(SelectNormalPartnerCode);