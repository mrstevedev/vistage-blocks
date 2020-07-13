/**
 * Block G2.1 4-Square Image Left
 */

// Import CSS.
import "./style.scss";
import "./editor.scss";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, ToggleControl, SelectControl, Button } = wp.components;
const { InspectorControls, RichText, MediaUpload, MediaUploadCheck } = wp.editor;

const defaultAttributes = {
    showMainHeader: true,
    showIcons: true,
    showTitles: true,
    showDescriptions: true
};

// const charityIcon = (
//     <svg xmlns="http://www.w3.org/2000/svg" width="49" height="60" viewBox="0 0 60 60">
//     <g fill="#003F5F" fill-rule="nonzero">
//         <path d="M18.23 39.163a3.946 3.946 0 0 0 3.85-2.979l2.101 2.1a3.971 3.971 0 0 0 2.828 1.172 3.97 3.97 0 0 0 2.828-1.172 3.971 3.971 0 0 0 1.172-2.828 3.973 3.973 0 0 0-1.172-2.829l-1.805-1.805a3.962 3.962 0 0 0 1.805-1.023 3.973 3.973 0 0 0 1.172-2.83 3.97 3.97 0 0 0-1.172-2.827l-2.513-2.513a3.96 3.96 0 0 0 2.978-3.851 3.97 3.97 0 0 0-1.172-2.828l-7.092-7.093V1a1 1 0 0 0-2 0v5.32c-1.449-.564-3.21-.28-4.343.85-1.24 1.244-1.477 3.099-.74 4.593a3.892 3.892 0 0 0-2.089 1.066c-1.232 1.233-1.474 3.07-.758 4.559a3.971 3.971 0 0 0-2.07 1.097c-1.232 1.233-1.475 3.07-.758 4.56a3.967 3.967 0 0 0-2.07 1.097 3.971 3.971 0 0 0-1.172 2.828c0 1.069.416 2.073 1.172 2.829l8.192 8.192a3.97 3.97 0 0 0 2.828 1.172zM17.109 8.585A1.99 1.99 0 0 1 18.523 8a1.99 1.99 0 0 1 1.415.585l.393.393 7.385 7.386c.378.378.586.88.586 1.414 0 .534-.208 1.036-.586 1.414-.756.755-2.073.755-2.828 0l-7.779-7.778a2.004 2.004 0 0 1 0-2.829zm-2.83 5.658a1.989 1.989 0 0 1 1.416-.586c.534 0 1.036.208 1.414.586l11.314 11.313c.378.378.586.88.586 1.414 0 .535-.208 1.037-.586 1.415-.755.755-2.073.755-2.828 0l-4.4-4.4-5.5-5.5-.002-.002-1.413-1.412a2.003 2.003 0 0 1 0-2.828zm-2.827 5.656a1.99 1.99 0 0 1 1.415-.585c.533 0 1.035.207 1.412.583l5.502 5.502 8.642 8.643c.378.377.586.88.586 1.414 0 .534-.208 1.036-.586 1.414-.755.755-2.073.755-2.828 0l-4.534-4.533-.002-.003-4.096-4.096-5.51-5.51a2.003 2.003 0 0 1-.001-2.829zM8.038 26.97c0-.534.208-1.036.586-1.414a1.99 1.99 0 0 1 1.414-.585c.535 0 1.037.208 1.414.585l.577.577 7.619 7.62c.776.78.776 2.045-.003 2.824-.755.755-2.073.756-2.83 0l-8.191-8.192a1.988 1.988 0 0 1-.586-1.415zM50.009 25a1 1 0 1 0 2 0c0-7.228-3.017-11.488-4.82-14.033-.526-.743-1.18-1.667-1.18-1.967V1a1 1 0 0 0-2 0v8c0 .936.649 1.854 1.549 3.123 1.772 2.503 4.45 6.285 4.45 12.877zM21.038 56a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1z"/>
//         <path d="M47.563 26.168c-2.352-1.568-9.74-5.852-10.107-6.063-.668-.333-1.41-.287-2.088.133-1.462.903-2.36 3.382-2.36 4.762 0 1.921 1.349 3.089 2.777 4.325a28.12 28.12 0 0 1 1.517 1.382l5 5c.331.332.644.645.687.739.018.056.02.269.02.478-.236.632-2.083 2.744-3.673 4.336L28.305 51.29c-.291.286-.905.71-1.296.71h-9c-1.103 0-2-.897-2-2s.897-2 2-2h7c1.374 0 2.574-1.161 2.707-1.293l7-7a1 1 0 0 0-1.414-1.414l-6.997 6.997c-.291.286-.905.71-1.296.71h-10c-1.103 0-2-.897-2-2s.897-2 2-2h8a1 1 0 0 0 0-2h-11a2.002 2.002 0 0 1-1.491-3.333 1.001 1.001 0 0 0-1.49-1.335A3.99 3.99 0 0 0 8.009 38c0 2.062 1.574 3.744 3.58 3.958-.36.6-.58 1.293-.58 2.042 0 2.062 1.574 3.744 3.58 3.958-.36.6-.58 1.293-.58 2.042 0 2.206 1.795 4 4 4h9c1.375 0 2.575-1.161 2.674-1.26l11.034-10.033c4.293-4.293 4.293-5.357 4.293-5.707 0-1.327-.163-1.577-1.293-2.707l-5-5c-.561-.562-1.125-1.05-1.622-1.48-1.37-1.187-2.085-1.851-2.085-2.813 0-1.262 1.076-3.107 1.498-3.135.076.044 7.646 4.433 9.947 5.967C49.04 29.556 52.009 32.27 52.009 38c0 4.292-3.375 10.11-5.608 13.96-1.596 2.752-2.363 4.115-2.363 5.04v2a1 1 0 0 0 2 0v-1.99c.04-.507 1.13-2.387 2.093-4.045C50.61 48.688 54.009 42.83 54.009 38c0-6.754-3.68-9.987-6.446-11.832z"/>
//     </g>
// </svg>
// );
// const profitIcon = (
//     <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
//         <g fill="#003F5F" fill-rule="nonzero">
//             <path d="M30 36.19c7.627 0 13.81-6.182 13.81-13.81 0-7.626-6.183-13.809-13.81-13.809-7.627 0-13.81 6.183-13.81 13.81.009 7.624 6.187 13.802 13.81 13.81zm0-25.646c6.537 0 11.837 5.3 11.837 11.837S36.537 34.218 30 34.218s-11.836-5.3-11.836-11.837C18.17 15.847 23.466 10.55 30 10.544zM57.809 41.86a4.684 4.684 0 0 0-4.535-.277l-11.562 5.483a4.51 4.51 0 0 0-.513-4.15 4.496 4.496 0 0 0-3.699-1.939H25.405a14.176 14.176 0 0 0-16.544-2.07l-.12.067H0v2.003h8v17.02H0V60h35.165a19 19 0 0 0 9.52-2.56l12.965-7.515a4.718 4.718 0 0 0 .159-8.065zm-1.161 6.332l-12.965 7.515a16.999 16.999 0 0 1-8.518 2.29H10v-17.43a12.168 12.168 0 0 1 14.293 2.12c.188.187.442.292.707.292h12.5c1.38 0 2.5 1.12 2.5 2.503a2.501 2.501 0 0 1-2.5 2.503H25a1 1 0 0 0 0 2.003h15c.148-.002.294-.036.428-.1l13.7-6.5a2.708 2.708 0 0 1 3.561 1.19 2.715 2.715 0 0 1-1.044 3.61l.003.004z"/>
//             <path d="M21.905 20.952a7.627 7.627 0 0 1 7.619-7.619V11.43A9.534 9.534 0 0 0 20 20.952h1.905zM30.476 32.381c5.258-.006 9.519-4.267 9.524-9.524h-1.905a7.628 7.628 0 0 1-7.619 7.62v1.904zM10.318 5.702a3.685 3.685 0 0 1 3.028 3.028.953.953 0 0 0 1.879 0 3.686 3.686 0 0 1 3.029-3.028.953.953 0 0 0 0-1.88A3.687 3.687 0 0 1 15.225.795a.952.952 0 0 0-1.879 0 3.685 3.685 0 0 1-3.028 3.029.953.953 0 0 0 0 1.879zm3.968-2.3c.372.528.832.988 1.36 1.36-.528.371-.988.832-1.36 1.36a5.583 5.583 0 0 0-1.361-1.36c.529-.372.989-.832 1.36-1.36zM45.556 30.464a3.685 3.685 0 0 1 3.028 3.028.953.953 0 0 0 1.88 0 3.686 3.686 0 0 1 3.028-3.028.954.954 0 0 0 0-1.88 3.687 3.687 0 0 1-3.029-3.028.953.953 0 0 0-1.879 0 3.686 3.686 0 0 1-3.028 3.029.953.953 0 0 0 0 1.879zm3.968-2.3c.372.528.832.988 1.36 1.36a5.599 5.599 0 0 0-1.36 1.36 5.587 5.587 0 0 0-1.361-1.36c.529-.372.99-.832 1.36-1.36zM28.571 17.143a2.857 2.857 0 0 0 0 5.714h1.905a.952.952 0 1 1 0 1.905h-3.81v1.905h1.905v.952h1.905v-.952a2.857 2.857 0 1 0 0-5.715h-1.905a.952.952 0 0 1 0-1.904h3.81v-1.905h-1.905v-.953h-1.905v.953z"/>
//         </g>
//     </svg>
// );
// const shuffleIcon = (
//     <svg xmlns="http://www.w3.org/2000/svg" width="60" height="44" viewBox="0 0 60 60">
//         <g fill="#003F5F" fill-rule="nonzero">
//             <path d="M58.75 40.922H55c-15.633 0-20.368-7.63-25.383-15.704C24.362 16.752 18.927 8 1.25 8 .56 8 0 8.567 0 9.266c0 .7.56 1.267 1.25 1.267 16.298 0 21.133 7.787 26.25 16.033 5.155 8.301 10.485 16.889 27.5 16.889h3.75c.69 0 1.25-.568 1.25-1.267s-.56-1.266-1.25-1.266z"/>
//             <path d="M58.745 15.5h-3.766c-9.807 0-16.575 2.716-21.935 8.81a1.264 1.264 0 0 0 .939 2.1c.344 0 .69-.142.939-.428 3.263-3.701 8.488-7.956 20.057-7.956h3.766A1.26 1.26 0 0 0 60 16.763a1.26 1.26 0 0 0-1.255-1.263zM28.76 32.755c-.545-.402-1.285-.21-1.64.439l-.34.627c-.357.644-.193 1.5.36 1.914.197.15.42.22.642.22.39 0 .773-.225 1.002-.641l.352-.647c.35-.646.18-1.504-.376-1.912z"/>
//             <path d="M28.061 33.424a1.23 1.23 0 0 0-1.712.39C21.4 41.798 16.092 48.406 1.24 48.406c-.685 0-1.241.57-1.241 1.274 0 .704.556 1.275 1.24 1.275 16.09 0 22.049-7.462 27.201-15.773a1.292 1.292 0 0 0-.38-1.758zM59.626 41.197l-7.671-7.6a1.288 1.288 0 0 0-1.808 0 1.259 1.259 0 0 0 0 1.792l6.766 6.702-6.766 6.703a1.259 1.259 0 0 0 0 1.79 1.29 1.29 0 0 0 1.808.003l7.671-7.599a1.26 1.26 0 0 0 0-1.791zM59.626 15.969l-7.67-7.599a1.288 1.288 0 0 0-1.807 0 1.259 1.259 0 0 0 0 1.791l6.765 6.702-6.767 6.704a1.259 1.259 0 0 0 0 1.79 1.29 1.29 0 0 0 1.81 0l7.67-7.598a1.259 1.259 0 0 0 0-1.79z"/>
//         </g>
//     </svg>
// );
// const placeholderIcon = (
//     <svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 62 60">
//         <g fill="#003F5F" fill-rule="nonzero">
//             <path d="M30.938 26.194c3.859 0 7-3.095 7-6.897 0-3.803-3.141-6.898-7-6.898s-7 3.095-7 6.898c0 3.802 3.14 6.897 7 6.897zm0-11.824c2.757 0 5 2.21 5 4.927 0 2.716-2.243 4.927-5 4.927s-5-2.21-5-4.927c0-2.717 2.243-4.927 5-4.927z"/>
//             <path d="M50.216 37.033h-7.161l3.047-4.336c5.755-7.558 4.922-19.982-1.781-26.586C40.7 2.542 35.884.576 30.761.576c-5.122 0-9.938 1.966-13.56 5.535-6.703 6.604-7.536 19.029-1.804 26.557l3.068 4.366h-7.513L0 59.696h61.168L50.216 37.033zM17.02 31.515c-5.199-6.831-4.454-18.051 1.596-24.012 3.244-3.196 7.558-4.957 12.146-4.957 4.588 0 8.901 1.76 12.146 4.957 6.05 5.96 6.795 17.182 1.573 24.042l-13.72 19.522-9.863-14.034-3.878-5.518zm-4.804 7.489h7.634L30.761 54.53l10.91-15.526h7.281L58 57.725H3.168l9.048-18.721z"/>
//         </g>
//     </svg>

