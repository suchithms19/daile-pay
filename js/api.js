// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Test backend connectivity
async function testBackendConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/test`);
        const data = await response.json();
        console.log('Backend connection test:', data.message);
        return true;
    } catch (error) {
        console.error('Backend connection failed:', error);
        return false;
    }
}

// Generic error handler
const handleError = (error) => {
    console.error('API Error:', error);
    
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        alert('Cannot connect to the server. Please make sure the backend server is running.');
        return;
    }

    if (error.response?.data?.errors) {
        // Handle validation errors
        const errorMessages = error.response.data.errors.map(err => err.msg).join('\n');
        alert('Validation Error:\n' + errorMessages);
    } else if (error.response?.data?.message) {
        // Handle server error message
        alert(error.response.data.message);
    } else {
        // Handle generic error
        alert('An error occurred. Please try again later.');
    }
};

// Contact form submission
async function submitContactForm(formData) {
    console.log('Submitting contact form with data:', formData);
    
    try {
        // Check backend connectivity first
        const isConnected = await testBackendConnection();
        if (!isConnected) {
            return false;
        }

        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        console.log('Contact form response status:', response.status);
        const data = await response.json();
        console.log('Contact form response data:', data);

        if (!response.ok) {
            throw { response: { data } };
        }

        alert(data.message || 'Thank you for contacting us! We will get back to you shortly.');
        return true;
    } catch (error) {
        handleError(error);
        return false;
    }
}

// Quote form submission
async function submitQuoteForm(formData) {
    console.log('Submitting quote form with data:', formData);

    try {
        // Check backend connectivity first
        const isConnected = await testBackendConnection();
        if (!isConnected) {
            return false;
        }

        const response = await fetch(`${API_BASE_URL}/quote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        console.log('Quote form response status:', response.status);
        const data = await response.json();
        console.log('Quote form response data:', data);

        if (!response.ok) {
            throw { response: { data } };
        }

        alert(data.message || 'Thank you for your quote request! We will contact you shortly with pricing details.');
        return true;
    } catch (error) {
        handleError(error);
        return false;
    }
} 