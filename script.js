document.addEventListener('DOMContentLoaded', function() {
    const calculatorContainer = document.querySelector('.longevity-calculator-container');
    const calculateBtn = calculatorContainer.querySelector('.calculate-button');
    const resultsSection = calculatorContainer.querySelector('.results');
    const yearsGained = calculatorContainer.querySelector('.years-gained');
    const yearsBreakdown = calculatorContainer.querySelector('.years-breakdown');
    const currentAgeInput = calculatorContainer.querySelector('#currentAge');
    const habitItems = calculatorContainer.querySelectorAll('.habit-item');
    const habitCheckboxes = calculatorContainer.querySelectorAll('.habit-checkbox');

    habitItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox') {
                const checkbox = this.querySelector('.habit-checkbox');
                checkbox.checked = !checkbox.checked;
                this.classList.toggle('selected', checkbox.checked);
            }
        });
    });

    habitCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            this.closest('.habit-item').classList.toggle('selected', this.checked);
        });
    });

    function calculateYearsGained() {
        const selectedHabits = calculatorContainer.querySelectorAll('.habit-checkbox:checked');
        let totalYears = 0;
        let breakdownHTML = '';

        selectedHabits.forEach(habit => {
            const years = parseFloat(habit.getAttribute('data-years'));
            totalYears += years;
            const habitName = habit.closest('.habit-item').querySelector('.habit-name').textContent;
            breakdownHTML += `<div class="breakdown-item"><span>${habitName}</span><span class="breakdown-years">+${years} years</span></div>`;
        });

        yearsGained.textContent = `${totalYears.toFixed(1)} years`;
        yearsBreakdown.innerHTML = breakdownHTML || '<p>Select habits to see breakdown</p>';
        resultsSection.classList.add('active');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function validateAge() {
        let age = parseInt(currentAgeInput.value);
        if (isNaN(age) || age < 18) currentAgeInput.value = 18;
        else if (age > 100) currentAgeInput.value = 100;
    }

    calculateBtn.addEventListener('click', calculateYearsGained);
    currentAgeInput.addEventListener('change', validateAge);
    currentAgeInput.addEventListener('blur', validateAge);
});
