/**
 * TivaC GPIO Bit-Banding / Masked Data Solver
 * ARM Cortex-M4 Memory Address Calculator
 * 
 * Implements GPIO data masking as used in TivaC TM4C123 microcontrollers.
 * 
 * Key Concept: GPIO Data Masking
 * - Base address for GPIO Port F DATA: 0x40025000
 * - Address offset determines a MASK for which bits are affected
 * - mask = (address - base) / 4
 * - Writes only affect bits where mask has 1s
 * - Each table cell shows: portValue & mask
 */

// =====================================================
// Constants - TivaC GPIO Port Addresses
// =====================================================

const GPIO_PORTS = {
    'A': 0x40004000,
    'B': 0x40005000,
    'C': 0x40006000,
    'D': 0x40007000,
    'E': 0x40024000,
    'F': 0x40025000
};

// =====================================================
// State
// =====================================================

let currentPort = 'F';
let baseAddress = 0x40025000;
let portValue = 0x00;  // Current port data value (8 bits)
let rowCount = 8;      // Number of table rows (1-15)
let lastEditedCell = null;

// =====================================================
// Utility Functions
// =====================================================

/**
 * Parse a hex string to a number
 */
function parseHex(hexStr) {
    if (!hexStr) return null;
    const cleaned = hexStr.trim().toLowerCase().replace(/^0x/, '');
    const num = parseInt(cleaned, 16);
    return isNaN(num) ? null : num;
}

/**
 * Format a number as a hex string with 0x prefix
 */
function toHex(num, padLength = 8) {
    if (num === null || num === undefined) return '0x00000000';
    return '0x' + num.toString(16).toUpperCase().padStart(padLength, '0');
}

/**
 * Format as short hex (e.g., 0x0F)
 */
function toHexShort(num) {
    if (num === null || num === undefined) return '0x00';
    return '0x' + num.toString(16).toUpperCase().padStart(2, '0');
}

/**
 * Convert number to 8-bit binary string
 */
function toBinary(num) {
    return (num & 0xFF).toString(2).padStart(8, '0');
}

// =====================================================
// GPIO Masking Calculations
// =====================================================

/**
 * Calculate the mask for a given address
 * mask = (address - baseAddress) / 4
 * 
 * @param {number} address - The GPIO address
 * @returns {number} - The mask value (0x00 - 0xFF)
 */
function calculateMask(address) {
    const offset = address - baseAddress;
    const mask = Math.floor(offset / 4);
    return mask & 0xFF;  // Limit to 8 bits
}

/**
 * Calculate the address for a given mask
 * address = baseAddress + (mask * 4)
 * 
 * @param {number} mask - The mask value
 * @returns {number} - The address
 */
function calculateAddress(mask) {
    return baseAddress + (mask * 4);
}

/**
 * Calculate what value is displayed at an address
 * displayed = portValue & mask
 * 
 * @param {number} address - The GPIO address
 * @returns {number} - The displayed value
 */
function getDisplayedValue(address) {
    const mask = calculateMask(address);
    return portValue & mask;
}

/**
 * Handle a write to an address
 * Only bits where mask=1 are affected
 * new_port = (old_port & ~mask) | (write_value & mask)
 * 
 * @param {number} address - The address being written to
 * @param {number} writeValue - The value being written
 * @returns {number} - The new port value
 */
function handleWrite(address, writeValue) {
    const mask = calculateMask(address);
    // Only modify bits that pass through the mask
    const newPortValue = (portValue & ~mask) | (writeValue & mask);
    return newPortValue & 0xFF;  // Limit to 8 bits
}

// =====================================================
// Table Generation and Updates
// =====================================================

/**
 * Generate the memory table
 * 8 rows x 4 columns = 32 addresses  
 * Each row increases address by 0x10
 * Each column increases address by 0x04
 */
function generateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    for (let row = 0; row < rowCount; row++) {
        const tr = document.createElement('tr');
        const rowAddress = baseAddress + (row * 0x10);

        // Address cell
        const addrTd = document.createElement('td');
        addrTd.className = 'address-cell';
        addrTd.textContent = toHex(rowAddress);
        tr.appendChild(addrTd);

        // Value cells (4 per row)
        for (let col = 0; col < 4; col++) {
            const cellAddress = rowAddress + (col * 0x04);
            const mask = calculateMask(cellAddress);
            const displayValue = portValue & mask;

            const td = document.createElement('td');
            td.className = 'value-cell';
            td.dataset.address = cellAddress;
            td.dataset.mask = mask;
            td.dataset.row = row;
            td.dataset.col = col;
            td.textContent = toHex(displayValue);

            // Click handler for editing
            td.addEventListener('click', handleCellClick);

            tr.appendChild(td);
        }

        tableBody.appendChild(tr);
    }
}

/**
 * Update all cell values based on current port value
 */
function updateAllCells() {
    const cells = document.querySelectorAll('#tableBody td.value-cell');

    cells.forEach(cell => {
        const address = parseInt(cell.dataset.address);
        const mask = calculateMask(address);
        const displayValue = portValue & mask;

        cell.textContent = toHex(displayValue);

        // Add animation
        cell.classList.add('edited');
        setTimeout(() => cell.classList.remove('edited'), 500);
    });
}

/**
 * Handle cell click for editing
 */
function handleCellClick(event) {
    const cell = event.target;

    // Skip if already editing
    if (cell.querySelector('input')) return;

    const address = parseInt(cell.dataset.address);
    const mask = calculateMask(address);
    const currentDisplayValue = portValue & mask;

    // Store last edited cell info
    lastEditedCell = {
        address: address,
        mask: mask,
        row: parseInt(cell.dataset.row),
        col: parseInt(cell.dataset.col)
    };

    // Create input
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell-input';
    input.value = toHex(currentDisplayValue);

    // Clear cell and add input
    cell.textContent = '';
    cell.appendChild(input);
    cell.classList.add('active');

    // Focus and select
    input.focus();
    input.select();

    const handleComplete = () => {
        const writeValue = parseHex(input.value);

        if (writeValue !== null) {
            // Calculate new port value
            const newPortValue = handleWrite(address, writeValue);
            portValue = newPortValue;

            // Update all cells
            updateAllCells();

            // Generate explanation
            generateExplanation(address, writeValue, mask);
        }

        cell.classList.remove('active');
    };

    input.addEventListener('blur', handleComplete);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        } else if (e.key === 'Escape') {
            cell.textContent = toHex(currentDisplayValue);
            cell.classList.remove('active');
        }
    });
}

// =====================================================
// Step-by-Step Explanation
// =====================================================

/**
 * Generate detailed step-by-step explanation
 */
