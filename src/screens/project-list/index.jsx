
import List from './list'
import SearchPanel from './search-panel'
import React, { useEffect, useState } from 'react'
import * as qs from 'qs'
import { cleanObject } from 'utilis'

const apiUrl=process.env.REACT_APP_API_URL

export default function Index() {
    const [users,setUsers]=useState([])
    const [param,setParam]=useState({
        name:"",
        personId:""
    })
    const [list,setList]=useState([])
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response=>{
            if(response.ok){
                setList(await response.json())
            }
        })
    },[param])
    useEffect(()=>{
        fetch(`${apiUrl}/users`).then(async response=>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    },[users])
  return (
    <div>
        <SearchPanel param={param} 
        setParam={setParam}
        users={users}/>
        <List list={list} users={users}/>
    </div>
  )
}
