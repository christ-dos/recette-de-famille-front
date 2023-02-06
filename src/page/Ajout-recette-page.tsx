
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { TitreH2 } from "../components/children";
import styles from '../css/ajout-recette-page.module.css';
import '../css/common.css';
import { Ingredient } from "../models/Ingredient";
import { UniteMesureEnum } from '../models/RecetteIngredient';
import { getCategorieById } from "../services/CategorieService";
import { getAllIngredient } from "../services/IngredientService";

const schema = yup.object({
    title: yup.string()
        .required("Ce champs est requis")
        .min(3, "Entrer au min 3 caracteres ")
        .max(100, "100 caractères maximum"),

    /* urlPicture: yup.string()
         .required("Ce champs est requis"),*/

    totalTimePreparation: yup.string()
       .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés")
        .required("Ce champs est requis")
        .max(5, "5 caractères maximum"),

    timePreparation: yup.string()
        .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés")
        .max(5, "5 caractères maximum"),

    cookingTime: yup.string()
        .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés")
        .max(5, "5 caractères maximum"),

    restTime: yup.string()
        .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés")
        .max(5, "5 caractères maximum"),

    stepPreparation: yup.string()
        .required("Ce champs est requis"),

    difficultyLevel: yup.string(),

    numberOfPeople: yup.string()
        .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés"),

    categorie: yup.string()
        .required("Ce champs est requis")
        .uppercase("Ce champs doit être en majuscule"),

    /* quantity: yup.number()
     .required("Ce champs est requis"),
 
     ingredient: yup.string()
     .required("Ce champs est requis"),
 
     uniteMesure: yup.string()
     .uppercase("Ce champs doit être en majuscule")
     .required("Ce champs est requis")*/

}).required();

//  type FormData = yup.InferType<typeof schema>;   

