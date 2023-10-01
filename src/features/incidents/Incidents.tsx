import { useState, useEffect } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  getIncidentsAsync,
  incidentsSelector,
  serviceSelector,
  activeServiceNameSelector,
} from "./incidentsSlice";

const Incident = ({ value, awesomeFunction }) => {
  const { title, id } = value;
  return <tr onClick={() => awesomeFunction(id)} key={id}><td>{id}</td><td>{title}</td></tr>
}

const IncidentsList = ({ incidents, awesomeFunction }) => {
  const incidentsIteration = incidents?.map((item, index) => <Incident awesomeFunction={awesomeFunction} value={item} /> || 'no incidents');
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
        </tr>
      </thead>
      <tbody>
        {incidentsIteration}
      </tbody>
    </table>
  ) || null;
}


export function Incidents() {
  const activeService = useAppSelector(serviceSelector);
  const allIncidentsByService = useAppSelector(incidentsSelector);
  const activeServiceName = useAppSelector(activeServiceNameSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIncidentsAsync(activeService))
  }, [activeService]);

  return (
    <div>
      <h3>Incidents at: {activeServiceName}</h3>
      {allIncidentsByService.length && <IncidentsList incidents={allIncidentsByService} awesomeFunction={() => console.log('ouyea')} />}
    </div>
  )
}
