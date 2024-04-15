document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('resultModal');
    const closeBtn = document.querySelector('.close');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Reset error icons
        resetErrorIcons();

        // Get form values
        const income = parseFloat(document.getElementById('income').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;
        const age = document.getElementById('age').value;

        // Validate age field
        if (!age) {
            showErrorIcon(document.getElementById('age'));
            return;
        }

        // Calculate taxable income
        let taxableIncome = income + extraIncome - deductions - 8;
        if (taxableIncome <= 0) taxableIncome = 0;

        // Calculate tax based on age
        let taxRate;
        switch (age) {
            case '<40':
                taxRate = 0.3;
                break;
            case '>=40&<60':
                taxRate = 0.4;
                break;
            case '>=60':
                taxRate = 0.1;
                break;
        }
        const taxAmount = taxableIncome * taxRate;

        // Calculate overall income after tax deduction
        const overallIncome = income + extraIncome - deductions - taxAmount;

        // Display result in modal
        document.getElementById('taxResult').innerHTML = `
            <p>Tax to be paid: ${taxAmount.toFixed(2)} Lakhs</p>
            <p>Overall income after tax deduction: ${overallIncome.toFixed(2)} Lakhs</p>
        `;
        modal.style.display = 'block';
    });

    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when user clicks outside of modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Reset error icons
    function resetErrorIcons() {
        const errorIcons = document.querySelectorAll('.error-icon');
        errorIcons.forEach(icon => icon.style.display = 'none');
    }

    // Show error icon for input field
    function showErrorIcon(input) {
        const errorIcon = input.nextElementSibling;
        errorIcon.style.display = 'inline-block';
    }
});
