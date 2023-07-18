import { FC, useRef, } from 'react';
import Input, { InputRef } from "views/components/base/Input";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import exceptionItemStyle from "./style";
import Select, { SelectRef } from 'views/components/base/Select';
import { IoTrashOutline } from 'react-icons/io5';
import { BsPencil } from 'react-icons/bs';


export interface IException {
  id: number;
  title: string;
  code: string;
  explain: string;
  explainReality: string;
}

export interface ExceptionInfoProps {
  name: string;
  // policy: IOtherDocumentExceptionDetail;
  exceptionType: any;
}

const ExceptionInfoItem: FC<ExceptionInfoProps> = (props, ref) => {
  const { name, exceptionType } = props
  const classes = exceptionItemStyle();
  const codeRef = useRef<SelectRef>(null);
  const descriptionRef = useRef<InputRef>(null);
  const descriptionRealityRef = useRef<InputRef>(null);
  const exceptionItemClass = clsx(classes.root, "mscb-exception-info-item");
  const labelExceptionType = "Mã ngoại lệ";
  const labelExplain = "Diễn giải";
  const labelExceptionReality = "Diễn giải thực tế";
 

  const handleOnchangeExceptionType = () => {

  }

  const changeDescriptionReality = () => {

  }

  return (
    <Box component="div" className={`${exceptionItemClass} pb-0`}>
      <Grid container>
        <Grid item xl={12} xs={12} >
          <Grid container className="flex-row">
            <Grid item xl={3} xs={4} className="mscb-exception-item-left flex-row">
              <Box component="div" className="exception-legal-title">
                <Typography variant='subtitle2' color='var(--mscb-primary)'>
                  {name}
                </Typography>
              </Box>
              <Box component="div" className="exception-code-box">
                <Box component="div" className="exception-code-label">
                  <Typography variant='subtitle2' color='var(--mscb-black)'>
                    1. {labelExceptionType}
                  </Typography>
                </Box>
                <Select
                  value={exceptionType?.id}
                  options={[]}
                  
                  onChange={handleOnchangeExceptionType}
                  ref={codeRef}
                  className="exception-code-select selectClass"
                />
              </Box>
            </Grid>
            <Grid item xl={9} xs={8} className="mscb-exception-item-right flex-row">
              <Box component='div' className='mscb-exception-input-box'>
                <Grid container>
                  <Grid item xl={12} xs={12} className="exception-explain-grid">
                    <Box component="div" className="exception-explain-box">
                      <Box component="div" className="exception-explain-label">
                        <Typography variant='subtitle2' color='var(--mscb-black)'>
                          2. {labelExplain}
                        </Typography>
                      </Box>
                      <Grid container className='items-center' >
                        <Grid xl={11} xs={11}>
                          <Input
                            ref={descriptionRef}
                            className="exception-explain-input"
                            disabled={true}
                            value={exceptionType.explain}
                          />
                        </Grid> 
                        <Grid xl={1} xs={1} className='justify-end flex'>
                          <BsPencil size={20}
                            className='mr-4'
                            color="var(--mscb-primary)"
                            cursor="pointer" />
                          <IoTrashOutline style={{ fontSize: '1rem'}} color="var(--mscb-primary)"
                            cursor="pointer"
                          />
                        </Grid>
                       
                      </Grid>
                    </Box>
                  </Grid>
                  {exceptionType.explain_reality.length ? (
                    <Grid item xl={11} xs={11}>
                      <Box component="div" className="exception-explain-reality-box">
                        <Box component="div" className="exception-explain-reality-label">
                          <Typography variant='subtitle2' color='var(--mscb-black)'>
                            3. {labelExceptionReality}
                          </Typography>
                        </Box>

                        <Input
                          ref={descriptionRealityRef}
                          className={"exception-explain-reality-input "}
                          onDebounce={changeDescriptionReality}
                          value={exceptionType.explain_reality}
                        />
                      </Box>
                  </Grid>
                  ) :null }

                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )

}

export default ExceptionInfoItem;
