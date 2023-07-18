import React, { forwardRef, UIEventHandler, useEffect, useImperativeHandle } from 'react';
import { positionValues, Scrollbars } from 'react-custom-scrollbars-2';

export interface ScrollbarProps{
  id?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onStop?(values: positionValues): void;
  children?: React.ReactNode,
  onScroll?: UIEventHandler<any> | undefined
}
export interface ScrollbarRef {
  scrollToBottom(): void,
  scrollToTop(): void,
}

interface ScrollbarComponent extends React.ForwardRefRenderFunction<ScrollbarRef, ScrollbarProps>{}

const Scrollbar: ScrollbarComponent = (props, ref) => {

  const { children, id, className, width = '100%', height = '100%', style = {}, onStop, onScroll } = props;
  const scrollRef = React.useRef<Scrollbars>(null);

  const _scrollStop = () => {
    scrollRef.current && onStop && onStop(scrollRef.current.getValues());
  }

  useImperativeHandle(ref, () => ({
    scrollToBottom(){
      scrollRef.current &&  scrollRef.current.scrollToBottom()
    },
    scrollToTop(){
      scrollRef.current &&  scrollRef.current.scrollToTop()
    },
  }));

  return <Scrollbars 
    id={id}
    ref={ scrollRef } 
    style={{ ...style, width, height, minHeight: height}} 
    className={ className }
    onScrollStop={ _scrollStop }
    onScroll={onScroll}
  >
    { children }
  </Scrollbars>

}

export default forwardRef(Scrollbar);