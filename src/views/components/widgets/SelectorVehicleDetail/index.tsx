import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import useMasterData from 'app/hooks/useMasterData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfigVehicleDetail } from 'features/loan/normal/configs/actions';
import { getLOANNormalConfigVehicleDetail } from 'features/loan/normal/configs/vehicle-detail/selectors';

export interface SelectorVehicleDetailProps{
  transportType?: string;
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  disabled?: boolean;
  onChange?(value: string) : void;
  placeholder?: string;
}

const SelectorVehicleDetail: FC<SelectorVehicleDetailProps> = props => {

  const { label, required, message, value, onChange, transportType, disabled, placeholder } = props;
  const dispatch = useDispatch()
  const [ CurrentTransportType, setCurrentTransportType ] = useState<string | undefined>(transportType);
  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const vehicleDetail = useSelector(getLOANNormalConfigVehicleDetail)
  // const { VehicleDetail, register } = useMasterData();

  useEffect(() => {
    CurrentTransportType && dispatch(fetchConfigVehicleDetail(CurrentTransportType))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentTransportType]);


  useEffect(() => {
    setCurrentTransportType(transportType);
  }, [ transportType ]);

  useEffect(() => {
    Current.current = value;
    setCurrentValue(value);
  }, [ value ]);

  useEffect(() => {
    if (CurrentValue !== Current.current){
      Current.current = CurrentValue;
      onChange && onChange(CurrentValue ?? '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  

  const changeSelect = (value: string) => {
    setCurrentValue(value);
  }

  const options = vehicleDetail?.data?.map(d => ({ value: d.id, label: d.name }));

  return <Autocomplete
    label={ label }
    required={ required }
    value={ CurrentValue }
    message={ message }
    onChange={ changeSelect }
    options={ options }
    disabled={disabled }
    placeholder={placeholder}
  />

}

export default SelectorVehicleDetail;