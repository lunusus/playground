// api.js - Simple API module

const ApiService = (function () {
    // Default configuration
    const defaults = {
        baseURL: '',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const productionConfig = {
        baseURL: '',
        headers: {
            'Authorization': 'Bearer your_token_here'
        }
    }

    const mockConfig = {
        baseURL: 'http://127.0.0.1:3000',
    }

    // Merge defaults with custom config
    function mergeConfig(config) {
        return {
            ...defaults,
            ...config,
            headers: {
                ...defaults.headers,
                ...(config?.headers || {})
            }
        };
    }

    // Handle response
    async function handleResponse(response) {
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }
        return response.json();
    }

    // Main request function
    async function request(endpoint, method = 'GET', data = null, config = {}) {
        const { baseURL, headers, ...rest } = mergeConfig(config);
        const url = `${baseURL}${endpoint}`;

        const options = {
            method,
            headers,
            ...rest
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            return handleResponse(response);
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Public methods
    return {
        get(endpoint, config = {}) {
            return request(endpoint, 'GET', null, config);
        },

        post(endpoint, data, config = {}) {
            return request(endpoint, 'POST', data, config);
        },

        put(endpoint, data, config = {}) {
            return request(endpoint, 'PUT', data, config);
        },

        patch(endpoint, data, config = {}) {
            return request(endpoint, 'PATCH', data, config);
        },

        delete(endpoint, config = {}) {
            return request(endpoint, 'DELETE', null, config);
        },

        // Set base URL for all requests
        setBaseURL(url) {
            defaults.baseURL = url;
        },

        // Set default headers
        setHeader(key, value) {
            defaults.headers[key] = value;
        },

        useProduction() {
            const config = mergeConfig(productionConfig);
            defaults.baseURL = config.baseURL;
            defaults.headers = config.headers;
        },

        useMock() {
            defaults.baseURL = mockConfig.baseURL;
        }
    };
})();

export default ApiService;