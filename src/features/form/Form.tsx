import { useState, useEffect } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
    createNewIncident,
} from "./formSlice";

export function Form() {
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
            from: "awesomeemail@company.com",
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
            <p>Creating Incident for this active service: {activeServiceInput}</p>
            <p>{titleInput}</p>
            <p>{descriptionInput}</p>
            <button onClick={submitForm}>Submit</button>
        </div>
    )
}
