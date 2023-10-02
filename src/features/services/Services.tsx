import { useEffect } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  incrementAsync,
  selectServices,
  setActiveService,
  setOpenIncidents,
  activeServiceSelector,
  shouldRenderIncidentsSelector,
  userEmailSelector,
  setEmail
} from "./servicesSlice"
import styles from "./Services.module.css"

import { Incidents } from "../incidents/Incidents"

const Service = ({ value, awesomeFunction }) => {
  const { name, id } = value;

  return <tr onClick={() => awesomeFunction(id)} key={id}><td>{id}</td><td>{name}</td></tr>
}

const ActiveService = ({ data, openServices, status }) => {
  const service = data[0]
  return (
    <div>
      <h2>active service {'->'} {service?.name}</h2>
      <div style={{ width: '300px', margin: 'auto' }}>
        <p><strong>name:</strong> {service?.name}</p>
        <p><strong>id:</strong> {service?.id}</p>
        <p><strong>description:</strong> {service?.description}</p>
      </div>
      <div className={styles.separator}></div>
      <button className={styles.button} onClick={() => openServices()}>{status ? 'close incidents' : 'open incidents 4 service'}</button>
    </div>
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
  const getEmail = useAppSelector(userEmailSelector)
  const activeService = useAppSelector(activeServiceSelector)
  const shouldRenderIncidents = useAppSelector(shouldRenderIncidentsSelector)
  const dispatch = useAppDispatch()

  function awesomeFunction(id) {
    dispatch(setActiveService(id))
  }

  useEffect(() => {
    dispatch(incrementAsync())
  }, []);

  function changeEmail(event) {
    dispatch(setEmail(event.target.value));
  }

  return (
    <div className={styles.column}>
      <div className={styles.separator}></div>
      <p>To start please add your email asociated with your api instance</p>
      <p><input value={getEmail} onChange={changeEmail} /></p>
      <div className={styles.separator}></div>
      {getEmail && <div className={styles.column}>
        <h1>All services</h1>
        <p>Click on any service below to render their incidents</p>
        <div >
          <ServicesList awesomeFunction={awesomeFunction} services={allServices} />
        </div>
        <div className={styles.separator}></div>
        {activeService.length && <div>
          <ActiveService
            data={activeService}
            openServices={() => dispatch(setOpenIncidents(!shouldRenderIncidents))}
            status={shouldRenderIncidents}
          />
        </div> || null
        }
        {shouldRenderIncidents && <Incidents /> || null}
      </div>}
    </div>
  )
}
