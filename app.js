const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('columns');
const gapInput = document.getElementById('gap');

const rowsVal = document.getElementById('rows-val');
const colsVal = document.getElementById('columns-val');
const gapVal = document.getElementById('gap-val');

const gridPreview = document.getElementById('grid-preview');
const getCodeBtn = document.getElementById('get-code-btn');
const modal = document.getElementById('code-modal');
const closeModal = document.getElementById('close-modal');
const cssOutput = document.getElementById('css-output');
const htmlOutput = document.getElementById('html-output');
const copyBtn = document.getElementById('copy-btn');

function updateGrid() {
    const rows = rowsInput.value;
    const cols = colsInput.value;
    const gap = gapInput.value;

    // Update UI Labels
    rowsVal.textContent = rows;
    colsVal.textContent = cols;
    gapVal.textContent = gap;

    // Update Grid Styles
    gridPreview.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridPreview.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridPreview.style.gap = `${gap}px`;

    // Update Grid Items
    gridPreview.innerHTML = '';
    const totalItems = rows * cols;
    for (let i = 0; i < totalItems; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.textContent = i + 1;

        // Add staggered animation delay
        item.style.animation = `fadeIn 0.5s ease backwards ${i * 0.05}s`;

        gridPreview.appendChild(item);
    }
}

function generateCode() {
    const rows = rowsInput.value;
    const cols = colsInput.value;
    const gap = gapInput.value;

    const css = `.grid-container {
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    gap: ${gap}px;
    width: 100%;
    height: 100%;
}`;

    const html = `<div class="grid-container">
    <!-- Grid Items -->
    ${Array.from({ length: rows * cols }, (_, i) => `<div>${i + 1}</div>`).join('\n    ')}
</div>`;

    cssOutput.textContent = css;
    htmlOutput.textContent = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    modal.classList.add('visible');
}

// Event Listeners
rowsInput.addEventListener('input', updateGrid);
colsInput.addEventListener('input', updateGrid);
gapInput.addEventListener('input', updateGrid);

getCodeBtn.addEventListener('click', generateCode);
closeModal.addEventListener('click', () => modal.classList.remove('visible'));

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('visible');
    }
});

copyBtn.addEventListener('click', () => {
    const code = `/* CSS */\n${cssOutput.textContent}\n\n<!-- HTML -->\n${htmlOutput.textContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>')}`;
    navigator.clipboard.writeText(code);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy to Clipboard', 2000);
});

// Initialize
updateGrid();

// Add global styles for animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}
`;
document.head.appendChild(styleSheet);
