/* eslint-disable 10x/auto-import */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function RunAction(args) {

  if (app.documents && app.documents.length > 0) {
    const c = confirm("All open documents must be closed before continuing. Would you like to continue and close all open documents without saving?");
    if (!c) return;
    while(app.documents && app.documents.length > 0) {
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
  }

  const selectedFolder = new Folder(args[0]);
  const options = StackerOptions.init(args[1]);

  options.selectedFolder = selectedFolder;
  const fileList = FileUtil.sortFiles(selectedFolder);
  const defaultRulerUnits = app.preferences.rulerUnits;
  app.preferences.rulerUnits = Units.PIXELS;
  // eslint-disable-next-line no-var
  var time = Date.now();
  const outputDir = selectedFolder + "/" + time;
  FileUtil.folder(outputDir);
  alert("Processing " + fileList.length + " files!")
  
  options.outputDir = outputDir;
  FileUtil.runActionOnFiles(fileList, options);
  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

  time = (Date.now() - time) / (1000 * 60);
  alert("Finished in " + parseFloat(time).toFixed(2) + " minutes!");
  app.preferences.rulerUnits = defaultRulerUnits;

}
