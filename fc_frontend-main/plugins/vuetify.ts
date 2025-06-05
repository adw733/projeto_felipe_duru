import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    components,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            portalColor: "#009F8A",
            errorSnackbar: "#FF8A80",
            errorSnackbarLoading: "#D50000",
            successSnackbar: "#5cb85c",
            successSnackbarLoading: "#5cb85c",
            infoSnackbar: "#5bc0de",
            infoSnackbarLoading: "#5bc0de",
            warningSnackbar: "#f0ad4e",
            warningSnackbarLoading: "#f0ad4e",
            confirmSnackbar: "#EEEEEE",
            confirmSnackbarLoading: "#BDBDBD",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
