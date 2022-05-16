import { useState } from "react";
import { toast } from "react-toastify";

import "./App.css";
import Key from "./components/Key";
import Screen from "./components/Screen";

const keys = [
  "C",
  "CE",
  "^",
  "√",

  1,
  2,
  3,
  4,

  5,
  6,
  7,
  8,

  9,
  0,
  ".",
  "=",

  "÷",
  "×",
  "-",
  "+",
];
const lines = [
  keys.slice(0, 4),
  keys.slice(4, 8),
  keys.slice(8, 12),
  keys.slice(12, 16),
  keys.slice(16, 20),
];

function App() {
  const boxStyle = {
    width: "300px",
    height: "500px",
    backgroundColor: "grey",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "15px",
  };

  const lineStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    margin: 0,
    padding: 0,
    marginBottom: "10px",
  };

  const [result, setResult] = useState("");

  const replaceSqrt = (str) => {
    const sqrtCase1 = /\d+√\d+/.test(str);
    const sqrtCase2 = /√\d+/.test(str);

    if (sqrtCase1) {
      return str.replace(/(\d+)√(\d+)/g, "$1*Math.sqrt($2)");
    } else if (sqrtCase2) {
      return str.replace(/√(\d+)/g, "1*Math.sqrt($1)");
    }

    return str;
  };

  const replacePower = (str) => {
    const powerCase = /\d+\^\d+/.test(str);
    if (powerCase) {
      return str.replace(/(\d+)\^(\d+)/g, "1*Math.pow($1,$2)");
    }
    return str;
  };

  const previousKey = (index = 1) => result[result.length - index];

  const isOperator = (key) => /[×÷\+\-√\.\^]/.test(key);
  const isNumber = (key) => /\d/.test(key);

  const strReverse = (str) => str.split("").reverse().join("");

  const findPreviousOperatorIndex = (previousKeyIndex = 1) => {
    const previousKeyResult = previousKey(previousKeyIndex);
    if (!previousKeyResult) return 0;

    console.log("result", result);
    console.log("previousKeyResult", previousKeyResult);

    const isPreviousKeyOperator = isOperator(previousKeyResult);

    if (isPreviousKeyOperator && previousKeyResult !== ".") {
      return result.length - 1 - strReverse(result).indexOf(previousKeyResult);
    }

    return findPreviousOperatorIndex(previousKeyIndex + 1);
  };

  const handleKeyClick = (key) => {
    switch (key) {
      case "CE":
        setResult("");
        break;
      case "C":
        if (result === "Infinity" || result === "NaN") {
          setResult("");
          break;
        }

        setResult((prevState) => prevState.slice(0, -1));
        break;
      case "=":
        if (!previousKey()) {
          toast.error("Expressão não pode estar vazia!");
          break;
        }
        if (isOperator(previousKey())) {
          toast.error("Expressão não pode terminar com um operador!");
          break;
        }

        const formattedResult = replacePower(
          replaceSqrt(result.replace(/×/g, "*").replace(/÷/g, "/"))
        );

        setResult(eval(formattedResult).toString());
        break;
      default:
        if (key === ".") {
          const lastNumberPart = result.slice(findPreviousOperatorIndex());
          console.log("lastNumberPart", lastNumberPart);

          if (lastNumberPart.includes(".")) {
            break;
          }
        }

        if (
          isNumber(key) &&
          previousKey() === "0" &&
          (isOperator(previousKey(2)) || !previousKey(2)) &&
          previousKey(2) !== "."
        ) {
          setResult((prevResult) => `${prevResult.slice(0, -1)}${key}`);
          break;
        }

        if (isOperator(key) && isOperator(previousKey())) {
          setResult((prevResult) => `${prevResult.slice(0, -1)}${key}`);
          break;
        }

        if (
          key !== "-" &&
          isOperator(key) &&
          (isOperator(previousKey()) || !previousKey())
        ) {
          break;
        }

        setResult((prevResult) => `${prevResult}${key}`);
    }
  };

  return (
    <div style={boxStyle}>
      <Screen result={result} />

      {lines.map((line, index) => (
        <div style={lineStyle} key={index}>
          {line.map((key) => (
            <Key handleKeyClick={handleKeyClick} key={key} value={key} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
