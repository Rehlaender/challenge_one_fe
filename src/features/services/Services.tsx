import { useState, useEffect } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  incrementAsync,
  selectServices,
  selectActiveService,
} from "./servicesSlice"
import styles from "./Services.module.css"

const Service = ({ value }) => {
  const { name, id } = value;
  return <tr onClick={() => console.log(id)} key={id}><td>{id}</td><td>{name}</td></tr>
}

const ActiveService = ({ data }) => {
  return (
    <>
      <h2>active service</h2>
      <p>{JSON.stringify(data)}</p>
    </>
  )
}

const ServicesList = ({ services }) => {
  const serviceList = services.services.map((item, index) => <Service value={item} /> || 'no services');
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        {serviceList}
      </tbody>
    </table>
  )
}

export function Services() {
  const allServices = useAppSelector(selectServices)
  const activeService = useAppSelector(selectActiveService)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(incrementAsync())
  }, []);

  return (
    <div>
      <div>
        <ServicesList services={allServices} />
      </div>
      <div>
        <ActiveService data={activeService}/>
      </div>
    </div>
  )
}
