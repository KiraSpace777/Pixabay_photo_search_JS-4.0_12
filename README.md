# Pixabay Image Search Application

An application that searches for images by keyword and displays them in a responsive gallery with pagination and a modal lightbox view.

- **Design Mockup:** [Figma Design](https://www.figma.com/design/DnWoSXuqp1WSnUsTl4236O/HW-7-12-JavaScript--Copy-?node-id=21-7&t=o5knpNAClWrPwUbO-0)

---

## 📋 Task Requirements

- The user enters a search string into a text field; upon form submission, an HTTP request containing this search string is executed.
- When the form submission button is clicked, a validation check ensures the text field is not empty, preventing the user from submitting a blank request.
- `smoothScroll()` — extracted into a separate function for smooth page scrolling.
- `checkPaginationStatus()` — a separate function to check the page limit.
- **Pagination logic** — managed using state variables: `query`, `page`, `totalHits`, and `perPage`.

---

## 🛠️ Tech Stack & Architecture

- Built using **Vite** (`vanilla-app-template`).
- **Axios** library is used for HTTP requests with `async/await` syntax.
- Formatted using **Prettier**; no errors or warnings in the browser console.
- Organized with ES modules (`export`/`import` syntax).

### Project Structure & Modules (basics)

#### 1. `js/pixabay-api.js` (HTTP Requests)
Stores functions for performing HTTP requests:
- `getImagesByQuery(query, page)` — accepts two parameters: `query` (search term, `string`) and `page` (page number, `number`). Performs an HTTP request and returns the `data` property from the received response.

#### 2. `js/render-functions.js` (UI Rendering & Lightbox)
Creates an instance of `SimpleLightbox` to handle the modal window and stores functions for rendering UI elements:
- `createGallery(images)` — accepts an array `images`, generates the HTML markup for the gallery, injects it into the gallery container, and calls the `refresh()` method on the `SimpleLightbox` instance. Returns nothing.
- `clearGallery()` — takes no arguments, clears the contents of the gallery container, and returns nothing.
- `showLoader()` — takes no arguments, adds a class to display the loader, and returns nothing.
- `hideLoader()` — takes no arguments, removes the class used to display the loader, and returns nothing.
- `showLoadMoreButton()` — takes no arguments, adds a class to display the **"Load more"** button, and returns nothing.
- `hideLoadMoreButton()` — takes no arguments, removes the class used to display the **"Load more"** button, and returns nothing.

#### 3. `main.js` (Application Logic)
Contains the core application logic: handles `iziToast` notification calls, checks regarding the length of the array in the received response, pagination checks, and page-scrolling logic. Imports and invokes functions from `pixabay-api.js` and `render-functions.js` at the appropriate moments.

---

## 🌐 HTTP Requests (`pixabay-api.js`)

- **HTTP Client:** [Axios](https://axios-http.com/)
- **Backend API:** [Pixabay API Documentation](https://pixabay.com/api/docs/) | [Search Images Endpoint](https://pixabay.com/api/docs/#api_search_images) *(Registration is required to obtain an API key)*.

### Query String Parameters

| Parameter | Value / Description |
| :--- | :--- |
| `key` | Your unique API access key |
| `q` | The search term entered by the user |
| `image_type` | `'photo'` (only photographs are needed) |
| `orientation` | `'horizontal'` |
| `safesearch` | `'true'` (age-appropriateness filter) |

### Response Handling & Notifications
- The response is an object containing a `hits` property — an array of objects representing matching images.
- If the backend returns an empty array (`hits.length === 0`), display the following notification using [iziToast](https://github.com/marcelodolza/iziToast):

> *"Sorry, there are no images matching your search query. Please try again!"*

**Importing `iziToast` (including required CSS):**
```javascript
// Documentation
import iziToast from 'izitoast';
// Additional import for styles
import 'izitoast/dist/css/iziToast.min.css';
```

---

## 🖼️ Gallery & Image Cards (`CSS`, `main.js`, `render-functions.js`)

- The gallery container (`<ul class="gallery">`) exists in the HTML document, and image card markup is injected into it after HTTP requests.
- Before performing a search with a new keyword, the gallery contents are completely cleared to prevent results from different requests from mixing together.

### Image Object Properties Used
- `webformatURL` — link to a small version of the image for the gallery card list.
- `largeImageURL` — link to a large version of the image for the modal window.
- `tags` — string describing the image (used for the `alt` attribute).
- `likes` — number of likes.
- `views` — number of views.
- `comments` — number of comments.
- `downloads` — number of downloads.

---

## 🔍 SimpleLightbox Library (`CSS`, `render-functions.js`)

The [SimpleLightbox](https://github.com/andreknieriem/simplelightbox) library is integrated to display full-size images in a modal gallery.

**Importing `SimpleLightbox` (including required CSS):**
```javascript
// Described in the documentation
import SimpleLightbox from 'simplelightbox';
// Additional import for styles
import 'simplelightbox/dist/simple-lightbox.min.css';
```

### Implementation Notes
- In the HTML markup, each image card must be wrapped in an anchor tag (`<a>`), following the [SimpleLightbox Markup](https://github.com/andreknieriem/simplelightbox#markup) guidelines.
- The instance's [`refresh()`](https://github.com/andreknieriem/simplelightbox#public-methods) method must be called inside `render-functions.js` whenever new elements are added to the gallery.



---
---

# Vanilla App Template

- **Template Repository:** [goitacademy/vanilla-app-template](https://github.com)

This project was created using **Vite**. For more information and additional configuration options, [refer to the official documentation](https://vitejs.dev).

---

## 🚀 Creating a Repository from the Template

Use this GoIT organization repository as a template to create your project repository. Click the **`«Use this template»`** button and select **`«Create a new repository»`**, as shown in the image below.

![Creating repo from a template step 1](./assets/template-step-1.png)

Next, the repository creation page will open. Fill in the repository name field, make sure the repository is set to **Public**, and click **`«Create repository from template»`**.

![Creating repo from a template step 2](./assets/template-step-2.png)

Once the repository is created, go to the repository settings under the **`Settings` > `Actions` > `General`** tab, as shown below.

![Settings GitHub Actions permissions step 1](./assets/gh-actions-perm-1.png)

Scroll down to the bottom of the page, select **`«Read and write permissions»`** in the **`«Workflow permissions»`** section, and check the box below it. This is required to automate the project deployment process.

![Settings GitHub Actions permissions step 2](./assets/gh-actions-perm-2.png)

You now have a personal project repository with the file and folder structure of the template repository. Work with it just like any other personal repository: clone it to your computer, write code, make commits, and push them to GitHub.

---

## 💻 Getting Started

1. Make sure an LTS version of **Node.js** is installed on your computer. [Download and install](https://nodejs.org) it if necessary.
2. Install the project's base dependencies in the terminal by running:
   ```bash
   npm install
   ```
3. Start development mode by running:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser. This page will automatically reload whenever you save changes to the project files.

---

## 📂 Files and Folders

- **`src/partials`** — page component markup files imported into `index.html`. For example, create a header markup file `header.html` in the `partials` folder and import it into `index.html`.
- **`src/css`** — stylesheet files imported into the HTML pages. For example, for `index.html`, the stylesheet file is `index.css`.
- **`src/img`** — folder for images. The bundler optimizes them only during the production build deployment. This happens in the cloud so as not to overload your computer, as it can take a long time on lower-spec machines.

---

## 🌐 Deployment

The production version of the project will be automatically built and deployed to **GitHub Pages** on the `gh-pages` branch every time the `main` branch is updated (for example, after a direct push or a merged pull request).

To set this up, update the `--base=/<REPO>/` flag in the `build` script inside `package.json` by replacing `<REPO>` with your repository name, and push the changes to GitHub:

```json
"build": "vite build --base=/<REPO>/"
```

Next, go to your GitHub repository settings (**`Settings` > `Pages`**) and set the source to serve production files from the `/root` folder of the `gh-pages` branch, if this was not configured automatically.

![GitHub Pages settings](./assets/repo-settings.png)

### Deployment Status

The deployment status of the latest commit is indicated by an icon next to its commit hash:

- 🟡 **Yellow** — the project is currently being built and deployed.
- 🟢 **Green** — the deployment completed successfully.
- 🔴 **Red** — an error occurred during linting, building, or deployment.

You can view more detailed status information by clicking the icon and selecting `Details` in the dropdown window.

![Deployment status](./assets/deploy-status.png)

### Live Page

After a short while, usually a few minutes, the live page can be viewed at the URL specified under the `Settings` > `Pages` tab in your repository settings. For example, here is the link to the live version for this repository:

[https://goitacademy.github.io/vanilla-app-template/](https://goitacademy.github.io/vanilla-app-template/).

If a blank page opens, make sure there are no errors in the `Console` tab related to incorrect paths to the project's CSS and JS files (**404**). Most likely, you have an incorrect value for the `--base` flag in the `build` command inside your `package.json` file.

## How It Works

![How it works](./assets/how-it-works.png)

1. After every push to the `main` branch of the GitHub repository, a special script (GitHub Action) from the `.github/workflows/deploy.yml` file is triggered.
2. All repository files are copied to a server, where the project is initialized, linted, and built before deployment.
3. If all steps are successful, the compiled production version of the project files is pushed to the `gh-pages` branch. Otherwise, the script execution log will indicate where the issue occurred.
