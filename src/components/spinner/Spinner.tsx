const Spinner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: '0 auto', background: 'none', display: 'block', }} width="157px" height="157px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="rotate(0 50 50)">
                <rect x="48" y="38" rx="0" ry="0" width="4" height="4" fill="#FFE300">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.875s" repeatCount="indefinite"></animate>
                </rect>
            </g><g transform="rotate(45 50 50)">
                <rect x="48" y="38" rx="0" ry="0" width="4" height="4" fill="#FFE300">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                </rect>
            </g><g transform="rotate(90 50 50)">
                <rect x="48" y="38" rx="0" ry="0" width="4" height="4" fill="#FFE300">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.625s" repeatCount="indefinite"></animate>
                </rect>
            </g><g transform="rotate(135 50 50)">
                <rect x="48" y="38" rx="0" ry="0" width="4" height="4" fill="#FFE300">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                </rect>
            </g><g transform="rotate(180 50 50)">
                <rect x="48" y="38" rx="0" ry="0" width="4" height="4" fill="#FFE300">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.375s" repeatCount="indefinite"></animate>
                </rect>
            </g><g transform="rotate(225 50 50)">
                <rect x="48" y="38" rx="0" ry="0" width="4" height="4" fill="#FFE300">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                </rect>
            </g><g transform="rotate(270 50 50)">
                <rect x="48" y="38" rx="0" ry="0" width="4" height="4" fill="#FFE300">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.125s" repeatCount="indefinite"></animate>
                </rect>
            </g><g transform="rotate(315 50 50)">
                <rect x="48" y="38" rx="0" ry="0" width="4" height="4" fill="#FFE300">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                </rect>
            </g>
        </svg>
    )
}

export default Spinner;