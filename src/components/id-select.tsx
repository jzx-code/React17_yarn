import { Select } from "antd";
import { type } from "os";
import React from "react";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps,'value'|'onChange'|'options'>{
    value: Raw|null|undefined,
    onChange:(value?:number)=>void,
    defaultOptionName?:string,
    options?:{name:string,id:number}[]
}

export const IdSelect = (props:IdSelectProps)=>{
    const {value,onChange,defaultOptionName,options,...restProps} = props
    return <Select 
    value={toNumber(value)}
    onChange={value=>onChange(toNumber(value)||undefined )}
    {...restProps}
    >
        {  
            //这里的value会把所有没有意义的值装为0 
            defaultOptionName? <Select.Option value={0}>
                {defaultOptionName}</Select.Option>:null
        }
        {
            options?.map(option=><Select.Option key={option.id} 
                value={option.id}>{option.name}</Select.Option>)
        }
    </Select>
}

const toNumber = (value:unknown) => isNaN(Number(value))? 0: Number(value)