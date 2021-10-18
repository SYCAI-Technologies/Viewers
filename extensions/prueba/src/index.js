/**
 *
 */
export default {

  id: "prueba",
  preRegistration(configuration = {}) {
    init(configuration);
  },
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
            console.log("KSS");
            fetch("http://127.0.0.1:8080/sample").then(response =>
              response.json().then(data => {
                console.log(data)
              }))
            UINotificationService.show({
              title: "SOPInstanceUID",
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

};
