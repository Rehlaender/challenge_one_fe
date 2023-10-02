import { useState, useEffect } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  getIncidentsAsync,
  incidentsSelector,
  serviceSelector,
  activeServiceNameSelector,
  activeIncidentSelector,
  setActiveIncident,
  editIncident,
} from "./incidentsSlice";
import {
  userEmailSelector
} from "../services/servicesSlice";
import styles from "./Incidents.module.css"
import styles2 from "../services/Services.module.css"

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

const ActiveService = ({ data, submitEdit }) => {
  const incident = data[0];
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  function willSetEditing(value) {
    setIsEditing(value);
  }

  function resetForm() {
    setForm({
      title: '',
      description: '',
      status: '',
    })
  }

  function initiateForm() {
    setForm({
      title: incident?.title,
      description: incident?.description,
      status: incident?.status,
    })
  }

  useEffect(() => {
    !isEditing ? resetForm() : initiateForm()
  }, [isEditing]);

  function submitForm() {
    submitEdit({
      id: incident?.id,
      ...form
    });
  }

  function handleTitleChange(inputName, e) {
    setForm({
      ...form,
      [inputName]: e?.target?.value
    });
  }

  return (
    <>
      <h2>active incident</h2>
      <button className={styles2.button} onClick={() => willSetEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit service'}</button>
      {isEditing && <div>
        <p>id: {incident?.id}</p>
        <p>title: <input value={form?.title} onChange={(e) => handleTitleChange('title', e)} type="text"/></p>
        change from <strong>{incident?.status}</strong> to: 
        <select name="selectStatus" defaultValue={form?.status}
          onChange={(e) => handleTitleChange('status', e)}>
          <option value="triggered">triggered</option>
          <option value="resolved">resolved</option>
          <option value="acknowledged">acknowledged</option>
        </select>
        <p>description: <input value={form?.description} type="text" onChange={(e) => handleTitleChange('description', e)} /></p>
        {isEditing && <button className={styles2.button} onClick={() => submitForm()}>Submit</button>}
      </div>}
      {!isEditing && <div>
        <p>id: {incident?.id}</p>
        <p>title: {incident?.title}</p>
        <strong><p style={styles}>status: {incident?.status}</p></strong>
        <p>description: {incident?.description}</p>
      </div>}
    </>
  )
}

export function Incidents() {
  const activeService = useAppSelector(serviceSelector);
  const allIncidentsByService = useAppSelector(incidentsSelector);
  const activeServiceName = useAppSelector(activeServiceNameSelector);
  const activeIncident = useAppSelector(activeIncidentSelector);
  const getEmail = useAppSelector(userEmailSelector)
  const dispatch = useAppDispatch();

  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    dispatch(getIncidentsAsync(activeService))
  }, [activeService]);

  function awesomeFunction(id) {
    dispatch(setActiveIncident(id))
  }

  function submitUpdatedIncident(payload) {
    const formPayload = {
      "id": payload.id,
      "from": getEmail,
      "form": {
        "incident": {
          "type": "incident_reference",
          "title": payload?.title,
          "status": payload?.status,
          "body": {
            "type": "new incident",
            "details": payload?.description
          }
        }
      }
    }
    dispatch(editIncident(formPayload))
  }

  return (
    <div>
      <h2>Incidents at: {activeServiceName}</h2>
      <button className={styles2.button} onClick={() => setIsCreating(!isCreating)}>{!isCreating ? 'Create new Incident' : 'Cancel creation'}</button>
      {!isCreating && allIncidentsByService.length && <IncidentsList incidents={allIncidentsByService} awesomeFunction={awesomeFunction} />}
      {!isCreating && activeIncident.length && <div>
        <ActiveService
          data={activeIncident}
          submitEdit={submitUpdatedIncident}
        />
      </div> || null
      }
      {
        !!isCreating && <Form />
      }
    </div>
  )
}
