## Intreview challenge

This project is planned as a show case of connecting a react+flask proyect and consume and render the given Services.

[![forthebadge](http://forthebadge.com/images/badges/made-with-javascript.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

## Goals

- a. The client must list all services :heavy_check_mark:
- b. The client must be able to select a specific service and get the details of it :heavy_check_mark:
- c. In the selected service, the client must be able to see all incidents by status and
go into the incident to know more detail :heavy_check_mark:
- d. Must be able to create/update incidents, and check the status of them as
described in the points b and c :heavy_check_mark:

## Required
- a. You must use React Hooks (16.8 or higher) :heavy_check_mark:
- b. TypeScript :shrug: / :heavy_check_mark:
- c. Redux :heavy_check_mark:
- d. Don’t use any component library :heavy_check_mark:

## Desirable:
- a. The use of unit test :x:

## Scripts
- `clone project`
- `npm i`
- `npm run start/dev` - start dev server http://localhost:5173/

## Desciption

- This proyect follows SPA'ish way

*The home page should render every service you got registered at your app instance

*Then if you click in any service it will render the active service details, name, id, description

*Then you should click on "open incidents 4 service", that button will load every incident asociated with the service

*Then you could decide on clicking creating an Incident or select an already made one

*If you clicked on "create a new Incident" a form will appear enabling the creation of a new instance. The `service input is for the service Id`, `title for the title` and the `description for the description`. 

*If you then click submit it will create a new Incident (if everything goes good) and if you clicked on cancel it will remove the form and render the incidents table again.

*If you clicked in any incident it will render bellow the details of the incident, then you can see its id, title, status and description, if you wish to edit them you could just click in edit service and then click on submit for it to save.




## License

[MIT](https://choosealicense.com/licenses/mit/)

## Scaffolded with
### vite-template-redux

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
