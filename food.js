document.getElementById('submitForm').addEventListener('click', function () {
    // Collect form data
    const formData = {
        foodName: document.getElementById('foodname').value,
        mealType: document.querySelector('input[name="meal"]:checked').value,
        category: document.getElementById('category').value,
        quantity: document.getElementById('quantity').value,
        email: document.getElementById('email').value,
        phoneNo: document.getElementById('phoneno').value,
        district: document.getElementById('district').value,
        address: document.getElementById('address').value,
    };

    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem('donations')) || [];
    existingData.push(formData);

    // Save updated data to local storage
    localStorage.setItem('donations', JSON.stringify(existingData));

    alert('Food donation submitted successfully!');
    document.getElementById('foodDonateForm').reset();
});
