@mainpage Sycai Viewer
@section description_main Description
Customized OHIF Viewer fork to view stored DICOM images in the PACS with the ability to display segmentations and PDF reports.
@section features Base features
* Displays studies from Sycai database.
* Customized theme with Sycai colors and logo.
@section Changelog Release Notes SWR2.0.0 (Oct 28 2022)
* Added Label and Release Notes pages.
* Added a button to log out.
* Removed unused buttons from Toolbar.
* Added Diagnose button in Toolbar which triggers an inference on the best series of the active study.
When finished, report will show up on the same page.


@section files Modified files
* <h3>platform/viewer/src/components/Header/Header.js</h3>
<b>Header():</b> Removed "About" and added "Label", "Release Notes" and "Logout" options.
* <h3>platform/viewer/src/components/Header/Header.css</h3>
.research-use set to hidden.
* <h3>platform/i18n/src/locales/es/Header.json</h3>
Added spanish translations for the new Header options.
* <h3>extensions/cornerstone/src/toolbarModule.js</h3>
<b>const definitions = [...]:</b> Removed unnecessary buttons.
* <h3>Dockerfile</h3>
Changed the base url to /ohif.
* <h3>platform/viewer/src/components/OHIFLogo/OHIFLogo.js</h3>
<b>OHIFLogo():</b> Click on logo redirects to www.sycaimedical.com.
* <h3>platform/viewer/public/config/docker_nginx-orthanc.js</h3>
<b>servers:{ dicomWeb: [...]:</b> PACS connection.  <br/>
<b>extensions[...]:</b> Added "sycai-diagnose" extension (adds a "Diagnose" button in the toolbar which triggers inference onClick).
* <h3>platform/viewer/src/theme-tide.css</h3>
Colors changed.
