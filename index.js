// Step 1: Simulate User Behavior
function initializeSimulation() {
    const simulateButton = document.getElementById('simulate-click');
    const userForm = document.getElementById('user-form');
    const userInput = document.getElementById('user-input');
    const dynamicContent = document.getElementById('dynamic-content');
    const errorMessage = document.getElementById('error-message');

    if (simulateButton) {
        simulateButton.addEventListener('click', () => {
            const newElement = createElement('p', {
                className: 'click-result',
                textContent: `Button clicked at ${new Date().toLocaleTimeString()}`
            });
            if (dynamicContent) {
                dynamicContent.appendChild(newElement);
            }
        });
    }

    if (userForm) {
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputValue = userInput ? userInput.value.trim() : '';
            
            if (inputValue === '') {
                showError('Please enter some text before submitting.');
                return;
            }

            if (inputValue.length < 3) {
                showError('Input must be at least 3 characters long.');
                return;
            }

            clearError();
            addSubmittedItem(inputValue);
            if (userInput) {
                userInput.value = '';
            }
        });
    }
}

// Step 2: DOM Manipulation Functions
function createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'textContent') {
            element.textContent = value;
        } else if (key === 'className') {
            element.className = value;
        } else {
            element.setAttribute(key, value);
        }
    });
    return element;
}

function addSubmittedItem(text) {
    const dynamicContent = document.getElementById('dynamic-content');
    if (!dynamicContent) return false;
    
    const item = createElement('div', {
        className: 'submitted-item',
        textContent: `Submitted: ${text}`
    });
    
    const removeButton = createElement('button', {
        className: 'remove-btn',
        textContent: 'Remove'
    });
    
    removeButton.addEventListener('click', () => {
        item.remove();
    });
    
    item.appendChild(removeButton);
    dynamicContent.appendChild(item);
    return true;
}

function updateElementContent(elementId, newContent) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = newContent;
        return true;
    }
    return false;
}

function removeElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.remove();
        return true;
    }
    return false;
}

// Step 3: Error Handling
function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        setTimeout(() => {
            clearError();
        }, 5000);
        return true;
    }
    return false;
}

function clearError() {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.add('hidden');
        return true;
    }
    return false;
}

function validateInput(input) {
    if (!input || input.trim() === '') {
        return { isValid: false, error: 'Input cannot be empty' };
    }
    if (input.length < 3) {
        return { isValid: false, error: 'Input must be at least 3 characters' };
    }
    if (input.length > 50) {
        return { isValid: false, error: 'Input cannot exceed 50 characters' };
    }
    return { isValid: true, error: null };
}

// Step 4: Reusable Utilities
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize only when DOM is ready and we're in a browser environment
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeSimulation);
}

export {
    initializeSimulation,
    createElement,
    addSubmittedItem,
    updateElementContent,
    removeElement,
    showError,
    clearError,
    validateInput,
    debounce,
    throttle
};