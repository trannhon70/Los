import { Add, Close, House } from '@mui/icons-material';
import { Button, Popover, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import clsx from 'clsx';
import React, { forwardRef, ForwardRefRenderFunction, useEffect, useRef, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { FcNext, FcPrevious } from 'react-icons/fc';
import SwipeableViews from 'react-swipeable-views';
import GroupListStyle from "./style";

export type GroupListType = "vertical" | "horizontal";

export interface GroupListBaseRef {
    getValue(): void;
    setValue(): void;
}

export interface IGroupListBase {
    key: string | number;
    value: string | number;
    label?: string;
    valueMoney?: string | number | null;
}

export interface GroupListBaseProps {
    onSelected?(value: IGroupListBase): void;
    onDelete?(value: IGroupListBase,position:number): void;
    onAdd?(): void;
    options?: IGroupListBase[];
    type?: GroupListType;
    labelAdd?: string;
    disabled?: boolean;
    activeId?: number;
    isAdd?: boolean;
    isDelete?: boolean;
    className?: string;
    idName?: string;
    isValueMoney?: boolean;
}

export interface GroupListBaseComponent extends ForwardRefRenderFunction<GroupListBaseRef, GroupListBaseProps> { }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GroupListBase: GroupListBaseComponent = (props, ref) => {
    const {
        options = [],
        type = "vertical",
        labelAdd,
        onSelected,
        disabled,
        onAdd,
        onDelete,
        activeId,
        isAdd = false,
        isDelete = false,
        className,
        idName,
        isValueMoney
    } = props;


    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const classes = GroupListStyle();
    const [itemActive, setItemActive] = useState<string | number>();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (activeId) {
            handleCheck({
                key: activeId,
                value: activeId,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId])


    const slideNo = Math.ceil(options.length / 3);

    const handleCheck = (value: IGroupListBase) => {
        setItemActive(value.key);
        onSelected && onSelected(value);
    };

    const handleClick = () => !disabled && onAdd && onAdd();

    const handleDelete = (value: IGroupListBase,p: number) => onDelete && onDelete(value,p);

    const handleChangePrev = (value: number) => {
        setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0)
    };

    const handleChangeNext = (value: number) => {
        if (slideNo < 2) {
            return;
        } else {
            setCurrentSlide(currentSlide < slideNo - 1 ? currentSlide + 1 : slideNo - 1)
        }

    };

    const handleChangeSwip = (e: any) => {
        if (e > slideNo - 1) {
            e = slideNo - 1;
            setCurrentSlide(slideNo - 1);
        } else {
            setCurrentSlide(e);
        }

    };

    //POPOVER
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleShowMore = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddNew = () => {
        onAdd && onAdd();
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div className={clsx(classes.root, 'wh-full', className)}>
            {type !== "horizontal" ?
                (
                    <>
                        {/* <Scrollbar className="scroll-groupList" id={idName}> */}
                            <List
                                className={classes.vertical}
                            // id='group-list-metadata'
                            >
                                {options.map((value, index) => {
                                    return (
                                        <ListItem
                                            key={value.key}
                                            disablePadding
                                            className={`item wh-full ${itemActive && itemActive === value.key ? "active" : ""}`}
                                            id={value.value.toString()}
                                        >
                                            {isValueMoney ? <div onClick={() => handleCheck(value)} className="item-value item-value-money flex items-center" style={{ height: "50px" }}>
                                                {/* <span className="icon">{index + 1}</span> */}
                                                {/* <span className="label">{value.label}</span>
                                                <div className="value_money">
                                                    <span >{value.valueMoney}</span>
                                                </div> */}
                                                <div>
                                                    <span className="icon">{index + 1}</span>
                                                </div>

                                                <div >
                                                    <span className="label">{value.label}</span>
                                                    {value.valueMoney ? <p className="label m-0 ml-3 font-normal text-12">{value.valueMoney}</p> : null}
                                                </div>

                                            </div> : <div onClick={() => handleCheck(value)} className="item-value">
                                                <span className="icon">{index + 1}</span>
                                                <span className="label">{value.label}</span>
                                            </div>}

                                            {!!isDelete && <span onClick={()=>handleDelete(value,index)} className="button-delete">
                                                <Close />
                                            </span>
                                            }

                                        </ListItem>
                                    );
                                })}
                            </List>
                        {/* </Scrollbar> */}
                        {
                            !isAdd ? <Button variant="outlined" startIcon={<Add />} className={classes.buttonAdd} onClick={handleClick}>
                                <span className="labelAdd">
                                    {labelAdd}
                                </span>
                            </Button> : null
                        }

                    </>
                ) : (
                    <div className={classes.horizontal}>
                        <div
                            ref={prevRef}
                            className={clsx("swiper-button-prev", currentSlide === 0 ? "disable" : "")}
                            onClick={() => handleChangePrev(currentSlide)}
                        >
                            <FcPrevious size="32" />
                        </div>
                        <SwipeableViews disabled index={currentSlide} className="horizontal-list" onChangeIndex={(e) => handleChangeSwip(e)}>
                            {options.map((value, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                        onClick={() => handleCheck(value)}
                                        className={`item wh-full ${itemActive && itemActive === value.key ? "active" : ""}`}
                                    >
                                        <House className="icon" />
                                        <span className="label">{value.label?.toUpperCase()}</span>
                                        {
                                            itemActive && itemActive === value.key ? (
                                                <>
                                                    <Button className="icon-more" onClick={(e) => handleShowMore(e)}>
                                                        <FaEllipsisV />
                                                    </Button>
                                                    <Popover
                                                        id={id}
                                                        open={open}
                                                        anchorEl={anchorEl}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        }}
                                                    >
                                                        <Typography sx={{ p: 2 }}>Xóa</Typography>
                                                        <Typography sx={{ p: 2 }}>Xem thêm</Typography>
                                                    </Popover>
                                                </>
                                            ) : null
                                        }
                                    </ListItem>
                                );
                            })}
                            {!isAdd?<Button variant="outlined" className="button-add" onClick={handleAddNew}>
                                <Add />
                            </Button>:null}
                        </SwipeableViews>
                        <div
                            ref={nextRef}
                            className={clsx("swiper-button-next", currentSlide === (slideNo - 1) ? "disable" : "")}
                            onClick={() => handleChangeNext(currentSlide)}
                        >
                            <FcNext size="32" />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default forwardRef(GroupListBase);
