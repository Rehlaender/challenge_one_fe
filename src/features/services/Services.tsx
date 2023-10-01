import { useState, useEffect } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  incrementAsync,
  selectServices,
  setActiveService,
  activeServiceSelector,
} from "./servicesSlice"
import styles from "./Services.module.css"

import { Incidents } from "../incidents/Incidents"

const Service = ({ value, awesomeFunction }) => {
  const { name, id } = value;

  return <tr onClick={() => awesomeFunction(id)} key={id}><td>{id}</td><td>{name}</td></tr>
}

const ActiveService = ({data}) => {
  const service = data[0]
  return (
    <>
      <h2>active service</h2>
      <div>
        <p>name: {service?.name}</p>
        <p>id: {service?.id}</p>
        <p>description: {service?.description}</p>
      </div>
      <button>home</button>
      <button>open incidents 4 service</button>
    </>
  )
}

const ServicesList = ({ services, awesomeFunction }) => {
  const serviceList = services.map((item, index) => <Service awesomeFunction={awesomeFunction} value={item} /> || 'no services');
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
  const activeService = useAppSelector(activeServiceSelector)
  const dispatch = useAppDispatch()

  function awesomeFunction(id) {
    dispatch(setActiveService(id))
  }

  useEffect(() => {
    dispatch(incrementAsync())
  }, []);

  return (
    <div>
      <div>
        <ServicesList awesomeFunction={awesomeFunction} services={allServices} />
      </div>
      {activeService.length && <div>
        <ActiveService data={activeService}/>
      </div> || null
      }
      <Incidents />
    </div>
  )
}
