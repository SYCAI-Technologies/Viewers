window.config = {
  routerBasename: '/',
  whiteLabeling: {
    /* Optional: Should return a React component to be rendered in the "Logo" section of the application's Top Navigation bar */
    createLogoComponentFn: function (React) {
      return React.createElement('a', {
        target: '_self',
        rel: 'noopener noreferrer',
        className: 'header-brand',
        href: 'https://www.sycaimedical.com/',
        style: {
          display: 'block',
          textIndent: '-9999px',
          background: 'url(./img/logo-sycai-fondo-azul.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '200px',
        },
      });
    },
  },
  extensions: [{
    id: "myCustomExtension",
    getToolbarModule() {
      return {
        definitions: [
          {
            id: "say-hell-world",
            label: "Diagnose",
            icon: "exclamation-triangle",
            type: "command",
            commandName: "diagnose"
          }
        ],
        defaultContext: "VIEWER"
      };
    },
    getCommandsModule({ servicesManager }) {
      const { UINotificationService } = servicesManager.services;

      return {
        definitions: {
          diagnose: {
            commandFn: function () {
              let pathname = window.location.pathname
              let uid = pathname.split("/")
              console.log(uid[2]);
              fetch("http://127.0.0.1:8090/diagnose/" + uid[2]).then(response =>
                response.json().then(data => {
                  console.log(data)
                }))
              UINotificationService.show({
                title: "Diagnosing...",
                message: "Please allow up to 10 min and refresh"
              });
            },
            storeContexts: [],
            options: {}
          }
        },
        defaultContext: ["VIEWER"]
      };
    }
  }],

  showStudyList: true,
  servers: {
    dicomWeb: [
      {
        name: 'Orthanc',
        wadoUriRoot: '/wado',
        qidoRoot: '/dicom-web',
        wadoRoot: '/dicom-web',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
      },
    ],
  },
};