// );

const charityIcon = {
    label: 'Charity Icon',
    value: `<svg xmlns="http://www.w3.org/2000/svg" width="49" height="60" viewBox="0 0 60 60">
    <g fill="#003F5F" fill-rule="nonzero">
        <path d="M18.23 39.163a3.946 3.946 0 0 0 3.85-2.979l2.101 2.1a3.971 3.971 0 0 0 2.828 1.172 3.97 3.97 0 0 0 2.828-1.172 3.971 3.971 0 0 0 1.172-2.828 3.973 3.973 0 0 0-1.172-2.829l-1.805-1.805a3.962 3.962 0 0 0 1.805-1.023 3.973 3.973 0 0 0 1.172-2.83 3.97 3.97 0 0 0-1.172-2.827l-2.513-2.513a3.96 3.96 0 0 0 2.978-3.851 3.97 3.97 0 0 0-1.172-2.828l-7.092-7.093V1a1 1 0 0 0-2 0v5.32c-1.449-.564-3.21-.28-4.343.85-1.24 1.244-1.477 3.099-.74 4.593a3.892 3.892 0 0 0-2.089 1.066c-1.232 1.233-1.474 3.07-.758 4.559a3.971 3.971 0 0 0-2.07 1.097c-1.232 1.233-1.475 3.07-.758 4.56a3.967 3.967 0 0 0-2.07 1.097 3.971 3.971 0 0 0-1.172 2.828c0 1.069.416 2.073 1.172 2.829l8.192 8.192a3.97 3.97 0 0 0 2.828 1.172zM17.109 8.585A1.99 1.99 0 0 1 18.523 8a1.99 1.99 0 0 1 1.415.585l.393.393 7.385 7.386c.378.378.586.88.586 1.414 0 .534-.208 1.036-.586 1.414-.756.755-2.073.755-2.828 0l-7.779-7.778a2.004 2.004 0 0 1 0-2.829zm-2.83 5.658a1.989 1.989 0 0 1 1.416-.586c.534 0 1.036.208 1.414.586l11.314 11.313c.378.378.586.88.586 1.414 0 .535-.208 1.037-.586 1.415-.755.755-2.073.755-2.828 0l-4.4-4.4-5.5-5.5-.002-.002-1.413-1.412a2.003 2.003 0 0 1 0-2.828zm-2.827 5.656a1.99 1.99 0 0 1 1.415-.585c.533 0 1.035.207 1.412.583l5.502 5.502 8.642 8.643c.378.377.586.88.586 1.414 0 .534-.208 1.036-.586 1.414-.755.755-2.073.755-2.828 0l-4.534-4.533-.002-.003-4.096-4.096-5.51-5.51a2.003 2.003 0 0 1-.001-2.829zM8.038 26.97c0-.534.208-1.036.586-1.414a1.99 1.99 0 0 1 1.414-.585c.535 0 1.037.208 1.414.585l.577.577 7.619 7.62c.776.78.776 2.045-.003 2.824-.755.755-2.073.756-2.83 0l-8.191-8.192a1.988 1.988 0 0 1-.586-1.415zM50.009 25a1 1 0 1 0 2 0c0-7.228-3.017-11.488-4.82-14.033-.526-.743-1.18-1.667-1.18-1.967V1a1 1 0 0 0-2 0v8c0 .936.649 1.854 1.549 3.123 1.772 2.503 4.45 6.285 4.45 12.877zM21.038 56a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1z"/>
        <path d="M47.563 26.168c-2.352-1.568-9.74-5.852-10.107-6.063-.668-.333-1.41-.287-2.088.133-1.462.903-2.36 3.382-2.36 4.762 0 1.921 1.349 3.089 2.777 4.325a28.12 28.12 0 0 1 1.517 1.382l5 5c.331.332.644.645.687.739.018.056.02.269.02.478-.236.632-2.083 2.744-3.673 4.336L28.305 51.29c-.291.286-.905.71-1.296.71h-9c-1.103 0-2-.897-2-2s.897-2 2-2h7c1.374 0 2.574-1.161 2.707-1.293l7-7a1 1 0 0 0-1.414-1.414l-6.997 6.997c-.291.286-.905.71-1.296.71h-10c-1.103 0-2-.897-2-2s.897-2 2-2h8a1 1 0 0 0 0-2h-11a2.002 2.002 0 0 1-1.491-3.333 1.001 1.001 0 0 0-1.49-1.335A3.99 3.99 0 0 0 8.009 38c0 2.062 1.574 3.744 3.58 3.958-.36.6-.58 1.293-.58 2.042 0 2.062 1.574 3.744 3.58 3.958-.36.6-.58 1.293-.58 2.042 0 2.206 1.795 4 4 4h9c1.375 0 2.575-1.161 2.674-1.26l11.034-10.033c4.293-4.293 4.293-5.357 4.293-5.707 0-1.327-.163-1.577-1.293-2.707l-5-5c-.561-.562-1.125-1.05-1.622-1.48-1.37-1.187-2.085-1.851-2.085-2.813 0-1.262 1.076-3.107 1.498-3.135.076.044 7.646 4.433 9.947 5.967C49.04 29.556 52.009 32.27 52.009 38c0 4.292-3.375 10.11-5.608 13.96-1.596 2.752-2.363 4.115-2.363 5.04v2a1 1 0 0 0 2 0v-1.99c.04-.507 1.13-2.387 2.093-4.045C50.61 48.688 54.009 42.83 54.009 38c0-6.754-3.68-9.987-6.446-11.832z"/>
    </g>
    </svg>` 
};

