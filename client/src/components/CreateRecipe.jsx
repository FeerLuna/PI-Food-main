import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import Navbar from "./Navbar";
import "../styles/CreateRecipe.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Tu receta necesita un Nombre"
  } else if (input.summary.length > 255) {
    errors.summary = "Cuéntanos de qué se trata tu receta";
  } else if (input.healthScore > 100 || input.healthScore < 0) {
    errors.healthScore = "La puntuación de salud debe ser un número entre 0 y 100";
  } else if (!input.image) {
    errors.image = "Sería bueno que nos muestres cómo se ve";
  } else if (!input.steps) {
    errors.steps = "¿No quieres decirnos cómo hacerlo nosotros mismos?";
  }
  return errors;
}

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    //state, setstate
    name: "",
    summary: "",
    healthScore: "",
    image: "",
    steps: "",
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate(input));
  }

  function handleCheck(e) {
    console.log(input);
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postRecipe(input));
    alert("Receta creada");
    setInput({
      name: "",
      summary: "",
      healthScore: "",
      image: "",
      steps: "",
      diets: [],
    });
    history.push("/home"); //hook to redirect
  }

  useEffect(() => {
    dispatch(getDiets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="createMain">
      <ScrollToTop />
      <Navbar />

      <div className="createContainer">
        <div className="create">
          <h3 className="create__h3">Crea tu propia receta!</h3>

          <form onSubmit={(e) => handleSubmit(e)} className="create__form">
            <div className="create__divName">
              <label className="create__divName__label create__divName__label-margin">
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={(e) => handleChange(e)}
                className="create__form__input"
              />
              {errors.name && <h5 className="create__error">{errors.name}</h5>}
            </div>

            <div className="create__divHealthScore">
              <label className="create__divName__label create__divHealScore__label-margin">
                Puntuacion de salud:
              </label>
              <input
                type="number"
                name="healthScore"
                value={input.healthScore}
                onChange={(e) => handleChange(e)}
                className="create__form__input"
              />
              {errors.healthScore && (
                <h5 className="create__error">{errors.healthScore}</h5>
              )}
            </div>

            <div className="create__divImage">
              <label className="create__divName__label create__divImage__label-margin">
                Image:
              </label>
              <input
                type="text"
                name="image"
                value={input.image}
                onChange={(e) => handleChange(e)}
                className="create__form__input"
              />
              {errors.image && (
                <h5 className="create__error">{errors.image}</h5>
              )}
            </div>

            <div className="create__divSummary">
              <label className="create__divName__label create__divSummary__label-margin">
                Resumen:
              </label>
              <input
                type="text"
                name="summary"
                value={input.summary}
                onChange={(e) => handleChange(e)}
                className="create__form__input"
              />
              {errors.summary && (
                <h5 className="create__error">{errors.summary}</h5>
              )}
            </div>

            <div className="create__divSteps">
              <label className="create__divName__label create__divSteps__label-margin">
              Paso a paso:
              </label>
              <input
                type="text"
                name="steps"
                value={input.steps}
                onChange={(e) => handleChange(e)}
                className="create__form__input"
              />
              {errors.steps && (
                <h5 className="create__error">{errors.steps}</h5>
              )}
            </div>

            <div className="create__divDiets">
              <h3 className="create__divDiets__h3">
              Selecciona a qué dieta pertenece:
              </h3>
              {diets.map((diet) => {
                return (
                  <span key={`${diet.id}`} className="create__divDiets__span">
                    <input
                      type="checkbox"
                      value={`${diet.id}`}
                      name={`${diet.name}`}
                      onChange={(e) => handleCheck(e)}
                      className="create__divDiets__input"
                    />
                    {`${diet.name} `}
                  </span>
                );
              })}
            </div>

            <div>
              <button type="submit" className="create__button">
              Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
