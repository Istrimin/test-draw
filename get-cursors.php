<?php
// Specify the directory where your cursor images are stored
$cursorDirectory = 'cursors/'; // Change 'cursors/' to your actual directory

// Get all files in the directory
$files = scandir($cursorDirectory);

// Filter out directories (.) and (..)
$files = array_diff($files, array('.', '..'));

// Prepare an array to store cursor data (name and image URL)
$cursorData = [];

// Loop through each file
foreach ($files as $file) {
    // Check if the file is a PNG image
    if (pathinfo($file, PATHINFO_EXTENSION) === 'png') {
        // Construct the image URL
        $imageUrl = $cursorDirectory . $file;

        // Add cursor data to the array
        $cursorData[] = [
            'name' => pathinfo($file, PATHINFO_FILENAME), // Get filename without extension
            'image' => $imageUrl
        ];
    }
}

// Set the Content-Type header to application/json
header('Content-Type: application/json');

// Encode the data as JSON and echo it
echo json_encode($cursorData);
?>