const profitIcon = {
    label: 'Profit Icon',
    value: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
        <g fill="#003F5F" fill-rule="nonzero">
            <path d="M30 36.19c7.627 0 13.81-6.182 13.81-13.81 0-7.626-6.183-13.809-13.81-13.809-7.627 0-13.81 6.183-13.81 13.81.009 7.624 6.187 13.802 13.81 13.81zm0-25.646c6.537 0 11.837 5.3 11.837 11.837S36.537 34.218 30 34.218s-11.836-5.3-11.836-11.837C18.17 15.847 23.466 10.55 30 10.544zM57.809 41.86a4.684 4.684 0 0 0-4.535-.277l-11.562 5.483a4.51 4.51 0 0 0-.513-4.15 4.496 4.496 0 0 0-3.699-1.939H25.405a14.176 14.176 0 0 0-16.544-2.07l-.12.067H0v2.003h8v17.02H0V60h35.165a19 19 0 0 0 9.52-2.56l12.965-7.515a4.718 4.718 0 0 0 .159-8.065zm-1.161 6.332l-12.965 7.515a16.999 16.999 0 0 1-8.518 2.29H10v-17.43a12.168 12.168 0 0 1 14.293 2.12c.188.187.442.292.707.292h12.5c1.38 0 2.5 1.12 2.5 2.503a2.501 2.501 0 0 1-2.5 2.503H25a1 1 0 0 0 0 2.003h15c.148-.002.294-.036.428-.1l13.7-6.5a2.708 2.708 0 0 1 3.561 1.19 2.715 2.715 0 0 1-1.044 3.61l.003.004z"/>
            <path d="M21.905 20.952a7.627 7.627 0 0 1 7.619-7.619V11.43A9.534 9.534 0 0 0 20 20.952h1.905zM30.476 32.381c5.258-.006 9.519-4.267 9.524-9.524h-1.905a7.628 7.628 0 0 1-7.619 7.62v1.904zM10.318 5.702a3.685 3.685 0 0 1 3.028 3.028.953.953 0 0 0 1.879 0 3.686 3.686 0 0 1 3.029-3.028.953.953 0 0 0 0-1.88A3.687 3.687 0 0 1 15.225.795a.952.952 0 0 0-1.879 0 3.685 3.685 0 0 1-3.028 3.029.953.953 0 0 0 0 1.879zm3.968-2.3c.372.528.832.988 1.36 1.36-.528.371-.988.832-1.36 1.36a5.583 5.583 0 0 0-1.361-1.36c.529-.372.989-.832 1.36-1.36zM45.556 30.464a3.685 3.685 0 0 1 3.028 3.028.953.953 0 0 0 1.88 0 3.686 3.686 0 0 1 3.028-3.028.954.954 0 0 0 0-1.88 3.687 3.687 0 0 1-3.029-3.028.953.953 0 0 0-1.879 0 3.686 3.686 0 0 1-3.028 3.029.953.953 0 0 0 0 1.879zm3.968-2.3c.372.528.832.988 1.36 1.36a5.599 5.599 0 0 0-1.36 1.36 5.587 5.587 0 0 0-1.361-1.36c.529-.372.99-.832 1.36-1.36zM28.571 17.143a2.857 2.857 0 0 0 0 5.714h1.905a.952.952 0 1 1 0 1.905h-3.81v1.905h1.905v.952h1.905v-.952a2.857 2.857 0 1 0 0-5.715h-1.905a.952.952 0 0 1 0-1.904h3.81v-1.905h-1.905v-.953h-1.905v.953z"/>
        </g>
    </svg>`
};

const shuffleIcon = {
    label: 'Shuffle Icon',
    value: ` <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
        <g fill="#003F5F" fill-rule="nonzero">
            <path d="M58.75 40.922H55c-15.633 0-20.368-7.63-25.383-15.704C24.362 16.752 18.927 8 1.25 8 .56 8 0 8.567 0 9.266c0 .7.56 1.267 1.25 1.267 16.298 0 21.133 7.787 26.25 16.033 5.155 8.301 10.485 16.889 27.5 16.889h3.75c.69 0 1.25-.568 1.25-1.267s-.56-1.266-1.25-1.266z"/>
            <path d="M58.745 15.5h-3.766c-9.807 0-16.575 2.716-21.935 8.81a1.264 1.264 0 0 0 .939 2.1c.344 0 .69-.142.939-.428 3.263-3.701 8.488-7.956 20.057-7.956h3.766A1.26 1.26 0 0 0 60 16.763a1.26 1.26 0 0 0-1.255-1.263zM28.76 32.755c-.545-.402-1.285-.21-1.64.439l-.34.627c-.357.644-.193 1.5.36 1.914.197.15.42.22.642.22.39 0 .773-.225 1.002-.641l.352-.647c.35-.646.18-1.504-.376-1.912z"/>
            <path d="M28.061 33.424a1.23 1.23 0 0 0-1.712.39C21.4 41.798 16.092 48.406 1.24 48.406c-.685 0-1.241.57-1.241 1.274 0 .704.556 1.275 1.24 1.275 16.09 0 22.049-7.462 27.201-15.773a1.292 1.292 0 0 0-.38-1.758zM59.626 41.197l-7.671-7.6a1.288 1.288 0 0 0-1.808 0 1.259 1.259 0 0 0 0 1.792l6.766 6.702-6.766 6.703a1.259 1.259 0 0 0 0 1.79 1.29 1.29 0 0 0 1.808.003l7.671-7.599a1.26 1.26 0 0 0 0-1.791zM59.626 15.969l-7.67-7.599a1.288 1.288 0 0 0-1.807 0 1.259 1.259 0 0 0 0 1.791l6.765 6.702-6.767 6.704a1.259 1.259 0 0 0 0 1.79 1.29 1.29 0 0 0 1.81 0l7.67-7.598a1.259 1.259 0 0 0 0-1.79z"/>
        </g>
    </svg>`
};

const placeholderIcon = {
    label: 'Placeholder Icon',
    value: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 62 60">
        <g fill="#003F5F" fill-rule="nonzero">
            <path d="M30.938 26.194c3.859 0 7-3.095 7-6.897 0-3.803-3.141-6.898-7-6.898s-7 3.095-7 6.898c0 3.802 3.14 6.897 7 6.897zm0-11.824c2.757 0 5 2.21 5 4.927 0 2.716-2.243 4.927-5 4.927s-5-2.21-5-4.927c0-2.717 2.243-4.927 5-4.927z"/>
            <path d="M50.216 37.033h-7.161l3.047-4.336c5.755-7.558 4.922-19.982-1.781-26.586C40.7 2.542 35.884.576 30.761.576c-5.122 0-9.938 1.966-13.56 5.535-6.703 6.604-7.536 19.029-1.804 26.557l3.068 4.366h-7.513L0 59.696h61.168L50.216 37.033zM17.02 31.515c-5.199-6.831-4.454-18.051 1.596-24.012 3.244-3.196 7.558-4.957 12.146-4.957 4.588 0 8.901 1.76 12.146 4.957 6.05 5.96 6.795 17.182 1.573 24.042l-13.72 19.522-9.863-14.034-3.878-5.518zm-4.804 7.489h7.634L30.761 54.53l10.91-15.526h7.281L58 57.725H3.168l9.048-18.721z"/>
        </g>
    </svg>`
};

