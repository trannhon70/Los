import { FC, Fragment, useEffect, useRef, useState } from "react";
import { BsArrowRight } from 'react-icons/bs';
import clsx from 'clsx';
import Box from "@mui/material/Box";
import Check from '@mui/icons-material/Check';
import OptionList from "views/components/layout/OptionList";
import Scrollbar from "views/components/layout/Scrollbar";

import Empty from "views/components/layout/Empty";
import Grid from "@mui/material/Grid";
import Label from "views/components/base/Label";
import { ILOANProductCategory, TLOANProductChange } from "types/models/loan";

export interface ProductGroupProps{
  className?: string;
  onChange?(value: string, reason: TLOANProductChange): void;
  disabled?: boolean;
  categories: ILOANProductCategory[];
  category: string;
  type: string;
  product: string;
}

export interface ProductGroupComponent 
  extends FC<ProductGroupProps>{}

const ProductGroup: ProductGroupComponent = props => {

  const { className, disabled, categories, category, type, product, onChange } = props;
  const [ CurrentCategories, setCurrentCategories ] = useState<ILOANProductCategory[]>(categories);

  const [ CurrentCategory, setCurrentCategory ] = useState<string>(category);
  const _Category = useRef<string>(category);

  const [ CurrentType, setCurrentType ] = useState<string>(type);
  const _Type = useRef<string>(type);

  const [ CurrentProduct, setCurrentProduct ] = useState<string>(product);
  const _Product = useRef<string>(product);

  useEffect(() => {
    setCurrentCategories(categories);
  }, [ categories ]);

  useEffect(() => {
    _Category.current = category;
    setCurrentCategory(category);

    _Type.current = type;
    setCurrentType(type);

    _Product.current = product;
    setCurrentProduct(product);
  }, [ category, type, product ]);

  useEffect(() => {
    if (CurrentCategory !== _Category.current){
      _Category.current = CurrentCategory;
      onChange && onChange(CurrentCategory, 'category');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentCategory ]);

  useEffect(() => {
    if (CurrentType !== _Type.current){
      _Type.current = CurrentType;
      onChange && onChange(CurrentType, 'type');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentType ]);

  useEffect(() => {
    if (CurrentProduct !== _Product.current){
      _Product.current = CurrentProduct;
      onChange && onChange(CurrentProduct, 'product');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentProduct ]);

  const changeLOANGroup = (reason: TLOANProductChange) => (value: string) => {
    switch(reason){
      case 'category':
        setCurrentCategory(value);
        break;
      case 'type':
        setCurrentType(value);
        break;
      case 'product':
        setCurrentProduct(value);
        break;
    }
  }

  const cates = CurrentCategories.map((cate, i) => ({ 
    value: cate.value, 
    label: `${ i + 1 }. ${ cate.label }` 
  }));

  const CURRENT_CATE = CurrentCategories.find(cate => cate.value === category);

  const types = CURRENT_CATE?.type.map((t, i) => ({
    value: t.value ?? '',
    label: `${ i + 1 }. ${ t.label }`
  })) ?? [];

  const products = CURRENT_CATE?.type
    .find(t => t.value === type)?.product
    .map((p, i) => ({
      value: p.value ?? '',
      label: `${ i + 1 }. ${ p.label }`
    })) ?? []
  
  return <Fragment>
    <Label bold color="#071180" className="block mb-4 text-15">
      A. Lựa chọn loại hình sản phẩm vay
    </Label>
    <Grid container spacing={ 6 }>
      <Grid item xl={ 3 } md={3} xs={3}>
        <Label required bold>I. Nhóm sản phẩm</Label>
        <Box 
          sx={{ 
            height: '286px', width: '100%', 
            position: 'relative',
            bgcolor: '#f2f3f9',
            '& .MuiList-root': {
              bgcolor: 'transparent'
            },
            '& .product-arrow-icon': {
              right: '-40px'
            }
          }} 
          className={ clsx(className) }
        >
          {(() => {
            if (cates.length){
              return <Scrollbar>
                <div className="px-4">
                  <OptionList
                    checkIcon={ <></> }
                    checkedIcon={ <Check /> }
                    disabled={ disabled }
                    options={ cates }
                    value={ category }
                    onChange={ changeLOANGroup('category') }
                  />
                </div>
              </Scrollbar>
            }

            return <Empty>
              Không có dữ liệu để hiển thị
            </Empty>
          })()}
          <BsArrowRight className="text-primary absolute y-center text-30 product-arrow-icon" />
        </Box>
      </Grid>
      <Grid item xl={ 6 } md={6} xs={6}>
        <Label required bold>II. Sản phẩm / Chương trình</Label>
        <Box 
          sx={{ 
            height: '286px', width: '100%', 
            position: 'relative',
            bgcolor: '#f2f3f9',
            '& .MuiList-root': {
              bgcolor: 'transparent'
            },
            '& .product-arrow-icon': {
              right: '-40px'
            }
          }} 
          className={ clsx(className) }
        >
          {(() => {
            if (types.length){
              return <Scrollbar>
                <div className="px-4">
                  <OptionList
                    checkIcon={ <></> }
                    checkedIcon={ <Check /> }
                    disabled={ disabled }
                    options={ types }
                    value={ CurrentType }
                    onChange={ changeLOANGroup('type') }
                  />
                </div>
              </Scrollbar>
            }

            if (CurrentCategory || !categories.length){
              return <Empty>
                Không có dữ liệu để hiển thị
              </Empty>
            }

            return <Empty>
              Vui lòng chọn nhóm sản phẩm
            </Empty>
          })()}
          <BsArrowRight className="text-primary absolute y-center text-30 product-arrow-icon" />
        </Box>
      </Grid>
      <Grid item xl={ 3 } md={3} xs={3}>
        <Label required bold>III. Chi tiết sản phẩm</Label>
        <Box 
          sx={{ 
            height: '286px', width: '100%', 
            bgcolor: '#f2f3f9',
            '& .MuiList-root': {
              bgcolor: 'transparent'
            }
          }} 
          className={ clsx(className) }
        >
          {(() => {
            if (products.length){
              return <Scrollbar>
                <div className="px-4">
                  <OptionList
                    checkIcon={ <></> }
                    checkedIcon={ <Check /> }
                    disabled={ disabled }
                    options={ products }
                    value={ CurrentProduct }
                    onChange={ changeLOANGroup('product') }
                  />
                </div>
              </Scrollbar>
            }

            if (!CurrentType){
              return <Empty>
                Vui lòng chọn loại sản phẩm
              </Empty>
            }

            return <Empty>
              Không có dữ liệu để hiển thị
            </Empty>
            
          })()}
        </Box>
      </Grid>
    </Grid>
  </Fragment>
  
}

export default ProductGroup;