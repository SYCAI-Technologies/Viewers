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
            label: "🎉 HELLO WORLD 🎉",
            icon: "exclamation-triangle",
            type: "command",
            commandName: "sayHelloWorld"
          }
        ],
        defaultContext: "VIEWER"
      };
    },
    getCommandsModule({ servicesManager }) {
      const { UINotificationService } = servicesManager.services;

      return {
        definitions: {
          sayHelloWorld: {
            commandFn: function () {
              let a = window.location.pathname
              let b = a.split("/")
              console.log(b[2]);
              fetch("http://127.0.0.1:8080/diagnose/" + b[2]).then(response =>
                response.json().then(data => {
                  console.log(data)
                }))
              UINotificationService.show({
                title: "Funciona?",
                message: "Hola"
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