const firstLabel = {
    label: 'Please select an Icon',
    value: 'No Icon Selected'
}

const svgArr = [ firstLabel, charityIcon, profitIcon, shuffleIcon, placeholderIcon ];

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType("vistage-blocks/g2-1-4-square-image-left", {
	title: __("G2.1 4-Square Image Left"),
	icon: "format-image",
	category: "layout",
	attributes: {
		body: {
			type: "string",
			source: "html",
			selector: "p"
        },
        mainHeader: {
            type: 'string'
        },
        ctaIconOne: {
            type: 'string'
        },
        ctaHeaderOne: {
			type: "string"
		},
        ctaHeaderTwo: {
			type: "string"
		},
        ctaHeaderThree: {
			type: "string"
		},
        ctaHeaderFour: {
			type: "string"
        },
        ctaDescriptionOne: {
            type: 'string'
        },
        ctaDescriptionTwo: {
            type: 'string'
        },
        ctaDescriptionThree: {
            type: 'string'
        },
        ctaDescriptionFour: {
            type: 'string'
        },
        imageLeft: {
            type: 'string',
            selector: 'img'
        },
        imgAlt: {
			type: 'string',
			attribute: "alt",
			selector: "img"
		},
        imgUrl: {
            type: 'string',
            attribute: 'src',
            selector: 'img'
        },
        imgTitle: {
            type: 'string'
        },
        iconImgOne: {
            type: 'string',
            default: 'Select an Icon'
        },
        iconImgTwo: {
            type: 'string',
            default: 'Select an Icon'
        },
        iconImgThree: {
            type: 'string',
            default: 'Select an Icon'
        },
        iconImgFour: {
            type: 'string',
            default: 'Select an Icon'
        },
        showMainHeader: {
            type: Boolean
        },
        showIcons: {
            type: Boolean
        },
        showTitles: {
            type: Boolean
        },
        showDescriptions: {
            type: Boolean
        },
        textStyle: {
            type: 'object'
        }
	},
	keywords: [
		__( '4-Square Image Left' ),
		__( 'Vistage' ),
		__( 'g2.1' ),
	],
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	edit: ({ attributes, setAttributes }) => {
        if ( undefined === attributes.showMainHeader ) {
			setAttributes( defaultAttributes );
		}
        const BgStyle = {
            backgroundImage: "url("+ attributes.imgUrl +")",
            backgroundSize: 'cover'
        }
        const textStyle = {
            textDecoration: 'none',
            color: '#a9a9a9',
            fontWeight: 'bold'
        }
		return (
			<div class="g21-2-column-block">
				{
                    <InspectorControls>
                        <PanelBody title="Toggle Elements">
                            <ToggleControl
                                label={__('Show Main CTA')}
                                checked={attributes.showMainHeader}                                        
                                onChange={ () => setAttributes({ showMainHeader: !attributes.showMainHeader }) }
                            />
                            <ToggleControl
                                checked={attributes.showIcons}                                        
                                label={__('Show Icons')}
                                onChange={ () => setAttributes({ showIcons: !attributes.showIcons }) }
                            />
                            <ToggleControl
                                checked={attributes.showTitles}                            
                                label={__('Show Titles')}
                                onChange={ () => setAttributes({ showTitles: !attributes.showTitles }) }
                            />
                            <ToggleControl
                                checked={attributes.showDescriptions}                             
                                label={__('Show Descriptions')}
                                onChange={ () => setAttributes({ showDescriptions: !attributes.showDescriptions }) }
                            />
                        </PanelBody>
                        <PanelBody title="Choose Icons">
                            <SelectControl 
                                label={__('Icons CTA One')}
                                value={__( attributes.iconImgOne )}
                                options={ svgArr }
                                onChange={ value => {
                                    console.log('change icon 1 to be: ', value);
                                    setAttributes( { iconImgOne : value } )
                                 }}
                            />
                            <SelectControl 
                                label={__('Icons CTA Two')}
                                value={__( attributes.iconImgTwo )}
                                options={ svgArr }
                                onChange={ value => {
                                    console.log('change icon 2 to be: ', value);
                                    setAttributes( { iconImgTwo : value } )
                                 }}
                            />
                            <SelectControl 
                                label={__('Icons CTA Three')}
                                value={__( attributes.iconImgThree )}
                                options={ svgArr }
                                onChange={ value => {
                                    console.log('change icon 3 to be: ',value);
                                    setAttributes( { iconImgThree : value } )
                                 }}
                            />
                            <SelectControl 
                                label={__('Icons CTA Four')}
                                value={__( attributes.iconImgFour )}
                                options={ svgArr }
                                onChange={ value => {
                                    console.log('change icon 4 to be: ',value);
                                    setAttributes( { iconImgFour : value } )
                                 }}
                            />
                            
                        </PanelBody>

                    </InspectorControls>                   
                }
                <div 
                    class={`g21-2-column-block-image column-left ${attributes.imgUrl ?
                         "cta-background-img" : ''}`} 
                    style={BgStyle}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={ media => {
                                setAttributes({ 
                                    imgAlt: media.alt,
                                    imgUrl: media.url,
                                    imgTitle: media.title
                                 });
                            }}
                            type="image"
                            // value={attributes.imageId}
                            render={({ open }) => (
                                attributes.imgUrl ? 
                                <Button 
                                    className="button button-large"
                                    onClick={ open }
                                >
                                Select Another Image
                                </Button> : <Button 
                                    className="button button-large"
                                    onClick={ open }
                                    >
                                    Select An Image
                                </Button>
                            )}/>
                    </MediaUploadCheck>
                </div>
                <div class="g21-2-column-block-text column-right">
                    <div class="g21-2-column-block-header-title">
                        {attributes.showMainHeader ? <RichText 
                            placeholder={__('Add CTA Header')}
                            tagName="h2"
                            className="cta-header"
                            value={ attributes.mainHeader }
                            onChange={ value => setAttributes({ mainHeader: value }) }
                        /> : null}
                    </div>
                    <div class="grid2x2">
                        <div class="box top-row">
                            <div class="icon">
                                <span style={{ 'color':'#a9a9a9', 'fontWeight': 'bold' }} dangerouslySetInnerHTML= {{ __html:attributes.showIcons ? attributes.iconImgOne : null }} />
                            </div>
                                {attributes.showTitles ? <RichText
                                    className="cta-title"
                                    placeholder={__('Add CTA Title')}
                                    tagName="h2"
                                    value={ attributes.ctaHeaderOne }
                                    onChange={ value => setAttributes({ ctaHeaderOne: value }) }
                                /> : null}                     
                            <div class="cta-description">
                                {attributes.showDescriptions ? <RichText
                                    placeholder="Add CTA Description"
                                    tagName="p"
                                    value={ attributes.ctaDescriptionOne }
                                    onChange={ value => setAttributes({ ctaDescriptionOne: value })}
                                /> : null}  
                            </div>
                        </div>
                        <div class="box top-row">
                            <div class="icon">
                                <span style={{ 'color':'#a9a9a9', 'fontWeight': 'bold' }} dangerouslySetInnerHTML={{ __html: attributes.showIcons ? attributes.iconImgTwo : null}} />
                            </div>
                                {attributes.showTitles ? <RichText
                                    className="cta-title"
                                    placeholder={__('Add CTA Title')}
                                    tagName="h2"
                                    value={ attributes.ctaHeaderTwo }
                                    onChange={ value => setAttributes({ ctaHeaderTwo: value }) }
                                /> : null}
                            <div class="cta-description">
                                {attributes.showDescriptions ? <RichText
                                    placeholder="Add CTA Description"
                                    tagName="p"
                                    value={ attributes.ctaDescriptionTwo }
                                    onChange={ value => setAttributes({ ctaDescriptionTwo: value })}
                                /> : null}
                            </div>
                        </div>
                        <div class="box bottom-row">
                            <div class="icon">
                                <span style={{ 'color':'#a9a9a9', 'fontWeight': 'bold' }} dangerouslySetInnerHTML={{ __html: attributes.showIcons ? attributes.iconImgThree : null}} />
                            </div>
                                {attributes.showTitles ? <RichText
                                    className="cta-title"
                                    placeholder="Add CTA Title"
                                    tagName="h2"
                                    value={ attributes.ctaHeaderThree }
                                    onChange={ value => setAttributes({ ctaHeaderThree: value }) }
                                />  : null}
                            <div class="cta-description">
                                {attributes.showDescriptions ? <RichText
                                    placeholder="Add CTA Description"
                                    tagName="p"
                                    value={ attributes.ctaDescriptionThree }
                                    onChange={ value => setAttributes({ ctaDescriptionThree: value })}
                                /> : null}  
                            </div>
                        </div>
                        <div class="box bottom-row">
                            <div class="icon">
                                <span style={{ 'color':'#a9a9a9', 'fontWeight': 'bold' }} dangerouslySetInnerHTML={{ __html: attributes.showIcons ? attributes.iconImgFour : null }} />
                            </div>
                               {attributes.showTitles ?  <RichText
                                    className="cta-title"
                                    placeholder="Add CTA Title"
                                    tagName="h2"
                                    value={ attributes.ctaHeaderFour }
                                    onChange={ value => setAttributes({ ctaHeaderFour: value }) }
                                /> : null}
                            <div class="cta-description">
                               {attributes.showDescriptions ?  <RichText
                                    placeholder="Add CTA Description"
                                    tagName="p"
                                    value={ attributes.ctaDescriptionFour }
                                    onChange={ value => setAttributes({ ctaDescriptionFour: value })}
                                /> : null}   
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		);
	},
	save: ({ attributes }) => {
        const BgStyle = {
            backgroundImage: "url("+ attributes.imgUrl +")",
            backgroundSize: 'cover'
        };

        const textStyle = {
            textDecoration: 'none',
            color: '#a9a9a9',
            fontWeight: 'bold'
        };
		return (
            <div class="g21-2-column-block">
                <div class={`g21-2-column-block-image column-left ${attributes.imgUrl ? 'cta-background-img' : 'null'}`}>
                    {attributes.imgUrl ? <img src={attributes.imgUrl} alt={attributes.imgAlt} title={attributes.imgTitle} /> : ''}
                </div>
                
                <div class="g21-2-column-block-text column-right">

                    <div class="g21-2-column-block-header-title">
                        <h2 class="cta-header">{attributes.showMainHeader ? attributes.mainHeader : null }</h2>
                    </div>

                    <div class="grid2x2">
                        <div class="box top-row">
                            <div class="icon">
                                {/* <span dangerouslySetInnerHTML={{ __html: attributes.showIcons ? attributes.iconImgOne : '' }} /> */}
                                <span style={{ 'color':'#a9a9a9', 'fontWeight': 'bold' }} dangerouslySetInnerHTML= {{ __html:attributes.showIcons ? attributes.iconImgOne : null }} />
                            </div>
                            <div>
                                <h2 class="cta-title">{attributes.showTitles ? attributes.ctaHeaderOne : ''}</h2>
                            </div>
                            <div>
                                <p class="cta-description">{attributes.showDescriptions ? attributes.ctaDescriptionOne : ''}</p>
                            </div>
                        </div>
                        <div class="box top-row">
                            <div class="icon">
                                <span style={{ 'color':'#a9a9a9', 'fontWeight': 'bold' }} dangerouslySetInnerHTML={{ __html: attributes.showIcons ? attributes.iconImgTwo : ''}} />
                            </div>
                            <div>
                                <h2 class="cta-title">{attributes.showTitles ? attributes.ctaHeaderTwo : ''}</h2>
                            </div>
                            <div>
                                <p class="cta-description">{attributes.showDescriptions ? attributes.ctaDescriptionTwo : ''}</p>
                            </div>
                        </div>
                        <div class="box bottom-row">
                            <div class="icon">
                                <span style={{ 'color':'#a9a9a9', 'fontWeight': 'bold' }} dangerouslySetInnerHTML={{ __html: attributes.showIcons ? attributes.iconImgThree : ''}} />
                            </div>
                            <div>
                                <h2 class="cta-title">{attributes.showTitles ? attributes.ctaHeaderThree : ''}</h2>
                            </div>
                            <div>
                                <p class="cta-description">{attributes.showDescriptions ? attributes.ctaDescriptionThree : ''}</p>
                            </div>
                        </div>
                        <div class="box bottom-row">
                            <div class="icon">
                                <span style={{ 'color':'#a9a9a9', 'fontWeight': 'bold' }} dangerouslySetInnerHTML={{ __html:attributes.showIcons ? attributes.iconImgFour : '' }} />
                            </div>
                            <div>
                                <h2 class="cta-title">{attributes.showTitles ? attributes.ctaHeaderFour : ''}</h2>
                            </div>
                            <div>
                                <p class="cta-description">{attributes.showDescriptions ? attributes.ctaDescriptionFour : ''}</p>                            
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
	}
});
