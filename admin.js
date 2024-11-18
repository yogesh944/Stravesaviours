window.onload = function () {
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    const tableBody = document.getElementById('donationData');

    if (donations.length === 0) {
        return; // Keep "No donations available" message
    }

    // Clear placeholder message
    tableBody.innerHTML = '';

    // Populate table rows with donation data
    donations.forEach(donation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${donation.foodName}</td>
            <td>${donation.mealType}</td>
            <td>${donation.category}</td>
            <td>${donation.quantity}</td>
            <td>${donation.email}</td>
            <td>${donation.phoneNo}</td>
            <td>${donation.district}</td>
            <td>${donation.address}</td>
        `;
        tableBody.appendChild(row);
    });
};
