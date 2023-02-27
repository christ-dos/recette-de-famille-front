import { ErrorMessage } from "@hookform/error-message";
import { FunctionComponent, useEffect } from "react";
import { Form } from "./form-recette";

type Props = {
    register: any,
    name: string,
    form?: Form,
    errors?: any,
    className?: string,
    id?: string,
    valeur?: string,
    type?: string,
    placeHolder?: string,
    label?: string,
    array?: { label: string, value: string }[],
    onChange?: any,
    accept?: string,
}

/********************** Les constante pour remplir les Selects *****************************/
export const difficultyOptions = [
    { label: "Difficultés", value: "" },
    { label: "Facile", value: "facile" },
    { label: "Intermédaire", value: "intermediaire" },
    { label: "Difficile", value: "difficile" }
]


export const categoriesOptions = [
    { label: "Catégories", value: "" },
    { label: "Plats", value: "1" },
    { label: "Entrées", value: "2" },
    { label: "Desserts", value: "3" },
    { label: "Apéritfs", value: "4" }
]

/********************** Composant Input Select *****************************/
export const InputSelect: FunctionComponent<Props> = ({ array,
    errors, register, name, form, className, id, ...rest }) => {

    return (

        /****************** Composant Form Select ************************/
        <>
            <select {...register(name)} className={className}
                id={id}
                name={name}
                defaultValue={""}
                form={form}
                onChange={(e) => console.log(e.target.value)}
            >
                {array?.map(element => (
                    <option
                        key={element.value}
                        value={element.value}
                        disabled={element.value === "" ? (true) : (false)}>{element.label}
                    </option>
                ))}
            </select>
            <ErrorMessage className={'text-danger mt-1 ms-1'} name={name} errors={errors} as="p" />

        </>

    )
}


/****************** Composant Form Group Input/Label************************/

export const FormGroupInputLabel: FunctionComponent<Props> = ({ id, name, valeur,
    type, placeHolder, label, errors, register, accept, onChange, ...rest }) => {

    return (
        <div className="form-group d-flex pe-5 ">
            <label
                htmlFor={id}
                className="col 12 col-md-6 col-lg-3 col-form-label form-control-label">{label}</label>
            <div className="col-12 col-md-6 col-lg-9 py-1 d-flex justify-content-center">
                <input
                    {...register(name)}
                    id={id}
                    name={name}
                    className="form-control "
                    style={{ width: '100%' }}
                    type={type} value={valeur}
                    placeholder={placeHolder}
                    accept={accept}
                    onChange={onChange} />
                {<p className="m-1 text-danger">{errors?.name?.message?.value}</p>}
            </div>
        </div>
    );
}

/****************** Composant Form Group Input/Span************************/

export const FormGroupInputSpan: FunctionComponent<Props> = ({ id, name, valeur,
    type, errors, register, form, ...rest }) => {

    return (
        <div className=" d-flex flex-row justify-content-between">
            <div className="input-group w-75 mb-1">
                <input {...register(name)}
                    type={type}
                    className="form-control"
                    id={id}
                    name={name}
                />
                <span className="input-group-text" >{valeur}</span>
                <ErrorMessage className={'text-danger mt-1 ms-1'} name={name} errors={errors} as="p" />
            </div>

        </div>
    );
}
