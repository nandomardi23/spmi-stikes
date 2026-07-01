/**
 * Formats a given date string or Date object to Indonesian date format.
 * 
 * @param {string|Date} dateString - The date to format
 * @param {boolean} includeTime - Whether to include time in the output
 * @returns {string} Formatted date string (e.g. "5 Agustus 2026")
 */
export const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    
    // Check for invalid date
    if (isNaN(date.getTime())) return '-';

    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }

    return date.toLocaleDateString('id-ID', options);
};

export const formatShortDate = (dateString) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit' 
    });
};
