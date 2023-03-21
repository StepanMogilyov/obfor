const input = document.querySelector(".input");
const output = document.querySelector(".output");

input.addEventListener("input", () => {
  const result = isBrackets(input.value.replaceAll('"', "'"));
  output.innerHTML = result;
  navigator.clipboard.writeText(result);
  setTimeout(() => {
    window.location.reload();
  }, 5000);
});

function isBrackets(styles) {
  if (!styles.includes("{") && !styles.includes("}")) {
    return splitStyles(`{ ${styles} }`);
  } else {
    return splitStyles(styles);
  }
}

function splitStyles(styles) {
  if (styles.includes("{") || styles.includes("}")) {
    const splittedStyles = [];
    let startStylesAt = 0;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i] === "}") {
        splittedStyles.push(styles.substring(startStylesAt, i) + "}");
        startStylesAt = i + 1;
      }
    }
    return splitStylesAndNames(splittedStyles);
  }
}

function splitStylesAndNames(styles) {
  let formattedStyle = "";
  for (let i = 0; i < styles.length; i++) {
    const indexOfOpenBr = styles[i].indexOf("{");
    const styleName = styles[i].substring(0, indexOfOpenBr);
    const style = styles[i].substring(indexOfOpenBr, styles[i].length);
    formattedStyle += converter(style, styleName);
  }
  return formattedStyle;
}

function converter(style, styleName) {
  const isDelimiter = style.includes(";");
  let styleStartsAt = 0;
  let indexOfcolon = 0;
  let res = "";

  const clearSpaces = style.replace(/\s{2,}/g, " ");
  for (let i = 0; i < clearSpaces.length; i++) {
    if (clearSpaces[i] === ":") {
      indexOfcolon = i;
      if (!isDelimiter) {
        res += cutKeyAndValue(
          clearSpaces,
          styleStartsAt,
          indexOfcolon,
          indexOfcolon + 1,
          clearSpaces.length - 1
        );
      }
    } else if (clearSpaces[i] === ";") {
      res += cutKeyAndValue(
        clearSpaces,
        styleStartsAt,
        indexOfcolon,
        indexOfcolon + 1,
        i
      );
      styleStartsAt = i;
    }
  }
  return `${styleName} {${res}}`;
}

function cutKeyAndValue(style, k_from, k_to, v_from, v_to) {
  const convertedKey = keyFormatter(style.substring(k_from + 1, k_to));
  const convertedvalue = valueFormatter(style.substring(v_from, v_to));
  return `${convertedKey}: ${convertedvalue},`;
}

function keyFormatter(key) {
  let formattedKey = "";
  for (let i = 0; i < key.length; i++) {
    if (key[i] === "-") {
      i++;
      formattedKey += key[i].toUpperCase();
    } else {
      formattedKey += key[i];
    }
  }
  return formattedKey;
}

function valueFormatter(value) {
  let formattedValue = "";
  const delSpacesInValue = value.trim();
  if (!Number.isNaN(Number(delSpacesInValue))) {
    formattedValue += delSpacesInValue;
  } else if (delSpacesInValue === "''") {
    formattedValue += '""'
  } else {
    formattedValue += JSON.stringify(delSpacesInValue);
  }
  return formattedValue;
}
