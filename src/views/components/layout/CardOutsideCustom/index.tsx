/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import { FC, Fragment, ReactNode } from "react";
import clsx from "clsx";
import CardOutsideCustomStyle from "./style";
import Select, { SelectOption } from "views/components/base/Select";

export interface ISelectOpts {
    order?: string | number;
    option: SelectOption[];
}

export interface CardOutsideCustomProps {
    className?: string;
    extra?: ReactNode;
    extraClass?: string;
    id?: string;
    label?: ReactNode;
    labelClass?: string;
    options?: ISelectOpts[];
    // onChange?(): void;
}

const CardOutsideCustom: FC<CardOutsideCustomProps> = (props) => {
    const classes = CardOutsideCustomStyle();
    const { children, className, extra, extraClass, id, label, options, labelClass } =
        props;
    const cardClass = clsx(
        classes.root,
        "mscb-outside-card relative",
        className
    );

    // const onChange = () =>{
    //     onChange && onChange()
    // }

    return (
        <Fragment>
            <div className={cardClass} id={id}>
                <div className="flex">
                    {!!label && (
                        <div
                            className={clsx(
                                classes.label,
                                "mscb-outside-card-label ellipsis bg-white text-upper text-primary",
                                labelClass
                            )}
                        >
                            {label}
                        </div>
                    )}
                    {
                        !!options && options.map((item, idx: number) => {
                            if(item.order === "end"){
                                return (
                                    <div key={idx} className={clsx(classes.SelectAreaAtEnd, "inline-flex")} >
                                        <Select
                                            options={item.option}
                                            value={item.option[0].value}
                                            // ref={ selectRef }
                                            // onChange={ onChange }
                                        />
                                    </div>
                                )
                            } else{
                                return (
                                    <div key={idx} className={clsx(classes.SelectArea, "inline-flex")} >
                                        <Select
                                            options={item.option}
                                            value={item.option[0].value}
                                            // ref={ selectRef }
                                            // onChange={ onChange }
                                        />
                                    </div>
                                )
                            }
                        })
                    }
                

                {!!extra && (
                    <div className={clsx("mscb-outside-card-extra ", extraClass)}>
                        {extra}
                    </div>
                )}
                </div>
            </div>
            <div
                className={clsx(
                    classes.content,
                    "mscb-outside-card-content shadow bg-white"
                )}
            >
                {children}
            </div>
        </Fragment>
    );
};

export default CardOutsideCustom;
