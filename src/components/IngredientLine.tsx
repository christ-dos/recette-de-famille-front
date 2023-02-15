
import { ChangeEvent, FunctionComponent, MouseEventHandler } from "react";
import { Button } from "react-bootstrap";
import { FieldErrors } from "react-hook-form";
import { Ingredient } from "../models/Ingredient";
import { RecettesIngredients, UniteMesureEnum } from "../models/RecetteIngredient";

type Props = {
    recettesIngredients: RecettesIngredients,
    click?: MouseEventHandler,
    register: any,
    name: string,
    index: number,
    errors: FieldErrors,
    searchTerm: string,
    allIngredients: Ingredient[],
    handleSearchTerm(e: ChangeEvent<HTMLInputElement>): any
}

const IngredientLine: FunctionComponent<Props> = ({ recettesIngredients,
    allIngredients, errors, searchTerm, handleSearchTerm, click, register, name, index, ...rest }) => {

    return (

        <>
            <div className=" d-flex flex-row justify-content-between mb-1 mt-3">
                <div className="me-2 w-25" hidden>
                    <input type="text"
                        {...register(`${name}.${index}.ingredient.id`)}
                        className="form-control"
                        defaultValue={recettesIngredients.ingredient.id}
                        onChange={(e) => handleSearchTerm}
                    />
                </div>

                <div className="me-2">
                    <input type="text"
                        {...register(`${name}.${index}.ingredient.name`)}
                        className="form-control"
                        required
                        defaultValue={recettesIngredients.ingredient.name}
                        onChange={handleSearchTerm}
                    />
                    {/* liste qui propose des ingredients*/}
                    <datalist id="ingredientUpdate">
                        {allIngredients
                            .filter(ingredient => ingredient.name.includes(searchTerm))
                            .map(ingredient =>
                                <option
                                    value={ingredient.name}
                                    key={ingredient.id}
                                />
                            )}
                    </datalist>
                    {<p className="text-danger">{errors.ingredient?.message?.toString()}</p>}

                </div>

                <div className="w-25">
                    <input type="number"
                        {...register(`${name}.${index}.quantite`)}
                        step={1}
                        min={0}
                        className="form-control"
                        onChange={(e) => console.log(e.target.value)}
                        defaultValue={recettesIngredients.quantite}
                        required
                    />
                    {<p className="text-danger">{errors.quantity?.message?.toString()}</p>}

                </div>

                <select
                    {...register(`${name}.${index}.uniteMesure`)}
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
                        .map(key => <option key={key} defaultValue={key.toLowerCase()}>{key}

                        </option>)}
                </select>
                {<p className="text-danger">{errors.uniteMesure?.message?.toString()}</p>}

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

