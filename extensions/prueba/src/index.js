/**
 *
 */
export default {

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

};
