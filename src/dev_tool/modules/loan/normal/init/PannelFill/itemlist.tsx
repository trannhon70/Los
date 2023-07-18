import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMasterData from 'app/hooks/useMasterData';
import { autofillAllLegal, autofillBorrower, saveLegalBorrower } from 'features/loan/normal/storage/legal/actions';
import { autoFillBussiness, autoFillFinance, autoFillNeedAndPlan, autoFillStepA, saveLoanProduct } from 'features/loan/normal/storage/loan/actions';
import { FC, memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { autoFillAllCIC, autoFillAllCICSCB } from '../CIC/action';
import { AUTOFILLCIC } from '../CIC/slice';
import {
  autoFillAllCollateral, autoFillCollateralBalc, autoFillCollateralDepartment, autoFillCollateralMachine, autoFillCollateralMarket,
  autoFillCollateralMEST, autoFillCollateralOther, autoFillCollateralProd,
  autoFillCollateralStoc
} from '../collateral/action';
import { autoFillAllIncome } from '../income/action';
import { AUTO_ALL_INCOME } from '../income/slice';
import { AUTO_ALL_LEGAL } from '../legal/slice';
import { IDataFillPanel } from './dataPanel';


interface IItemListProps {
  data: IDataFillPanel;
}

const Itemlist: FC<IItemListProps> = (props) => {

  const { data } = props
  const { CreditInstitution, register } = useMasterData(); 
  
  useEffect(() => {
    register('creditInstitution')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const ramdomCredit = CreditInstitution[Math.floor(Math.random()*CreditInstitution.length)]?.code;
  const dispatch = useDispatch();

  const [clickColl, setClickColl] = useState<(string | number)[]>([]);
  if (
    process.env.NODE_ENV !== 'development' &&
    sessionStorage.getItem('enabledDevTool') !== 'allowed'
  ) return null;

  const clickCollapse = (id: string | number) => () => {
    let temp = [...clickColl];
    let idx = temp.indexOf(id);
    if (idx === -1) {
      temp.push(id);
    } else {
      temp.splice(idx, 1);
    }
    setClickColl(temp);
  };
  const onClickBtn = (item:string) => {
    switch (item){
      case "LEGAL_BORROWER":
        dispatch(autofillBorrower(""))
        dispatch(saveLegalBorrower(true))
        break;
      case "LEGAL_FULL":
        dispatch(autofillAllLegal(""))
        dispatch(AUTO_ALL_LEGAL(true))
        break;
      case "CIC_FULL":
        dispatch(autoFillAllCIC(ramdomCredit.toString()))
        dispatch(AUTOFILLCIC("",{organ:"",position:""}))
        break;
      case "CIC_FULL_SCB":
        dispatch(autoFillAllCICSCB(""))
        break;
      case "LOAN_A":
        dispatch(autoFillStepA(''))
        dispatch(saveLoanProduct("product"))
        break;
      case "LOAN_B":
        dispatch(autoFillNeedAndPlan(''))
        dispatch(saveLoanProduct("need-and-plan"))
        break;
      case "LOAN_C":
        dispatch(autoFillBussiness(''))
        dispatch(saveLoanProduct("business/household-legal"))
        break;
      case "LOAN_D":
        dispatch(autoFillFinance(''))
        dispatch(saveLoanProduct("business/finance-analysis"))
        break;
      case "FULL_INCOME":
        dispatch(autoFillAllIncome(""))
        dispatch(AUTO_ALL_INCOME("",""))
        break;

      case "COLLATERAL_LAND":
        dispatch(autoFillAllCollateral(""))
        break;
      case "COLLATERAL_MARKET":
        dispatch(autoFillCollateralMarket("")) 
        break;
      case "COLLATERAL_DEPARTMENT":
        dispatch(autoFillCollateralDepartment("")) 
        break;
      case "PTVT":
        dispatch(autoFillCollateralMEST(""))
        break;
      case "MACHINE":
        dispatch(autoFillCollateralMachine(""))
        break;
      case "GODS":
        dispatch(autoFillCollateralProd(""))
        break;
      case "OTHER":
        dispatch(autoFillCollateralOther("")) 
        break;
      case "PROPERTY":
        dispatch(autoFillCollateralProd(""))
        break;
      case "STOCK":
        dispatch(autoFillCollateralStoc(""))
        break;
      case "DEPOSIT":
        dispatch(autoFillCollateralBalc(""))
        break;
    

    }
  }


  return (
    <>
      {
        (() => {
          let isOpen = clickColl.includes(data.id);
          if (data.children.length) {
            return <>
              <ListItemButton onClick={clickCollapse(data.id ?? '')} sx={{ bgcolor: 'var(--mscb-primary)!important', color: '#fff' }}>
                <ListItemIcon>
                  <InboxIcon sx={{ color: '#2566e8' }} />
                </ListItemIcon>
                <ListItemText primary={data.name} />
                <ChevronRightIcon
                  sx={{
                    transition: 'all ease 0.3s',
                    ...(isOpen ? {
                      transform: 'rotate(90deg)'
                    } : {})
                  }}
                />
              </ListItemButton>
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {data.children.map((data) => {
                  if (data.content) {
                    return <div style={{ height: "70px" }}>
                      <Box className="p-4">
                        <Button
                          variant="contained"
                          className="ml-4 rounded-0"
                          color="primary"
                          onClick={() => { onClickBtn(data.code)}}
                          sx={{ minWidth: '100px' }}
                        >{data.name}</Button>
                      </Box>
                    </div>
                  } else {
                    return <>
                      <Itemlist data={data} />
                    </>
                  }
                })}
              </Collapse>
            </>
          }
          return (
            <>
              <ListItemButton onClick={clickCollapse(data.id ?? '')} sx={{ bgcolor: 'var(--mscb-primary)!important', color: '#fff' }}>
                <ListItemIcon>
                  <InboxIcon sx={{ color: '#2566e8' }} />
                </ListItemIcon>
                <ListItemText primary={data.name} />

                <ChevronRightIcon
                  sx={{
                    transition: 'all ease 0.3s',
                    ...(isOpen ? {
                      transform: 'rotate(90deg)'
                    } : {})
                  }}
                />
              </ListItemButton>
              <Collapse in={isOpen} timeout="auto" unmountOnExit>

              </Collapse>
            </>
          )
        })()
      }

    </>
  )
}

export default memo(Itemlist);
