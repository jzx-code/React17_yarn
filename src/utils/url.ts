import { useMemo ,useState} from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject, subset } from 'utils'

// 返回url中的指定的信息
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams();
    const setSearchParams = useSetUrlSearchParam();
    const [stateKeys] = useState(keys);
    return [
      useMemo(
        () =>
          subset(Object.fromEntries(searchParams), stateKeys) as {
            [key in K]: string;
          },
        [searchParams, stateKeys]
      ),
      (params: Partial<{ [key in K]: unknown }>) => {
        return setSearchParams(params);
      },
    ] as const;
  };
  
  export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    };
  };