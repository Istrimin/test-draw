<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
$cursorDir = 'cursors/';
if (!is_dir($cursorDir)) {
    echo json_encode(['error' => 'Cursor directory not found']);
    exit;
}
$cursors = array_diff(scandir($cursorDir), array('..', '.'));
if (empty($cursors)) {
    echo json_encode(['error' => 'No cursors found']);
    exit;
}
$cursors = array_map(function($cursor) {
    return $cursor . '.png';
}, $cursors);
echo json_encode($cursors);
?>
