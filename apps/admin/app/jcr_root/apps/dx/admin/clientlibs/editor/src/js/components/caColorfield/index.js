const CORAL_INPUT_SELECTOR = '._coral-ColorInput';
const DX_INPUT_SELECTOR = '.dx-ColorInput';

const caColorfields = (colorfields) => {
    colorfields.forEach((colorfield) => {
        // Get the inputs
        const coralColorInput = colorfield.querySelector(CORAL_INPUT_SELECTOR);
        const dxColorInput = colorfield.querySelector(DX_INPUT_SELECTOR);

        // On coral input change, set the value based on dx value or custom
        coralColorInput.addEventListener('change', (e) => {
            // Get the proper color value
            const selectedItem = e.target.querySelector('[selected]');
            if (selectedItem && e.target.value) {
                dxColorInput.value = selectedItem.dataset.dxValue;
            } else {
                dxColorInput.value = e.target.value;
            }
        });
    });
};

export default caColorfields;
