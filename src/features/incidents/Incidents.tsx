import { useState, useEffect } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  getIncidentsAsync,
  incidentsSelector,
  serviceSelector,
  activeServiceNameSelector,
  activeIncidentSelector,
  setActiveIncident,
} from "./incidentsSlice";
import styles from "./Incidents.module.css"

import { Form } from "../form/Form";

const Incident = ({ value, awesomeFunction }) => {
  const { title, id, status } = value;
  return <tr onClick={() => awesomeFunction(id)} key={id}><td>{id}</td><td>{status}</td><td>{title}</td></tr>
}

const IncidentsList = ({ incidents, awesomeFunction }) => {
  const incidentsIteration = incidents?.map((item, index) => <Incident awesomeFunction={awesomeFunction} value={item} /> || 'no incidents');
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>id</th>
          <th>status</th>
          <th>title</th>
        </tr>
      </thead>
      <tbody>
        {incidentsIteration}
      </tbody>
    </table>
  ) || null;
}

const ActiveService = ({ data }) => {
  const incident = data[0];
  return (
    <>
      <h2>active incident</h2>
      <div>
        <p>id: {incident?.id}</p>
        <p>title: {incident?.title}</p>
        <strong><p style={styles}>status: {incident?.status}</p></strong>
        <p>description: {incident?.description}</p>
      </div>
    </>
  )
}

export function Incidents() {
  const activeService = useAppSelector(serviceSelector);
  const allIncidentsByService = useAppSelector(incidentsSelector);
  const activeServiceName = useAppSelector(activeServiceNameSelector);
  const activeIncident = useAppSelector(activeIncidentSelector);
  const dispatch = useAppDispatch();

  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    dispatch(getIncidentsAsync(activeService))
  }, [activeService]);

  function awesomeFunction(id) {
    dispatch(setActiveIncident(id))
  }

  return (
    <div>
      <h3>Incidents at: {activeServiceName}</h3>
      <button onClick={() => setIsCreating(!isCreating)}>Create new Incident</button>
      {!isCreating && allIncidentsByService.length && <IncidentsList incidents={allIncidentsByService} awesomeFunction={awesomeFunction} />}
      {!isCreating && activeIncident.length && <div>
        <ActiveService
          data={activeIncident}
        />
      </div> || null
      }
      {
        !!isCreating && <Form />
      }
    </div>
  )
}
