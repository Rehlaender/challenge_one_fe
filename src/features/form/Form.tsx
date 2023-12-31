import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
    createNewIncident,
} from "./formSlice";
import {
    userEmailSelector,
} from "../services/servicesSlice";
import styles from "../services/Services.module.css"

export function Form() {
    const getEmail = useAppSelector(userEmailSelector)
    const dispatch = useAppDispatch();

    const [title, titleInput] = useInput({ name: "title", type: "text" });
    const [description, descriptionInput] = useInput({ name: "description", type: "text" });
    const [activeService, activeServiceInput] = useInput({ name: "service", type: "text" });
   
    function useInput({ type, name }) {
        const [value, setValue] = useState("");
        const input = <><label htmlFor={name}>{name}</label><input name={name} value={value} onChange={e => setValue(e.target.value)} type={type} /></>;
        return [value, input];
    }

    function submitForm() {
        const payload = {
            from: getEmail,
            form: {
                incident: {
                    type: "incident",
                    title: title,
                    service: {
                        id: activeService,
                        type: "service_reference"
                    },
                    body: {
                        type: "incident",
                        details: description
                    }
                }
            }
        }
        dispatch(createNewIncident(payload))
    }
    return (
        <div>
            <h3>Create new Incident</h3>
            <div className={styles.separator}></div>
            <p>Creating Incident for this active service: {activeServiceInput}</p>
            <p>{titleInput}</p>
            <p>{descriptionInput}</p>
            <button className={styles.button} onClick={submitForm}>Submit</button>
        </div>
    )
}
