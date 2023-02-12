import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TitreH2 } from "../components/children";
import styles from '../css/ajout-recette-page.module.css';
import { Ingredient } from "../models/Ingredient";
import { Recette } from "../models/recette";
import { UniteMesureEnum } from "../models/RecetteIngredient";
import { getCategorieById } from "../services/CategorieService";
import { getAllIngredient } from "../services/IngredientService";


type Props = {
  recette: Recette
};

type Field = {
  value: any,
  error?: string,
  isValid?: boolean
}


type Form = {
  id: Field,

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

  const [recettesIngredients, setRecettesIngredients] = useState<any>([{ingredient: { name: '', urlPicture: ''}, uniteMesure: UniteMesureEnum, quantity: 0}]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [count, setCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<any>()
  const [preview, setPreview] = useState<string | undefined>()
  const [searchTerm, setSearchTerm] = useState("")
 // const [categorie, setCategorie] = useState("")
  const [form, setForm] = useState<Form>({

    id: { value: recette.id, isValid: true },

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
  });

  const { isSubmitted, isSubmitSuccessful } = formState

  useEffect(() => {
    getAllIngredient().then(allIngredients => setAllIngredients(allIngredients));
   
    getCategorieSelect();
    getDifficultySelect(recette);
    getUniteMesureSelect();
   
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

  useEffect(() => {
    
  }, [recettesIngredients]);


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
    const selectDifficulte = document.getElementById('difficultyLevel')
    const optionDifficulte = selectDifficulte?.getElementsByTagName('option')[choix]
    console.log(optionDifficulte);
    optionDifficulte?.setAttribute('selected', 'selected');
   // optionDifficulte?.setAttribute('defaultValue', recette.difficultyLevel.toLowerCase());
   // console.log(optionDifficulte?.getAttribute('defaultValue'));
  }

  function getUniteMesureSelect() {

    const selectUniteMesure = document.getElementById('uniteMesure')
    console.log(selectUniteMesure)
    const optionUniteMesure = selectUniteMesure?.getElementsByTagName('option').namedItem('KILOGRAMME')
    console.log(optionUniteMesure?.getAttribute('defaultValue'))
    optionUniteMesure?.setAttribute('selected', 'selected');
  }

  function getCategorieSelect() {

    const selectCategorie = document.getElementById('categorie')
    const optionCategorie = selectCategorie?.getElementsByTagName('option')[form.categorie.value.id]
    optionCategorie?.setAttribute('selected', 'selected');
  }

  function addNewLine() {
    const newLine = { ingredient: { name: '', urlPicture: '' }, uniteMesure: '', quantite: 0 }
    setRecettesIngredients([...recettesIngredients, newLine])
    setCount(count + 1);
  }

  function deleteLine() {
    if (recettesIngredients.length > 1) {
      recettesIngredients.pop()
      setRecettesIngredients([...recettesIngredients])
    }
  }

  const updateRecipe = (data: any) => {
    return fetch('http://localhost:8082/recette/update', {
      method: 'PUT',
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
    console.log("datas:" ,data)
    console.log("picture:" ,data.urlPicture)
    console.log("id: " + data.id)

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

    const recettesIngredients = [];
    console.log("cate: ", data.categorie);
    const resultCategorie = await getCategorieById(data.categorie);
    data.categorie = { id: resultCategorie.id, name: resultCategorie.name, urlPicture: resultCategorie.urlPicture }

    data.recettesIngredients.map((recIng: any) => console.log(recIng.ingredient.name));
    data.recettesIngredients.map((recIng: any) => {
        const ingredient = getIngedientByName(recIng.ingredient.name)
        recIng.ingredient = ingredient;
    });

    //  data.recettesIngredients = recettesIngredients

    updateRecipe(data).then((response) => {
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
            boxShadow: '1px 1px 1px rgba(131,197,190,0.9)', borderRadius: '20px'
          }}>
            <div className="d-flex justify-content-center">
              <div className="input-group-text  mt-5 w-50 ">
              <input type="text"  hidden value={form.id.value} {...register("id")}/>
                <span className="input-group-text" id="inputGroup-sizing-default">Titre</span>
                <input type="text"
                {...register("title")}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  defaultValue={form.title.value}
                  id="title" />
              </div>
            </div>
            {<p className="text-danger d-flex justify-content-center">{errors.title?.message?.toString()}</p>}

            <div className="d-flex flex-column ">
              <div className=" d-flex justify-content-center mt-5" >
                <label htmlFor="avatar">Choisir une image:</label>
                <input  {...register("urlPicture")} 
                  type="file" 
                  id="avatar"
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
            <div className="col-12 col-md-12 col-lg-4 form-group d-flex flex-column justify-content-center ">
              <h4 className="custom-color-dore">Infos clés</h4>
              <select {...register('difficultyLevel')} className="form-select form-select-lg mb-3 w-50"
                aria-label=".form-select-lg example"
                id="difficultyLevel">
                <option selected value={'facile'}>Difficultés</option>
                <option value="facile">Facile</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="difficile">Difficile</option>
              </select>
              {<p className="text-danger">{errors.difficultyLevel?.message?.toString()}</p>}

              <select {...register('categorie')}
                className="form-select form-select-lg mb-3 w-50 "
                aria-label=".form-select-lg example"
                id="categorie">
                <option selected defaultValue="0">Catégories</option>
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
                      defaultValue={form.totalTimePreparation.value}
                    />
                    <span className="input-group-text">Minutes</span>
                  </div>
                  {<p className="text-danger">{errors.totalTimePreparation?.message?.toString()}</p>}
                </div>

              </div>

              <div className={styles.duree}>
                <h4 className="custom-color-dore">Temps de préparation</h4>
                <div className=" d-flex flex-row justify-content-between">
                  <div className="input-group w-50">
                    <input {...register("timePreparation")} type="text"
                      className="form-control "
                      aria-label="Dollar amount (with dot and two decimal places)"
                      defaultValue={form.timePreparation.value}
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
                      defaultValue={form.cookingTime.value}
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
                      defaultValue={form.restTime.value} />
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
                    defaultValue={form.numberOfPeople.value} />
                  <span className="input-group-text ">personnes</span>
                </div>
              </div>
              {<p className="text-danger">{errors.numberOfPeople?.message?.toString()}</p>}


              <h4 className="custom-color-dore">Ingrédients</h4>

              {recette.recettesIngredients.map((ingredient, index) => (
                <>
                  <div className=" d-flex flex-row justify-content-between mb-1 mt-3">
                    <div className="me-2">
                      <input type="text"
                      {...register(`recettesIngredients.${index}.ingredient.name`)}
                        className="form-control"
                        aria-label="Dollar amount (with dot and two decimal places)"
                        onChange={(e) => handleSearchTerm(e)}
                        list="ingredients"
                        required
                        defaultValue={ingredient.ingredient.name} />
                    <datalist id="ingredients">
                      {allIngredients
                        .filter(ingredient => ingredient.name.includes(searchTerm))
                        .map(ingredient =>
                          <option key={ingredient.id} defaultValue={ingredient.name} />
                        )}
                    </datalist>
                    </div>

                    <div>
                      <input type="number" 
                       {...register(`recettesIngredients.${index}.quantite`)}
                        step={1} 
                        min={0}
                        className="form-control"
                        aria-label="Dollar amount (with dot and two decimal places)"
                        onChange={(e) => console.log(e.target.value)}
                        defaultValue={ingredient.quantite}
                        required />
                    </div>

                    <select
                      className="form-select form-select mb-3 w-50 ms-2"
                      {...register(`recettesIngredients.${index}.uniteMesure`)}
                      required
                      aria-label=".form-select example"
                      id="uniteMesure">
                      <option selected>Mesure</option>
                      {Object.keys(UniteMesureEnum)
                        .filter(key => isNaN(Number(key)))
                        .filter(key => key != "map")
                        .map(key => <option key={key} defaultValue={key}>{key}</option>)}
                    </select>

                  </div></>
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