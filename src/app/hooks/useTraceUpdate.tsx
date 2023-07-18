import { PropsWithChildren, useEffect, useRef } from "react";

const useTraceUpdate = (props: PropsWithChildren<unknown>) => {

  const prev = useRef(props);

  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k as keyof typeof prev.current] !== v){
        ps[k as keyof typeof ps] = [prev.current[k as keyof typeof prev.current] as never, v as never] as never;
      }

      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0){
      console.log('Changed props', changedProps);
    }

    prev.current = props;
  })

}

export default useTraceUpdate;