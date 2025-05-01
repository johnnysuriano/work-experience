// Function to fetch a random dog image from the API
async function fetchDogImage() {
    try {
        // Display loading message
        document.getElementById('api-result').innerHTML = "Loading dog image...";
        
        // Random Dog API URL
        const apiUrl = "https://random.dog/woof.json";
        
        // Make the actual API request
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        // The API returns a 'url' property with the image/video URL
        const fileUrl = data.url;
        
        // Check if it's an image or video (the API sometimes returns videos)
        if (fileUrl.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
            // It's an image, display it
            document.getElementById('api-result').innerHTML = 
                `<strong>Random Dog Image:</strong><br>
                <img src="${fileUrl}" alt="Random dog" style="max-width: 100%; max-height: 300px;">`;
        } else if (fileUrl.match(/\.(mp4|webm)$/) !== null) {
            // It's a video, display with video tag
            document.getElementById('api-result').innerHTML = 
                `<strong>Random Dog Video:</strong><br>
                <video controls style="max-width: 100%; max-height: 300px;">
                    <source src="${fileUrl}" type="video/${fileUrl.split('.').pop()}">
                    Your browser does not support the video tag.
                </video>`;
        } else {
            // Unknown format
            document.getElementById('api-result').innerHTML = 
                `<strong>Random Dog Media:</strong><br>
                <a href="${fileUrl}" target="_blank">Click to view dog media (unknown format)</a>`;
        }
             
    } catch (error) {
        console.error("Error fetching dog image:", error);
        document.getElementById('api-result').innerHTML = "Error fetching dog image. Please try again.";
    }
}


function submitBMI() {
    // Get input values and convert to numbers
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    
    // Check if inputs are valid numbers
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById('bmi').innerHTML = "Please enter valid weight and height values";
        document.getElementById('api-result').innerHTML = "";
        return;
    }
    
    // Calculate BMI
    var BMI = weight/(height**2);
    var roundedBMI = BMI.toFixed(1); // Keep one decimal for better accuracy
    
    // Display the result
    document.getElementById('bmi').innerHTML = roundedBMI;
    
    // Categorize BMI
    let category;
    if (BMI < 18.5) {
        category = "Underweight";
    } else if (BMI >= 18.5 && BMI < 25) {
        category = "Normal weight";
    } else if (BMI >= 25 && BMI < 30) {
        category = "Overweight";
    } else {
        category = "Obese";
    }
    
    document.getElementById('bmi-category').innerHTML = category;
    
    // Fetch and display a random dog image
    fetchDogImage();
}