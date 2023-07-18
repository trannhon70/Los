import { fetchConfigProductCardPartnerCode } from 'features/loan/card/configs/actions';
import { fetchedLOANCardConfigProductCategoryPartnerCode, fetchingLOANCardConfigProductCategoryPartnerCode, getLOANCardConfigProductCategoryPartnerCode } from 'features/loan/card/configs/products/partner-code/selector';
import { 
  forwardRef, 
  ForwardRefRenderFunction, 
  useEffect, 
  useImperativeHandle, 
  useRef, 
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANCardPartnerCodeList } from 'types/models/loan/card/configs/Product';
import Autocomplete, { AutocompleteRef } from 'views/components/base/Autocomplete';

export interface SelectCardPartnerCodeRef{
  getPartnerCode(): ILOANCardPartnerCodeList | undefined;
}

export interface SelectCardPartnerCodeProps{
  product: string;
  value?: string;
  disabled?: boolean;
  onChange?(value: string): void;
}

export interface SelectCardPartnerCodeComponent
  extends ForwardRefRenderFunction<SelectCardPartnerCodeRef, SelectCardPartnerCodeProps>{}

const SelectCardPartnerCode: SelectCardPartnerCodeComponent = (props, ref) => {

  const { product, value, disabled, onChange } = props;

  const fetched = useSelector(fetchedLOANCardConfigProductCategoryPartnerCode);
  const fetching = useSelector(fetchingLOANCardConfigProductCategoryPartnerCode);
  const Partner = useSelector(getLOANCardConfigProductCategoryPartnerCode);
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
      && dispatch(fetchConfigProductCardPartnerCode(CurrentProduct))
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
    label="I. Mã đối tác"
    disabled={ disabled }
    ref={ PartnerRef }
    value={ CurrentValue }
    onChange={ changePartner }
    options={Partner.map(partner => ({ 
      value: partner.id,
      label: partner.name
    }))}
  />

}

export default forwardRef(SelectCardPartnerCode);