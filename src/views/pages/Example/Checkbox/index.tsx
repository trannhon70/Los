import { ForwardRefRenderFunction, useEffect, useState } from 'react'
import { useRef, ReactNode } from 'react';
import useMasterData from 'app/hooks/useMasterData';
import Checkbox, { CheckboxRef } from 'views/components/base/Checkbox';
import checboxListStyles from './style';
import clsx from 'clsx';
import LabelView from 'views/components/base/LabelView';
import { Button } from '@mui/material';
import ModalCheckConfirm from 'views/pages/LOAN/widgets/ModalCheckConfirm';

interface Props {
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: Dos[];
  onChange?(value: string): void;
  disabled?: boolean;
}

interface Dos {
  id: string;
  other_value_flag: string;
}
export interface CheckBoxRef {
  getValue(): Dos[];
}

export type CheckBoxComponent = ForwardRefRenderFunction<
  CheckBoxRef,
  Props
>;

const CheckboxList: CheckBoxComponent = (props, ref) => {
  const { ListLegalDocument, register } = useMasterData();
  
  useEffect(() => {
    register('listLegalDocument')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const checkboxRef = useRef<CheckboxRef>(null)

  const classes = checboxListStyles()

  const ILegalDoc = [
    {
      id: 'CERT',
      documents: [

      ]
    },
    {
      id: 'DECL',
      documents: [{
        id: "DECL_1",
        other_value_flag: "N"
      },
      {
        id: "DECL_2",
        other_value_flag: "N"
      }]
    }
  ]

  const renderCheckbox = () => {
    let rs = [<></>]
    ListLegalDocument.forEach((value, index) => {
      rs = [...rs, <Checkbox
        className={clsx(classes.root)}
        key={index}
        options={value.list?.map(listItem => ({
          label: listItem.document_name,
          checked: listItem.document_code === ILegalDoc.find(j => j.id === value.legal_document_code)?.documents.find(i => i.id === listItem.document_code)?.id,
          value: listItem.document_code,
        })).reverse().concat([{
          label: value.legal_document_name,
          checked: value.legal_document_code === ILegalDoc.find(j => j.id === value.legal_document_code)?.id,
          value: value.legal_document_code,
        }
        ]).reverse()
        }
        ref={checkboxRef}
      // onChange={handleChange}
      />]
    })
    return rs
  }

  const [labelView1, setLabdelView1] = useState<string>("");
  const [labelView2, setLabdelView2] = useState<string>("");
  const [labelView3, setLabdelView3] = useState<string>("");
  const [isConfim, setIsConfirm] = useState<boolean>(false);
  const onHandleCloseConfim = () => setIsConfirm(false);
  const [i, setI] = useState<number>(0);

  const onClickTest = () => {

    setLabdelView1(`labelView1 - ${i}`)
    setLabdelView2(`200000000000`)
    setLabdelView3("")
    setI(i + 1)
  }

  return (
    <>
      {/* {
                renderCheckbox()
            } */}

      <div className="bg-white p-8 mt-3 shadow">
        <LabelView
          disabled
          required
          label='1. Mã báo cáo/Chứng thư thẩm định giá'
          type='selector'
          value={labelView1}
        />
        <div className='pt-3 pb-3'></div>
        <LabelView
          disabled
          required
          label='1. Mã báo cáo/Chứng thư thẩm định giá'
          type='selector'
          value={labelView2}
          placeholder='Mảng TĐTS Miền Trung - Tây Nguyên'
          format
        />
        <div className='pt-3 pb-3'></div>
        <LabelView
          disabled
          required
          label='1. Mã báo cáo/Chứng thư thẩm định giá'
          type='date'
          value={labelView3}
        />
        <div className='pt-3 pb-3'></div>
        <button onClick={onClickTest}>Click</button>
        <Button
          onClick={() => {setIsConfirm(true) }}
        >Check Kiểm Soát</Button>
        <ModalCheckConfirm
          onClose={onHandleCloseConfim}
          onSave={() => { }}
          open={isConfim}
        >
         

        </ModalCheckConfirm>

      </div>




    </>
  )
}

export default CheckboxList
