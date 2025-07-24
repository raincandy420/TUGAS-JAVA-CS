function doGet() {
  // Ganti dengan ID folder Google Drive kamu
  var FOLDER_ID = '1QZw9mmLpT4KGQWKRjFqZx4JIY7T8XcTE';
  var folder = DriveApp.getFolderById(FOLDER_ID);
  var files = folder.getFiles();
  var images = [];
  while (files.hasNext()) {
    var file = files.next();
    if (file.getMimeType().startsWith('image/')) {
      images.push({
        name: file.getName(),
        url: "https://drive.google.com/uc?export=view&id=" + file.getId()
      });
    }
  }
  return ContentService.createTextOutput(JSON.stringify(images))
    .setMimeType(ContentService.MimeType.JSON);
}