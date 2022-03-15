window.config = {
  routerBasename: '/',

  extensions: [{
    id: "sycai-diagnose",
    getToolbarModule() {
      return {
        definitions: [
          {
            id: "diag",
            label: "Diagnose",
            icon: "brain",
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
                //message: "Please allow up to 10 min and refresh"
              });
            },
            storeContexts: [],
            options: {}
          }
        },
        defaultContext: ["VIEWER"]
      };
    }
  }/*,
  {
    id: "sycai-disclaimer",
    getToolbarModule() {
      return {
        definitions: [
          {
            id: "disclaimer",
            label: "Disclaimer",
            icon: "brain",
            type: "command",
            commandName: "disclaimer"
          }
        ],
        defaultContext: "VIEWER"
      };
    },
    getCommandsModule({ servicesManager }) {
      const { UIModalService } = servicesManager.services;

      return {
        definitions: {
          disclaimer: {
            commandFn: function () {
              const Disclaimer = function () {
                return (
                  "Hola"
                );
              };
              UIModalService.show({
                content: Disclaimer,
                title: `Disclaimer`,
                fullscreen: true,
                noScroll: true,
              });
            },
            storeContexts: [],
            options: {}
          }
        },
        defaultContext: ["VIEWER"]
      };
    }
  }*/],

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
        requestOptions: {
          "auth": "sycai:sycai",
          "logRequests": true,
          "logResponses": false,
          "logTiming": true
        },
      },
    ],
  },
};
