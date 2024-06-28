function ArrowDownSVG({pressed = false}: {pressed: boolean}) {
    const color: string = pressed ? "#0000FF" : "#FFFFFF";
    return (
        <svg width="20px" height="20px" viewBox="0 0 24.000001 24.000001" xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" transform="rotate(180)">

            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

            <g id="SVGRepo_iconCarrier">
                <filter id="a" colorInterpolationFilters="sRGB" height="1.302168" width="1.757457" x="-.378729"
                        y="-.151084">
                    <feGaussianBlur stdDeviation="1.25931"/>
                </filter>
                <path
                    d="m140.3125 895.375c-.31022.0597-.58621.27572-.71875.5625l-3 6c-.2396.5108.0576 1.19916.59375 1.375l1.8125.625v10.4375c.00005.52358.47642.99995 1 1h1c.52358-.00005.99995-.47642 1-1v-10.4375l1.8125-.625c.53611-.17584.83335-.8642.59375-1.375l-3-6c-.17625-.36721-.59466-.60257-1-.5625-.0312-.001-.0625-.001-.0937 0z"
                    filter="url(#a)" opacity=".2" transform="matrix(.92133638 0 0 .92133638 -117.44776 -821.65289)"/>
                <g strokeWidth=".921336" stroke={color}>
                    <path
                        d="m11.827251 2.3673349a.92142851.92142851 0 0 0 -.662211.5182517l-2.7640088 5.5280183a.92142851.92142851 0 0 0 .5470434 1.2668375l1.6699224.5758356v9.616448a.92142851.92142851 0 0 0 .921336.921336h.921337a.92142851.92142851 0 0 0 .921336-.921336v-9.616448l1.669922-.5758356a.92142851.92142851 0 0 0 .547044-1.2668375l-2.76401-5.5280183a.92142851.92142851 0 0 0 -.921336-.5182517.92142851.92142851 0 0 0 -.08633 0z"/>
                    <path
                        d="m12.000001 3.2886712-2.7640088 5.5280183 2.3033408.7773776v10.2786589h.921337v-10.2786589l2.303341-.7773776z"
                        fill="#fefefe"/>
                </g>
            </g>
        </svg>
    );
}
export default ArrowDownSVG;