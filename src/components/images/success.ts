import {svg} from 'lit';

export const successAnimation = svg`
<svg width="150" height="150" viewBox="0 0 150 150" version="1.1" xml:space="preserve"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:svg="http://www.w3.org/2000/svg"
  class="w-32 h-32 mt-4"
>
	<circle id="ring" cx="75" cy="75" r="48.5" fill="none" stroke="currentColor" stroke-width="5" transform="rotate(-90 75 75)" stroke-dasharray="400 400" stroke-dashoffset="400">
		<animate attributeName="stroke-dashoffset" begin="0.1s" dur="1.5s" values="500; 80; 0" fill="freeze" calcMode="spline" keyTimes="0; 0.99; 1" keySplines="0.28 0.4 0.38 1; 0 0 1 1"/>
		<animate attributeName="r" begin="1.8s" dur=".8s" values="47; 65" fill="freeze"/>
		<animate attributeName="stroke-width" begin="1.8s" dur=".8s" values="6; 0" fill="freeze"/>
	</circle>
	<circle id="circle" cx="75" cy="75" r="0" fill="currentColor" stroke="none">
		<animate attributeName="r" begin="1.4s" dur=".5s" fill="freeze" calcMode="spline" values="0; 60; 50" keyTimes="0; 0.75; 1" keySplines="0.25 0.1 0.25 1; 0.25 0.1 0.25 1"/>
	</circle>
	<path id="check" d="M 51.749354,79.542286 63.437424,91.567026 98.46891,58.494402" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-dasharray="65 65" stroke-dashoffset="65">
		<animate attributeName="stroke-dashoffset" begin="1.8s" dur=".5s" values="65; 0" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.42 0 0.58 1"/>
	</path>
</svg>
`;