function generateExplanation(address, writeValue, mask) {
    const container = document.getElementById('explanationContent');

    const offset = address - baseAddress;
    const oldPortValue = (portValue & ~mask) | ((portValue | mask) & mask);  // This was before update
    // Actually we need to track the old value. Let me recalculate.
    // After handleWrite, portValue is already updated. 
    // The old value would have been different. Let's work backwards.
    // new = (old & ~mask) | (write & mask)
    // For this explanation, we show what happened.

    // Bits that changed
    const bitsAffected = [];
    for (let i = 0; i < 8; i++) {
        if ((mask >> i) & 1) {
            bitsAffected.push(i);
        }
    }

    let stepsHtml = '<div class="step-container">';

    // Step 1: Identify the address
    stepsHtml += `
        <div class="step-card">
            <div class="step-number">1</div>
            <div class="step-content">
                <div class="step-title">Identify the Address</div>
                <div class="step-detail">
                    Write operation at address: <code>${toHex(address)}</code><br>
                    Port ${currentPort} masked DATA base: <code>${toHex(baseAddress)}</code>
                </div>
            </div>
        </div>
    `;

    // Step 2: Calculate offset and mask
    stepsHtml += `
        <div class="step-card">
            <div class="step-number">2</div>
            <div class="step-content">
                <div class="step-title">Calculate Offset and Mask</div>
                <div class="step-detail">
                    Offset = Address - Base = ${toHex(address)} - ${toHex(baseAddress)}<br>
                    Offset = <code>${toHexShort(offset)}</code> (${offset} decimal)
                </div>
                <code class="step-formula">Mask = Offset / 4 = ${toHexShort(offset)} / 4 = ${toHexShort(mask)}</code>
            </div>
        </div>
    `;

    // Step 3: Interpret the mask
    stepsHtml += `
        <div class="step-card">
            <div class="step-number">3</div>
            <div class="step-content">
                <div class="step-title">Interpret the Mask</div>
                <div class="step-detail">
                    Mask = <code>${toHexShort(mask)}</code> = Binary <code>${toBinary(mask)}</code><br>
                    This mask affects: <strong>Bit${bitsAffected.length > 1 ? 's' : ''} ${bitsAffected.join(', ')}</strong>
                </div>
            </div>
        </div>
    `;

    // Step 4: Apply the write
    stepsHtml += `
        <div class="step-card">
            <div class="step-number">4</div>
            <div class="step-content">
                <div class="step-title">Apply the Write Operation</div>
                <div class="step-detail">
                    Value written: <code>${toHex(writeValue)}</code><br>
                    Only bits where mask = 1 are modified.
                </div>
                <code class="step-formula">new_port = (old_port & ~mask) | (write_value & mask)</code>
            </div>
        </div>
    `;

    // Step 5: Result
    stepsHtml += `
        <div class="step-card">
            <div class="step-number">5</div>
            <div class="step-content">
                <div class="step-title">Result</div>
                <div class="step-detail">
                    <strong>New Port Value:</strong> <code>${toHexShort(portValue)}</code> = Binary <code>${toBinary(portValue)}</code><br>
                    <strong>All table cells updated:</strong> Each cell now shows <code>portValue & mask</code>
                </div>
            </div>
        </div>
    `;

    // Step 6: Verification
    stepsHtml += `
        <div class="step-card">
            <div class="step-number">6</div>
            <div class="step-content">
                <div class="step-title">Verification Formula</div>
                <div class="step-detail">
                    For any address A in the table:<br>
                    <code>mask = (A - ${toHex(baseAddress)}) / 4</code><br>
                    <code>displayed_value = ${toHexShort(portValue)} & mask</code>
                </div>
            </div>
        </div>
    `;

    stepsHtml += '</div>';
    container.innerHTML = stepsHtml;
}

// =====================================================
// Port Selection
// =====================================================

/**
 * Handle port button click
 */
function handlePortClick(event) {
    const btn = event.target;
    if (!btn.classList.contains('port-btn')) return;

    // Update active state
    document.querySelectorAll('.port-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update port
    currentPort = btn.dataset.port;
    baseAddress = parseInt(btn.dataset.base);

    // Update base address display
    document.getElementById('baseAddressDisplay').textContent = toHex(baseAddress);

    // Reset port value and regenerate table
    portValue = 0x00;
    generateTable();

    // Clear explanation
    showPlaceholder();
}

/**
 * Show placeholder in explanation section
 */
function showPlaceholder() {
    document.getElementById('explanationContent').innerHTML = `
        <div class="explanation-placeholder">
            <span class="placeholder-icon">👆</span>
            <p>Click any cell in the table to see the step-by-step calculation.</p>
        </div>
    `;
}

// =====================================================
// Initialization
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Port button handlers
    document.querySelectorAll('.port-btn').forEach(btn => {
        btn.addEventListener('click', handlePortClick);
    });

    // Row count slider handler
    const rowCountSlider = document.getElementById('rowCount');
    const rowCountDisplay = document.getElementById('rowCountDisplay');

    rowCountSlider.addEventListener('input', () => {
        rowCount = parseInt(rowCountSlider.value);
        rowCountDisplay.textContent = rowCount;
        generateTable();
    });

    // Generate initial table
    generateTable();

    // Modal close handler
    const modal = document.getElementById('warningModal');
    const closeBtn = document.getElementById('closeModal');

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close on overlay click (outside modal content)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
