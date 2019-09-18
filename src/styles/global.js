import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
    outline:0,
    
}
*:focus{
  outline: 0;
}
html,body, #root{
    height:100%;
    
}

body{
    text-rendering: optimizeLegibility ;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
    
}
small{
    text-decoration: none;
}
ul{
    list-style-type:none ;
    list-style: none;
}
a{
  text-decoration: none;
}

body,input,button {
  font-family: "Roboto" , sans-serif;
}
.ql-container.ql-snow{
  height:200px;
}

`;
