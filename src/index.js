import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const fixImgHeight = () => {
	const pageContainerNode = document.querySelector(".page-container");
	const pageContentrNode =
		document.querySelector(".page-content").clientHeight;
	const NavbarNode = document.querySelector(".navbar").clientHeight;
	const contentHeight = pageContentrNode + NavbarNode;
	console.log("content height: ", contentHeight);
	pageContainerNode.style.height = `${contentHeight}px`;
};

window.addEventListener("hashchange", fixImgHeight);
window.addEventListener("load", fixImgHeight);
