import { createGlobalStyle } from "styled-components";
import { MAIN_COLOR, SECONDARY_COLOR, TEXT_COLOR } from "./constants/colors";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

*{
	box-sizing: border-box;
	font-family:'Lexend Deca', sans-serif ;
}

a{
	color: ${MAIN_COLOR};
	font-weight: bold;
}

a:visited {
	color: none;
}

main {
	margin-top: 70px;
	background-color: #F2F2F2F2;
}

input {
	width: 100%;
	height: 50px;
	border-radius: 5px;
	border: 2px solid #D5D5D5;
	font-family: 'Lexend Deca', sans-serif;
	padding-left: 15px;
}

input::placeholder {
	color: ${TEXT_COLOR};
}

button {
	width: 100%;
	height: 50px;
	background-color: ${MAIN_COLOR};
	color: white;
	font-size: 21px;
	text-align: center;
	font-family: 'Lexend Deca', sans-serif;
	border: none;
	border-radius: 5px;
}

header{ 
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 80%;
	margin: 30px 0;
}

header h1{
	color: ${SECONDARY_COLOR};
	font-size: 22px;
}

p{
	color:${TEXT_COLOR}
}

`

export default GlobalStyle