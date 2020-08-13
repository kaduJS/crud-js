import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @font-face {
    font-family: 'Roboto', sans-serif;
    src: url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap");
  }

  * {
    margin: 0 auto;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }

  html, body {
    
    width: 100%;
    height: 100%;
  }
`;
