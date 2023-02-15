
import { click } from "dom7";
import { FunctionComponent, MouseEventHandler } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RecettesIngredients, UniteMesureEnum } from "../models/RecetteIngredient";

type Props = {
    recettesIngredients: RecettesIngredients,
    click?: MouseEventHandler,
    register: any,
    name: string,
    index: number
}

const IngredientLine: FunctionComponent<Props> = ({ recettesIngredients, click, register, name, index, ...rest }) => {

    return (

        <>
            <div className=" d-flex flex-row justify-content-between mb-1 mt-3">
                <div className="me-2 w-25">
                    <input type="text"
                        {...register(`${name}.${index}.ingredient.id`)}
                        className="form-control"
                        defaultValue={recettesIngredients.ingredient.id} />
                </div>

                <div className="me-2">
                    <input type="text"
                        {...register(`${name}..${index}.ingredient.name`)}
                        className="form-control"
                        aria-label="Dollar amount (with dot and two decimal places)"

                        list="ingredients"
                        required
                        defaultValue={recettesIngredients.ingredient.name} />

                </div>

                <div className="w-25">
                    <input type="number"
                        {...register(`${name}..${index}.quantite`)}
                        step={1}
                        min={0}
                        className="form-control"
                        onChange={(e) => console.log(e.target.value)}
                        defaultValue={recettesIngredients.quantite}
                        required />
                </div>

                <select
                    {...register(`${name}..${index}.uniteMesure`)}
                    className="form-select form-select mb-3 w-50 ms-2"
                    required
                    aria-label=".form-select example"
                    id="uniteMesure"
                    defaultValue={recettesIngredients.uniteMesure}
                >
                    <option key={"none"}>Mesure</option>
                    {Object.keys(UniteMesureEnum)
                        .filter(key => isNaN(Number(key)))
                        .filter(key => key != "map")
                        .map(key => <option key={key} defaultValue={key.toLowerCase()}>{key}</option>)}
                </select>

                <Button className="mb-3 ms-1"
                    variant="danger"
                    type={"button"}
                    onClick={click}
                    id="deleteIngredient"
                >
                    X
                </Button>

            </div>
        </>
    )


}

export default IngredientLine;

