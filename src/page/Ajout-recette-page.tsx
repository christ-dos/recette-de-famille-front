
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { TitreH2, TitreH5 } from "../components/children";
import { categoriesOptions, difficultyOptions, FormGroupInputSpan, InputSelect } from '../components/forms/InputsForm';
import Schema from "../components/forms/Schema-yup";
import IngredientLine from '../components/IngredientLine';
import StepPreparation from '../components/Step-preparation';
import styles from '../css/ajout-recette-page.module.css';
import '../css/common.css';
import { CategorieEnum } from '../models/CategorieEnum';
import { Ingredient } from "../models/Ingredient";
import { Recette } from '../models/recette';
import { RecettesIngredients, UniteMesureEnum } from '../models/RecetteIngredient';
import { getCategorieById } from "../services/CategorieService";
import { getAllIngredient } from "../services/IngredientService";


const AjoutRecettePage: FunctionComponent = () => {

    const [ingredients, setIngredients] = useState([{
        ingredient: {
            name: '',
            urlPicture: '/https://st.depositphotos.com/1001069/4731/i/950/depositphotos_47311605-stock-photo-fresh-ingredients-for-cooking.jpg'
        }, quantite: '', uniteMesure: 'PIECE'
    }]);
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
    const [count, setCount] = useState(1);
    const [selectedFile, setSelectedFile] = useState<any>()
    const [preview, setPreview] = useState<string | undefined>()
    const [searchTerm, setSearchTerm] = useState("");


    const { register, handleSubmit, formState: { errors },
        control, formState, setError, clearErrors } = useForm<Recette>({
            mode: 'onChange',

            defaultValues: {
                id: 0,
                title: "",
                urlPicture: "",
                totalTimePreparation: "",
                timePreparation: "",
                cookingTime: "",
                restTime: "",
                numberOfPeople: "",
                stepPreparation: "",
                recettesIngredients: [
                    {
                        id: { recetteId: 0, ingredientId: 0 },
                        quantite: 100,
                        ingredient: { id: 0, name: allIngredients.length !== 0 ? (allIngredients[count]?.name) : ("pomme") }
                    }
                ]
            },

            resolver: yupResolver(Schema)
        });

    const { isSubmitSuccessful, isSubmitting } = formState

    const { fields, append, remove } = useFieldArray({
        name: 'recettesIngredients',
        control,
    })
    useEffect(() => {
        getAllIngredient().then(allIngredients => setAllIngredients(allIngredients));
        //appendIngredient();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [isSubmitting]);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    }

    const createRecipe = (data: any) => {
        return fetch('http://localhost:8082/recette/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .catch((error) => console.log(error));
    };

    /*  function getIngedientByName(name: string): Ingredient | undefined {
         const result = allIngredients.filter(x => x.name.toLowerCase() === name.toLowerCase())
         if (result) {
             return result[0];
         }
     } */

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        setPreview(selectedFile)
        console.log(selectedFile);
    }

    const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>, setSearchTerm: any) => {
        let value = e.target.value;
        value.length > 2 ? (setSearchTerm(value)) : (setSearchTerm(""))
        setSearchTerm("")
    }

    const appendIngredient = () => {
        append({
            quantite: 100,
            uniteMesure: UniteMesureEnum.Mesures,
            ingredient: { id: 0, name: allIngredients.length !== 0 ? (allIngredients[count]?.name) : ("pomme") }
        })
        setCount(count + 1);
    }


    async function onSubmit(data: any) {
        console.log(data);

        if (selectedFile) {
            let blob = selectedFile.slice();

            let reader = new FileReader();
            reader.readAsDataURL(blob);

            reader.onload = function () {
                data.urlPicture = reader.result;
            }
        } else {
            data.urlPicture = '/images/mystere.jpg';
        }

        const resultCategorie = await getCategorieById(data.categorie);
        data.categorie = { id: resultCategorie.id, name: resultCategorie.name, urlPicture: resultCategorie.urlPicture }

        /*On recherche les ingredients par leur nom et on remplit le recetteIngredient id avec les respectifs ids*/
        data.recettesIngredients.map((recetteIngredient: RecettesIngredients) => {

            const ingredient = allIngredients.find(ingredient => ingredient.name === recetteIngredient.ingredient.name);
            if (ingredient) {
                const recetteIngredientId = { recetteId: +data.id, ingredientId: ingredient.id };
                recetteIngredient.ingredient = ingredient;
                recetteIngredient.id = recetteIngredientId;
            } else {
                const recetteIngredientId = { recetteId: +data.id, ingredientId: 0 };
                recetteIngredient.ingredient.id = 0;
                recetteIngredient.ingredient.urlPicture = 'https://previews.123rf.com/images/kerdkanno/kerdkanno1701/kerdkanno170100010/68705276-divers-de-la-cuisine-tha%C3%AFlandaise-ingr%C3%A9dients-de-cuisine-pour-%C3%A9pices-curry-rouge-p%C3%A2te-ingr%C3%A9dient-de-.jpg'
                recetteIngredient.id = recetteIngredientId;
            }
        });

        createRecipe(data).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                console.log(response);
            }
        })
        window.scrollTo(0, 0);
    }


    console.log(errors)

    return (
        <>
            <TitreH2 titre={"Ajouter une Recette"} />
            {isSubmitSuccessful && <div className="alert alert-success mt-4">Recette ajoutée avec succés</div>}

            <form action="" onSubmit={handleSubmit(onSubmit)} className="border border-secundary shadow-lg">
                <main className="container " >
                    <div className={`${styles.my_style_row} row mx-4 my-2 pb-3 mt-3 `} >
                        {/*************************** Titre *********************************/}
                        <div className="d-flex justify-content-center">
                            <div className="input-group-text  mt-5 w-50 ">
                                <span className="input-group-text" id="inputGroup-sizing-default">Titre</span>
                                <input {...register("title")}
                                    type="text"
                                    className="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    id="title" />
                            </div>
                        </div>
                        <ErrorMessage className={'text-danger d-flex justify-content-center'} name={'title'} errors={errors} as="p" />
                        {/*************************** Choisir une image *********************************/}

                        <div className="d-flex flex-column ">
                            <div className=" d-flex justify-content-center mt-5" >
                                <label htmlFor="avatar">Choisir une image:</label>
                                <input  {...register("urlPicture")} type="file" id="avatar"
                                    accept="image/png, image/jpeg"
                                    onChange={onSelectFile}
                                />
                            </div>
                            <ErrorMessage className={'text-danger d-flex justify-content-center'} name={'urlPicture'} errors={errors} as="p" />
                            {/*<p className="text-danger d-flex justify-content-center">{errors.urlPicture?.message?.toString()}</p>*/}

                            <div className=" d-flex justify-content-center mt-5">
                                <figure >
                                    <img className={styles.mystere}
                                        src={selectedFile ? (preview) : ('/images/mystere.jpg')}
                                        id="imgRecette" alt="point d'interrogation"
                                        style={{ objectFit: 'cover' }} />
                                </figure>
                            </div>
                        </div>
                    </div>
                </main>
                <main className="container mt-4 ">
                    <section className="row d-flex justify-content-center pt-3 px-2 mx-4 py-4 "
                        style={{ backgroundColor: 'rgba(131,197,190,0.1)', boxShadow: '1px 1px 1px rgba(131,197,190,0.9)', border: '1px 1px solid rgba(131,197,190,0.9)', borderRadius: ' 20px' }}>
                        <div className="col-12 col-md-12 col-lg-4 form-group ">
                            {/************************** Infos Clefs (Selecteurs) ********************************/}
                            <TitreH5
                                titre={"Infos clés"}
                                className={"custom-color-dore mb-3 ms-2"}
                            />
                            <InputSelect
                                register={register}
                                name={"difficultyLevel"}
                                errors={errors}
                                className={"form-select form-select-lg w-75"}
                                id={"difficultyLevel"}
                                array={difficultyOptions}
                            />

                            <InputSelect
                                register={register}
                                name={"categorie"}
                                errors={errors}
                                className={"form-select form-select-lg mt-3 w-75"}
                                id={"categorieId"}
                                array={categoriesOptions}
                            />

                            {/*************************** Les Durées *********************************/}
                            <div className={styles.duree}>
                                <TitreH5
                                    titre={"Temps total"}
                                    className={"custom-color-dore mb-3 ms-1"}
                                />
                                <FormGroupInputSpan
                                    register={register}
                                    name={"totalTimePreparation"}
                                    valeur={"Minutes"}
                                    type="text"
                                    errors={errors}
                                />
                            </div>

                            <div className={styles.duree}>
                                <TitreH5
                                    titre={"Temps de Préparation"}
                                    className={"custom-color-dore mb-3 ms-1"}
                                />
                                <FormGroupInputSpan
                                    register={register}
                                    errors={errors}
                                    name={"timePreparation"}
                                    valeur={"Minutes"}
                                    type="text"
                                />
                            </div>

                            <div className={styles.duree}>
                                <TitreH5
                                    titre={"Temps de cuisson"}
                                    className={"custom-color-dore mb-3 ms-1"}
                                />
                                <FormGroupInputSpan
                                    register={register}
                                    errors={errors}
                                    name={"cookingTime"}
                                    valeur={"Minutes"}
                                    type="text"
                                />
                            </div>

                            <div className={styles.duree}>
                                <TitreH5
                                    titre={"Temps de repos"}
                                    className={"custom-color-dore mb-3 ms-1"}
                                />
                                <FormGroupInputSpan
                                    register={register}
                                    errors={errors}
                                    name={"restTime"}
                                    valeur={"Minutes"}
                                    type="text"
                                />
                            </div>
                        </div>



                        {/*<h4 className="custom-color-dore mb-3 ">Infos clés</h4>
                            <select {...register('difficultyLevel')}
                                className="form-select form-select-lg mb-1  w-75"
                                aria-label=".form-select-lg example"
                                name="difficultyLevel"
                                defaultValue={""}
                            >
                                <option selected value="" disabled >Difficultés</option>
                                <option value="Facile">Facile</option>
                                <option value="Intermediaire">Intermédiaire</option>
                                <option value="Difficile">Difficile</option>
                            </select>
                            {<p className="text-danger ms-1">{errors.difficultyLevel?.message?.toString()}</p>}

                            <select {...register('categorie')}
                                className="form-select form-select-lg mb-1  w-75 "
                                defaultValue={""}
                                name="categorie"
                                aria-label=".form-select-lg example">
                                <option value="" disabled>Catégories</option>
                                <option value="1">Plat</option>
                                <option value="2">Entrees</option>
                                <option value="3">Desserts</option>
                                <option value="4">Apéritifs</option>
                            </select>
                            {<p className="text-danger ms-1">{errors.categorie?.message?.toString()}</p>}
                            */}
                        {/* <div className={`${styles.duree} `}>
                                <h4 className="custom-color-dore">Temps total</h4>
                                <div className=" d-flex flex-row justify-content-between  ">
                                    <div className="input-group w-75 ">
                                        <input {...register("totalTimePreparation")}
                                            type="text"
                                            className="form-control"
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                        {<p className="text-danger ms-1 mt-1">{errors.totalTimePreparation?.message?.toString()}</p>}
                                    </div>
                                </div>

                            </div>

                            <div className={styles.duree}>
                                <h4 className="custom-color-dore">Temps de préparation</h4>
                                <div className=" d-flex flex-row justify-content-between">
                                    <div className="input-group w-75">
                                        <input {...register("timePreparation")} type="text" className="form-control "
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                                {<p className="text-danger mt-1">{errors.timePreparation?.message?.toString()}</p>}
                            </div>

                            <div className={styles.duree}>
                                <h4 className="custom-color-dore">Temps de cuisson</h4>
                                <div className=" d-flex flex-row justify-content-between">
                                    <div className="input-group w-75">
                                        <input {...register("cookingTime")}
                                            type="text"
                                            className="form-control"
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                                {<p className="text-danger mt-1">{errors.cookingTime?.message?.toString()}</p>}
                            </div>

                            <div className={styles.duree}>
                                <h4 className="custom-color-dore">Temps de repos</h4>
                                <div className=" d-flex flex-row justify-content-between">
                                    <div className="input-group w-75">
                                        <input {...register('restTime')} type="text" className="form-control"
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                            </div>
                            {<p className="text-danger mt-1">{errors.restTime?.message?.toString()}</p>}
                            */}

                        {/*************************** Le nombre de parts *********************************/}
                        <div className="col-12 col-md-12 col-lg-7 ">
                            <TitreH5
                                titre={"Nombre de personnes"}
                                className={"custom-color-dore mb-3 ms-1"}
                            />
                            <FormGroupInputSpan
                                register={register}
                                errors={errors}
                                name={"numberOfPeople"}
                                valeur={"Personne(s)"}
                                type="text"
                            />
                            {/*************************** Les ingredients *********************************/}
                            <TitreH5
                                titre={"Ingrédients"}
                                className={"custom-color-dore mt-4 ms-1"}
                            />
                            {fields.map((field: RecettesIngredients, index: number) => (

                                <IngredientLine
                                    key={index}
                                    defaultValues={fields}
                                    click={() => {
                                        handleRemove(index);
                                    }}
                                    register={register}
                                    errors={errors}
                                    searchTerm={searchTerm}
                                    allIngredients={allIngredients}
                                    handleSearchTerm={(e) => handleSearchTerm(e, setSearchTerm)}
                                    index={index}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                />
                            ))}

                            <Button className="mt-3 me-1"
                                variant="secondary"
                                type={"button"}
                                onClick={() => { appendIngredient() }}
                            >
                                +
                            </Button>

                            {/* <h4 className="mb-3  custom-color-dore">Nombre de personnes</h4>
                            <div className=" d-flex flex-row justify-content-between">
                                <div className="input-group w-75">
                                    <input {...register("numberOfPeople")} type="text" className="form-control "
                                        aria-label="Dollar amount (with dot and two decimal places)" />
                                    <span className="input-group-text ">personnes</span>
                                </div>
                            </div>
                            {<p className="text-danger mt-1">{errors.numberOfPeople?.message?.toString()}</p>}

                            <h4 className="custom-color-dore">Ingrédients</h4>
                            {ingredients.map((ingredient, index) =>
                            (
                                <div key={index} className=" d-flex flex-row justify-content-between mb-1 mt-3">
                                    <div className=" w-50 me-2">
                                        <input type="text" placeholder='oeufs'
                                            className="form-control" {...register(`recettesIngredients.${index}.ingredient.name`)}
                                            aria-label="Dollar amount (with dot and two decimal places)"
                                            onChange={(e) => handleSearchTerm(e)}
                                            list="ingredients"

                                        />
                                        <datalist id="ingredients">
                                            {allIngredients
                                                .filter(ingredient => ingredient.name.includes(searchTerm))
                                                .map(ingredient =>
                                                    <option key={ingredient.id} value={ingredient.name} />
                                                )}
                                        </datalist>
                                        {<p className="text-danger">{errors.ingredient?.message?.toString()}</p>}
                                    </div>

                                    <div className=" w-25">
                                        <input type="number" step={1} min={0} placeholder='quantité'
                                            className="form-control" {...register(`recettesIngredients.${index}.quantite`)}
                                            aria-label="Dollar amount (with dot and two decimal places)"
                                            onChange={(e) => console.log(e.target.value)}

                                        />

                                        {<p className="text-danger">{errors.quantity?.message?.toString()}</p>}
                                    </div>

                                    <div>
                                        <select {...register(`recettesIngredients.${index}.uniteMesure`, { required: true })}
                                            className="form-select form-select mb-3 w-75 ms-2"
                                            required
                                            aria-label=".form-select-lg example">
                                            <option key={ingredient.uniteMesure} selected>Mesure</option>
                                            {Object.keys(UniteMesureEnum)
                                                .filter(key => isNaN(Number(key)))
                                                .filter(key => key != "map")
                                                .map(key => <option value={key}>{key}</option>)}
                                        </select>
                                        {<p className="text-danger">{errors.quantity?.message?.toString()}</p>}
                                    </div>
                                </div>

                            ))}

                            <Button className="mt-3 me-1"
                                variant="secondary"
                                type={"button"}
                                onClick={addNewLine}>
                                +
                            </Button>
                            <Button className="mt-3"
                                variant="danger"
                                type={"button"}
                                onClick={deleteLine}
                                id="deleteIngredient"

                            >
                                X
                            </Button>*/}
                        </div>
                    </section>
                </main>
                <main className="container">
                    {/*************************** Les étapes de préparations *********************************/}
                    <section className="row">
                        <StepPreparation
                            register={register}
                            name={"stepPreparation"}
                            errors={errors} />
                    </section>
                </main>
                <div className="d-flex justify-content-center mb-3">
                    <Button
                        className="mt-3 "
                        variant="secondary"
                        type={"submit"}
                        name={"updateSubmit"}
                    >
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Valider
                    </Button>
                </div>
            </form>

        </>
    );
}

export default AjoutRecettePage;

