# Care In A Box

## Context

With the growth of company's products usage and variaty, comes the need to deploy features more frequently and apply changes rapidly.  

Having a single application monolith (frontend application in this case), will force the entire application to be rebuilt or at least redeployed even for small minor changes, scaling it further becomes extremely difficult.  

Further more, graduatly evolving and expanding complicated B2B products, might lead over time to duplications, repeatitive work and unneccessary dependancies, which can be significantly reduced with a decent (reusable) abstraction layer.  

## Micro-frontend

Ideally, we'd like to break the big monolithic application into smaller chunks and merged all together in some way to form one complete end user application.  

### Advanteges  

✓ Easier maintenance  
✓ Increased acceleration  
✓ Fast and easy scaling  
✓ Work on different parts of the entire application in individual codebase
✓ Handling features independently along with independent releases

### Different Approaches  

Some ways to solve the monolith issues, can be summarised into two main approaches.

#### NPM  

Sharing code between applications using Node packages.

Although this approach is the most common one, there are some disadvanteges coming with it:

* Keeping up with the changes in latest versions in each of the published packages. That corresponds to increase time in updating to the changes, incompatibility resolutions, testing and deployment.

* Increases the size of application as more and more packages are added.

#### CDN

Another way to move away from the build time resolution to run time is to make each of the Micro-frontends deploy the JavaScript runtime packages to a CDN for consumption. The host application will then consume them and stitch at runtime.  

* This requires custom logic to be written and handled by the framework, and it puts lot of dependency on the framework and as and when the framework pushes updates, refactoring might be required in the application.

### Module Federation  

Module federation makes it easy to share components and information between many frontend applications and also enables to build out whole pages and create a fully federated site.

#### Advantages

✓ Independent development by teams and dynamically import code from other applications at runtime. End results feels like an SPA.  
✓ Independent testing and deployment/release strategies.  
✓ Smaller and optimised bundle size of each micro app as shared components and dependencies are loaded only when required.  
✓ Each of the micro app can choose their own tech stack and not bound by a particular framework.  

### Import maps

[`Just docs at the moment`](https://www.angulararchitects.io/aktuelles/import-maps-the-next-evolution-step-for-micro-frontends-article/)

### Native Fedretion

[`Just docs at the moment`](https://www.angulararchitects.io/aktuelles/announcing-native-federation-1-0/)

<hr/>

## Requirements

Although the creation a modular app with independantly deployable chunks (i.e. microfrontend, remote modules, libraries etc.) is the main goal of this task, a few predictable challanges should be considered and addressed.  

To demonstrate a good practical solution, the ideal one should follow this list:  

1. **Federated Modules** - following the [advantages list above](https://github.com/iiddoo/care-in-a-box#Module-Federation), to demonstrate an app iimplementing Module Federation approach,  federated modules example pp should contain a shell and 2 other remote modules, all are using some shared libraries.
2. **Angular** - since the monolith already exists (written in Angular), rewriting huge and complex pieces of code or mixing other frameworks will take a very long and expensive time, basically unneccesary, because angular has a reach and well maintained [integration](https://www.angulararchitects.io/en/aktuelles/the-microfrontend-revolution-part-2-module-federation-with-angular/) with Webpack Module Federation.
3. **SSR** - App shell and modules should be pre rendered on server side (to exclude SPAs).
4. **Dynamic Module Route** - Routes values to import remote modules, should be fetched dynamically from a catalog (escaping the need redeploy for routes updates).
5. **Pipeline** - A CI/CD pipeline to build and deploy the app.
6. **Monorepo** - Combine all micro apps into a single repository, reducing possible versions conflicts and easying the usage of shared libraries.  

* version handling?

<hr/>

## Solution  

### Federated Modules

For quick use, I've approached to have 3 apps:

* Dashboard - the shell app hosting the other modules. external catalog service
* Login - remote module representing a login form.
* List - catalog service fetch(next/module).

### SSR

Although Angular has this great ability with [Angular Universal](https://angular.io/guide/universal), the new addition to [Nx](https://nx.dev/getting-started/intro) that provides SSR out of the box just by runnig a comman - made it more apeal to use, and the clear docs on their site to [set up Angular app with SSR and Module Federation](https://nx.dev/recipes/module-federation/module-federation-with-ssr), and [how make it dynamic](https://nx.dev/recipes/module-federation/dynamic-module-federation-with-angular).

<hr/>

## Steps

### Creating the demo workspace

Run the following command with the options listed to create an empty workspace  

``` text
npx create-nx-workspace@latest

Select:

✔ Choose your style                                 · integrated
✔ What to create inside the new workspace           · apps
✔ Repository name                                   · demo-app
✔ Enable distributed caching to make your CI faster · No
```

### Understand this workspace

✨ **The workspace has been generated by [Nx](https://nx.dev)** ✨  

To see a diagram of the dependencies of the projects, run:

``` bash
npx nx graph
```

### Install Angular framework plugin

Run

``` javascript
npm install --save-dev @nx/angular
```

### Generating the host with multiple remotes and SSR

Run

``` javascript
npx nx g @nx/angular:host dashboard --ssr --remotes=login,product,checkout
```

Generating the remote modules one by one is also possible of course, by running  

``` javascript
npx nx g @nx/angular:remote [name] --ssr --host=dashboard
```

### Adding User Data Library

The user data-access library that will be shared between the host application and the remote application.  
This will be used to determine if there is an authenticated user as well as providing logic for authenticating the user.

Run

``` javascript
npx nx g @nx/angular:lib shared/data-access-user
```

### Serving the Dashboard Application

Run

``` javascript
npx nx serve-ssr dashboard
```

then open browser at [http://localhost:4200/](http://localhost:4200/)

<img src="image1.png" width=500>  

App host and remote modules are up and running wirh SSR  

<hr/>

## Known Issues

### Missing module type

###### Error: `import.meta cannot be used outside of a module`

When serving module federation apps in dev mode locally, there'll be an error output to the console, *import.meta cannot be used outside of a module*, and the script that is coming from is *styles.js*.  
It's a known error output, but it doesn't actually cause any breakages from as far as the testing has shown. It's because Angular compiler attaches the *styles.js* file to the index.html in a script tag with defer.
