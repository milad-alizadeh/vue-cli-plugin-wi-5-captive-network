#vue-cli-plugin-wi5-captive-network

this is Vue CLI plugin for creating apps with welcome screens in captive network.

This package splits the Vue app into 2 separate apps. One to serve as the welcome screen for captive network and the other the full version of the app. The appropriate app will load depending on the environment automatically.

All the files regarding the internet authentication and connection tests can be found in `src/bootstrapper` folder

The welcome screen app (Mainly displayed in captive network assistant) can be found in `src/cna`