const AjoutRecettePage: FunctionComponent = () => {

    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', uniteMesure: 'PIECE' }]);
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
    const [count, setCount] = useState(0);
    const [selectedFile, setSelectedFile] = useState<any>()
    const [preview, setPreview] = useState<string | undefined>()
    const [searchTerm, setSearchTerm] = useState("");


    const { register, handleSubmit, formState: { errors }, formState } = useForm<any>({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const { isSubmitted, isSubmitSuccessful } = formState

    useEffect(() => {
        getAllIngredient().then(allIngredients => setAllIngredients(allIngredients));
        console.log(allIngredients);
    }, []);


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


    function addNewLine() {
        const newLine = { name: '', uniteMesure: 'PIECE', quantity: '' }
        setIngredients([...ingredients, newLine])
        setCount(count + 1);
    }

    function deleteLine() {
        if (ingredients.length > 1) {
            ingredients.pop()
            setIngredients([...ingredients])
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

    function getIngedientByName(name: string): Ingredient | undefined {
        const result = allIngredients.filter(x => x.name.toLowerCase() === name.toLowerCase())
        if (result) {
            return result[0];
        }
    }

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        setPreview(selectedFile)
        console.log(preview);
    }

    const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        console.log(value)
        setSearchTerm(value)
        //value.length > 2 ? (setSearchTerm(value)) : (setSearchTerm(""))
    }

    async function onSubmit(data: any) {
            console.log(data);
        let blob = data.urlPicture[0].slice();

        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function () {
            data.urlPicture = reader.result;
        }

        const recettesIngredients = [];
        for (let i = 0; i <= count; i++) {
            const ingredient = getIngedientByName(data[`ingredient-${i}`].toLowerCase());

            recettesIngredients.push({
                quantite: data[`quantity-${i}`],
                uniteMesure: data[`uniteMesure-${i}`],
                ingredient: { id: ingredient?.id, name: data[`ingredient-${i}`].toLowerCase(), urlPicture: 'https://previews.123rf.com/images/karandaev/karandaev1506/karandaev150600338/41087901-italienne-ingr%C3%A9dients-de-cuisine-alimentaire-p%C3%A2tes-l%C3%A9gumes-%C3%A9pices-vue-de-dessus.jpg' }
            });
            delete data[`ingredient-${i}`];
            delete data[`quantity-${i}`];
            delete data[`uniteMesure-${i}`];
        }
        const resultCategorie = await getCategorieById(data.categorie);
        data.categorie = { id: resultCategorie.id, name: resultCategorie.name, urlPicture: resultCategorie.urlPicture }

        data.recettesIngredients = recettesIngredients

        createRecipe(data).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                console.log(response);
            }
        })
    }

    console.log(errors)

    return (
        <>
            <TitreH2 titre={"Ajouter une Recette"} />
            <form action="" onSubmit={handleSubmit(onSubmit)} className="border border-secundary shadow-lg">
                <main className="container" >
                    <div className='row mx-4 my-2 pb-3 mt-3' style={{
                        border: '1px 1px solidrgba(131,197,190,0.9)', backgroundColor: 'rgba(131,197,190,0.1)',
                        boxShadow: '1px 1px 1px rgba(131,197,190,0.9)', borderRadius: ' 20px'
                    }}>
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
                        {<p className="text-danger d-flex justify-content-center">{errors.title?.message?.toString()}</p>}

                        <div className="d-flex flex-column ">
                            <div className=" d-flex justify-content-center mt-5" >
                                <label htmlFor="avatar">Choisir une image:</label>
                                <input  {...register("urlPicture")} type="file" id="avatar"
                                    accept="image/png, image/jpeg"
                                    onChange={onSelectFile}
                                />
                            </div>
                            {<p className="text-danger d-flex justify-content-center">{errors.urlPicture?.message?.toString()}</p>}

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
                <main className="container mt-4">
                    <section className="row d-flex justify-content-center pt-3 px-2 mx-4 py-4 "
                        style={{ backgroundColor: 'rgba(131,197,190,0.1)', boxShadow: '1px 1px 1px rgba(131,197,190,0.9)', border: '1px 1px solid rgba(131,197,190,0.9)', borderRadius: ' 20px' }}>
                        <div className="col-12 col-md-12 col-lg-4 form-group">
                            <h4 className="custom-color-dore">Infos clés</h4>
                            <select {...register('difficultyLevel')} className="form-select form-select-lg mb-3 w-50"
                                aria-label=".form-select-lg example">
                                <option selected defaultValue={'Facile'}>Difficultés</option>
                                <option value="Facile">Facile</option>
                                <option value="Intermédiaire">Intermédiaire</option>
                                <option value="Difficile">Difficile</option>
                            </select>
                            {<p className="text-dange">{errors.difficultyLevel?.message?.toString()}</p>}

                            <select {...register('categorie')} className="form-select form-select-lg mb-3 w-50 "
                                aria-label=".form-select-lg example">
                                <option selected>Catégories</option>
                                <option value="1">Plat</option>
                                <option value="2">Entrees</option>
                                <option value="3">Desserts</option>
                                <option value="4">Apéritifs</option>
                            </select>
                            {<p className="text-danger">{errors.categorie?.message?.toString()}</p>}

                            <div className={styles.duree}>
                                {/* <h3 className={styles.h3}>Temps</h3>*/}
                                <h4 className="custom-color-dore">Temps total</h4>
                                <div className=" d-flex flex-row justify-content-between">
                                    <div className="input-group w-50">
                                        <input {...register("totalTimePreparation")} type="text" className="form-control"
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                                {<p className="text-danger">{errors.totalTimePreparation?.message?.toString()}</p>}
                            </div>

                            <div className={styles.duree}>
                                <h4 className="custom-color-dore">Temps de préparation</h4>
                                <div className=" d-flex flex-row justify-content-between">
                                    <div className="input-group w-50">
                                        <input {...register("timePreparation")} type="text" className="form-control "
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                                {<p className="text-danger">{errors.timePreparation?.message?.toString()}</p>}
                            </div>

                            <div className={styles.duree}>
                                <h4 className="custom-color-dore">Temps de cuisson</h4>
                                <div className=" d-flex flex-row justify-content-between">
                                    <div className="input-group w-50">
                                        <input {...register("cookingTime")} type="text" className="form-control"
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                                {<p className="text-danger">{errors.cookingTime?.message?.toString()}</p>}
                            </div>

                            <div className={styles.duree}>
                                <h4 className="custom-color-dore">Temps de repos</h4>
                                <div className=" d-flex flex-row justify-content-between">
                                    <div className="input-group w-50">
                                        <input {...register('restTime')} type="text" className="form-control"
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                            </div>
                            {<p className="text-danger">{errors.restTime?.message?.toString()}</p>}
                        </div>

                        <div className="col-12 col-md-12 col-lg-7 ">
                            <h4 className="mb-3 mt-3 custom-color-dore">Nombre de personnes</h4>
                            <div className=" d-flex flex-row justify-content-between">
                                <div className="input-group w-50 mb-3 ">
                                    <input {...register("numberOfPeople")} type="text" className="form-control "
                                        aria-label="Dollar amount (with dot and two decimal places)" />
                                    <span className="input-group-text ">personnes</span>
                                </div>
                            </div>
                            {<p className="text-danger">{errors.numberOfPeople?.message?.toString()}</p>}

                            {/*  <h3 className={styles.h3}>Ingrédients</h3>*/}
                            <h4 className="custom-color-dore">Ingrédients</h4>
                            {ingredients.map((ingredient, index) =>
                            (
                                <div key={index} className=" d-flex flex-row justify-content-between mb-1 mt-3">
                                    <div className="input-group w-50 me-2">
                                        <input type="text"
                                            className="form-control" {...register(`recetteIngredients.${index}.ingredient.name`, {})}
                                            aria-label="Dollar amount (with dot and two decimal places)"
                                            onChange={(e) => handleSearchTerm(e)}
                                            list="ingredients"
                                            required
                                        />
                                        <span className="input-group-text ">Ingrédient</span>
                                        <datalist id="ingredients">
                                            {allIngredients
                                                .filter(ingredient => ingredient.name.includes(searchTerm))
                                                .map(ingredient =>
                                                    <option value={ingredient.name} />
                                                )}
                                        </datalist>
                                        {<p className="text-danger">{errors.ingredient?.message?.toString()}</p>}
                                    </div>

                                    <div className="input-group w-50 ">
                                        <input type="number" step={1} min={0}
                                            className="form-control" {...register(`recetteIngredients.${index}.quantite`)}
                                            aria-label="Dollar amount (with dot and two decimal places)"
                                            onChange={(e) => console.log(e.target.value)}
                                            required
                                        />
                                        <span className="input-group-text">Quantité</span>
                                        {<p className="text-danger">{errors.quantity?.message?.toString()}</p>}
                                    </div>

                                    <select {...register(`recetteIngredients.${index}.uniteMesure`)}
                                        className="form-select form-select-lg mb-3 w-50 ms-2"
                                        required
                                        aria-label=".form-select-lg example">
                                        <option selected>Mesure</option>
                                        {Object.keys(UniteMesureEnum)
                                            .filter(key => isNaN(Number(key)))
                                            .filter(key => key != "map")
                                            .map(key => <option value={key}>{key}</option>)}
                                    </select>
                                    {/*<p className="text-danger">{errors.recetteIngredients.[index].uniteMesure.message?.toString()}</p>*/}
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
                            </Button>
                        </div>
                    </section>
                </main>
                <main className="container">
                    <section className="row">
                        <div className="col-12 col-md-12 col-lg-12 ">
                            <h3 className={` ms-4 custom-color-dore mt-2`}>Préparation</h3>
                            <div className="form-floating mx-4"  style={{boxShadow: '1px 1px 1px rgba(131,197,190,0.9)'}}>
                                <textarea {...register("stepPreparation")} className={`form-control ${styles.textarea}`}
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea"></textarea>
                                   
                                <label htmlFor="floatingTextarea">Aller à la ligne pour chaque étape</label>
                            </div>
                            {<p className="text-danger">{errors.stepPreparation?.message?.toString()}</p>}
                        </div>
                    </section>
                </main>
                <div className="d-flex justify-content-center mb-3">
                    <Button className="mt-3 " variant="secondary" type={"submit"}>Valider</Button>
                </div>
                {isSubmitSuccessful && <div className="alert alert-success mt-4">Recette ajoutée avec succés</div>}
            </form>

        </>
    );
}

export default AjoutRecettePage;


