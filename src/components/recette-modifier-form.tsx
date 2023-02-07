import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from '../css/ajout-recette-page.module.css';
import { Ingredient } from "../models/Ingredient";
import { Recette } from "../models/recette";
import { recettesIngredients, UniteMesureEnum } from "../models/RecetteIngredient";
import { getCategorieById } from "../services/CategorieService";
import { getAllIngredient } from "../services/IngredientService";
import { TitreH2 } from "./children";


type Props = {
  recette: Recette
};

type Field = {
  value: any,
  error?: string,
  isValid?: boolean
}

type IngredientLine = {
  name: string,
  quantite: number,
  uniteMesure: UniteMesureEnum
}

type Form = {
  title: Field,

  urlPicture: Field

  totalTimePreparation: Field,

  timePreparation: Field,

  cookingTime: Field,

  restTime: Field,

  stepPreparation: Field,

  difficultyLevel: Field,

  numberOfPeople: Field,

  categorie: Field,

  recettesIngredients: Field

}

const RecetteEditForm: FunctionComponent<Props> = ({ recette }) => {

  const [recettesIngredients, setRecettesIngredients] = useState([{ ingredient: { name: '', urlPicture: ''}, uniteMesure: typeof UniteMesureEnum, quantity: 0 }]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [count, setCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<any>()
  const [preview, setPreview] = useState<string | undefined>()
  const [searchTerm, setSearchTerm] = useState("")
  const [form, setForm] = useState<Form>({

    title: { value: recette.title, isValid: true },

    urlPicture: { value: recette.urlPicture, isValid: true },

    totalTimePreparation: { value: recette.totalTimePreparation, isValid: true },

    timePreparation: { value: recette.timePreparation, isValid: true },

    cookingTime: { value: recette.cookingTime, isValid: true },

    restTime: { value: recette.restTime, isValid: true },

    stepPreparation: { value: recette.stepPreparation, isValid: true },

    difficultyLevel: { value: recette.difficultyLevel, isValid: true },

    numberOfPeople: { value: recette.numberOfPeople, isValid: true },

    categorie: { value: recette.categorie, isValid: true },

    recettesIngredients: { value: recette.recettesIngredients, isValid: true }

  });

  const { register, handleSubmit, formState: { errors }, formState } = useForm<any>({
    mode: 'onChange',
    // resolver: yupResolver(schema)
  });

  const { isSubmitted, isSubmitSuccessful } = formState

  useEffect(() => {
    getAllIngredient().then(allIngredients => setAllIngredients(allIngredients));
    //console.log(allIngredients);

    getCategorieSelect()
    getDifficultySelect(recette);

    displayIngredients(recette)

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

  function hasUniteMesure(uniteMesure: string):boolean{

      return form.recettesIngredients.value.includes(uniteMesure);
  }

  
  function getDifficultySelect(recette: Recette) {
    let choix: number = 0

    switch (recette.difficultyLevel.toLowerCase()) {
      case "facile":
        choix = 1;
        break;

      case "intermédiaire":
        choix = 2;
        break;

      case "difficile":
        choix = 3;
        break;

      default: ;
        console.log("choix impossible")
        break;
    }
    const selectDifficulté = document.getElementById('difficultyLevel')
    console.log("choix: " + choix)
    const optionDifficulte = selectDifficulté?.getElementsByTagName('option')[choix]
    console.log(optionDifficulte);
    optionDifficulte?.setAttribute('selected', 'selected');
  }


  function getCategorieSelect() {

    const selectCategorie = document.getElementById('categorie')
    const optionCategorie = selectCategorie?.getElementsByTagName('option')[form.categorie.value.id]
    optionCategorie?.setAttribute('selected', 'selected');
  }

  function displayIngredients(recette: Recette) {

    recette.recettesIngredients.map(recetteIngredient => {
      addNewLineIngredientFilled(recetteIngredient);
    })
    console.log(recettesIngredients.length)
  }

  function addNewLine() {
    const newLine = { ingredient: {name: '', urlPicture: ''}, uniteMesure: typeof UniteMesureEnum, quantity: 0 }
    setRecettesIngredients([...recettesIngredients, newLine])
    console.log(recettesIngredients.length)
    setCount(count + 1);
  }

  function addNewLineIngredientFilled(recetteIngredient: recettesIngredients) {
    // console.log(recetteIngredient.uniteMesure);
    //console.log(recetteIngredient.ingredient.name);

  
    const newLine = {
      ingredient: { name: recetteIngredient.ingredient.name, urlPicture: ''},
      uniteMesure: typeof recetteIngredient.uniteMesure,
      quantity: recetteIngredient.quantite
    }
    setRecettesIngredients([...recettesIngredients, newLine])
    setCount(count + 1);
    console.log(recettesIngredients)

  }

  function deleteLine() {
    if (recettesIngredients.length > 1) {
      recettesIngredients.pop()
      setRecettesIngredients([...recettesIngredients])
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

  /*function getIngedientByName(name: string): Ingredient | undefined {
    const result = allIngredients.filter(x => x.name.toLowerCase() === name.toLowerCase())
    if (result) {
      return result[0];
    }
  }*/

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
    console.log(data)

    let blob = data.urlPicture[0].slice();

    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function () {
      data.urlPicture = reader.result;
    }

    const recettesIngredients = [];
    for (let i = 0; i <= count; i++) {
      // const ingredient = getIngedientByName(data[`ingredient-${i}`].toLowerCase());

      /* recettesIngredients.push({
         quantite: data[`quantity-${i}`],
         uniteMesure: data[`uniteMesure-${i}`],
         ingredient: { id: ingredient?.id, name: data[`ingredient-${i}`].toLowerCase(), urlPicture: 'https://previews.123rf.com/images/karandaev/karandaev1506/karandaev150600338/41087901-italienne-ingr%C3%A9dients-de-cuisine-alimentaire-p%C3%A2tes-l%C3%A9gumes-%C3%A9pices-vue-de-dessus.jpg' }
       });
       delete data[`ingredient-${i}`];
       delete data[`quantity-${i}`];
       delete data[`uniteMesure-${i}`];*/
    }
    const resultCategorie = await getCategorieById(data.categorie);
    data.categorie = { id: resultCategorie.id, name: resultCategorie.name, urlPicture: resultCategorie.urlPicture }

    //  data.recettesIngredients = recettesIngredients

    createRecipe(data).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
      }
    })
  }

  return (
    <>
      <TitreH2 titre={"Editer une Recette"} />
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
                  value={form.title.value}
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
                    src={selectedFile ? (preview) : (form.urlPicture.value)}
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
                aria-label=".form-select-lg example"
                id="difficultyLevel">
                <option selected defaultValue={'Facile'}>Difficultés</option>
                <option value="facile">Facile</option>
                <option value="intermédiaire">Intermédiaire</option>
                <option value="difficile">Difficile</option>
              </select>
              {<p className="text-dange">{errors.difficultyLevel?.message?.toString()}</p>}

              <select {...register('categorie')}
                className="form-select form-select-lg mb-3 w-50 "
                aria-label=".form-select-lg example"
                id="categorie">
                <option selected value="0">Catégories</option>
                <option value="1">Plat</option>
                <option value="2">Entrees</option>
                <option value="3">Desserts</option>
                <option value="4">Apéritifs</option>
              </select>
              {<p className="text-danger">{errors.categorie?.message?.toString()}</p>}

              <div className={styles.duree}>

                <h4 className="custom-color-dore">Temps total</h4>
                <div className=" d-flex flex-row justify-content-between">
                  <div className="input-group w-50">
                    <input {...register("totalTimePreparation")} type="text"
                      className="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                      value={form.totalTimePreparation.value}
                    />
                    <span className="input-group-text">Minutes</span>
                  </div>
                </div>
                {<p className="text-danger">{errors.totalTimePreparation?.message?.toString()}</p>}
              </div>

              <div className={styles.duree}>
                <h4 className="custom-color-dore">Temps de préparation</h4>
                <div className=" d-flex flex-row justify-content-between">
                  <div className="input-group w-50">
                    <input {...register("timePreparation")} type="text"
                      className="form-control "
                      aria-label="Dollar amount (with dot and two decimal places)"
                      value={form.timePreparation.value}
                    />
                    <span className="input-group-text">Minutes</span>
                  </div>
                </div>
                {<p className="text-danger">{errors.timePreparation?.message?.toString()}</p>}
              </div>

              <div className={styles.duree}>
                <h4 className="custom-color-dore">Temps de cuisson</h4>
                <div className=" d-flex flex-row justify-content-between">
                  <div className="input-group w-50">
                    <input {...register("cookingTime")} type="text"
                      className="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                      value={form.cookingTime.value}
                    />
                    <span className="input-group-text">Minutes</span>
                  </div>
                </div>
                {<p className="text-danger">{errors.cookingTime?.message?.toString()}</p>}
              </div>

              <div className={styles.duree}>
                <h4 className="custom-color-dore">Temps de repos</h4>
                <div className=" d-flex flex-row justify-content-between">
                  <div className="input-group w-50">
                    <input {...register('restTime')} type="text"
                      className="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                      value={form.restTime.value} />
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
                  <input {...register("numberOfPeople")} type="text"
                    className="form-control "
                    aria-label="Dollar amount (with dot and two decimal places)"
                    value={form.numberOfPeople.value} />
                  <span className="input-group-text ">personnes</span>
                </div>
              </div>
              {<p className="text-danger">{errors.numberOfPeople?.message?.toString()}</p>}


              <h4 className="custom-color-dore">Ingrédients</h4>
            
              {recettesIngredients.map((recetteIngredient, index) =>
             
              (
                <div className=" d-flex flex-row justify-content-between mb-1 mt-3">
                  <div className="input-group w-50 me-2">
                    <input type="text"
                    {...register(`recettesIngredients.${index}.ingredient.name`)}
                      className="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                      onChange={(e) => handleSearchTerm(e)}
                      list="ingredients"
                      required
                      value= {`recettesIngredients.${index}.ingredient.name`}
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
                      className="form-control" {...register(`recettesIngredients.${index}.quantite`)}
                      aria-label="Dollar amount (with dot and two decimal places)"
                      onChange={(e) => console.log(e.target.value)}
                      value={recetteIngredient.quantity}
                      required
                    />
                    <span className="input-group-text">Quantité</span>
                    {<p className="text-danger">{errors.quantity?.message?.toString()}</p>}
                  </div>

                  <select {...register(`recettesIngredients.${index}.uniteMesure`)}
                    className="form-select form-select-lg mb-3 w-50 ms-2"
                    required
                    aria-label=".form-select-lg example">
                    <option selected>Mesure</option>
                    {Object.keys(UniteMesureEnum)
                      .filter(key => isNaN(Number(key)))
                      .filter(key => key != "map")
                      .map(key => <option value={key}>{key}</option>)}
                  </select>
                  {<p className="text-danger">{errors.uniteMesure?.message?.toString()}</p>}
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
              <div className="form-floating mx-4" style={{ boxShadow: '1px 1px 1px rgba(131,197,190,0.9)' }}>
                <textarea {...register("stepPreparation")} className={`form-control ${styles.textarea}`}
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  value={form.stepPreparation.value}
                >
                </textarea>

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

export default RecetteEditForm;